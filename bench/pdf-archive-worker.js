// PDF Workbench iPad full-Library PDF archive writer.
// One ZIP entry is received, written, and released before another is accepted.
// ZIP STORE format matches the existing PDF archive export.
'use strict';
const ENC = new TextEncoder();
const ZIP32_LIMIT = 0xFFFFFFFF;
const CHUNK = 256 * 1024;
const FLUSH_EVERY = 8 * 1024 * 1024;
const CRC = (() => {
  const t = new Uint32Array(256);
  for (let i=0; i<256; i++) { let c=i; for(let j=0;j<8;j++) c=(c>>>1)^((c&1)?0xEDB88320:0); t[i]=c>>>0; }
  return t;
})();
function zipWriter(handle) {
  let offset=0, flushed=0;
  const entries=[];
  function put(bytes) {
    let start=0;
    if (offset+bytes.byteLength>=ZIP32_LIMIT) throw new Error('PDF archive exceeds the ZIP32 limit (4 GB).');
    while(start<bytes.byteLength) {
      const n=handle.write(bytes.subarray(start),{at:offset});
      if(!Number.isInteger(n)||n<=0) throw new Error('Incomplete archive write.');
      offset+=n; start+=n;
    }
    if(offset-flushed>=FLUSH_EVERY) { handle.flush(); flushed=offset; }
  }
  const u16=(dv,p,v)=>dv.setUint16(p,v,true);
  const u32=(dv,p,v)=>dv.setUint32(p,v>>>0,true);
  async function add(path,data) {
    if(entries.length>=65535) throw new Error('Too many archive entries.');
    const filename=ENC.encode(path);
    if(filename.byteLength>65535) throw new Error('Archive filename too long.');
    const bytes=data instanceof Uint8Array ? data : new Uint8Array(data);
    const localOffset=offset;
    const head=new Uint8Array(30+filename.length);let dv=new DataView(head.buffer);
    u32(dv,0,0x04034B50);u16(dv,4,20);u16(dv,6,0x0808);u16(dv,26,filename.length);head.set(filename,30);
    put(head);
    let crc=0xFFFFFFFF;
    for(let s=0;s<bytes.length;s+=CHUNK) {
      const piece=bytes.subarray(s, Math.min(bytes.length,s+CHUNK));
      for(let j=0;j<piece.length;j++) crc=CRC[(crc^piece[j])&255]^(crc>>>8);
      put(piece);
      if(s && s%(CHUNK*4)===0) await new Promise(resolve=>setTimeout(resolve,0));
    }
    crc=(crc^0xFFFFFFFF)>>>0;
    const desc=new Uint8Array(16);dv=new DataView(desc.buffer);
    u32(dv,0,0x08074B50);u32(dv,4,crc);u32(dv,8,bytes.length);u32(dv,12,bytes.length);
    put(desc);
    entries.push({filename,crc,size:bytes.length,localOffset});
  }
  function finish() {
    const start=offset;
    for(const e of entries) {
      const head=new Uint8Array(46+e.filename.length),dv=new DataView(head.buffer);
      u32(dv,0,0x02014B50);u16(dv,4,20);u16(dv,6,20);u16(dv,8,0x0808);
      u32(dv,16,e.crc);u32(dv,20,e.size);u32(dv,24,e.size);
      u16(dv,28,e.filename.length);u32(dv,42,e.localOffset);
      head.set(e.filename,46);put(head);
    }
    const end=new Uint8Array(22),dv=new DataView(end.buffer);
    u32(dv,0,0x06054B50);u16(dv,8,entries.length);u16(dv,10,entries.length);
    u32(dv,12,offset-start);u32(dv,16,start);put(end);
    handle.truncate(offset);handle.flush();
    if(handle.getSize()!==offset) throw new Error('Final archive size did not match written data.');
    return {bytes:offset,entries:entries.length};
  }
  return {add,finish,get bytes(){return offset;}};
}
let root=null,file=null,handle=null,zip=null,failed=false;
async function dispose(incomplete) {
  if(handle){try{handle.close();}catch{} handle=null;}
  zip=null;
  if(incomplete&&root&&file){try{await root.removeEntry(file);}catch{}}
}
self.onmessage=async ev=>{
  const {type}=ev.data||{};
  if(failed)return;
  try{
    if(type==='init'){
      if(zip)throw new Error('Archive already started.');
      if(!self.navigator.storage?.getDirectory)throw new Error('Origin-private file storage is unsupported.');
      root=await self.navigator.storage.getDirectory();
      file=ev.data.slot;
      const fh=await root.getFileHandle(file,{create:true});
      if(typeof fh.createSyncAccessHandle!=='function')throw new Error('Synchronous file writing is unsupported in this browser.');
      handle=await fh.createSyncAccessHandle();handle.truncate(0);
      zip=zipWriter(handle);
      self.postMessage({type:'ack',operation:'init'});
    } else if(type==='add'){
      if(!zip)throw new Error('Archive writer was not initialized.');
      await zip.add(ev.data.path,ev.data.bytes);
      self.postMessage({type:'ack',operation:'add',bytes:zip.bytes});
    } else if(type==='finish'){
      if(!zip)throw new Error('Archive writer was not initialized.');
      const result=zip.finish();
      await dispose(false);
      self.postMessage({type:'ready',...result});
    } else if(type==='abort'){
      await dispose(true);
      self.postMessage({type:'ack',operation:'abort'});
    }
  }catch(err){failed=true;await dispose(true);self.postMessage({type:'error',message:String(err?.message||err)});}
};

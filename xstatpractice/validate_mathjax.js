const fs=require('fs'),vm=require('vm');
const {init}=require('./vendor/mathjax/es5/node-main.js');
const src=fs.readFileSync(__dirname+'/question-bank.js','utf8');
const sandbox={window:{},console};vm.createContext(sandbox);vm.runInContext(src,sandbox);
const D=sandbox.window.StatisticsPracticeData;
const records=[];
for(const [sid,qs] of Object.entries(D.questions)) qs.forEach((q,i)=>{
  records.push({where:`${sid} Q${i+1} prompt`,text:String(q.prompt)});
  q.choices.forEach((x,j)=>records.push({where:`${sid} Q${i+1} choice${j+1}`,text:String(x)}));
  records.push({where:`${sid} Q${i+1} explanation`,text:String(q.explanation)});
});
function extract(text){const out=[];const re=/\\\(([^]*?)\\\)|\\\[([^]*?)\\\]/g;let m;while((m=re.exec(text)))out.push(m[1]!==undefined?m[1]:m[2]);return out;}
function removeDelimited(text){return text.replace(/\\\(([^]*?)\\\)|\\\[([^]*?)\\\]/g,'');}
const texRecords=[],raw=[];
const cmd=/\\(?:frac|sqrt|sum|int|lim|log|sin|cos|tan|mathbb|begin|end|le|lt|gt|ge|ne|cdot|pi|theta|rho|mu|sigma|alpha|binom|mathrm|hat|bar|sqrt|text)\b/;
for(const r of records){extract(r.text).forEach(tex=>texRecords.push({where:r.where,tex}));const rest=removeDelimited(r.text);if(cmd.test(rest))raw.push({where:r.where,text:rest.match(cmd)?.[0]});}
const unique=new Map();for(const r of texRecords)if(!unique.has(r.tex))unique.set(r.tex,r.where);
init({loader:{load:['input/tex','output/chtml']}}).then(MathJax=>{
 const errors=[];
 for(const [tex,where] of unique){try{MathJax.texReset();const node=MathJax.tex2chtml(tex,{display:false});const h=MathJax.startup.adaptor.outerHTML(node);if(h.includes('mjx-merror'))errors.push({where,tex,error:'mjx-merror'});}catch(e){errors.push({where,tex,error:String(e)});}}
 const report={question_text_fields:records.length,tex_occurrences:texRecords.length,unique_tex_expressions:unique.size,mathjax_errors:errors,raw_tex_outside_delimiters:raw};
 fs.writeFileSync(__dirname+'/MATHJAX_AUDIT.json',JSON.stringify(report,null,2));
 console.log(`fields=${records.length} tex=${texRecords.length} unique=${unique.size} merrors=${errors.length} raw=${raw.length}`);
 if(errors.length||raw.length){errors.slice(0,20).forEach(e=>console.log('MERROR',e));raw.slice(0,20).forEach(e=>console.log('RAW',e));process.exitCode=1;}
}).catch(e=>{console.error(e);process.exitCode=1;});

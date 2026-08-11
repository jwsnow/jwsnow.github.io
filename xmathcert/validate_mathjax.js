const fs=require('fs'),vm=require('vm');
const {init}=require('./vendor/mathjax/es5/node-main.js');
const src=fs.readFileSync(__dirname+'/question-bank.js','utf8');
const sandbox={window:{},console}; vm.createContext(sandbox); vm.runInContext(src,sandbox);
const D=sandbox.window.MathQuizData, exam=D.exams.math712;
const records=[];
function addQuestions(qs,label){
 qs.forEach((q,i)=>{
  for(const [field,value] of [['prompt',q.prompt],...q.choices.map((x,j)=>[`choice${j+1}`,x]),['explanation',q.explanation]]) records.push({where:`${label} Q${i+1} ${field}`,text:String(value)});
 });
}
for(const L of 'ABCDE') addQuestions(D.generateFullExam('math712','form-'+L),`Form ${L}`);
for(const c of exam.categories) for(let v=1;v<=4;v++) addQuestions(D.generateTopicQuiz('math712',c,'topic-'+v),`${c} topic ${v}`);
// Randomized stress generation to exercise parameterized branches.
for(let k=0;k<10;k++) addQuestions(D.generateFullExam('math712',`audit-random-full-${k}`),`Random full ${k}`);
for(const c of exam.categories) for(let k=0;k<2;k++) addQuestions(D.generateTopicQuiz('math712',c,`audit-random-${c}-${k}`),`${c} random ${k}`);

function extract(text){
 const out=[]; const re=/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g; let m;
 while((m=re.exec(text))) out.push(m[1]!==undefined?m[1]:m[2]);
 return out;
}
function removeDelimited(text){return text.replace(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g,'');}
const rawIssues=[];
const texRecords=[];
const cmd=/\\(?:frac|sqrt|sum|int|lim|log|sin|cos|tan|arcsin|arccos|arctan|mathbb|begin|end|le|ge|ne|cdot|pi|theta|Delta|infty|pmatrix|left|right)\b/;
for(const r of records){
  extract(r.text).forEach(tex=>texRecords.push({where:r.where,tex}));
  const rest=removeDelimited(r.text);
  if(cmd.test(rest)) rawIssues.push({where:r.where,text:rest.match(cmd)?.[0]||'raw TeX'});
}
const unique=new Map(); for(const r of texRecords) if(!unique.has(r.tex)) unique.set(r.tex,r.where);

init({loader:{load:['input/tex','output/chtml']}}).then(MathJax=>{
 const errors=[];
 for(const [tex,where] of unique){
   try{
     MathJax.texReset();
     const node=MathJax.tex2chtml(tex,{display:false});
     const html=MathJax.startup.adaptor.outerHTML(node);
     if(html.includes('mjx-merror')) errors.push({where,tex,error:'mjx-merror'});
   }catch(e){errors.push({where,tex,error:String(e)});}
 }
 const report={question_text_fields:records.length,tex_occurrences:texRecords.length,unique_tex_expressions:unique.size,mathjax_errors:errors,raw_tex_outside_delimiters:rawIssues};
 fs.writeFileSync(__dirname+'/MATHJAX_AUDIT.json',JSON.stringify(report,null,2));
 console.log(`fields=${records.length} tex=${texRecords.length} unique=${unique.size} merrors=${errors.length} raw=${rawIssues.length}`);
 if(errors.length){errors.slice(0,30).forEach(e=>console.log('MERROR',e));process.exitCode=1;}
 if(rawIssues.length){rawIssues.slice(0,30).forEach(e=>console.log('RAW',e));process.exitCode=1;}
}).catch(e=>{console.error(e);process.exitCode=1});

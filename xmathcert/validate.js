global.window=global;
require('./question-bank.js');
const D=global.MathQuizData;
const errors=[];
let generated=0;
function checkQuestions(qs,label,expected){
  if(qs.length!==expected) errors.push(`${label}: expected ${expected}, got ${qs.length}`);
  qs.forEach((q,i)=>{
    generated++;
    if(!q.prompt) errors.push(`${label} q${i+1}: empty prompt`);
    if(!Array.isArray(q.choices)||q.choices.length!==4) errors.push(`${label} q${i+1}: choices length ${q.choices?.length}`);
    if(new Set(q.choices).size!==4) errors.push(`${label} q${i+1}: duplicate choices ${JSON.stringify(q.choices)}`);
    if(!Number.isInteger(q.answer)||q.answer<0||q.answer>3) errors.push(`${label} q${i+1}: invalid answer ${q.answer}`);
    if(!q.explanation) errors.push(`${label} q${i+1}: empty explanation`);
    if(!q.categoryId||!D.categories[q.categoryId]) errors.push(`${label} q${i+1}: bad category`);
    if(q.choices.some(x=>String(x).includes('NaN')||String(x)==='undefined')) errors.push(`${label} q${i+1}: invalid choice ${JSON.stringify(q.choices)}`);
    if(String(q.prompt).includes('NaN')||String(q.explanation).includes('NaN')) errors.push(`${label} q${i+1}: NaN text`);
  });
}
const exam=D.exams.math712;
for(const seed of ['form-A','form-B','form-C','form-D','form-E','random-check-1','random-check-2']){
  const qs=D.generateFullExam('math712',seed);
  checkQuestions(qs,seed,100);
  const counts={}; qs.forEach(q=>counts[q.categoryId]=(counts[q.categoryId]||0)+1);
  for(const cid of exam.categories) if(counts[cid]!==exam.weights[cid]) errors.push(`${seed}: ${cid} count ${counts[cid]} expected ${exam.weights[cid]}`);
}
for(const cid of exam.categories){
  for(let v=1;v<=8;v++) checkQuestions(D.generateTopicQuiz('math712',cid,`topic-${cid}-${v}`),`${cid} v${v}`,12);
}
console.log(JSON.stringify({generated,errors:errors.slice(0,100),errorCount:errors.length,categories:exam.categories.length},null,2));
if(errors.length) process.exit(1);

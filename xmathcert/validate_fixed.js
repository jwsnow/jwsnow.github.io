const fs=require('fs'),vm=require('vm'); const sb={window:{},console};vm.createContext(sb);vm.runInContext(fs.readFileSync(__dirname+'/question-bank.js','utf8'),sb); const D=sb.window.MathQuizData, exam=D.exams.math712;
const issues=[], allFull=new Map(), allTopic=new Map(), report={forms:{},topics:{}};
function sig(q){return `${q.prompt}||${q.choices.map(String).slice().sort().join('||')}`;}
function check(q,where){
 if(!q.prompt||!q.explanation) issues.push(`${where}: missing text`);
 if(!q.choices||q.choices.length!==4||new Set(q.choices.map(String)).size!==4) issues.push(`${where}: choice problem`);
 if(!(q.answer>=0&&q.answer<4)) issues.push(`${where}: answer index`);
 const t=[q.prompt,...q.choices,q.explanation].join(' ');
 if((t.match(/\\\(/g)||[]).length!==(t.match(/\\\)/g)||[]).length) issues.push(`${where}: inline math delimiter mismatch`);
 if((t.match(/\\\[/g)||[]).length!==(t.match(/\\\]/g)||[]).length) issues.push(`${where}: display math delimiter mismatch`);
 if(/_{2,}/.test(t)) issues.push(`${where}: repeated underscore`);
}
for(const L of 'ABCDE'){
 const qs=D.generateFullExam('math712','form-'+L), counts={},fams={};
 qs.forEach((q,i)=>{check(q,`Form ${L} Q${i+1}`);counts[q.categoryId]=(counts[q.categoryId]||0)+1;(fams[q.categoryId]??=[]).push(q.family);if(/context-lead/.test(q.prompt))issues.push(`Form ${L} Q${i+1}: contextual fallback used`);const sg=sig(q);if(allFull.has(sg))issues.push(`Exact full-item overlap Form ${L} Q${i+1} with ${allFull.get(sg)}`);else allFull.set(sg,`Form ${L} Q${i+1}`)});
 if(qs.length!==100)issues.push(`Form ${L}: length ${qs.length}`);for(const c of exam.categories)if(counts[c]!==exam.weights[c])issues.push(`Form ${L}: count ${c}`);
 for(const [c,a] of Object.entries(fams))if(new Set(a).size!==a.length)issues.push(`Form ${L}: family repeat in ${c}: ${a.join(',')}`);
 report.forms[L]={count:qs.length,visuals:qs.filter(q=>q.visual).length,difficulty:qs.reduce((o,q)=>(o[q.difficulty]=(o[q.difficulty]||0)+1,o),{})};
}
for(const c of exam.categories){report.topics[c]={};for(let v=1;v<=4;v++){const qs=D.generateTopicQuiz('math712',c,'topic-'+v),f=qs.map(q=>q.family),vis=qs.filter(q=>q.visual).length;qs.forEach((q,i)=>{check(q,`${c} v${v} Q${i+1}`);if(/context-lead/.test(q.prompt))issues.push(`${c} v${v} Q${i+1}: contextual fallback used`);const sg=sig(q);if(allTopic.has(sg))issues.push(`Exact topic-item overlap ${c} v${v} Q${i+1} with ${allTopic.get(sg)}`);else allTopic.set(sg,`${c} v${v} Q${i+1}`);if(allFull.has(sg))issues.push(`Full/topic exact-item overlap ${c} v${v} Q${i+1} with ${allFull.get(sg)}`)});if(new Set(f).size!==f.length)issues.push(`${c} v${v}: family repeat ${f.join(',')}`);const visualFamilies=new Set(D.categories[c].pool.filter(fn=>fn.visual).map(fn=>fn.family||fn.name)); const requiredVisuals=Math.min(3,visualFamilies.size); if(vis<requiredVisuals)issues.push(`${c} v${v}: visuals ${vis}, expected ${requiredVisuals}`);report.topics[c][v]={visuals:vis,families:new Set(f).size};}}
report.full_unique=allFull.size;report.topic_unique=allTopic.size;report.issues=issues;fs.writeFileSync(__dirname+'/VALIDATION_FIXED.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report.forms,null,2));console.log('unique full',allFull.size,'unique topic',allTopic.size,'issues',issues.length);issues.slice(0,120).forEach(x=>console.log('-',x));if(issues.length)process.exitCode=1;

const fs=require('fs'),vm=require('vm');
const sb={window:{},console}; vm.createContext(sb); vm.runInContext(fs.readFileSync(__dirname+'/question-bank.js','utf8'),sb);
const D=sb.window.MathQuizData, exam=D.exams.math712, issues=[]; let qcount=0, visual=0;
function check(q,w){qcount++; visual+=q.visual?1:0; const fields=[q.prompt,...q.choices,q.explanation];
 if(!q.prompt||!q.explanation||q.choices.length!==4||new Set(q.choices.map(String)).size!==4||q.answer<0||q.answer>3) issues.push(w+': structure');
 for(const s of fields){ if(/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(String(s))) issues.push(w+': control char'); if(/_{2,}/.test(String(s))) issues.push(w+': repeated underscores'); }
}
for(let n=0;n<50;n++){
 const qs=D.generateFullExam('math712','stress-full-'+n); if(qs.length!==100)issues.push('full '+n+' length');
 const cats={}, prompts=new Set(); for(const [i,q] of qs.entries()){check(q,`full${n} q${i}`);cats[q.categoryId]=(cats[q.categoryId]||0)+1;if(prompts.has(q.prompt))issues.push(`full${n}: duplicate prompt`);prompts.add(q.prompt);}
 for(const c of exam.categories) if(cats[c]!==exam.weights[c]) issues.push(`full${n}: ${c} count ${cats[c]}`);
}
for(const c of exam.categories)for(let n=0;n<10;n++){
 const qs=D.generateTopicQuiz('math712',c,'stress-topic-'+c+'-'+n);if(qs.length!==12)issues.push(`${c} topic ${n} length`); const p=new Set(), f=new Set();
 qs.forEach((q,i)=>{check(q,`${c} topic${n} q${i}`);if(p.has(q.prompt))issues.push(`${c} topic${n}: duplicate prompt`);p.add(q.prompt);if(f.has(q.family))issues.push(`${c} topic${n}: duplicate family ${q.family}`);f.add(q.family);});
}
const result={full_forms_tested:50,topic_quizzes_tested:210,question_instances:qcount,visual_instances:visual,issues}; fs.writeFileSync(__dirname+'/STRESS_VALIDATION.json',JSON.stringify(result,null,2)); console.log(JSON.stringify({...result,issues:issues.slice(0,20)},null,2)); if(issues.length) process.exitCode=1;

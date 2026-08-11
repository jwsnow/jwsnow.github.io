(function(){
"use strict";
const D=window.STAAR7_DATA;
const main=document.getElementById("main");
const dialog=document.getElementById("confirm-dialog");
const RESULTS_KEY="staar7Rla.results.v2";
const DRAFTS_KEY="staar7Rla.drafts.v2";
const state={view:"home",quiz:null,result:null,reviewFilter:"all",timerId:null,navOpen:false};

const byId=(id)=>document.getElementById(id);
const esc=(v)=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));
const passages=new Map(D.passages.map(x=>[x.id,x]));
const questions=new Map(D.questions.map(x=>[x.id,x]));
const ecrs=new Map(D.ecrPrompts.map(x=>[x.id,x]));
const skillEntries=Object.entries(D.skills);
const fullObjectiveIds=new Set(D.forms.flatMap(f=>f.itemIds.filter(id=>!id.startsWith("ecr"))));
function fingerprint(q){
  const clean=v=>String(v??"").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim().toLowerCase();
  return [clean(q.stimulus),...(q.passageIds||[]),clean(q.prompt),clean(Array.isArray(q.correct)?q.correct.join("|"):q.correct),...(q.distractors||[]).map(clean)].join("||");
}
const fullFingerprints=new Set([...fullObjectiveIds].map(id=>fingerprint(questions.get(id))).filter(Boolean));
function uniquePracticePool(skillId){
  const seen=new Set(),out=[];
  for(const q of D.questions.filter(x=>x.skill===skillId)){
    const key=fingerprint(q);
    if(fullFingerprints.has(key)||seen.has(key))continue;
    seen.add(key);out.push(q);
  }
  return out;
}
function fixedSkillSets(skillId){
  const s=D.skills[skillId];
  if(s.mode==="ecr") return D.ecrPrompts.filter(x=>x.skill===skillId).slice(0,4).map(x=>[x]);
  const pool=shuffled(uniquePracticePool(skillId),rngFrom(`${skillId}-distinct-fixed-v3`));
  if(!pool.length)return [];
  const setCount=Math.min(4,Math.max(1,Math.floor(pool.length/4)));
  const base=Math.floor(pool.length/setCount),extra=pool.length%setCount,sets=[];
  let at=0;
  for(let i=0;i<setCount;i++){
    const size=base+(i<extra?1:0);
    sets.push(pool.slice(at,at+size));at+=size;
  }
  return sets;
}

function load(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}catch{return fallback;}}
function save(key,val){localStorage.setItem(key,JSON.stringify(val));}
function results(){return load(RESULTS_KEY,[]);}
function writeResults(a){save(RESULTS_KEY,a.slice(0,250));}
function hashString(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function rngFrom(seed){let a=hashString(String(seed));return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
function shuffled(arr,rng){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function timeString(s){s=Math.max(0,Math.floor(s||0));const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;return h?`${h}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`:`${m}:${String(sec).padStart(2,"0")}`;}
function clearTimer(){if(state.timerId)clearInterval(state.timerId);state.timerId=null;}
function scrollTop(){window.scrollTo({top:0,behavior:"instant"});}
function navigate(view){if(state.quiz&&view!=="quiz"&&!state.result){askLeave(()=>doNavigate(view));return;}doNavigate(view);}
function doNavigate(view){clearTimer();state.view=view;if(view!=="quiz")state.quiz=null;if(view!=="results")state.result=null;state.navOpen=false;scrollTop();render();}
function askLeave(cb){if(!dialog||typeof dialog.showModal!=="function"){if(confirm("Leave this activity? Your answers will be lost."))cb();return;}dialog.showModal();const close=()=>{dialog.removeEventListener("close",close);if(dialog.returnValue==="confirm")cb();};dialog.addEventListener("close",close);}

function render(){document.querySelector(".main-nav")?.classList.toggle("open",state.navOpen);if(state.view==="home")renderHome();else if(state.view==="full")renderFullTests();else if(state.view==="skills")renderSkills();else if(state.view==="progress")renderProgress();else if(state.view==="about")renderAbout();else if(state.view==="quiz")renderQuiz();else if(state.view==="results")renderResults();}
function breadcrumbs(label){return `<div class="breadcrumbs"><button data-action="home">Home</button> / ${esc(label)}</div>`;}

function masteryMap(){
  const agg={};for(const [id] of skillEntries)agg[id]={earned:0,possible:0,attempts:0};
  for(const r of results()){
    for(const s of r.skillStats||[]){if(!agg[s.id])continue;agg[s.id].earned+=s.earned;agg[s.id].possible+=s.possible;agg[s.id].attempts++;}
  }
  for(const x of Object.values(agg))x.percent=x.possible?Math.round(100*x.earned/x.possible):null;
  return agg;
}
function skillBadge(x){
  if(x.percent==null)return `<span class="skill-score unseen">Not attempted</span>`;
  const cls=x.percent<60?"weak":x.percent<80?"developing":"strong";
  const label=x.percent<60?"Needs attention":x.percent<80?"Developing":"Strong";
  return `<span class="skill-score ${cls}">${label} • ${x.percent}%</span>`;
}
function completedDays(){
  const m=new Map();
  for(const r of results()){if(r.dailyId&&!m.has(r.dailyId))m.set(r.dailyId,r);}
  return m;
}

function renderHome(){
  const c=D.site.coverage;
  main.innerHTML=`<section class="hero"><div class="hero-inner">
    <p class="eyebrow">Grade 7 Reading Language Arts</p>
    <h1>Complete TEKS practice with clear STAAR boundaries.</h1>
    <p>This practice center includes full STAAR-style forms, exact-skill practice for every STAAR-eligible Grade 7 RLA standard, separate practice for course TEKS that are not STAAR tested, explanations, and diagnostic links.</p>
    <div class="hero-actions"><button class="primary-button" data-action="full-tests">Take a full diagnostic</button><button class="secondary-button" data-action="skills">Choose a specific skill</button></div>
    <div class="hero-stats">
      <div class="hero-stat"><strong>${D.forms.length}</strong><span>fixed full-length forms</span></div>
      <div class="hero-stat"><strong>${c.testedObjectiveSkills+c.testedWritingLabs}</strong><span>STAAR-tested skill centers</span></div>
      <div class="hero-stat"><strong>${c.nonTestedCourseSkills}</strong><span>additional course-TEKS centers</span></div>
    </div>
  </div></section>
  <section class="content-wrap">
    <div class="section-heading"><h2>Choose how to practice</h2><p>Every objective question includes an explanation. Full tests identify the weakest skills they actually sample and link directly to distinct targeted practice.</p></div>
    <div class="dashboard-grid">
      <article class="dashboard-card"><div class="icon">📝</div><h2>Full Practice Tests</h2><p>${D.forms.length} fixed 45-item forms, with reading, revising, editing, two-point items, and an extended response.</p><button class="primary-button" data-action="full-tests">Open full tests</button></article>
      <article class="dashboard-card"><div class="icon">🎯</div><h2>Exact-Skill Practice</h2><p>Practice each tested standard separately. Fixed skill sets do not repeat one another, and full-test questions are excluded from the fixed skill sets.</p><button class="primary-button" data-action="skills">Open skill practice</button></article>
      <article class="dashboard-card"><div class="icon">📊</div><h2>Progress and Weaknesses</h2><p>See score history and cumulative performance for every skill practiced on this browser.</p><button class="primary-button" data-action="progress">View progress</button></article>
    </div>
    <div class="notice"><strong>Important:</strong> “STAAR tested” means the skill appears in TEA’s assessed-curriculum list. Practice scores are raw diagnostics, not official scale scores or performance-level predictions.</div>
  </section>`;
}

function renderFullTests(){
  main.innerHTML=`<section class="content-wrap">${breadcrumbs("Full Practice Tests")}
    <div class="section-heading"><p class="eyebrow">Comprehensive diagnostics</p><h1>Full Practice Tests</h1><p>Each fixed form contains 45 items worth 56 points, with 26–28 reading items, 17–19 revising/editing items, and one extended constructed response. Explanations and skill-level diagnosis appear after submission.</p></div>
    <div class="notice"><strong>Recommended use:</strong> Begin with Form A. Complete targeted skill practice based on the report, then use a later form to measure improvement.</div>
    <div class="card-grid">${D.forms.map(f=>`<article class="form-card"><p class="eyebrow">${esc(f.id==="A"?"Suggested starting diagnostic":"Parallel practice form")}</p><h3>${esc(f.label)}</h3><p>${esc(f.description)}</p><div class="form-meta"><span class="chip">45 items</span><span class="chip">56 points</span><span class="chip">4-hour timer</span></div><button class="primary-button" data-action="start-full" data-form="${f.id}">Begin Form ${f.id}</button></article>`).join("")}
    <article class="form-card"><p class="eyebrow">Additional practice</p><h3>Random Practice Form</h3><p>Uses one complete fixed-form content set with randomized answer order. A new seed is created each time.</p><div class="form-meta"><span class="chip">45 items</span><span class="chip">56 points</span></div><button class="secondary-button" data-action="start-random-full">Generate a form</button></article></div>
  </section>`;
}

function standardBadges(s){return `<span class="chip ${s.tested?'tested-chip':'not-tested-chip'}">${s.tested?'STAAR tested':'Not STAAR tested'}</span><span class="chip">${esc(s.teks)}</span>`;}
function renderSkills(){
  const m=masteryMap();
  const groups=[
    {id:"STAAR-Tested Reading",title:"STAAR-Tested Reading Skills",desc:"Every reading student expectation in the Grade 7 assessed-curriculum list."},
    {id:"STAAR-Tested Writing",title:"STAAR-Tested Writing Skills",desc:"Revising, editing, text response, and composition standards eligible for STAAR."},
    {id:"Course TEKS — Not STAAR Tested",title:"Additional Grade 7 Course TEKS",desc:"Required Grade 7 ELAR skills that are not in the STAAR assessed-curriculum list. These are clearly marked and do not appear on the full practice tests."}
  ];
  main.innerHTML=`<section class="content-wrap">${breadcrumbs("Skill Practice")}
    <div class="section-heading"><p class="eyebrow">TEKS-by-TEKS practice</p><h1>Practice a Specific Skill</h1><p>Fixed practice sets use genuinely distinct questions and do not reuse questions from the five fixed full tests. The number and length of fixed sets therefore varies by skill. Random practice draws from the same deduplicated practice-only pool.</p></div>
    <div class="legend-panel"><span class="chip tested-chip">STAAR tested</span> Included in TEA’s assessed curriculum. <span class="chip not-tested-chip">Not STAAR tested</span> Part of the Grade 7 course TEKS but omitted from the STAAR assessed-curriculum list.</div>
    ${groups.map(g=>`<section class="skill-group"><div class="skill-group-title"><div><h2>${g.title}</h2><p>${g.desc}</p></div></div>
      <div class="skill-grid">${skillEntries.filter(([,s])=>s.group===g.id).map(([id,s])=>{const sets=fixedSkillSets(id);return `<article class="skill-card ${s.tested?'':'course-only'}" id="skill-${id}">
        <div class="skill-meta"><div>${standardBadges(s)}</div>${skillBadge(m[id])}</div>
        <h3>${esc(s.label)}</h3><p>${esc(s.desc)}</p>
        <div class="topic-actions">${sets.map((set,i)=>`<button class="secondary-button" data-action="start-skill" data-skill="${id}" data-version="${i+1}">${s.mode==='ecr'?'Prompt':'Practice'} ${i+1}${s.mode==='objective'?` • ${set.length} q`:''}</button>`).join("")}<button class="primary-button" data-action="start-skill-random" data-skill="${id}">Random</button></div>
      </article>`}).join("")}</div></section>`).join("")}
  </section>`;
}

function renderAbout(){
  const c=D.site.coverage;
  main.innerHTML=`<section class="content-wrap">${breadcrumbs("About")}
    <div class="section-heading"><p class="eyebrow">Scope, coverage, and limitations</p><h1>About This Practice Site</h1><p>The content map separates the current Grade 7 STAAR assessed curriculum from the complete Grade 7 ELAR course TEKS.</p></div>
    <section class="panel"><h2>Coverage map</h2><p>The site provides ${c.testedObjectiveSkills} exact objective-skill centers and ${c.testedWritingLabs} STAAR-tested writing labs. It also provides ${c.nonTestedCourseSkills} additional course-TEKS centers clearly labeled <strong>Not STAAR tested</strong>. A machine-readable coverage table is included in <code>coverage.csv</code> and <code>coverage.json</code>.</p></section>
    <section class="panel"><h2>Full-test model</h2><p>Each fixed form contains 45 items worth 56 points: 42 one-point items, two two-point selected-response items, and one extended constructed response worth 10 points. Each form includes two single reading selections, one paired set, revising passages, editing passages, and a text-based composition.</p><p>A full form cannot measure every individual TEKS in one sitting. Its report diagnoses only the exact skills sampled on that form; the skill dashboard provides direct practice for the complete assessed list.</p></section>
    <section class="panel"><h2>Question design</h2><p>All passages, prompts, choices, explanations, and writing tasks are original. Public TEA standards, blueprints, assessed-curriculum documents, and released-item formats were used to define scope and form—not copied into the bank.</p><p>The site uses multiple choice and multiple select. It does not simulate every technology-enhanced interaction in the official testing platform.</p></section>
    <section class="panel"><h2>Scoring and privacy</h2><p>Raw scores are diagnostic only. Extended responses are self-scored with the included rubric. Results remain in this browser’s local storage and are not sent to a server.</p></section>
  </section>`;
}

function selectBalanced(pool,count,rng){
  const shuffledPool=shuffled(pool,rng),chosen=[],perPassage={};
  for(const item of shuffledPool){
    const key=(item.passageIds&&item.passageIds[0])||"standalone";
    if((perPassage[key]||0)>=2&&chosen.length<Math.min(count,pool.length-2))continue;
    chosen.push(item);perPassage[key]=(perPassage[key]||0)+1;
    if(chosen.length===count)break;
  }
  if(chosen.length<count){for(const item of shuffledPool){if(!chosen.includes(item)){chosen.push(item);if(chosen.length===count)break;}}}
  return chosen;
}
function prepareObjective(raw,seed){
  const rng=rngFrom(`${seed}|${raw.id}`);
  const corrects=Array.isArray(raw.correct)?raw.correct:[raw.correct];
  const all=shuffled([...corrects,...raw.distractors],rng);
  return {...raw,choices:all,answerIndexes:corrects.map(c=>all.indexOf(c)).sort((a,b)=>a-b)};
}
function prepareEcr(id){
  const e=ecrs.get(id);return {id:e.id,type:"ecr",points:10,skill:e.skill,category:"Writing",prompt:e.prompt,passageIds:e.passageIds,title:e.title,mode:e.mode};
}
function buildFull(formId,seed,labelOverride,dailyId){
  const f=D.forms.find(x=>x.id===formId),items=f.itemIds.map(id=>id.startsWith("ecr")?prepareEcr(id):prepareObjective(questions.get(id),seed));
  return {mode:"full",label:labelOverride||f.label,seed,items,timeSeconds:f.timeMinutes*60,dailyId:dailyId||null};
}
function buildSkill(skillId,version,randomized=false,dailyId=null,count=8){
  const s=D.skills[skillId],seed=randomized?`${skillId}-${Date.now()}-${Math.random()}`:`${skillId}-version-${version}`;
  if(s.mode==="ecr"){
    const pool=D.ecrPrompts.filter(x=>x.skill===skillId),idx=randomized?Math.floor(rngFrom(seed)()*pool.length):Math.max(0,Math.min(pool.length-1,Number(version)-1));
    return {mode:"skill",label:`${s.label} — ${randomized?"Random":"Prompt "+version}`,seed,items:[prepareEcr(pool[idx].id)],timeSeconds:null,dailyId};
  }
  const pool=uniquePracticePool(skillId);
  const sets=fixedSkillSets(skillId);
  const selected=randomized?selectBalanced(pool,Math.min(count,pool.length),rngFrom(seed)):(sets[Math.max(0,Number(version)-1)]||sets[0]||[]);
  return {mode:"skill",label:`${s.label} — ${randomized?"Random":"Practice "+version}`,seed,items:shuffled(selected,rngFrom(seed+"order")).map(x=>prepareObjective(x,seed)),timeSeconds:null,dailyId};
}

function startBuilt(b){
  state.result=null;state.quiz={...b,current:0,answers:b.items.map(x=>x.type==="single"?null:x.type==="multi"?[]:""),flags:b.items.map(()=>false),startedAt:Date.now(),remaining:b.timeSeconds,submitted:false};
  state.view="quiz";scrollTop();startTimer();renderQuiz();
}
function startTimer(){clearTimer();if(!state.quiz?.timeSeconds)return;state.timerId=setInterval(()=>{if(!state.quiz)return;state.quiz.remaining--;const el=byId("timer");if(el){el.textContent=timeString(state.quiz.remaining);el.classList.toggle("warning",state.quiz.remaining<=900);}if(state.quiz.remaining<=0){clearTimer();submitQuiz(true);}},1000);}

function passageHtml(ids,compact=false){
  if(!ids?.length)return "";
  return `<div class="passage-box ${compact?"review-passage":""}">${ids.map((id,i)=>{const p=passages.get(id);if(!p)return "";return `${i?`<div class="paired-divider"></div>`:""}<span class="passage-label">${esc(p.kind||p.genre||"Passage")}</span><h2>${esc(p.title)}</h2><div class="passage-text">${esc(p.text)}</div>`}).join("")}</div>`;
}
function isAnswered(q,a){if(q.type==="single")return a!==null;if(q.type==="multi")return Array.isArray(a)&&a.length>0;return String(a||"").trim().length>0;}
function renderQuiz(){
  const z=state.quiz;if(!z)return doNavigate("home");
  const q=z.items[z.current],a=z.answers[z.current],pct=Math.round(100*(z.current+1)/z.items.length);
  const choiceHtml=q.type==="single"?`<div class="choices">${q.choices.map((c,i)=>`<button class="choice-button ${a===i?"selected":""}" data-action="choose-single" data-choice="${i}"><span class="choice-letter">${"ABCD"[i]}</span><span>${c}</span></button>`).join("")}</div>`:
    q.type==="multi"?`<p class="directions">Select two answers. Full credit requires the exact correct set.</p><div class="choices">${q.choices.map((c,i)=>`<button class="choice-button multi-choice ${(a||[]).includes(i)?"selected":""}" data-action="toggle-multi" data-choice="${i}"><input type="checkbox" tabindex="-1" ${(a||[]).includes(i)?"checked":""}><span>${c}</span></button>`).join("")}</div>`:
    `<div class="ecr-box"><p class="directions"><strong>${esc(q.mode)} response:</strong> Develop a clear central idea or claim, organize the response, use evidence from the passage(s), explain the evidence, and edit for conventions.</p><textarea id="ecr-response" placeholder="Write your response here...">${esc(a)}</textarea><div class="word-count"><span id="word-count">${wordCount(a)}</span> words</div></div>`;
  main.innerHTML=`<section class="quiz-shell">
    <div class="quiz-topbar"><div class="quiz-title"><h1>${esc(z.label)}</h1><p>Item ${z.current+1} of ${z.items.length} • ${esc(D.skills[q.skill]?.label||"Extended response")}</p></div>${z.timeSeconds?`<div class="timer ${z.remaining<=900?"warning":""}" id="timer">${timeString(z.remaining)}</div>`:""}<button class="ghost-button" data-action="exit-quiz">Exit</button></div>
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="quiz-layout">
      <article class="question-card"><div class="question-heading"><span class="question-number">Question ${z.current+1} • ${q.points} ${q.points===1?"point":"points"}</span><span class="question-skill">${esc(D.skills[q.skill]?.teks||"Text-based composition")}</span></div>
        ${passageHtml(q.passageIds)}
        ${q.stimulus?`<div class="stimulus-box">${q.stimulus}</div>`:""}
        ${q.type==="ecr"?`<h2>${esc(q.title)}</h2>`:""}
        <div class="question-prompt">${q.prompt}</div>${choiceHtml}
        <div class="question-controls"><button class="ghost-button" data-action="flag">${z.flags[z.current]?"Unflag":"Flag for review"}</button><div><button class="secondary-button" data-action="prev" ${z.current===0?"disabled":""}>Previous</button>${z.current<z.items.length-1?`<button class="primary-button" data-action="next">Next</button>`:`<button class="primary-button" data-action="submit">Submit</button>`}</div></div>
      </article>
      <aside class="navigator"><h2>Question navigation</h2><div class="nav-grid">${z.items.map((item,i)=>`<button class="nav-dot ${i===z.current?"current":""} ${isAnswered(item,z.answers[i])?"answered":""} ${z.flags[i]?"flagged":""}" data-action="goto" data-index="${i}" aria-label="Question ${i+1}">${i+1}</button>`).join("")}</div><div class="nav-legend"><span><i class="legend-box answered"></i> Answered</span><span><i class="legend-box"></i> Unanswered</span><span>Orange dot = flagged</span></div><button class="primary-button" style="width:100%;margin-top:.8rem" data-action="submit">Submit activity</button></aside>
    </div>
  </section>`;
  if(q.type==="ecr"){const ta=byId("ecr-response");ta?.addEventListener("input",()=>{z.answers[z.current]=ta.value;byId("word-count").textContent=wordCount(ta.value);});}
}
function wordCount(s){return String(s||"").trim()?String(s).trim().split(/\s+/).length:0;}

function scoreObjective(q,a){
  if(q.type==="single")return a===q.answerIndexes[0]?q.points:0;
  if(q.type==="multi"){
    const selected=[...(a||[])].sort((x,y)=>x-y),correct=q.answerIndexes;
    if(selected.length===correct.length&&selected.every((x,i)=>x===correct[i]))return q.points;
    const wrong=selected.some(x=>!correct.includes(x)),right=selected.filter(x=>correct.includes(x)).length;
    return !wrong&&right===1?1:0;
  }
  return 0;
}
function submitQuiz(auto=false){
  const z=state.quiz;if(!z)return;
  const missing=z.items.filter((q,i)=>!isAnswered(q,z.answers[i])).length;
  if(!auto&&missing&&!confirm(`${missing} item${missing===1?" is":"s are"} unanswered. Submit anyway?`))return;
  clearTimer();
  let earned=0,possible=0;const skillAgg={};
  z.items.forEach((q,i)=>{if(q.type==="ecr")return;const e=scoreObjective(q,z.answers[i]);earned+=e;possible+=q.points;if(!skillAgg[q.skill])skillAgg[q.skill]={id:q.skill,label:D.skills[q.skill].label,earned:0,possible:0};skillAgg[q.skill].earned+=e;skillAgg[q.skill].possible+=q.points;});
  const skillStats=Object.values(skillAgg).map(s=>({...s,percent:Math.round(100*s.earned/s.possible)})).sort((a,b)=>a.percent-b.percent||a.label.localeCompare(b.label));
  const hasEcr=z.items.some(x=>x.type==="ecr"),duration=Math.floor((Date.now()-z.startedAt)/1000);
  const result={id:`r-${Date.now()}-${Math.floor(Math.random()*100000)}`,label:z.label,mode:z.mode,dailyId:z.dailyId||null,items:z.items,answers:z.answers,earned,possible,objectivePercent:possible?Math.round(100*earned/possible):0,percent:possible?Math.round(100*earned/possible):0,hasEcr,ecrScore:null,ecrTraits:null,skillStats,completedAt:new Date().toISOString(),durationSeconds:duration};
  state.result=result;state.quiz=null;state.view="results";state.reviewFilter="all";persistResult(result);scrollTop();renderResults();
}
function persistResult(r){
  const a=results(),i=a.findIndex(x=>x.id===r.id);
  const lean={...r,items:r.items,answers:r.answers};
  if(i>=0)a[i]=lean;else a.unshift(lean);writeResults(a);
}
function band(p){return p>=85?["Strong performance","Review missed items and confirm the result on another form."]:p>=70?["Developing readiness","Practice the lowest skills before another comprehensive test."]:p>=55?["Important gaps remain","Work through targeted quizzes systematically."]:["Foundational review recommended","Rebuild the weakest skills before another full test."];}

function totalDisplay(r){
  if(r.hasEcr&&r.ecrScore==null)return {pct:r.objectivePercent,sub:`Objective section: ${r.earned}/${r.possible} • ECR pending`};
  const earned=r.earned+(r.ecrScore||0),possible=r.possible+(r.hasEcr?10:0),pct=possible?Math.round(100*earned/possible):0;
  return {pct,sub:`${earned}/${possible} raw points`};
}
function renderResults(){
  const r=state.result;if(!r)return doNavigate("progress");
  const display=totalDisplay(r),[title,note]=band(display.pct),weak=r.skillStats.slice(0,4);
  const reviewItems=r.items.map((q,i)=>({q,i,earned:q.type==="ecr"?null:scoreObjective(q,r.answers[i])})).filter(x=>state.reviewFilter==="all"||x.q.type==="ecr"||x.earned<x.q.points);
  main.innerHTML=`<section class="results-header"><div class="results-inner"><p class="eyebrow">Diagnostic report</p><h1>${esc(r.label)}</h1><div class="score-hero"><div class="score-circle" style="--pct:${display.pct}%"><div><strong>${display.pct}%</strong><small>${display.sub}</small></div></div><div><h2>${title}</h2><p>${note}</p><p><strong>Time:</strong> ${timeString(r.durationSeconds)}</p></div></div><div class="results-actions"><button class="primary-button" data-action="skills">Practice weak skills</button><button class="secondary-button" data-action="print">Print report</button><button class="ghost-button" data-action="home">Home</button></div></div></section>
  <section class="content-wrap">
    <div class="notice"><strong>Diagnostic only:</strong> This raw score is not an official STAAR scale score or performance-level prediction.</div>
    ${r.skillStats.length?`<section class="panel"><h2>Performance by specific skill</h2><table class="domain-table"><thead><tr><th>Skill</th><th>Performance</th><th>Raw score</th><th>Practice</th></tr></thead><tbody>${r.skillStats.map((s,i)=>`<tr><td class="${i<3?"weak":""}">${esc(s.label)}${i<3?" — priority":""}</td><td><div class="bar"><span style="width:${s.percent}%"></span></div></td><td>${s.earned}/${s.possible} (${s.percent}%)</td><td><button class="secondary-button" data-action="jump-skill" data-skill="${s.id}">Practice</button></td></tr>`).join("")}</tbody></table></section>`:""}
    ${weak.length?`<section class="panel"><h2>Recommended next practice</h2><div class="card-grid">${weak.map((s,i)=>`<article class="skill-card"><span class="chip">Priority ${i+1}</span><h3>${esc(s.label)}</h3><p>${esc(D.skills[s.id].desc)}</p><button class="primary-button" data-action="start-skill-random" data-skill="${s.id}">Start targeted quiz</button></article>`).join("")}</div></section>`:""}
    ${r.hasEcr?renderEcrScoring(r):""}
    <section><div class="section-heading"><h2>Answer review and explanations</h2><p>Open passages as needed and study why each answer is correct.</p></div><div class="button-row" style="margin-bottom:1rem"><button class="${state.reviewFilter==="all"?"primary-button":"secondary-button"}" data-action="review-filter" data-filter="all">All items</button><button class="${state.reviewFilter==="missed"?"primary-button":"secondary-button"}" data-action="review-filter" data-filter="missed">Missed only</button></div><div class="review-list">${reviewItems.map(({q,i,earned})=>reviewHtml(q,i,r.answers[i],earned)).join("")||`<div class="empty-state">No missed objective items.</div>`}</div></section>
  </section>`;
}
function renderEcrScoring(r){
  const eIndex=r.items.findIndex(x=>x.type==="ecr"),q=r.items[eIndex],answer=r.answers[eIndex]||"",t=r.ecrTraits||{};
  return `<section class="panel"><h2>Self-score the extended response</h2><p>Use the two rubric dimensions below. The five-point score is doubled to a 10-point value in the full-test total.</p>
    <details><summary>Review your response (${wordCount(answer)} words)</summary>${passageHtml(q.passageIds,true)}<div class="explanation">${esc(answer)||"<em>No response was entered.</em>"}</div></details>
    <div class="rubric-grid" style="margin-top:1rem">${["development","conventions"].map(dim=>{const rr=D.rubric[dim];return `<article class="rubric-card"><h3>${esc(rr.label)}</h3><div class="rubric-options">${Array.from({length:rr.max+1},(_,n)=>`<button class="rubric-score ${t[dim]===n?"selected":""}" data-action="score-rubric" data-dimension="${dim}" data-score="${n}">${n}</button>`).join("")}</div><ul class="rubric-levels">${rr.levels.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></article>`}).join("")}</div>
    <div class="notice ${r.ecrScore!=null?"success-notice":""}"><strong>${r.ecrScore!=null?`ECR score: ${r.ecrScore}/10`:"Select one score in each dimension."}</strong>${r.ecrScore!=null?" The overall result above now includes the response.":""}</div>
  </section>`;
}
function answerText(q,a){
  if(q.type==="single")return a==null?"No answer":`${"ABCD"[a]}. ${q.choices[a]}`;
  if(q.type==="multi")return !a?.length?"No answer":a.map(i=>`${"ABCD"[i]}. ${q.choices[i]}`).join("; ");
  return esc(a||"No response");
}
function correctText(q){return q.answerIndexes.map(i=>`${"ABCD"[i]}. ${q.choices[i]}`).join("; ");}
function reviewHtml(q,i,a,earned){
  if(q.type==="ecr")return `<article class="review-item ${String(a||"").trim()?"correct":"unanswered"}"><h3>Item ${i+1} • Extended Constructed Response</h3><details><summary>Show source passage(s)</summary>${passageHtml(q.passageIds,true)}</details><div class="question-prompt">${q.prompt}</div><div class="explanation"><strong>Your response:</strong><br>${esc(a||"No response").replace(/\n/g,"<br>")}</div><p>Use the self-scoring rubric above. There is no single model answer; strong responses develop a clear idea or claim, use relevant evidence, explain the evidence, organize logically, and control conventions.</p></article>`;
  const status=!isAnswered(q,a)?"unanswered":earned===q.points?"correct":"incorrect";
  return `<article class="review-item ${status}"><h3>Item ${i+1} • ${esc(D.skills[q.skill].label)} • ${earned}/${q.points} points</h3>${q.passageIds.length?`<details><summary>Show passage(s)</summary>${passageHtml(q.passageIds,true)}</details>`:""}${q.stimulus?`<div class="stimulus-box">${q.stimulus}</div>`:""}<div class="question-prompt">${q.prompt}</div><p class="answer-line"><strong>Your answer:</strong> ${answerText(q,a)}</p><p class="answer-line"><strong>Correct answer${q.answerIndexes.length>1?"s":""}:</strong> ${correctText(q)}</p><div class="explanation"><strong>Explanation:</strong> ${q.explanation}</div></article>`;
}

function renderProgress(){
  const a=results(),m=masteryMap();
  main.innerHTML=`<section class="content-wrap">${breadcrumbs("Progress")}
    <div class="section-heading"><p class="eyebrow">Stored on this device</p><h1>Progress and Skill History</h1><p>Results remain in this browser. Clearing browser storage or using another device will not carry the history over.</p></div>
    <div class="stat-grid"><article class="panel"><h2>${a.length}</h2><p>completed activities</p></article><article class="panel"><h2>${skillEntries.filter(([id])=>m[id].percent!=null).length}/${skillEntries.length}</h2><p>skills attempted</p></article></div>
    <section class="panel"><div style="display:flex;justify-content:space-between;gap:1rem;align-items:center"><h2>Skill mastery</h2><button class="secondary-button" data-action="skills">Open skill practice</button></div><div class="mastery-grid">${skillEntries.map(([id,s])=>`<div class="mastery-item"><strong>${esc(s.label)}</strong>${skillBadge(m[id])}<span>${m[id].possible?`${m[id].earned}/${m[id].possible} points across ${m[id].attempts} activities`:"No score data yet"}</span></div>`).join("")}</div></section>
    <section class="panel"><div style="display:flex;justify-content:space-between;gap:1rem;align-items:center"><h2>Activity history</h2>${a.length?`<button class="danger-button" data-action="clear-progress">Clear history</button>`:""}</div>${a.length?`<div class="progress-list">${a.map(r=>`<div class="progress-row"><div><strong>${esc(r.label)}</strong><br><small>${esc(r.mode)}</small></div><strong>${r.percent}%</strong><time>${new Date(r.completedAt).toLocaleDateString()}</time></div>`).join("")}</div>`:`<div class="empty-state">No completed activities yet.</div>`}</section>
  </section>`;
}

function chooseSingle(i){const z=state.quiz,q=z?.items[z.current];if(!z||q.type!=="single")return;z.answers[z.current]=i;renderQuiz();}
function toggleMulti(i){const z=state.quiz,q=z?.items[z.current];if(!z||q.type!=="multi")return;const a=z.answers[z.current]||[],pos=a.indexOf(i);if(pos>=0)a.splice(pos,1);else a.push(i);z.answers[z.current]=a.sort((x,y)=>x-y);renderQuiz();}
function updateRubric(dim,score){
  const r=state.result;if(!r)return;r.ecrTraits={...(r.ecrTraits||{}),[dim]:score};
  if(Number.isInteger(r.ecrTraits.development)&&Number.isInteger(r.ecrTraits.conventions)){
    r.ecrScore=(r.ecrTraits.development+r.ecrTraits.conventions)*2;
    const total=r.earned+r.ecrScore,max=r.possible+10;r.percent=Math.round(100*total/max);
    const q=r.items.find(x=>x.type==="ecr"),sid=q?.skill;
    if(sid){const stat={id:sid,label:D.skills[sid].label,earned:r.ecrScore,possible:10,percent:r.ecrScore*10};const i=r.skillStats.findIndex(x=>x.id===sid);if(i>=0)r.skillStats[i]=stat;else r.skillStats.push(stat);r.skillStats.sort((a,b)=>a.percent-b.percent||a.label.localeCompare(b.label));}
  }
  persistResult(r);renderResults();
}
function jumpSkill(id){state.view="skills";state.result=null;renderSkills();setTimeout(()=>document.getElementById(`skill-${id}`)?.scrollIntoView({behavior:"smooth",block:"center"}),50);}

document.addEventListener("click",e=>{
  const b=e.target.closest("[data-action]");if(!b)return;const a=b.dataset.action;
  if(a==="toggle-nav"){state.navOpen=!state.navOpen;document.querySelector(".main-nav")?.classList.toggle("open",state.navOpen);return;}
  if(a==="home")navigate("home");
  else if(a==="full-tests")navigate("full");
  else if(a==="skills")navigate("skills");
  else if(a==="progress")navigate("progress");
  else if(a==="about")navigate("about");
  else if(a==="start-full")startBuilt(buildFull(b.dataset.form,`form-${b.dataset.form}`));
  else if(a==="start-random-full"){const seed=`random-${Date.now()}-${Math.random()}`,r=rngFrom(seed),f=D.forms[Math.floor(r()*D.forms.length)];startBuilt(buildFull(f.id,seed,"Random Full Practice Form"));}
  else if(a==="start-skill")startBuilt(buildSkill(b.dataset.skill,Number(b.dataset.version),false));
  else if(a==="start-skill-random")startBuilt(buildSkill(b.dataset.skill,1,true));
  else if(a==="jump-skill")jumpSkill(b.dataset.skill);
  else if(a==="choose-single")chooseSingle(Number(b.dataset.choice));
  else if(a==="toggle-multi")toggleMulti(Number(b.dataset.choice));
  else if(a==="prev"){state.quiz.current=Math.max(0,state.quiz.current-1);renderQuiz();}
  else if(a==="next"){state.quiz.current=Math.min(state.quiz.items.length-1,state.quiz.current+1);renderQuiz();}
  else if(a==="goto"){state.quiz.current=Number(b.dataset.index);renderQuiz();}
  else if(a==="flag"){state.quiz.flags[state.quiz.current]=!state.quiz.flags[state.quiz.current];renderQuiz();}
  else if(a==="submit")submitQuiz(false);
  else if(a==="exit-quiz")navigate("home");
  else if(a==="review-filter"){state.reviewFilter=b.dataset.filter;renderResults();}
  else if(a==="score-rubric")updateRubric(b.dataset.dimension,Number(b.dataset.score));
  else if(a==="print")window.print();
  else if(a==="clear-progress"){if(confirm("Clear all score history from this browser?")){writeResults([]);renderProgress();}}
});
document.addEventListener("keydown",e=>{
  if(!state.quiz)return;const q=state.quiz.items[state.quiz.current];
  if(q.type==="single"&&["1","2","3","4"].includes(e.key))chooseSingle(Number(e.key)-1);
  else if(e.key==="ArrowRight"&&state.quiz.current<state.quiz.items.length-1){state.quiz.current++;renderQuiz();}
  else if(e.key==="ArrowLeft"&&state.quiz.current>0){state.quiz.current--;renderQuiz();}
});
window.addEventListener("beforeunload",e=>{if(state.quiz){e.preventDefault();e.returnValue="";}});
render();
})();
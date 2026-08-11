(function () {
  "use strict";

  const D = window.MathQuizData;
  const main = document.getElementById("main");
  const dialog = document.getElementById("confirm-dialog");
  const STORAGE_KEY = "mathDiagnosticResults.v1";

  const state = {
    view: "home",
    examId: null,
    quiz: null,
    result: null,
    timerId: null,
    reviewFilter: "all"
  };

  function escapeText(value) {
    return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[ch]));
  }

  function loadResults() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  }
  function saveResults(results) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results.slice(0,100)));
  }
  function recordResult(result) {
    const all = loadResults();
    all.unshift({
      id: result.id,
      examId: result.examId,
      examTitle: result.examTitle,
      mode: result.mode,
      label: result.label,
      correct: result.correct,
      total: result.total,
      percent: result.percent,
      completedAt: result.completedAt,
      durationSeconds: result.durationSeconds,
      categoryStats: result.categoryStats.map(x => ({id:x.id,label:x.label,correct:x.correct,total:x.total,percent:x.percent}))
    });
    saveResults(all);
  }

  const categoryIds = [...new Set(Object.values(D.exams).flatMap(e => e.categories || []))];
  function masteryMap() {
    const agg={}; categoryIds.forEach(id=>agg[id]={correct:0,total:0,attempts:0});
    for(const r of loadResults()) for(const s of (r.categoryStats||[])) if(agg[s.id]) { agg[s.id].correct+=Number(s.correct)||0; agg[s.id].total+=Number(s.total)||0; agg[s.id].attempts++; }
    Object.values(agg).forEach(x=>x.percent=x.total?Math.round(100*x.correct/x.total):null); return agg;
  }
  function masteryBadge(x) {
    if(!x || x.percent==null) return `<span class="mastery-badge unseen">Not attempted</span>`;
    const cls=x.percent<60?"weak":x.percent<80?"developing":"strong", label=x.percent<60?"Needs attention":x.percent<80?"Developing":"Strong";
    return `<span class="mastery-badge ${cls}">${label} • ${x.percent}%</span>`;
  }
  function cumulativeWeaknesses(m) { return Object.entries(m).filter(([,x])=>x.percent!=null).sort((a,b)=>a[1].percent-b[1].percent||D.categories[a[0]].label.localeCompare(D.categories[b[0]].label)); }
  function examForCategory(id) { return Object.values(D.exams).find(e=>(e.categories||[]).includes(id)); }

  function clearTimer() {
    if (state.timerId) window.clearInterval(state.timerId);
    state.timerId = null;
  }

  function navigate(view, payload = {}) {
    if (state.quiz && view !== "quiz" && !state.result) {
      askLeave(() => doNavigate(view, payload));
      return;
    }
    doNavigate(view, payload);
  }
  function doNavigate(view, payload={}) {
    clearTimer();
    state.view = view;
    state.examId = payload.examId ?? state.examId;
    if (view !== "quiz") state.quiz = null;
    if (view !== "results") state.result = null;
    window.scrollTo({top:0,behavior:"instant"});
    render();
  }

  function askLeave(onConfirm) {
    if (!dialog || typeof dialog.showModal !== "function") {
      if (window.confirm("Leave this quiz? Your current answers will be lost.")) onConfirm();
      return;
    }
    dialog.showModal();
    const handler = () => {
      dialog.removeEventListener("close", handler);
      if (dialog.returnValue === "confirm") onConfirm();
    };
    dialog.addEventListener("close", handler);
  }

  let mathTypesetQueue = Promise.resolve();
  function typesetMath() {
    const mj = window.MathJax;
    if (!mj) return;
    const ready = mj.startup && mj.startup.promise ? mj.startup.promise : Promise.resolve();
    mathTypesetQueue = mathTypesetQueue
      .then(() => ready)
      .then(() => typeof mj.typesetPromise === "function" ? mj.typesetPromise([main]) : undefined)
      .catch(err => console.warn("MathJax typesetting error", err));
  }

  function render() {
    if (state.view === "home") renderHome();
    else if (state.view === "exam") renderExam(state.examId);
    else if (state.view === "group") renderGroup(state.examId);
    else if (state.view === "quiz") renderQuiz();
    else if (state.view === "results") renderResults();
    else if (state.view === "progress") renderProgress();
    else if (state.view === "about") renderAbout();
    main.focus({preventScroll:true});
    if (state.view !== "quiz" && state.view !== "results") typesetMath();
  }

  function examCard(exam) {
    return `<article class="exam-card">
      <div class="card-kicker">${escapeText(exam.family)} • ${escapeText(exam.code)}</div>
      <h3>${escapeText(exam.title)}</h3>
      <p>${escapeText(exam.description)}</p>
      <div class="exam-meta">
        ${exam.fullCount ? `<span class="chip">${exam.fullCount}-question forms</span>` : `<span class="chip">3 math subtests</span>`}
        <span class="chip">Detailed explanations</span>
        <span class="chip">Weakness report</span>
      </div>
      <button class="primary-button" data-action="open-${exam.children ? "group" : "exam"}" data-exam="${exam.id}">Open practice center</button>
    </article>`;
  }

  function renderHome() {
    const saved=loadResults(), mastery=masteryMap(), attempted=Object.values(mastery).filter(x=>x.percent!=null).length, priority=cumulativeWeaknesses(mastery).filter(([,x])=>x.percent<60).length;
    const cards = [D.exams.ec6,D.exams.core48,D.exams.math48,D.examGroups.accu].map(examCard).join("");
    main.innerHTML = `<section class="hero">
      <div class="hero-inner">
        <p class="eyebrow">Mathematics preparation</p>
        <h1>Find the gaps. Practice the skills. Understand every answer.</h1>
        <p>Original diagnostic and practice quizzes for three Texas teacher-certification mathematics tests and the three ACCUPLACER mathematics subtests. Every question includes a worked explanation, and every full test produces a skill-by-skill report.</p>
        <div class="hero-note"><span aria-hidden="true">✓</span> Mathematical content only—no pedagogy questions</div>
      </div>
    </section>
    <section class="content-wrap">
      <div class="section-heading"><h2>Choose an exam</h2><p>Start with a full diagnostic or practice one skill area at a time.</p></div>
      <div class="exam-grid">${cards}</div>
      <section class="panel progress-snapshot" style="margin-top:1.5rem">
        <div class="section-heading"><div><h2>Progress and weaknesses</h2><p>Cumulative performance from completed activities on this browser.</p></div><button class="secondary-button" data-action="progress">View progress</button></div>
        <div class="progress-summary-grid"><div><strong>${saved.length}</strong><span>activities completed</span></div><div><strong>${attempted}/${categoryIds.length}</strong><span>areas attempted</span></div><div><strong>${priority}</strong><span>areas needing attention</span></div></div>
      </section>
      <section class="panel" style="margin-top:1.5rem">
        <h2>How to use the site</h2>
        <div class="card-grid">
          <div><h3>1. Diagnose</h3><p>Take Form A without notes. The report ranks every content area from weakest to strongest.</p></div>
          <div><h3>2. Target</h3><p>Complete several versions of quizzes in the lowest-scoring areas and read every explanation.</p></div>
          <div><h3>3. Verify</h3><p>Take a different full form. Compare the new domain profile with your earlier result.</p></div>
        </div>
      </section>
    </section>`;
  }

  function breadcrumbs(label) {
    return `<div class="breadcrumbs"><button data-action="home">Home</button> <span aria-hidden="true">›</span> ${escapeText(label)}</div>`;
  }

  function renderGroup(groupId) {
    const group = D.examGroups[groupId];
    if (!group) return doNavigate("home");
    const children = group.children.map(id => D.exams[id]);
    main.innerHTML = `<section class="content-wrap">
      ${breadcrumbs(group.title)}
      <div class="exam-detail-header">
        <div><p class="eyebrow">${escapeText(group.family)} • ${escapeText(group.code)}</p><h1>${escapeText(group.title)}</h1><p>${escapeText(group.description)}</p></div>
      </div>
      <div class="notice"><strong>Practice-test limitation:</strong> the real ACCUPLACER math tests are computer-adaptive and generally untimed. These are fixed-form diagnostics and do not produce official 200–300 scaled scores.</div>
      <div class="exam-grid">${children.map(examCard).join("")}</div>
      <section class="panel" style="margin-top:1.2rem">
        <h2>Suggested sequence</h2>
        <p>Begin with Arithmetic if foundational computation is uncertain. Continue to QAS for college-readiness algebra, statistics, probability, and geometry. Use AAF for placement into courses requiring stronger algebra and functions.</p>
      </section>
    </section>`;
  }

  function formButtons(exam) {
    return Array.from({length:exam.forms},(_,i)=>{
      const letter=String.fromCharCode(65+i);
      return `<button class="form-button" data-action="start-full" data-exam="${exam.id}" data-seed="form-${letter}">
        <strong>Form ${letter}</strong><small>${exam.fullCount} questions${exam.duration?` • ${formatMinutes(exam.duration)}`:" • untimed"}</small>
      </button>`;
    }).join("") + `<button class="form-button" data-action="start-full" data-exam="${exam.id}" data-seed="random-${Date.now()}"><strong>Random form</strong><small>New generated version</small></button>`;
  }

  function topicCard(exam, categoryId, mastery) {
    const cat=D.categories[categoryId], stat=mastery?.[categoryId];
    const buttons=Array.from({length:exam.topicVersions},(_,i)=>`<button class="secondary-button" data-action="start-topic" data-exam="${exam.id}" data-topic="${cat.id}" data-seed="topic-${i+1}">Version ${i+1}</button>`).join("");
    return `<article class="topic-card">
      ${cat.group?`<span class="chip">${escapeText(cat.group)}</span>`:""}
      <div class="topic-title-row"><h3>${escapeText(cat.label)}</h3>${masteryBadge(stat)}</div>
      <p>${escapeText(cat.description)}</p>
      ${stat?.total?`<div class="topic-mastery-detail">${stat.correct}/${stat.total} cumulative correct across ${stat.attempts} activities</div>`:""}
      <div class="topic-actions">${buttons}<button class="ghost-button" data-action="start-topic" data-exam="${exam.id}" data-topic="${cat.id}" data-seed="random-${Date.now()}-${cat.id}">Random</button></div>
    </article>`;
  }

  function renderExam(examId) {
    const exam=D.exams[examId];
    const mastery=masteryMap();
    if(!exam) return doNavigate("home");
    const back = exam.family === "ACCUPLACER" ? `<button data-action="open-group" data-exam="accu">ACCUPLACER Mathematics</button>` : `<button data-action="home">Home</button>`;
    main.innerHTML=`<section class="content-wrap">
      <div class="breadcrumbs">${back} <span aria-hidden="true">›</span> ${escapeText(exam.shortTitle)}</div>
      <div class="exam-detail-header">
        <div><p class="eyebrow">${escapeText(exam.family)} • ${escapeText(exam.code)}</p><h1>${escapeText(exam.title)}</h1><p>${escapeText(exam.description)}</p></div>
        <span class="chip">${exam.categories.length} reporting areas</span>
      </div>
      <div class="notice">${escapeText(exam.note)}</div>
      <section class="panel">
        <h2>Full diagnostic and practice forms</h2>
        <p>Submit the form to receive an overall score, a ranked content-area report, and explanations for every question.</p>
        <div class="form-list">${formButtons(exam)}</div>
      </section>
      <section>
        <div class="section-heading"><h2>Practice by component area</h2><p>Each version contains ${exam.topicCount} generated questions. Repeating a version preserves its seed; “Random” produces a new set.</p></div>
        <div class="topic-grid">${exam.categories.map(id=>topicCard(exam,id,mastery)).join("")}</div>
      </section>
    </section>`;
  }

  function formatMinutes(minutes) {
    if(minutes<60) return `${minutes} min`;
    const h=Math.floor(minutes/60), m=minutes%60;
    return `${h} hr${h===1?"":"s"}${m?` ${m} min`:""}`;
  }

  function startQuiz({examId,mode,seed,topicId=null}) {
    const exam=D.exams[examId];
    const questions=mode==="full"?D.generateFullExam(examId,`${examId}:${seed}`):D.generateTopicQuiz(examId,topicId,`${examId}:${topicId}:${seed}`);
    const label=mode==="full"?(seed.startsWith("form-")?`Form ${seed.slice(-1)}`:"Random full form"):`${D.categories[topicId].label} — ${seed.startsWith("topic-")?`Version ${seed.slice(-1)}`:"Random version"}`;
    state.quiz={
      examId,exam,mode,seed,topicId,label,questions,
      answers:Array(questions.length).fill(null),flags:Array(questions.length).fill(false),current:0,
      startedAt:Date.now(),elapsedSeconds:0,
      remainingSeconds:mode==="full"&&exam.duration?exam.duration*60:null
    };
    state.result=null;
    state.view="quiz";
    window.scrollTo(0,0);
    renderQuiz();
    startTimer();
  }

  function startTimer() {
    clearTimer();
    state.timerId=window.setInterval(()=>{
      if(!state.quiz) return clearTimer();
      state.quiz.elapsedSeconds=Math.floor((Date.now()-state.quiz.startedAt)/1000);
      if(state.quiz.remainingSeconds!==null){
        state.quiz.remainingSeconds=Math.max(0,state.quiz.exam.duration*60-state.quiz.elapsedSeconds);
        if(state.quiz.remainingSeconds===0){ clearTimer(); submitQuiz(true); return; }
      }
      updateTimerDisplay();
    },1000);
  }

  function timeString(seconds) {
    seconds=Math.max(0,seconds||0);
    const h=Math.floor(seconds/3600),m=Math.floor((seconds%3600)/60),s=seconds%60;
    return h?`${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${m}:${String(s).padStart(2,"0")}`;
  }
  function updateTimerDisplay() {
    const el=document.getElementById("quiz-timer");
    if(!el||!state.quiz) return;
    const seconds=state.quiz.remainingSeconds!==null?state.quiz.remainingSeconds:state.quiz.elapsedSeconds;
    el.textContent=(state.quiz.remainingSeconds!==null?"Remaining ":"Elapsed ")+timeString(seconds);
    el.classList.toggle("warning",state.quiz.remainingSeconds!==null&&seconds<300);
  }

  function renderQuiz() {
    const qz=state.quiz;
    if(!qz) return doNavigate("home");
    const q=qz.questions[qz.current];
    const answered=qz.answers.filter(x=>x!==null).length;
    const pct=answered/qz.questions.length*100;
    main.innerHTML=`<section class="quiz-shell">
      <div class="quiz-topbar">
        <div class="quiz-title"><h1>${escapeText(qz.exam.shortTitle)} — ${escapeText(qz.label)}</h1><p>${answered} of ${qz.questions.length} answered</p></div>
        <div class="timer" id="quiz-timer" aria-live="polite"></div>
        <button class="secondary-button" data-action="exit-quiz">Exit</button>
      </div>
      <div class="progress-track" aria-label="Quiz progress"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="quiz-layout">
        <article class="question-card">
          <div><span class="question-number">Question ${qz.current+1} of ${qz.questions.length}</span><span class="question-topic">${escapeText(q.categoryLabel)}</span></div>
          <div class="question-prompt">${q.prompt}</div>
          <div class="choice-list" role="radiogroup" aria-label="Answer choices">
            ${q.choices.map((choice,i)=>`<button class="choice-button ${qz.answers[qz.current]===i?"selected":""}" role="radio" aria-checked="${qz.answers[qz.current]===i}" data-action="choose" data-choice="${i}"><span class="choice-letter">${D.LETTERS[i]}</span><span>${choice}</span></button>`).join("")}
          </div>
          <div class="question-actions">
            <div><button class="secondary-button" data-action="prev" ${qz.current===0?"disabled":""}>Previous</button><button class="primary-button" data-action="next">${qz.current===qz.questions.length-1?"Review":"Next"}</button></div>
            <button class="ghost-button flag-button ${qz.flags[qz.current]?"active":""}" data-action="flag">${qz.flags[qz.current]?"⚑ Flagged":"⚐ Flag for review"}</button>
          </div>
        </article>
        <aside class="quiz-nav" aria-label="Question navigation">
          <div class="nav-panel">
            <h2>Questions</h2>
            <div class="question-grid">${qz.questions.map((_,i)=>`<button class="q-nav-button ${qz.answers[i]!==null?"answered":""} ${qz.flags[i]?"flagged":""} ${i===qz.current?"current":""}" data-action="goto" data-index="${i}" aria-label="Question ${i+1}${qz.answers[i]!==null?", answered":""}${qz.flags[i]?", flagged":""}">${i+1}</button>`).join("")}</div>
            <div class="nav-legend"><span><i class="legend-dot answered"></i>Answered</span><span><i class="legend-dot flagged"></i>Flagged</span></div>
            <button class="primary-button submit-button" data-action="submit">Submit quiz</button>
          </div>
        </aside>
      </div>
    </section>`;
    updateTimerDisplay();
    const selected=document.querySelector(".choice-button.selected");
    if(selected) selected.focus({preventScroll:true});
    typesetMath();
  }

  function chooseAnswer(index) {
    state.quiz.answers[state.quiz.current]=index;
    renderQuiz();
  }

  function submitQuiz(forced=false) {
    const qz=state.quiz;
    if(!qz) return;
    const unanswered=qz.answers.filter(x=>x===null).length;
    if(!forced && unanswered && !window.confirm(`${unanswered} question${unanswered===1?" is":"s are"} unanswered. Submit anyway?`)) return;
    clearTimer();
    qz.elapsedSeconds=Math.floor((Date.now()-qz.startedAt)/1000);
    const categoryMap=new Map();
    let correct=0;
    qz.questions.forEach((q,i)=>{
      const isCorrect=qz.answers[i]===q.answer;
      if(isCorrect) correct++;
      if(!categoryMap.has(q.categoryId)) categoryMap.set(q.categoryId,{id:q.categoryId,label:q.categoryLabel,correct:0,total:0});
      const row=categoryMap.get(q.categoryId); row.total++; if(isCorrect) row.correct++;
    });
    const categoryStats=[...categoryMap.values()].map(x=>({...x,percent:Math.round(100*x.correct/x.total)})).sort((a,b)=>a.percent-b.percent||a.label.localeCompare(b.label));
    const result={
      id:`r-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      examId:qz.examId,examTitle:qz.exam.shortTitle,mode:qz.mode,label:qz.label,
      correct,total:qz.questions.length,percent:Math.round(correct/qz.questions.length*100),
      completedAt:new Date().toISOString(),durationSeconds:qz.elapsedSeconds,categoryStats,
      questions:qz.questions,answers:qz.answers.slice()
    };
    state.result=result;
    state.quiz=null;
    state.view="results";
    state.reviewFilter="all";
    recordResult(result);
    window.scrollTo(0,0);
    renderResults();
    typesetMath();
  }

  function diagnosticLabel(percent) {
    if(percent>=85) return ["Strong", "Most sampled skills are secure. Concentrate on isolated errors and speed."];
    if(percent>=70) return ["Developing", "The foundation is present, but several areas need targeted review."];
    return ["Priority review", "Use the lowest-scoring areas below to plan focused practice before another full form."];
  }

  function renderResults() {
    const r=state.result;
    if(!r) return doNavigate("home");
    const [band,bandText]=diagnosticLabel(r.percent);
    const weakest=r.categoryStats.slice(0,Math.min(3,r.categoryStats.length));
    const reviewItems=r.questions.map((q,i)=>({q,i,status:r.answers[i]===null?"unanswered":r.answers[i]===q.answer?"correct":"incorrect"}))
      .filter(x=>state.reviewFilter==="all"||x.status!=="correct");
    main.innerHTML=`<section class="results-header"><div class="results-inner">
      <p class="eyebrow">Diagnostic report</p><h1>${escapeText(r.examTitle)} — ${escapeText(r.label)}</h1>
      <div class="score-hero"><div class="score-circle"><div><strong>${r.percent}%</strong><small>${r.correct}/${r.total}</small></div></div><div><h2>${band}</h2><p>${bandText}</p><p><strong>Time:</strong> ${timeString(r.durationSeconds)}</p></div></div>
      <div class="results-actions"><button class="primary-button" data-action="back-exam" data-exam="${r.examId}">Return to practice center</button><button class="secondary-button" data-action="print">Print report</button></div>
    </div></section>
    <section class="content-wrap">
      <div class="notice"><strong>Important:</strong> This percentage is a practice diagnostic, not an official scaled score or prediction of certification or placement.</div>
      <div class="stat-grid">
        <article class="result-card"><span class="chip">Overall</span><div class="big-number">${r.correct} correct</div><p>${r.total-r.correct} incorrect or unanswered</p></article>
        <article class="result-card"><span class="chip">Weakest sampled area</span><div class="big-number">${escapeText(weakest[0]?.label||"—")}</div><p>${weakest[0]?`${weakest[0].correct}/${weakest[0].total} correct`:"No data"}</p></article>
        <article class="result-card"><span class="chip">Next step</span><div class="big-number">Targeted practice</div><p>Practice the lowest two or three areas before taking another full form.</p></article>
      </div>
      <section class="panel">
        <h2>Performance by content area</h2>
        <table class="domain-table"><thead><tr><th>Area</th><th>Performance</th><th>Score</th></tr></thead><tbody>
          ${r.categoryStats.map((x,i)=>`<tr><td class="${i<2?"weak":""}">${escapeText(x.label)}${i<2?" — priority":""}</td><td><div class="bar" aria-label="${x.percent}%"><span style="width:${x.percent}%"></span></div></td><td>${x.correct}/${x.total} (${x.percent}%)</td></tr>`).join("")}
        </tbody></table>
      </section>
      <section class="panel">
        <h2>Recommended practice</h2>
        <p>${weakest.map((x,i)=>`${i+1}. <strong>${escapeText(x.label)}</strong> (${x.percent}%)`).join(" &nbsp; ")}</p>
        <div class="form-list">${weakest.map((x,i)=>`<button class="form-button" data-action="start-topic" data-exam="${r.examId}" data-topic="${x.id}" data-seed="result-${Date.now()}-${i}"><strong>Practice ${i+1}</strong><small>${escapeText(x.label)}</small></button>`).join("")}</div>
      </section>
      <section>
        <div class="section-heading"><h2>Answer review</h2><p>Each explanation shows the mathematical reasoning, not merely the answer.</p></div>
        <div class="form-list" style="margin-bottom:1rem"><button class="${state.reviewFilter==="all"?"primary-button":"secondary-button"}" data-action="review-filter" data-filter="all">All questions</button><button class="${state.reviewFilter==="missed"?"primary-button":"secondary-button"}" data-action="review-filter" data-filter="missed">Missed and unanswered</button></div>
        <div class="review-list">${reviewItems.map(({q,i,status})=>{
          const user=r.answers[i]===null?"No answer":`${D.LETTERS[r.answers[i]]}. ${q.choices[r.answers[i]]}`;
          const correct=`${D.LETTERS[q.answer]}. ${q.choices[q.answer]}`;
          return `<article class="review-item ${status}"><h3>Question ${i+1} • ${escapeText(q.categoryLabel)}</h3><div>${q.prompt}</div><p class="answer-line"><strong>Your answer:</strong> ${user}</p><p class="answer-line"><strong>Correct answer:</strong> ${correct}</p><div class="explanation"><strong>Explanation:</strong> ${q.explanation}</div></article>`;
        }).join("")||`<div class="empty-state">No missed questions to review.</div>`}</div>
      </section>
    </section>`;
    typesetMath();
  }

  function renderProgress() {
    const results=loadResults(), mastery=masteryMap(), weak=cumulativeWeaknesses(mastery), priority=weak.slice(0,5);
    main.innerHTML=`<section class="content-wrap">${breadcrumbs("My progress")}
      <div class="section-heading"><div><p class="eyebrow">Stored on this device</p><h1>Progress and weakness history</h1><p>Results remain in this browser. Clearing browser storage or using another device will not carry the history over.</p></div></div>
      <div class="progress-summary-grid"><div><strong>${results.length}</strong><span>activities completed</span></div><div><strong>${weak.length}/${categoryIds.length}</strong><span>areas attempted</span></div><div><strong>${weak.filter(([,x])=>x.percent>=80).length}</strong><span>areas currently strong</span></div></div>
      ${priority.length?`<section class="panel"><h2>Cumulative priorities</h2><p>Lowest performance across all saved attempts.</p><div class="priority-grid">${priority.map(([id,x])=>{const e=examForCategory(id);return `<div class="priority-item"><div><strong>${escapeText(D.categories[id].label)}</strong>${masteryBadge(x)}<small>${x.correct}/${x.total} correct across ${x.attempts} activities</small></div>${e?`<button class="secondary-button" data-action="start-topic" data-exam="${e.id}" data-topic="${id}" data-seed="progress-${Date.now()}-${id}">Practice</button>`:""}</div>`;}).join("")}</div></section>`:""}
      <section class="panel"><div class="section-heading"><div><h2>Area mastery</h2><p>All saved questions are combined by reporting area.</p></div></div><div class="mastery-grid">${categoryIds.map(id=>`<div class="mastery-item"><strong>${escapeText(D.categories[id].label)}</strong>${masteryBadge(mastery[id])}<span>${mastery[id].total?`${mastery[id].correct}/${mastery[id].total} correct across ${mastery[id].attempts} activities`:"No score data yet"}</span></div>`).join("")}</div></section>
      <section class="panel">
        <div style="display:flex;justify-content:space-between;gap:1rem;align-items:center"><h2>Activity history</h2>${results.length?`<button class="danger-button" data-action="clear-progress">Clear history</button>`:""}</div>
        ${results.length?`<div class="progress-list">${results.map(r=>`<div class="progress-row"><div><strong>${escapeText(r.examTitle)}</strong><br><small>${escapeText(r.label)} • ${escapeText(r.mode)}</small></div><strong>${r.percent}%</strong><time datetime="${r.completedAt}">${new Date(r.completedAt).toLocaleDateString()}</time></div>`).join("")}</div>`:`<div class="empty-state">No completed quizzes yet.</div>`}
      </section>
    </section>`;
  }

  function renderAbout() {
    main.innerHTML=`<section class="content-wrap">${breadcrumbs("About")}
      <div class="section-heading"><h1>About this practice site</h1><p>Design, alignment, limitations, and official references.</p></div>
      <section class="panel"><h2>Question design</h2><p>All questions on this site are newly written, parameterized items. Published sample questions were used only to understand scope, style, and difficulty; they are not copied into the question bank.</p><p>The site intentionally focuses on mathematical content. It excludes teacher-pedagogy, instruction, and assessment competencies.</p></section>
      <section class="panel"><h2>Official frameworks</h2><ul>
        <li><a href="https://www.tx.nesinc.com/Content/StudyGuide/TX_SG_obj_391.htm" target="_blank" rel="noopener">TExES Core Subjects EC–6 (391), Mathematics 902 framework</a></li>
        <li><a href="https://www.tx.nesinc.com/Content/StudyGuide/TX_SG_obj_211_2021.htm" target="_blank" rel="noopener">TExES Core Subjects 4–8 (211), Mathematics 807 framework</a></li>
        <li><a href="https://www.tx.nesinc.com/Content/StudyGuide/TX_SG_obj_115.htm" target="_blank" rel="noopener">TExES Mathematics 4–8 (115) framework</a></li>
        <li><a href="https://accuplacer.collegeboard.org/students/prepare-for-accuplacer/whats-on-tests" target="_blank" rel="noopener">ACCUPLACER: What's on the Tests</a></li>
        <li><a href="https://accuplacer.collegeboard.org/students/prepare-for-accuplacer/practice-download" target="_blank" rel="noopener">Official ACCUPLACER sample-question downloads</a></li>
      </ul></section>
      <section class="panel"><h2>Scoring limitations</h2><p>The practice percentages are raw scores. TExES reports scaled scores, and ACCUPLACER uses a computer-adaptive 200–300 scale. This independent site cannot reproduce either scoring model, so its results should guide study rather than predict an official result.</p></section>
      <section class="panel"><h2>Privacy and technical design</h2><p>The site runs entirely in the browser. It sends no answers to a server. Completed-score history is stored in local storage and can be cleared from “My progress.” The files can be hosted on any ordinary static web server.</p></section>
    </section>`;
  }

  document.addEventListener("click", event => {
    const button=event.target.closest("[data-action]");
    if(!button) return;
    const action=button.dataset.action;
    if(action==="home") navigate("home",{examId:null});
    else if(action==="progress") navigate("progress");
    else if(action==="about") navigate("about");
    else if(action==="open-exam") navigate("exam",{examId:button.dataset.exam});
    else if(action==="open-group") navigate("group",{examId:button.dataset.exam});
    else if(action==="back-exam") doNavigate("exam",{examId:button.dataset.exam});
    else if(action==="start-full") startQuiz({examId:button.dataset.exam,mode:"full",seed:button.dataset.seed});
    else if(action==="start-topic") startQuiz({examId:button.dataset.exam,mode:"topic",topicId:button.dataset.topic,seed:button.dataset.seed});
    else if(action==="choose") chooseAnswer(Number(button.dataset.choice));
    else if(action==="prev") { state.quiz.current=Math.max(0,state.quiz.current-1); renderQuiz(); }
    else if(action==="next") { state.quiz.current=Math.min(state.quiz.questions.length-1,state.quiz.current+1); renderQuiz(); }
    else if(action==="goto") { state.quiz.current=Number(button.dataset.index); renderQuiz(); }
    else if(action==="flag") { state.quiz.flags[state.quiz.current]=!state.quiz.flags[state.quiz.current]; renderQuiz(); }
    else if(action==="submit") submitQuiz(false);
    else if(action==="exit-quiz") navigate("exam",{examId:state.quiz.examId});
    else if(action==="review-filter") { state.reviewFilter=button.dataset.filter; renderResults(); }
    else if(action==="print") window.print();
    else if(action==="clear-progress") { if(window.confirm("Clear all saved score history from this browser?")){ saveResults([]); renderProgress(); } }
  });

  document.querySelector(".brand")?.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();navigate("home",{examId:null});}});
  window.addEventListener("beforeunload",e=>{if(state.quiz){e.preventDefault();e.returnValue="";}});
  document.addEventListener("keydown",e=>{
    if(!state.quiz) return;
    if(["1","2","3","4"].includes(e.key)){ chooseAnswer(Number(e.key)-1); }
    else if(e.key==="ArrowRight"&&state.quiz.current<state.quiz.questions.length-1){state.quiz.current++;renderQuiz();}
    else if(e.key==="ArrowLeft"&&state.quiz.current>0){state.quiz.current--;renderQuiz();}
  });

  render();
})();

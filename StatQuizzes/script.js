// ------------------------------
// Utility helpers
// ------------------------------
function shuffle(array) {
  let a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isVoid(x) { return x === undefined || x === null || x === ''; }

function prefixImageSrc(html, prefix) {
  if (isVoid(prefix)) return html;
  const doc = new DOMParser().parseFromString('<div>' + html + '</div>', 'text/html');
  doc.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src') || '';
    img.setAttribute('src', prefix + src);
  });
  return doc.body.firstChild.innerHTML;
}

// ------------------------------
// Registry of question cards
// ------------------------------
const registry = {
  cards: new Set(), // DOM elements for each question
};

// ------------------------------
// Mega block creation (single large quiz block)
// ------------------------------
function getOrCreateMegaBlock() {
  let mega = document.getElementById('mega-block');
  if (!mega) {
    mega = document.createElement('div');
    mega.id = 'mega-block';
    mega.className = 'block';

    // Header (no "Quiz" title text per request)
    const header = document.createElement('div');
    header.className = 'block-title';

    const title = document.createElement('div');
    title.textContent = ''; // intentionally blank

    const headerButtons = document.createElement('div');
    const checkAllTop = document.createElement('button');
    checkAllTop.className = 'primary';
    checkAllTop.textContent = 'Check All';
    checkAllTop.addEventListener('click', checkAll);

    const cryTop = document.createElement('button');
    cryTop.textContent = 'Cry Uncle';
    cryTop.addEventListener('click', cryUncleAll);

    headerButtons.appendChild(checkAllTop);
    headerButtons.appendChild(cryTop);
    header.appendChild(title);
    header.appendChild(headerButtons);

    const container = document.createElement('div');
    container.className = 'block-questions';
    container.id = 'mega-block-questions';

    // Footer toolbar
    const footerToolbar = document.createElement('div');
    footerToolbar.className = 'toolbar';

    const checkAllBottom = document.createElement('button');
    checkAllBottom.className = 'primary';
    checkAllBottom.textContent = 'Check All';
    checkAllBottom.addEventListener('click', checkAll);

    const cryBottom = document.createElement('button');
    cryBottom.textContent = 'Cry Uncle';
    cryBottom.addEventListener('click', cryUncleAll);

    footerToolbar.appendChild(checkAllBottom);
    footerToolbar.appendChild(cryBottom);

    mega.appendChild(header);
    mega.appendChild(container);
    mega.appendChild(footerToolbar);

    const root = document.getElementById('blocks');
    root.innerHTML = '';
    root.appendChild(mega);
  }
  return document.getElementById('mega-block-questions');
}

// ------------------------------
// Totals helpers & UI
// ------------------------------
function computeTotals() {
  const cards = Array.from(registry.cards);
  const maxPoints = cards.length * 1.0;
  let totalPoints = 0;
  let completed = 0;
  cards.forEach(c => {
    const pts = Number(c.dataset.points || '0');
    totalPoints += pts;
    if (c.dataset.state === 'disabled') completed += 1;
  });
  const pct = maxPoints > 0 ? (100 * totalPoints / maxPoints) : 0;
  return { totalPoints, maxPoints, pct, completed, total: cards.length };
}

function updateTotalsUI() {
  const { totalPoints, maxPoints, pct } = computeTotals();
  const topDiv = document.getElementById('grand-total-top');
  const bottomDiv = document.getElementById('grand-total');
  if (topDiv) { topDiv.style.display = 'block'; topDiv.textContent = `Total: ${totalPoints.toFixed(3)} / ${maxPoints.toFixed(0)}  (${pct.toFixed(1)}%)`; }
  if (bottomDiv) { bottomDiv.style.display = 'block'; bottomDiv.textContent = `Total: ${totalPoints.toFixed(3)} / ${maxPoints.toFixed(0)}  (${pct.toFixed(1)}%)`; }
}

function showGradeSummaryAlert(prefix='') {
  const { totalPoints, maxPoints, pct, completed, total } = computeTotals();
  const header = prefix ? (prefix + '\n') : '';
  alert(`${header}Grade summary:\n  Score: ${totalPoints.toFixed(3)} / ${maxPoints.toFixed(0)}  (${pct.toFixed(1)}%)\n  Completed: ${completed} of ${total}`);
}

function computeAndShowTotalsIfFinished() {
  const cards = Array.from(registry.cards);
  const remaining = cards.filter(c => c.dataset.state !== 'disabled');
  if (cards.length > 0) {
    updateTotalsUI();
    if (remaining.length === 0) {
      // nothing extra needed here; totals already shown
    }
  }
}

// ------------------------------
// Question card construction
// ------------------------------
function markChoice(li, cls) {
  li.classList.remove('ok', 'bad', 'uncle');
  if (cls) li.classList.add(cls);
}

function disableQuestion(card) {
  card.dataset.state = 'disabled';
  // Disable only the radios and the grading controls
  card.querySelectorAll('input[type=radio]').forEach(inp => inp.disabled = true);
  card.querySelectorAll('.q-check-btn, .q-uncle-btn').forEach(btn => btn.disabled = true);
  card.querySelectorAll('.choice').forEach(li => li.classList.add('disabled'));
}

function createQuestionCard(q, idxWithinBlock, pathToResources) {
  const card = document.createElement('div');
  card.className = 'question-card';
  card.dataset.state = 'active';
  card.dataset.attempts = '0';
  card.dataset.points = '0';

  const k = q.choices.length;
  card.dataset.k = String(k);

  const head = document.createElement('div');
  head.className = 'question-head';

  const indexEl = document.createElement('div');
  indexEl.className = 'question-title';
  indexEl.textContent = 'Question';
  head.appendChild(indexEl);

  const points = document.createElement('div');
  points.innerHTML = 'Points: <span class="points">0.000</span>';
  head.appendChild(points);

  const prompt = document.createElement('div');
  prompt.className = 'prompt';
  prompt.innerHTML = prefixImageSrc(q.prompt_html || '', pathToResources);

  // randomize choices
  const randomizedChoices = shuffle(q.choices.map((c, idx) => ({...c, _origIndex: idx})));

  const choicesList = document.createElement('ul');
  choicesList.className = 'choices';
  const name = (q.ident || ('Q' + Math.random().toString(36).slice(2)));

  randomizedChoices.forEach(choice => {
    const li = document.createElement('li');
    li.className = 'choice';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.value = choice.id;

    const label = document.createElement('label');
    label.style.flex = '1';
    label.innerHTML = prefixImageSrc(choice.html || '', pathToResources);

    input.addEventListener('change', () => {
      li.parentElement.querySelectorAll('.choice').forEach(el => el.classList.remove('selected'));
      li.classList.add('selected');
    });

    li.appendChild(input);
    li.appendChild(label);
    choicesList.appendChild(li);
  });

  const controls = document.createElement('div');
  controls.className = 'question-controls';
  const checkBtn = document.createElement('button');
  checkBtn.className = 'q-check-btn';
  checkBtn.textContent = 'Check';
  const uncleBtn = document.createElement('button');
  uncleBtn.className = 'q-uncle-btn';
  uncleBtn.textContent = 'Uncle';

  controls.appendChild(checkBtn);
  controls.appendChild(uncleBtn);

  
  // Hint & Explanation buttons (inline, conditional visibility)
  const hintBtn = document.createElement('button');
  hintBtn.className = 'q-hint-btn';
  hintBtn.textContent = 'Hint';
  if (!(q && typeof q.hint === 'string' && q.hint.trim().length > 0)) {
    hintBtn.style.display = 'none';
  }
  const explBtn = document.createElement('button');
  explBtn.className = 'q-expl-btn';
  explBtn.textContent = 'Explanation';
  if (!(q && typeof q.explanation === 'string' && q.explanation.trim().length > 0)) {
    explBtn.style.display = 'none';
  }
  controls.appendChild(hintBtn);
  controls.appendChild(explBtn);

  // Toggle handlers
  hintBtn.addEventListener('click', () => {
    if (hintArea.style.display === 'none') {
      const html = (q && typeof q.hint === 'string' && q.hint.trim().length > 0) ? q.hint : 'There is no hint for this question.';
      hintArea.innerHTML = prefixImageSrc(html, pathToResources);
      hintArea.style.display = '';
    } else {
      hintArea.style.display = 'none';
    }
  });
  explBtn.addEventListener('click', () => {
    if (card.dataset.state !== 'disabled') {
      explArea.innerHTML = 'Please complete this question (Check or Uncle) before seeing the explanation.';
      explArea.style.display = '';
      return;
    }
    if (explArea.style.display === 'none') {
      const html = (q && typeof q.explanation === 'string' && q.explanation.trim().length > 0) ? q.explanation : 'There is no explanation for this question.';
      explArea.innerHTML = prefixImageSrc(html, pathToResources);
      explArea.style.display = '';
    } else {
      explArea.style.display = 'none';
    }
  });
const footer = document.createElement('div');
  footer.className = 'footer';
  const leftMeta = document.createElement('div');
  leftMeta.className = 'muted';
  leftMeta.textContent = '';
  const rightMeta = document.createElement('div');
  rightMeta.className = 'muted';
  rightMeta.textContent = '';
  footer.appendChild(leftMeta);
  footer.appendChild(rightMeta);

  card.appendChild(head);
  card.appendChild(prompt);
  card.appendChild(choicesList);
  card.appendChild(controls);
  // Inline areas
  const hintArea = document.createElement('div');
  hintArea.className = 'hint-area';
  hintArea.style.display = 'none';
  const explArea = document.createElement('div');
  explArea.className = 'explanation-area';
  explArea.style.display = 'none';
  card.appendChild(hintArea);
  card.appendChild(explArea);
  card.appendChild(footer);

  // helpers
  function getSelected() {
    const sel = card.querySelector('input[type=radio]:checked');
    return sel;
  }
  function updatePointsDisplay(val) {
    card.dataset.points = String(val);
    card.querySelector('.points').textContent = Number(val).toFixed(3);
  }
  function allDisabledCheck() {
    computeAndShowTotalsIfFinished();
  }

  // events
  checkBtn.addEventListener('click', () => {
    if (card.dataset.state === 'disabled') {
      allDisabledCheck();
      return;
    }
    const sel = getSelected();
    if (!sel) {
      alert('Please select an answer first.');
      return;
    }
    const selectedLi = sel.closest('.choice');
    const k = Number(card.dataset.k);
    const attempts = Number(card.dataset.attempts);

    const selectedId = sel.value;
    const choiceObj = q.choices.find(c => c.id === selectedId) || null;
    const isCorrect = !!(choiceObj && choiceObj.is_correct === true);

    if (isCorrect) {
      const m = attempts; // incorrect attempts so far
      const earned = 1 - (m / k);
      markChoice(selectedLi, 'ok');
      updatePointsDisplay(earned);
      disableQuestion(card);
      allDisabledCheck();
      updateTotalsUI();
    } else {
      markChoice(selectedLi, 'bad');
      sel.disabled = true;
      card.dataset.attempts = String(attempts + 1);
      const newPartial = -(Number(card.dataset.attempts) / k);
      updatePointsDisplay(newPartial);
      alert('Not quite. Try again!');
      updateTotalsUI();
    }
  });

  uncleBtn.addEventListener('click', () => {
    if (card.dataset.state === 'disabled') {
      allDisabledCheck();
      return;
    }
    const correctId = (q.correct_ids && q.correct_ids[0]) || (q.choices.find(c => c.is_correct) || {}).id;
    const correctInput = Array.from(card.querySelectorAll('input[type=radio]')).find(r => r.value === correctId);
    if (correctInput) {
      const li = correctInput.closest('.choice');
      markChoice(li, 'uncle'); // gray style
    }
    updatePointsDisplay(0);
    card.querySelector('.points').classList.add('points-uncle');
    disableQuestion(card);
    allDisabledCheck();
    updateTotalsUI();
  });

  return card;
}

// ------------------------------
// Public API
// ------------------------------
async function addQuestionBlock(pathToJSON, n = 'all', pathToResources = '', orderFlag = ''){
  const blockContainer = getOrCreateMegaBlock();

  let data;
  try {
    const res = await fetch(pathToJSON);
    if (!res.ok) throw new Error('Failed to load JSON: ' + res.status);
    data = await res.json();
  } catch (err) {
    console.error(err);
    alert('Could not load JSON at ' + pathToJSON + '. See console for details.');
    return;
  }

  if (!Array.isArray(data)) {
    alert('JSON format unexpected: top-level array required.');
    return;
  }

  let questions;


let total = data.length;
let k = (n !== null && n !== 'all' && !isNaN(Number(n))) ? Math.min(Number(n), total) : total;
// Build index array
let idxs = Array.from({length: total}, (_, i) => i);
// Shuffle indices
for (let i = idxs.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
}
// Take first k
let picks = idxs.slice(0, k);
// If inOrder, sort the picks
if (orderFlag === 'inOrder' || orderFlag === true || orderFlag === 'true') {
  picks.sort((a, b) => a - b);
}
// Select questions in that order
questions = picks.map(i => data[i]);
questions.forEach((q, i) => {
    q.prompt_html = prefixImageSrc(q.prompt_html || '', pathToResources);
    if (Array.isArray(q.choices)) {
      q.choices = q.choices.map(c => ({
        ...c,
        html: prefixImageSrc(c.html || '', pathToResources)
      }));
    }
    const card = createQuestionCard(q, i, pathToResources);
    registry.cards.add(card);
    blockContainer.appendChild(card);
  });

  renumberQuestions();
  updateTotalsUI();
}

function renumberQuestions() {
  const container = document.getElementById('mega-block-questions');
  if (!container) return;
  const cards = Array.from(container.children);
  cards.forEach((card, idx) => {
    const t = card.querySelector('.question-title');
    if (t) t.textContent = `Question ${idx + 1}`;
  });
}

function checkAll() {
  const cards = Array.from(document.querySelectorAll('.question-card'));
  let anyActive = false;
  let unanswered = [];

  cards.forEach(card => {
    if (card.dataset.state !== 'disabled') {
      anyActive = true;
      const sel = card.querySelector('input[type=radio]:checked');
      const btn = card.querySelector('.question-controls button'); // first = Check
      if (sel) {
        btn.click();
      } else {
        unanswered.push(card);
      }
    }
  });

  if (unanswered.length > 0) {
    const first = unanswered[0];
    first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    first.classList.add('flash-attn');
    setTimeout(() => first.classList.remove('flash-attn'), 900);
    updateTotalsUI();
    showGradeSummaryAlert('Some questions were unanswered.');
  } else if (!anyActive) {
    computeAndShowTotalsIfFinished();
    showGradeSummaryAlert('All questions were already completed.');
  } else {
    updateTotalsUI();
    showGradeSummaryAlert('All answered questions have been checked.');
  }
}

// Randomize all cards in the single mega block and renumber
function randomizeAll() {
  const container = getOrCreateMegaBlock();
  renumberQuestions();
  updateTotalsUI();
}

function cryUncleAll() {
  const cards = Array.from(document.querySelectorAll('.question-card'));
  let acted = false;

  cards.forEach(card => {
    if (card.dataset.state !== 'disabled') {
      const sel = card.querySelector('input[type=radio]:checked');
      const checkBtn = card.querySelector('.question-controls button');      // Check
      const uncleBtn = card.querySelectorAll('.question-controls button')[1]; // Uncle
      if (sel && checkBtn) {
        checkBtn.click();
        acted = true;
      } else if (!sel && uncleBtn) {
        uncleBtn.click();
        acted = true;
      }
    }
  });

  updateTotalsUI();
  if (!acted) {
    computeAndShowTotalsIfFinished();
    showGradeSummaryAlert('Nothing left to do.');
  } else {
    showGradeSummaryAlert('Cry Uncle complete.');
  }
}

// Expose to window
window.addQuestionBlock = addQuestionBlock;
window.randomizeAll = randomizeAll;
window.checkAll = checkAll;
window.cryUncleAll = cryUncleAll;

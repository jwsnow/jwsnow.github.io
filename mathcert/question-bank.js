(function (global) {
  "use strict";

  const LETTERS = ["A", "B", "C", "D"];

  function hashString(text) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    return function () {
      let t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function rngFromSeed(seedText) { return mulberry32(hashString(String(seedText))); }
  function ri(rng, min, max) { return Math.floor(rng() * (max - min + 1)) + min; }
  function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
  function shuffle(rng, arr) {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }
  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a || 1;
  }
  function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }
  function reduce(n, d) {
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d);
    return [n / g, d / g];
  }
  function frac(n, d) {
    const [a, b] = reduce(n, d);
    return b === 1 ? String(a) : `${a}/${b}`;
  }
  function mixed(n, d) {
    const sign = n < 0 ? "−" : "";
    n = Math.abs(n);
    const whole = Math.floor(n / d);
    const rem = n % d;
    if (!rem) return sign + whole;
    return whole ? `${sign}${whole} ${frac(rem, d)}` : sign + frac(rem, d);
  }
  function fmt(n, digits = 4) {
    if (Number.isInteger(n)) return String(n);
    return String(Number(n.toFixed(digits)));
  }
  function money(n) { return `$${n.toFixed(2)}`; }
  function signed(n) { return n >= 0 ? `+ ${n}` : `− ${Math.abs(n)}`; }
  function uniqueStrings(items) {
    const seen = new Set();
    return items.filter(x => {
      const key = String(x);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  const SUP_MAP={"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁻":"-"};
  const SUB_MAP={"₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9","₋":"-"};
  function scriptDigits(seq,map){return [...seq].map(c=>map[c]??c).join("");}
  function legacyMathCore(inner){
    let x=String(inner).trim();
    const matrix=x.match(/^\[\[\s*([^,\]]+)\s*,\s*([^\]]+)\]\s*,\s*\[\s*([^,\]]+)\s*,\s*([^\]]+)\]\]$/);
    if(matrix) return String.raw`\begin{pmatrix}${matrix[1]}&${matrix[2]}\\${matrix[3]}&${matrix[4]}\end{pmatrix}`;
    x=x.replace(/<sup>([\s\S]*?)<\/sup>/gi,(_,v)=>`^{${v}}`).replace(/<sub>([\s\S]*?)<\/sub>/gi,(_,v)=>`_{${v}}`);
    x=x.replace(/([A-Za-z0-9)\]])([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)/g,(_,a,b)=>`${a}^{${scriptDigits(b,SUP_MAP)}}`);
    x=x.replace(/([A-Za-z0-9)\]])([₀₁₂₃₄₅₆₇₈₉₋]+)/g,(_,a,b)=>`${a}_{${scriptDigits(b,SUB_MAP)}}`);
    // Unicode integral bounds such as ∫₀ˣ are converted before replacing the integral sign.
    x=x.replace(/∫([₀₁₂₃₄₅₆₇₈₉₋]+)?([⁰¹²³⁴⁵⁶⁷⁸⁹⁻ˣⁿ]+)?/g,(_,lo='',hi='')=>{
      const supMap={...SUP_MAP,"ˣ":"x","ⁿ":"n"};
      return `\\int${lo?`_{${scriptDigits(lo,SUB_MAP)}}`:''}${hi?`^{${scriptDigits(hi,supMap)}}`:''}`;
    });
    // Conventional radicals: place the entire parenthesized radicand beneath the bar.
    for(let i=0;i<4;i++) x=x.replace(/√\(([^()]*)\)/g,String.raw`\sqrt{$1}`);
    x=x.replace(/√\s*([A-Za-z0-9]+)/g,String.raw`\sqrt{$1}`);
    x=x.replace(/\b(sin|cos|tan|sec|csc|cot|log|ln)\b/g,String.raw`\$1`);
    x=x.replace(/\(mod\s+([^()]+)\)/gi,String.raw`\pmod{$1}`);
    x=x.replace(/([0-9)])°/g,String.raw`$1^{\circ}`);
    x=x.replace(/π/g,String.raw`\pi `).replace(/θ/g,String.raw`\theta `).replace(/∞/g,String.raw`\infty `);
    x=x.replace(/×/g,String.raw`\times `).replace(/÷/g,String.raw`\div `).replace(/·/g,String.raw`\cdot `).replace(/[⋯…]/g,String.raw`\cdots `);
    // Common simple fractions in legacy generators.
    x=x.replace(/(-?\d+|[A-Za-z])\/\(([^()]+)\)/g,String.raw`\frac{$1}{$2}`);
    x=x.replace(/([A-Za-z]+\([^()]+\))\/(-?\d+|[A-Za-z])/g,String.raw`\frac{$1}{$2}`);
    x=x.replace(/(-?\d+|[A-Za-z])\/(-?\d+|[A-Za-z])/g,String.raw`\frac{$1}{$2}`);
    // Clean elementary coefficient notation produced by parameterized legacy items.
    x=x.replace(/(^|[^0-9A-Za-z])1([A-Za-z])/g,'$1$2');
    x=x.replace(/([+\-−]\s*)1([A-Za-z])/g,'$1$2');
    x=x.replace(/\s*(?:\+|−|-)\s*0([A-Za-z])/g,'');
    return x;
  }
  function modernizeLegacyMath(text){
    return String(text).replace(/<span class="math-display">([\s\S]*?)<\/span>/g,(_,inner)=>{
      if(/<br\s*\/?\s*>/i.test(inner)){
        const rows=inner.split(/<br\s*\/?\s*>/i).map(legacyMathCore);
        return `\\(\\begin{aligned}${rows.join(String.raw`\\`)}\\end{aligned}\\)`;
      }
      return `\\(${legacyMathCore(inner)}\\)`;
    });
  }

  function secondaryContext(rng) {
    return pick(rng,[
      'In a Grade 7 mathematics class','In a Grade 8 mathematics class','In Algebra I','In Geometry',
      'In Algebra II','In Precalculus','During a secondary mathematics intervention lesson',
      'During a small-group secondary mathematics lesson','During a whole-class mathematics discussion',
      'During a technology-supported mathematics lesson','During a mathematical modeling lesson',
      'During a secondary mathematics assessment review'
    ]);
  }

  function makeQuestion(rng, prompt, correct, distractors, explanation, meta = {}) {
    prompt=modernizeLegacyMath(prompt);
    correct=modernizeLegacyMath(correct);
    distractors=distractors.map(modernizeLegacyMath);
    explanation=modernizeLegacyMath(explanation);
    let values = uniqueStrings([String(correct), ...distractors.map(String)]);
    // If parameter choices accidentally make two distractors coincide, create
    // another mathematically shaped alternative instead of falling back
    // immediately to a generic "none of these" choice.
    const rawCorrect=String(correct), core=rawCorrect.replace(/^\\\(|\\\)$/g,'').trim();
    const derived=[];
    const numMatch=core.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
    if(numMatch){
      const n=Number(numMatch[1]), suffix=numMatch[2]||'';
      [n+1,n-1,-n,n===0?2:2*n,n/2].forEach(v=>derived.push(`${Number.isInteger(v)?v:Number(v.toFixed(3))}${suffix}`));
    }
    const tuple=core.match(/^\((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\)$/);
    if(tuple){const x=Number(tuple[1]),y=Number(tuple[2]);derived.push(`\\(${x+1},${y}\\)`,`\\(${x},${y+1}\\)`,`\\(${-x},${y}\\)`,`\\(${y},${x}\\)`);}
    const eqnum=core.match(/^([xyzk])=(-?\d+(?:\.\d+)?)$/i);
    if(eqnum){const v=Number(eqnum[2]),sym=eqnum[1];derived.push(`\\(${sym}=${v+1}\\)`,`\\(${sym}=${v-1}\\)`,`\\(${sym}=${-v}\\)`);}
    const fallbackChoices = [...derived,"No real solution", "Infinitely many solutions", "Cannot be determined from the information given", "None of the other choices"];
    let fallbackIndex = 0;
    while (values.length < 4 && fallbackIndex<fallbackChoices.length) {
      const candidate = fallbackChoices[fallbackIndex++];
      if (!values.includes(candidate) && candidate!==String(correct)) values.push(candidate);
    }
    values = values.slice(0, 4);
    const shuffled = shuffle(rng, values);
    return {
      prompt,
      choices: shuffled,
      answer: shuffled.indexOf(String(correct)),
      explanation,
      ...meta
    };
  }

  function svgLineGraph(points, label = "") {
    const w = 360, h = 240, pad = 35;
    const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
    const xmin = Math.min(-1, ...xs), xmax = Math.max(5, ...xs);
    const ymin = Math.min(-1, ...ys), ymax = Math.max(5, ...ys);
    const sx = x => pad + (x - xmin) / (xmax - xmin) * (w - 2 * pad);
    const sy = y => h - pad - (y - ymin) / (ymax - ymin) * (h - 2 * pad);
    const path = points.map((p, i) => `${i ? "L" : "M"}${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(" ");
    const grid=[];
    for(let x=Math.ceil(xmin);x<=Math.floor(xmax);x++) grid.push(`<line x1="${sx(x)}" y1="${pad}" x2="${sx(x)}" y2="${h-pad}" class="grid-line"/>`);
    for(let y=Math.ceil(ymin);y<=Math.floor(ymax);y++) grid.push(`<line x1="${pad}" y1="${sy(y)}" x2="${w-pad}" y2="${sy(y)}" class="grid-line"/>`);
    const ticks=[];
    for(let x=Math.ceil(xmin);x<=Math.floor(xmax);x++) if(x!==0) ticks.push(`<text x="${sx(x)}" y="${sy(0)+15}" text-anchor="middle" class="tick-label">${x}</text>`);
    for(let y=Math.ceil(ymin);y<=Math.floor(ymax);y++) if(y!==0) ticks.push(`<text x="${sx(0)-7}" y="${sy(y)+4}" text-anchor="end" class="tick-label">${y}</text>`);
    return `<svg class="svg-graph" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label || "coordinate graph"}">
      ${grid.join('')}<line x1="${pad}" y1="${sy(0)}" x2="${w-pad}" y2="${sy(0)}" class="axis-line"/>
      <line x1="${sx(0)}" y1="${pad}" x2="${sx(0)}" y2="${h-pad}" class="axis-line"/>${ticks.join('')}
      <path d="${path}" class="plot-line"/>
      ${points.map(p => `<circle cx="${sx(p[0])}" cy="${sy(p[1])}" r="4" class="plot-point"/>`).join("")}
    </svg>`;
  }

  // ---------- Number and arithmetic generators ----------
  function qWholeOperation(rng) {
    const a = ri(rng, 120, 980), b = ri(rng, 12, 89), c = ri(rng, 3, 9);
    const correct = a + b * c;
    return makeQuestion(rng,
      `Evaluate <span class="math-display">${a} + ${b} × ${c}</span>.`,
      correct,
      [(a + b) * c, a + b + c, a * c + b],
      `Use order of operations: multiply first. ${b} × ${c} = ${b*c}, and ${a} + ${b*c} = ${correct}.`);
  }

  function qDivisionContext(rng) {
    const groups = ri(rng, 6, 18), each = ri(rng, 12, 45), extra = ri(rng, 1, groups - 1);
    const total = groups * each + extra;
    return makeQuestion(rng,
      `${total} items are packed into boxes that hold ${each} items each. How many completely full boxes can be packed?`,
      groups,
      [groups + 1, each, total - groups * each],
      `${total} ÷ ${each} = ${groups} remainder ${extra}. Only ${groups} boxes are completely full.`);
  }

  function qPlaceValue(rng) {
    const digits = shuffle(rng, [2,3,4,5,6,7,8,9]).slice(0,6);
    const number = Number(digits.join(""));
    const pos = ri(rng, 0, 5);
    const placeNames = ["hundred-thousands", "ten-thousands", "thousands", "hundreds", "tens", "ones"];
    const value = digits[pos] * 10 ** (5-pos);
    return makeQuestion(rng,
      `In the number ${number.toLocaleString()}, what is the value of the digit ${digits[pos]}?`,
      value.toLocaleString(),
      [digits[pos].toLocaleString(), (digits[pos]*10**Math.max(0,4-pos)).toLocaleString(), (digits[pos]*10**Math.min(6,6-pos)).toLocaleString()],
      `The digit is in the ${placeNames[pos]} place, so its value is ${value.toLocaleString()}.`);
  }

  function qRounding(rng) {
    const n = ri(rng, 1200, 98765);
    const places = [10,100,1000];
    const p = pick(rng, places);
    const name = p === 10 ? "nearest ten" : p === 100 ? "nearest hundred" : "nearest thousand";
    const correct = Math.round(n/p)*p;
    return makeQuestion(rng, `Round ${n.toLocaleString()} to the ${name}.`, correct.toLocaleString(),
      [Math.floor(n/p)*p, Math.ceil(n/p)*p, Math.round(n/(p*10))*p*10].map(x=>x.toLocaleString()),
      `Look at the digit immediately to the right of the ${name.replace("nearest ","")} place. The rounded value is ${correct.toLocaleString()}.`);
  }

  function qFractionAdd(rng) {
    const d1 = pick(rng,[3,4,5,6,8,10,12]), d2 = pick(rng,[3,4,5,6,8,10,12]);
    const a = ri(rng,1,d1-1), b = ri(rng,1,d2-1);
    const n = a*d2 + b*d1, d = d1*d2;
    const correct = frac(n,d);
    return makeQuestion(rng,
      `Compute <span class="math-display">${a}/${d1} + ${b}/${d2}</span>.`,
      correct,
      [frac(a+b,d1+d2), frac(a+b,lcm(d1,d2)), frac(a*d2-b*d1,d1*d2)],
      `A common denominator is ${d1*d2}. The numerator is ${a}(${d2}) + ${b}(${d1}) = ${n}. Reducing gives ${correct}.`);
  }

  function qFractionMultiply(rng) {
    const a = ri(rng,2,9), b = ri(rng,2,10), c = ri(rng,2,9), d = ri(rng,2,10);
    const correct = frac(a*c,b*d);
    return makeQuestion(rng,
      `Compute <span class="math-display">${a}/${b} × ${c}/${d}</span>.`,
      correct,
      [frac(a+c,b+d), frac(a*d,b*c), frac(a*c,b+d)],
      `Multiply numerators and denominators: (${a}×${c})/(${b}×${d}) = ${a*c}/${b*d}, which reduces to ${correct}.`);
  }

  function qFractionDivide(rng) {
    const a = ri(rng,1,8), b = ri(rng,2,10), c = ri(rng,1,8), d = ri(rng,2,10);
    const correct = frac(a*d,b*c);
    return makeQuestion(rng,
      `Compute <span class="math-display">${a}/${b} ÷ ${c}/${d}</span>.`,
      correct,
      [frac(a*c,b*d), frac(a*d,b+c), frac(b*c,a*d)],
      `Multiply by the reciprocal: ${a}/${b} × ${d}/${c} = ${a*d}/${b*c} = ${correct}.`);
  }

  function qFractionOfQuantity(rng) {
    const d = pick(rng,[3,4,5,6,8,10]), n = ri(rng,1,d-1), unit = ri(rng,3,12), total = d*unit;
    const correct = n*unit;
    return makeQuestion(rng,
      `What is <span class="math-display">${n}/${d}</span> of ${total}?`,
      correct,
      [total/d, total-n, total*n],
      `${total} ÷ ${d} = ${unit}, and ${unit} × ${n} = ${correct}.`);
  }

  function qDecimalOperation(rng) {
    const a = ri(rng,110,990)/100, b = ri(rng,11,99)/10;
    const op = pick(rng,["+","−","×"]);
    let correct, explanation, distractors;
    if (op === "+") {
      correct = fmt(a+b,2); distractors=[fmt(a+b/10,2),fmt(a*10+b,2),fmt(Math.abs(a-b),2)];
      explanation = `Align decimal points: ${fmt(a,2)} + ${fmt(b,1)} = ${correct}.`;
    } else if (op === "−") {
      const hi=Math.max(a,b), lo=Math.min(a,b); correct=fmt(hi-lo,2);
      distractors=[fmt(hi-lo/10,2),fmt(Math.abs(Math.round(hi)-Math.round(lo)),2),fmt(hi+lo,2)];
      explanation=`Align decimal points and subtract: ${fmt(hi,2)} − ${fmt(lo,2)} = ${correct}.`;
      return makeQuestion(rng,`Compute <span class="math-display">${fmt(hi,2)} − ${fmt(lo,2)}</span>.`,correct,distractors,explanation);
    } else {
      correct=fmt(a*b,3); distractors=[fmt(a+b,3),fmt(a*b/10,3),fmt(a*b*10,3)];
      explanation=`Multiply as whole numbers, then place the decimal using the total number of decimal places: ${fmt(a,2)} × ${fmt(b,1)} = ${correct}.`;
    }
    return makeQuestion(rng,`Compute <span class="math-display">${fmt(a,2)} ${op} ${fmt(b,1)}</span>.`,correct,distractors,explanation);
  }

  function qPercentOf(rng) {
    const percent = pick(rng,[5,10,15,20,25,30,40,50,60,75]);
    const base = pick(rng,[40,60,80,120,160,200,240,300]);
    const correct = percent*base/100;
    return makeQuestion(rng,`What is ${percent}% of ${base}?`,correct,
      [base/percent,base-percent,percent*base/10],
      `${percent}% = ${percent/100}. Multiply: ${percent/100} × ${base} = ${correct}.`);
  }

  function qPercentChange(rng) {
    const original = pick(rng,[40,50,60,80,100,120,150,200]);
    const pct = pick(rng,[10,15,20,25,30]);
    const increase = rng() < .5;
    const change = original*pct/100;
    const correct = increase ? original+change : original-change;
    return makeQuestion(rng,
      `A price of ${money(original)} is ${increase?"increased":"decreased"} by ${pct}%. What is the new price?`,
      money(correct),
      [money(change),money(original+(increase?-change:change)),money(original+(increase?pct:-pct))],
      `${pct}% of ${money(original)} is ${money(change)}. ${increase?"Add":"Subtract"} the change to get ${money(correct)}.`);
  }

  function qEquivalentRepresentations(rng) {
    const pairs = [[1,2,.5,50],[1,4,.25,25],[3,4,.75,75],[2,5,.4,40],[3,5,.6,60],[7,10,.7,70],[1,5,.2,20],[4,5,.8,80],[1,8,.125,12.5],[3,8,.375,37.5],[5,8,.625,62.5],[7,8,.875,87.5]];
    const [n,d,dec,pct] = pick(rng,pairs);
    const correct = `${n}/${d}, ${dec}, and ${pct}%`;
    return makeQuestion(rng,
      `Which group contains three equivalent representations of the same number?`,
      correct,
      [`${n}/${d}, ${fmt(dec+.1,2)}, and ${pct}%`,`${n+1}/${d}, ${dec}, and ${pct}%`,`${n}/${d}, ${dec}, and ${pct+10}%`],
      `${n} ÷ ${d} = ${dec}, and ${dec} × 100% = ${pct}%.`);
  }

  function qCompareNumbers(rng) {
    const a = ri(rng,2,8), b = ri(rng,a+1,12);
    const dec = Number((a/b + pick(rng,[-.08,.06,.1])).toFixed(2));
    const f = a/b;
    const relation = f < dec ? "<" : f > dec ? ">" : "=";
    return makeQuestion(rng,
      `Which relation correctly compares <span class="math-display">${a}/${b}</span> and <span class="math-display">${dec}</span>?`,
      relation,
      [relation==="<"?">":"<","=","cannot be determined"],
      `${a}/${b} ≈ ${fmt(f,3)}. Comparing that decimal with ${dec} gives ${a}/${b} ${relation} ${dec}.`);
  }

  function qPrimeFactorization(rng) {
    const primes=[2,3,5,7];
    const p=pick(rng,primes), q=pick(rng,primes), r=pick(rng,primes);
    const n=p*q*r;
    const factors=[p,q,r].sort((a,b)=>a-b);
    const correct=factors.join(" × ");
    return makeQuestion(rng,`Which is the prime factorization of ${n}?`,correct,
      [`${p*q} × ${r}`,`${p} + ${q} + ${r}`,`${p} × ${q*r+1}`],
      `Dividing by primes gives ${n} = ${correct}. Every listed factor is prime.`);
  }

  function qGcdLcm(rng) {
    const g=ri(rng,2,8), a=g*ri(rng,2,7), b=g*ri(rng,2,7);
    const askGcd=rng()<.5;
    const correct=askGcd?gcd(a,b):lcm(a,b);
    return makeQuestion(rng,
      `What is the ${askGcd?"greatest common divisor":"least common multiple"} of ${a} and ${b}?`,
      correct,
      askGcd?[1,Math.min(a,b),a*b/g].map(String):[a*b,gcd(a,b),Math.max(a,b)].map(String),
      askGcd
        ? `The common factors of ${a} and ${b} have greatest value ${correct}.`
        : `Using LCM(a,b) = ab/GCD(a,b), the result is (${a}×${b})/${gcd(a,b)} = ${correct}.`);
  }

  function qScientificNotation(rng) {
    const coeff=ri(rng,12,98)/10, exp=ri(rng,2,6), large=rng()<.7;
    const value=large?coeff*10**exp:coeff*10**(-exp);
    const display=large?Math.round(value).toLocaleString():value.toFixed(exp+1);
    const correct=`${fmt(coeff,1)} × 10<sup>${large?exp:-exp}</sup>`;
    return makeQuestion(rng,`Write ${display} in scientific notation.`,correct,
      [`${fmt(coeff*10,1)} × 10<sup>${large?exp-1:-(exp+1)}</sup>`,`0.${String(Math.round(coeff*10)).padStart(2,"0")} × 10<sup>${large?exp+1:-(exp-1)}</sup>`,`${fmt(coeff,1)} × 10<sup>${large?-exp:exp}</sup>`],
      `Move the decimal so the coefficient is between 1 and 10. It moves ${exp} places, giving ${correct}.`);
  }

  function qNumberSet(rng) {
    const options = [
      {v:`√${pick(rng,[2,3,5,7,11])}`,a:"irrational"},
      {v:`${ri(rng,-9,-1)}`,a:"integer"},
      (() => { const d=ri(rng,2,10), n=ri(rng,1,d-1); return {v:`${n}/${d}`,a:"rational"}; })(),
      {v:`${ri(rng,2,9)} + ${ri(rng,1,5)}i`,a:"complex but not real"}
    ];
    const item=pick(rng,options);
    const all=["natural","integer","rational","irrational","complex but not real"];
    return makeQuestion(rng,`Which is the most specific classification of <span class="math-display">${item.v}</span>?`,item.a,
      shuffle(rng,all.filter(x=>x!==item.a)).slice(0,3),
      item.a==="irrational"?`The square root is not a perfect square, so its decimal does not terminate or repeat.`:
      item.a==="complex but not real"?`A nonzero imaginary part means the number is complex but not real.`:
      `The number belongs to the ${item.a} set, and that is the most specific listed classification.`);
  }

  function qComplexArithmetic(rng) {
    const a=ri(rng,-6,6), b=ri(rng,-6,6), c=ri(rng,-6,6), d=ri(rng,-6,6);
    const add=rng()<.5;
    const real=add?a+c:a-c, imag=add?b+d:b-d;
    const correct=`${real} ${imag>=0?"+":"−"} ${Math.abs(imag)}i`;
    return makeQuestion(rng,
      `Simplify <span class="math-display">(${a} ${b>=0?"+":"−"} ${Math.abs(b)}i) ${add?"+":"−"} (${c} ${d>=0?"+":"−"} ${Math.abs(d)}i)</span>.`,
      correct,
      [`${a+c} ${b-d>=0?"+":"−"} ${Math.abs(b-d)}i`,`${a*c} ${b*d>=0?"+":"−"} ${Math.abs(b*d)}i`,`${real+1} ${imag>=0?"+":"−"} ${Math.abs(imag)}i`],
      `Combine real parts and imaginary parts separately. The result is ${correct}.`);
  }

  function qExponentLaw(rng) {
    const a=ri(rng,2,7), m=ri(rng,2,6), n=ri(rng,1,5), divide=rng()<.5;
    const exp=divide?m-n:m+n;
    const prompt=divide?`${a}<sup>${m}</sup> ÷ ${a}<sup>${n}</sup>`:`${a}<sup>${m}</sup> × ${a}<sup>${n}</sup>`;
    const correct=`${a}<sup>${exp}</sup>`;
    return makeQuestion(rng,`Simplify <span class="math-display">${prompt}</span>.`,correct,
      [`${a}<sup>${m*n}</sup>`,`${a*2}<sup>${exp}</sup>`,`${a}<sup>${divide?m+n:m-n}</sup>`],
      `For the same base, ${divide?"subtract":"add"} exponents: ${m} ${divide?"−":"+"} ${n} = ${exp}.`);
  }

  // ---------- Algebra and functions generators ----------
  function qEvaluateExpression(rng) {
    const x=ri(rng,-5,8), a=ri(rng,2,7), b=ri(rng,-9,9), c=ri(rng,-5,9);
    const correct=a*x*x+b*x+c;
    return makeQuestion(rng,
      `Evaluate <span class="math-display">${a}x<sup>2</sup> ${signed(b)}x ${signed(c)}</span> when <span class="math-display">x = ${x}</span>.`,
      correct,
      [a*x+b+c,a*x*x+b+c,a*x*x-b*x+c],
      `Substitute ${x}: ${a}(${x})² ${signed(b)}(${x}) ${signed(c)} = ${correct}.`);
  }

  function qSimplifyExpression(rng) {
    const a=ri(rng,2,9), b=ri(rng,2,9), c=ri(rng,-8,8), d=ri(rng,-8,8);
    const coef=a+b, constant=c+d;
    const correct=`${coef}x ${constant>=0?"+":"−"} ${Math.abs(constant)}`;
    return makeQuestion(rng,
      `Simplify <span class="math-display">${a}x ${c>=0?"+":"−"} ${Math.abs(c)} + ${b}x ${d>=0?"+":"−"} ${Math.abs(d)}</span>.`,
      correct,
      [`${a*b}x ${constant>=0?"+":"−"} ${Math.abs(constant)}`,`${coef}x ${c-d>=0?"+":"−"} ${Math.abs(c-d)}`,`${coef}x<sup>2</sup> ${constant>=0?"+":"−"} ${Math.abs(constant)}`],
      `Combine like terms: (${a}+${b})x = ${coef}x and ${c}+(${d}) = ${constant}.`);
  }

  function qLinearEquation(rng) {
    const x=ri(rng,-9,12), a=ri(rng,2,9), b=ri(rng,-12,12), c=a*x+b;
    return makeQuestion(rng,
      `Solve <span class="math-display">${a}x ${b>=0?"+":"−"} ${Math.abs(b)} = ${c}</span>.`,
      x,
      [x+1,x-1,frac(c-b,a+1)],
      `Subtract ${b} from both sides, then divide by ${a}: x = (${c} − (${b}))/${a} = ${x}.`);
  }

  function qLinearInequality(rng) {
    const x0=ri(rng,-6,8), a=ri(rng,2,7), b=ri(rng,-9,9), c=a*x0+b;
    const sign=pick(rng,[">","<","≥","≤"]);
    const correct=`x ${sign} ${x0}`;
    return makeQuestion(rng,
      `Solve <span class="math-display">${a}x ${b>=0?"+":"−"} ${Math.abs(b)} ${sign} ${c}</span>.`,
      correct,
      [`x ${sign} ${fmt(c/a,2)}`,`x ${sign===">"?"<":sign==="<"?">":sign==="≥"?"≤":"≥"} ${x0}`,`x ${sign} ${x0+1}`],
      `Subtract ${b} and divide by the positive number ${a}, so the inequality direction stays the same: ${correct}.`);
  }

  function qProportion(rng) {
    const a=ri(rng,2,9), b=ri(rng,3,12), k=ri(rng,2,8), c=a*k, d=b*k;
    const blank=pick(rng,["c","d"]);
    if(blank==="c") return makeQuestion(rng,`Solve <span class="math-display">${a}/${b} = x/${d}</span>.`,c,[d-a,a*k+1,b*k],`Cross multiply: ${b}x = ${a}(${d}), so x = ${c}.`);
    return makeQuestion(rng,`Solve <span class="math-display">${a}/${b} = ${c}/x</span>.`,d,[c-b,b*k+1,a*k],`Cross multiply: ${a}x = ${b}(${c}), so x = ${d}.`);
  }

  function qSlope(rng) {
    const x1=ri(rng,-5,2), x2=x1+pick(rng,[2,3,4,5]), m=pick(rng,[-3,-2,-1,1,2,3,4]);
    const y1=ri(rng,-6,6), y2=y1+m*(x2-x1);
    return makeQuestion(rng,
      `What is the slope of the line through <span class="math-display">(${x1}, ${y1})</span> and <span class="math-display">(${x2}, ${y2})</span>?`,
      m,
      [frac(x2-x1,y2-y1),y2-y1,m+1],
      `Slope = (y₂−y₁)/(x₂−x₁) = (${y2}−${y1})/(${x2}−${x1}) = ${m}.`);
  }

  function qLineEquation(rng) {
    const m=pick(rng,[-4,-3,-2,-1,1,2,3,4]), b=ri(rng,-8,8);
    const x=ri(rng,-3,5), y=m*x+b;
    const correct=`y = ${m}x ${b>=0?"+":"−"} ${Math.abs(b)}`;
    return makeQuestion(rng,
      `Which equation has slope ${m} and passes through <span class="math-display">(${x}, ${y})</span>?`,
      correct,
      [`y = ${b}x ${m>=0?"+":"−"} ${Math.abs(m)}`,`y = ${-m}x ${b>=0?"+":"−"} ${Math.abs(b)}`,`y = ${m}x ${-b>=0?"+":"−"} ${Math.abs(b)}`],
      `In y = mx + b, the slope is ${m}. Substituting (${x},${y}) gives ${y} = ${m}(${x}) + b, so b = ${b}.`);
  }

  function qLinearApplication(rng) {
    const start=ri(rng,10,80), rate=ri(rng,3,15), x=ri(rng,4,12), total=start+rate*x;
    return makeQuestion(rng,
      `A service charges a fixed fee of ${money(start)} plus ${money(rate)} per hour. What is the cost for ${x} hours?`,
      money(total),
      [money(rate*x),money(start*x+rate),money(start+rate+x)],
      `Use C = ${start} + ${rate}h. For h=${x}, C=${start}+${rate}(${x})=${total}.`);
  }

  function qSystemEquations(rng) {
    const x=ri(rng,-5,8), y=ri(rng,-5,8);
    let a=ri(rng,1,4), b=ri(rng,1,4), c=ri(rng,1,4), d=ri(rng,1,4);
    while(a*d-b*c===0) d=ri(rng,1,5);
    const e=a*x+b*y, f=c*x+d*y;
    const correct=`(${x}, ${y})`;
    return makeQuestion(rng,
      `Solve the system:<br><span class="math-display">${a}x + ${b}y = ${e}<br>${c}x + ${d}y = ${f}</span>`,
      correct,
      [`(${y}, ${x})`,`(${x+1}, ${y-1})`,`(${-x}, ${-y})`],
      `Eliminating one variable and substituting gives x=${x} and y=${y}, so the solution is ${correct}.`);
  }

  function qSequence(rng) {
    const first=ri(rng,-5,12), diff=pick(rng,[2,3,4,5,6,-2,-3]);
    const n=ri(rng,6,12), term=first+(n-1)*diff;
    const seq=[0,1,2,3].map(i=>first+i*diff).join(", ");
    return makeQuestion(rng,`The sequence begins ${seq}, … . What is the ${n}th term?`,term,
      [first+n*diff,n*diff,first+(n-2)*diff],
      `This is arithmetic with common difference ${diff}. aₙ = ${first} + (n−1)(${diff}); therefore a${n} = ${term}.`);
  }

  function qFunctionEvaluate(rng) {
    const a=ri(rng,1,5), b=ri(rng,-8,8), x=ri(rng,-4,7), correct=a*x+b;
    return makeQuestion(rng,
      `If <span class="math-display">f(x) = ${a}x ${b>=0?"+":"−"} ${Math.abs(b)}</span>, what is <span class="math-display">f(${x})</span>?`,
      correct,
      [a+b*x,a*x-b,a+x+b],
      `Substitute x=${x}: f(${x}) = ${a}(${x}) ${b>=0?"+":"−"} ${Math.abs(b)} = ${correct}.`);
  }

  function qFunctionComposition(rng) {
    const a=ri(rng,2,5), b=ri(rng,-5,5), c=ri(rng,1,4), d=ri(rng,-5,5), x=ri(rng,-3,4);
    const gx=c*x+d, correct=a*gx+b;
    return makeQuestion(rng,
      `Let <span class="math-display">f(x)=${a}x ${b>=0?"+":"−"} ${Math.abs(b)}</span> and <span class="math-display">g(x)=${c}x ${d>=0?"+":"−"} ${Math.abs(d)}</span>. Find <span class="math-display">f(g(${x}))</span>.`,
      correct,
      [c*(a*x+b)+d,a*x+b+c*x+d,a*(c+x+d)+b],
      `First g(${x})=${gx}. Then f(${gx})=${a}(${gx}) ${b>=0?"+":"−"} ${Math.abs(b)}=${correct}.`);
  }

  function qGraphSlope(rng) {
    const m=pick(rng,[-2,-1,1,2,3]), b=ri(rng,-2,3);
    const points=[[0,b],[1,m+b],[2,2*m+b],[3,3*m+b]];
    const graph=svgLineGraph(points,`line graph with slope ${m}`);
    return makeQuestion(rng,`${graph}What is the slope of the graphed line?`,m,
      [b,-m,frac(1,m)],
      `Using any two plotted points, rise/run = ${m}/1 = ${m}.`);
  }

  function qFactorQuadratic(rng) {
    const p=pick(rng,[-6,-5,-4,-3,2,3,4,5,6]), q=pick(rng,[-6,-5,-4,-3,2,3,4,5,6]);
    const sum=p+q, prod=p*q;
    const correct=`(x ${p>=0?"+":"−"} ${Math.abs(p)})(x ${q>=0?"+":"−"} ${Math.abs(q)})`;
    return makeQuestion(rng,
      `Factor <span class="math-display">x<sup>2</sup> ${sum>=0?"+":"−"} ${Math.abs(sum)}x ${prod>=0?"+":"−"} ${Math.abs(prod)}</span>.`,
      correct,
      [`(x ${p>=0?"−":"+"} ${Math.abs(p)})(x ${q>=0?"−":"+"} ${Math.abs(q)})`,`(x ${p>=0?"+":"−"} ${Math.abs(p)})(x ${q>=0?"−":"+"} ${Math.abs(q)})`,`(x ${sum>=0?"+":"−"} ${Math.abs(sum)})(x ${prod>=0?"+":"−"} ${Math.abs(prod)})`],
      `Two numbers with sum ${sum} and product ${prod} are ${p} and ${q}. Therefore the factorization is ${correct}.`);
  }

  function qQuadraticRoots(rng) {
    const r1=ri(rng,-6,5), r2=ri(rng,r1+1,8), sum=-(r1+r2), prod=r1*r2;
    const correct=`x = ${r1} or x = ${r2}`;
    return makeQuestion(rng,
      `Solve <span class="math-display">x<sup>2</sup> ${sum>=0?"+":"−"} ${Math.abs(sum)}x ${prod>=0?"+":"−"} ${Math.abs(prod)} = 0</span>.`,
      correct,
      [`x = ${-r1} or x = ${-r2}`,`x = ${r1+r2} or x = ${prod}`,`x = ${r1} only`],
      `The quadratic factors as (x−${r1})(x−${r2})=0, so x=${r1} or x=${r2}.`);
  }

  function qQuadraticVertex(rng) {
    const h=ri(rng,-5,5), k=ri(rng,-8,8), a=pick(rng,[-3,-2,-1,1,2,3]);
    const correct=`(${h}, ${k})`;
    return makeQuestion(rng,
      `What is the vertex of <span class="math-display">y = ${a}(x ${h>=0?"−":"+"} ${Math.abs(h)})<sup>2</sup> ${k>=0?"+":"−"} ${Math.abs(k)}</span>?`,
      correct,
      [`(${-h}, ${k})`,`(${h}, ${-k})`,`(${a}, ${k})`],
      `Vertex form is y=a(x−h)²+k, so the vertex is (h,k)=${correct}.`);
  }

  function qDiscriminant(rng) {
    const a=ri(rng,1,4), b=ri(rng,-8,8), c=ri(rng,-8,8), disc=b*b-4*a*c;
    const correct=disc>0?"two distinct real solutions":disc===0?"one repeated real solution":"two nonreal complex solutions";
    return makeQuestion(rng,
      `How many and what type of solutions does <span class="math-display">${a}x<sup>2</sup> ${b>=0?"+":"−"} ${Math.abs(b)}x ${c>=0?"+":"−"} ${Math.abs(c)} = 0</span> have?`,
      correct,
      ["two distinct real solutions","one repeated real solution","two nonreal complex solutions"].filter(x=>x!==correct).concat("no solutions of any kind"),
      `The discriminant is b²−4ac = ${b}²−4(${a})(${c}) = ${disc}. A ${disc>0?"positive":disc===0?"zero":"negative"} discriminant gives ${correct}.`);
  }

  function qRadicalEquation(rng) {
    const x=ri(rng,1,12), k=ri(rng,1,8), root=ri(rng,2,7), c=root*root-x;
    const correct=x;
    return makeQuestion(rng,
      `Solve <span class="math-display">√(x ${c>=0?"+":"−"} ${Math.abs(c)}) = ${root}</span>.`,
      correct,
      [root-c,root*root+c,x+2],
      `Square both sides: x ${c>=0?"+":"−"} ${Math.abs(c)} = ${root*root}. Therefore x=${x}. Checking gives √${root*root}=${root}.`);
  }

  function qRationalEquation(rng) {
    const x=ri(rng,1,10), b=ri(rng,1,6), c=ri(rng,2,7), a=c*(x+b);
    return makeQuestion(rng,
      `Solve <span class="math-display">${a}/(x + ${b}) = ${c}</span>.`,
      x,
      [a/c+b,a*c-b,x+b],
      `Multiply by x+${b}: ${a}=${c}(x+${b}). Divide by ${c} and subtract ${b}: x=${x}.`);
  }

  function qPolynomialRemainder(rng) {
    const a=ri(rng,1,4), b=ri(rng,-5,5), c=ri(rng,-8,8), k=pick(rng,[-3,-2,-1,1,2,3,4]);
    const val=a*k*k+b*k+c;
    return makeQuestion(rng,
      `What is the remainder when <span class="math-display">${a}x<sup>2</sup> ${b>=0?"+":"−"} ${Math.abs(b)}x ${c>=0?"+":"−"} ${Math.abs(c)}</span> is divided by <span class="math-display">x ${k>=0?"−":"+"} ${Math.abs(k)}</span>?`,
      val,
      [a+b+c,val+k,val-k],
      `By the Remainder Theorem, the remainder is f(${k}) = ${a}(${k})² ${signed(b)}(${k}) ${signed(c)} = ${val}.`);
  }

  function qExponentialGrowth(rng) {
    const initial=pick(rng,[100,200,400,500,800]), rate=pick(rng,[5,10,20,25]), years=ri(rng,2,5);
    const correct=initial*(1+rate/100)**years;
    return makeQuestion(rng,
      `A quantity starts at ${initial} and grows by ${rate}% each year. What is its value after ${years} years?`,
      fmt(correct,2),
      [fmt(initial*(1+rate/100*years),2),fmt(initial*(rate/100)**years,2),fmt(initial+rate*years,2)],
      `Use exponential growth: ${initial}(1+${rate/100})<sup>${years}</sup> = ${fmt(correct,2)}.`);
  }

  function qLogarithm(rng) {
    const base=pick(rng,[2,3,5,10]), exp=ri(rng,2,5), value=base**exp;
    return makeQuestion(rng,
      `Evaluate <span class="math-display">log<sub>${base}</sub>(${value})</span>.`,
      exp,
      [base,value,exp+1],
      `log<sub>${base}</sub>(${value}) asks for the exponent on ${base} that gives ${value}. Since ${base}<sup>${exp}</sup>=${value}, the answer is ${exp}.`);
  }

  function qTrigRightTriangle(rng) {
    const triples=pick(rng,[[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
    const [opp,adj,hyp]=triples;
    const fn=pick(rng,["sin","cos","tan"]);
    const correct=fn==="sin"?frac(opp,hyp):fn==="cos"?frac(adj,hyp):frac(opp,adj);
    return makeQuestion(rng,
      `In a right triangle, relative to angle θ, the opposite side is ${opp}, the adjacent side is ${adj}, and the hypotenuse is ${hyp}. Find <span class="math-display">${fn}(θ)</span>.`,
      correct,
      fn==="sin"?[frac(adj,hyp),frac(opp,adj),frac(hyp,opp)]:fn==="cos"?[frac(opp,hyp),frac(adj,opp),frac(hyp,adj)]:[frac(adj,opp),frac(opp,hyp),frac(adj,hyp)],
      `${fn}(θ) uses ${fn==="sin"?"opposite/hypotenuse":fn==="cos"?"adjacent/hypotenuse":"opposite/adjacent"}, so the value is ${correct}.`);
  }

  function qRateOfChange(rng) {
    const a=ri(rng,1,4), b=ri(rng,-4,5), x=ri(rng,1,5), h=1;
    const f1=a*x*x+b*x, f2=a*(x+h)**2+b*(x+h), avg=f2-f1;
    return makeQuestion(rng,
      `For <span class="math-display">f(x)=${a}x<sup>2</sup> ${b>=0?"+":"−"} ${Math.abs(b)}x</span>, what is the average rate of change from x=${x} to x=${x+1}?`,
      avg,
      [f2, f1, a*2*x+b],
      `Average rate of change = [f(${x+1})−f(${x})]/1 = (${f2}−${f1}) = ${avg}.`);
  }

  // ---------- Geometry and measurement generators ----------
  function qRectangleAreaPerimeter(rng) {
    const l=ri(rng,5,24), w=ri(rng,3,l-1), askArea=rng()<.55;
    const correct=askArea?l*w:2*(l+w);
    return makeQuestion(rng,
      `A rectangle has length ${l} units and width ${w} units. What is its ${askArea?"area":"perimeter"}?`,
      `${correct} ${askArea?"square units":"units"}`,
      [`${askArea?2*(l+w):l*w} ${askArea?"square units":"units"}`,`${l+w} ${askArea?"square units":"units"}`,`${l*w*2} ${askArea?"square units":"units"}`],
      askArea?`Area = length × width = ${l}×${w}=${correct} square units.`:`Perimeter = 2(length+width)=2(${l}+${w})=${correct} units.`);
  }

  function qTriangleArea(rng) {
    const b=ri(rng,4,18), h=ri(rng,3,14), correct=b*h/2;
    return makeQuestion(rng,`A triangle has base ${b} cm and perpendicular height ${h} cm. What is its area?`,
      `${fmt(correct)} cm²`,
      [`${b*h} cm²`,`${b+h} cm²`,`${2*(b+h)} cm²`],
      `Area = ½bh = ½(${b})(${h}) = ${fmt(correct)} cm².`);
  }

  function qCircle(rng) {
    const r=ri(rng,2,12), askArea=rng()<.5;
    const correct=askArea?`${r*r}π square units`:`${2*r}π units`;
    return makeQuestion(rng,
      `A circle has radius ${r} units. What is its ${askArea?"area":"circumference"} in exact form?`,
      correct,
      askArea?[`${2*r}π square units`,`${r}π square units`,`${4*r*r}π square units`]:[`${r*r}π units`,`${r}π units`,`${4*r}π units`],
      askArea?`Area = πr² = π(${r})² = ${r*r}π square units.`:`Circumference = 2πr = 2π(${r}) = ${2*r}π units.`);
  }

  function qVolumePrism(rng) {
    const l=ri(rng,3,12), w=ri(rng,2,9), h=ri(rng,2,10), correct=l*w*h;
    return makeQuestion(rng,
      `A rectangular prism measures ${l} by ${w} by ${h} units. What is its volume?`,
      `${correct} cubic units`,
      [`${2*(l*w+l*h+w*h)} cubic units`,`${l+w+h} cubic units`,`${l*w} cubic units`],
      `Volume = length × width × height = ${l}×${w}×${h} = ${correct} cubic units.`);
  }

  function qCylinderVolume(rng) {
    const r=ri(rng,2,8), h=ri(rng,3,12), coef=r*r*h;
    return makeQuestion(rng,
      `A cylinder has radius ${r} cm and height ${h} cm. What is its volume in exact form?`,
      `${coef}π cm³`,
      [`${2*r*h}π cm³`,`${r*r}π cm³`,`${2*r*(r+h)}π cm³`],
      `V = πr²h = π(${r})²(${h}) = ${coef}π cm³.`);
  }

  function qPythagorean(rng) {
    const triples=pick(rng,[[3,4,5],[5,12,13],[6,8,10],[8,15,17],[7,24,25],[9,12,15]]);
    const [a,b,c]=triples;
    const missing=pick(rng,["leg","hyp"]);
    if(missing==="hyp") return makeQuestion(rng,
      `A right triangle has legs ${a} and ${b}. What is the hypotenuse?`,c,
      [a+b,Math.abs(a-b),a*a+b*b],
      `By the Pythagorean theorem, c=√(${a}²+${b}²)=√${a*a+b*b}=${c}.`);
    return makeQuestion(rng,
      `A right triangle has hypotenuse ${c} and one leg ${a}. What is the other leg?`,b,
      [c-a,Math.sqrt(c*c+a*a).toFixed(1),a+b],
      `The missing leg is √(${c}²−${a}²)=√${c*c-a*a}=${b}.`);
  }

  function qDistanceMidpoint(rng) {
    const x1=ri(rng,-6,2), y1=ri(rng,-6,2), dx=pick(rng,[3,4,6,8]), dy=pick(rng,[0,3,4,6]);
    const x2=x1+dx, y2=y1+dy, askMid=rng()<.5;
    if(askMid){
      const correct=`(${fmt((x1+x2)/2)}, ${fmt((y1+y2)/2)})`;
      return makeQuestion(rng,`Find the midpoint of <span class="math-display">(${x1},${y1})</span> and <span class="math-display">(${x2},${y2})</span>.`,correct,
        [`(${x2-x1}, ${y2-y1})`,`(${x1+x2}, ${y1+y2})`,`(${fmt((x2-x1)/2)}, ${fmt((y2-y1)/2)})`],
        `Average corresponding coordinates: ${tex(String.raw`\left(\frac{${x1}${x2>=0?'+':'-'}${Math.abs(x2)}}{2},\frac{${y1}${y2>=0?'+':'-'}${Math.abs(y2)}}{2}\right)=${correct}`)}.`);
    }
    const dist=Math.sqrt(dx*dx+dy*dy), correct=Number.isInteger(dist)?String(dist):`√${dx*dx+dy*dy}`;
    return makeQuestion(rng,`Find the distance between <span class="math-display">(${x1},${y1})</span> and <span class="math-display">(${x2},${y2})</span>.`,correct,
      [String(dx+dy),String(Math.abs(dx-dy)),String(dx*dx+dy*dy)],
      `Distance = √[(${x2}−${x1})²+(${y2}−${y1})²] = √${dx*dx+dy*dy}${Number.isInteger(dist)?` = ${dist}`:""}.`);
  }

  function qAngles(rng) {
    const a=ri(rng,25,155), type=pick(rng,["supplement","complement","vertical"]);
    let correct, prompt;
    if(type==="supplement") { correct=180-a; prompt=`Two angles form a linear pair. One angle measures ${a}°. What is the other angle?`; }
    else if(type==="complement") { const aa=Math.min(a,85); correct=90-aa; prompt=`Two angles are complementary. One angle measures ${aa}°. What is the other angle?`; }
    else { correct=a; prompt=`Two lines intersect. One angle measures ${a}°. What is the measure of its vertical angle?`; }
    return makeQuestion(rng,prompt,`${correct}°`,[`${180-correct}°`,`${90-correct}°`,`${correct+10}°`],
      type==="supplement"?`A linear pair sums to 180°, so 180−${a}=${correct}°.`:type==="complement"?`Complementary angles sum to 90°, so the missing angle is ${correct}°.`:`Vertical angles are congruent, so the measure is ${correct}°.`);
  }

  function qPolygonAngles(rng) {
    const n=ri(rng,4,10), askInterior=rng()<.6;
    if(askInterior){
      const sum=(n-2)*180;
      return makeQuestion(rng,`What is the sum of the interior angles of a ${n}-gon?`,`${sum}°`,
        [`${n*180}°`,`${(n-1)*180}°`,`${360}°`],
        `The sum is (n−2)180° = (${n}−2)180° = ${sum}°.`);
    }
    const ext=360/n;
    if(!Number.isInteger(ext)) return qPolygonAngles(rng);
    return makeQuestion(rng,`A regular ${n}-gon has one exterior angle at each vertex. What is each exterior angle?`,`${ext}°`,
      [`${180-ext}°`,`${n*180}°`,`${360-ext}°`],
      `The exterior angles sum to 360°, so each is 360°/${n} = ${ext}°.`);
  }

  function qSimilarityScale(rng) {
    const scale=pick(rng,[1.5,2,2.5,3,4]), side=ri(rng,3,12), image=side*scale;
    return makeQuestion(rng,
      `Two figures are similar. A side of length ${side} in the smaller figure corresponds to a side of length ${fmt(image)} in the larger figure. A second side in the smaller figure is ${side+2}. What is the corresponding larger length?`,
      fmt((side+2)*scale),
      [fmt(side+2+scale),fmt((side+2)/scale),fmt(image+2)],
      `The scale factor is ${fmt(image)}/${side}=${scale}. Multiply ${side+2} by ${scale} to get ${fmt((side+2)*scale)}.`);
  }

  function qTransformation(rng) {
    const x=ri(rng,-5,5), y=ri(rng,-5,5), type=pick(rng,["reflect-x","reflect-y","rotate180","translate"]);
    let correct, prompt, explanation;
    if(type==="reflect-x") { correct=`(${x}, ${-y})`; prompt=`Point (${x},${y}) is reflected across the x-axis. What is its image?`; explanation=`Reflection across the x-axis keeps x and changes the sign of y: (${x},${-y}).`; }
    else if(type==="reflect-y") { correct=`(${-x}, ${y})`; prompt=`Point (${x},${y}) is reflected across the y-axis. What is its image?`; explanation=`Reflection across the y-axis changes the sign of x and keeps y: (${-x},${y}).`; }
    else if(type==="rotate180") { correct=`(${-x}, ${-y})`; prompt=`Point (${x},${y}) is rotated 180° about the origin. What is its image?`; explanation=`A 180° rotation maps (x,y) to (−x,−y), giving (${-x},${-y}).`; }
    else { const a=ri(rng,-4,5), b=ri(rng,-4,5); correct=`(${x+a}, ${y+b})`; prompt=`Point (${x},${y}) is translated by the vector ⟨${a},${b}⟩. What is its image?`; explanation=`Add the vector components: ${tex(`(${x}${a>=0?'+':'-'}${Math.abs(a)},${y}${b>=0?'+':'-'}${Math.abs(b)})`)} gives ${tex(correct)}.`; }
    return makeQuestion(rng,prompt,correct,[`(${-x}, ${y})`,`(${x}, ${-y})`,`(${-x}, ${-y})`].filter(v=>v!==correct).concat(`(${x+1}, ${y+1})`),explanation);
  }

  function qUnitConversion(rng) {
    const type=pick(rng,["length","mass","time","capacity"]);
    let prompt, correct, distractors, explanation;
    if(type==="length") { const feet=ri(rng,3,20); correct=feet*12; prompt=`How many inches are in ${feet} feet?`; distractors=[feet/12,feet+12,feet*3]; explanation=`There are 12 inches in each foot, so ${feet}×12=${correct} inches.`; }
    else if(type==="mass") { const kg=ri(rng,2,14); correct=kg*1000; prompt=`How many grams are in ${kg} kilograms?`; distractors=[kg*100,kg/1000,kg+1000]; explanation=`1 kilogram = 1000 grams, so ${kg}×1000=${correct} grams.`; }
    else if(type==="time") { const hours=ri(rng,2,12); correct=hours*60; prompt=`How many minutes are in ${hours} hours?`; distractors=[hours*100,hours+60,hours/60]; explanation=`1 hour = 60 minutes, so ${hours}×60=${correct} minutes.`; }
    else { const gal=ri(rng,2,8); correct=gal*4; prompt=`How many quarts are in ${gal} gallons?`; distractors=[gal*2,gal*8,gal+4]; explanation=`1 gallon = 4 quarts, so ${gal}×4=${correct} quarts.`; }
    return makeQuestion(rng,prompt,correct,distractors,explanation);
  }

  function qDimensionalAnalysis(rng) {
    const speed=ri(rng,35,75), hours=ri(rng,2,6), correct=speed*hours;
    return makeQuestion(rng,
      `A car travels at an average speed of ${speed} miles per hour for ${hours} hours. How far does it travel?`,
      `${correct} miles`,
      [`${fmt(speed/hours)} miles`,`${speed+hours} miles`,`${speed-hours} miles`],
      `Distance = rate × time. The units confirm the setup: (miles/hour)(hours) = miles, so ${speed}×${hours}=${correct} miles.`);
  }

  function qMeasurementError(rng) {
    const actual=pick(rng,[20,25,40,50,80,100]), measured=actual+pick(rng,[-4,-2,-1,1,2,4]);
    const error=Math.abs(measured-actual)/actual*100;
    return makeQuestion(rng,
      `A length is measured as ${measured} cm, but its actual length is ${actual} cm. What is the percent error?`,
      `${fmt(error,2)}%`,
      [`${Math.abs(measured-actual)}%`,`${fmt(Math.abs(measured-actual)/measured*100,2)}%`,`${fmt((measured+actual)/actual,2)}%`],
      `Percent error = |measured−actual|/actual ×100% = ${Math.abs(measured-actual)}/${actual}×100% = ${fmt(error,2)}%.`);
  }

  // ---------- Probability and statistics generators ----------
  function qMeanMedian(rng) {
    const vals=Array.from({length:5},()=>ri(rng,4,24)).sort((a,b)=>a-b);
    const askMean=rng()<.5;
    const mean=vals.reduce((s,x)=>s+x,0)/vals.length, median=vals[2];
    const correct=askMean?fmt(mean,2):median;
    return makeQuestion(rng,
      `For the data set ${vals.join(", ")}, what is the ${askMean?"mean":"median"}?`,
      correct,
      askMean?[median,vals.reduce((s,x)=>s+x,0),fmt((vals[0]+vals[4])/2,2)]:[fmt(mean,2),vals[0],vals[4]-vals[0]],
      askMean?`The sum is ${vals.reduce((s,x)=>s+x,0)}. Divide by 5 to get ${fmt(mean,2)}.`:`The ordered list has five values, so the middle (third) value is ${median}.`);
  }

  function qWeightedMean(rng) {
    const score1=ri(rng,65,95), score2=ri(rng,65,95), w1=pick(rng,[20,30,40]), w2=100-w1;
    const correct=(score1*w1+score2*w2)/100;
    return makeQuestion(rng,
      `A course grade is ${w1}% exams and ${w2}% projects. A student has an exam average of ${score1} and a project average of ${score2}. What is the weighted average?`,
      fmt(correct,1),
      [fmt((score1+score2)/2,1),fmt(score1*w1/100+score2*w1/100,1),fmt(score1+score2*w2/100,1)],
      `Weighted average = ${score1}(${w1/100}) + ${score2}(${w2/100}) = ${fmt(correct,1)}.`);
  }

  function qRangeIqr(rng) {
    const vals=Array.from({length:7},()=>ri(rng,2,30)).sort((a,b)=>a-b);
    const askRange=rng()<.55;
    const range=vals[6]-vals[0], q1=vals[1], q3=vals[5], iqr=q3-q1;
    const correct=askRange?range:iqr;
    return makeQuestion(rng,
      `For the ordered data set ${vals.join(", ")}, what is the ${askRange?"range":"interquartile range (IQR)"}?`,
      correct,
      askRange?[vals[6],vals[0],iqr]:[range,q3,q1],
      askRange?`Range = maximum−minimum = ${vals[6]}−${vals[0]}=${range}.`:`For seven values, Q1=${q1} and Q3=${q3}. Thus IQR=${q3}−${q1}=${iqr}.`);
  }

  function qSimpleProbability(rng) {
    const red=ri(rng,2,9), blue=ri(rng,2,9), green=ri(rng,1,7), total=red+blue+green;
    const color=pick(rng,["red","blue","green"]), count=color==="red"?red:color==="blue"?blue:green;
    const correct=frac(count,total);
    return makeQuestion(rng,
      `A bag contains ${red} red, ${blue} blue, and ${green} green marbles. One marble is selected at random. What is P(${color})?`,
      correct,
      [frac(count,total-count),frac(1,3),frac(total-count,total)],
      `There are ${total} equally likely marbles and ${count} favorable outcomes, so P(${color})=${count}/${total}=${correct}.`);
  }

  function qCompoundProbability(rng) {
    const sides=pick(rng,[4,6,8,10]), target=ri(rng,1,sides), coin=rng()<.5;
    const correct=frac(1,sides*2);
    return makeQuestion(rng,
      `A fair ${sides}-sided number cube and a fair coin are used. What is the probability of rolling ${target} and getting ${coin?"heads":"tails"}?`,
      correct,
      [frac(1,sides),frac(1,2),frac(2,sides)],
      `The events are independent: (1/${sides})(1/2)=1/${sides*2}=${correct}.`);
  }

  function qWithoutReplacement(rng) {
    const red=ri(rng,3,7), blue=ri(rng,2,6), total=red+blue;
    const correct=frac(red,total)*1; // placeholder numeric not used
    const corr=frac(red*(red-1),total*(total-1));
    return makeQuestion(rng,
      `A bag has ${red} red and ${blue} blue marbles. Two marbles are drawn without replacement. What is the probability both are red?`,
      corr,
      [frac(red*red,total*total),frac(red,total),frac(red*blue,total*(total-1))],
      `P(red then red)=(${red}/${total})((${red}-1)/(${total}-1))=${red}/${total}×${red-1}/${total-1}=${corr}.`);
  }

  function qCounting(rng) {
    const n=ri(rng,5,9), r=pick(rng,[2,3]);
    const factorial=k=>Array.from({length:k},(_,i)=>i+1).reduce((a,b)=>a*b,1);
    const comb=factorial(n)/(factorial(r)*factorial(n-r));
    return makeQuestion(rng,
      `How many different committees of ${r} people can be selected from ${n} people?`,
      comb,
      [n*r,factorial(n)/factorial(n-r),n+r],
      `Order does not matter, so use combinations: C(${n},${r}) = ${n}!/[${r}!(${n-r})!] = ${comb}.`);
  }

  function qSetProbability(rng) {
    const total=100, a=ri(rng,35,65), b=ri(rng,30,60), both=ri(rng,Math.max(5,a+b-total),Math.min(a,b)-5);
    const union=a+b-both;
    return makeQuestion(rng,
      `In a group of 100 people, ${a} like tea, ${b} like coffee, and ${both} like both. How many like tea or coffee?`,
      union,
      [a+b,both,100-union],
      `Use inclusion–exclusion: |T∪C|=|T|+|C|−|T∩C|=${a}+${b}−${both}=${union}.`);
  }

  function qConditionalProbability(rng) {
    const group=ri(rng,20,50), favorable=ri(rng,5,group-5);
    return makeQuestion(rng,
      `Among ${group} students who completed a review course, ${favorable} passed an exam. If one review-course student is selected, what is the probability the student passed?`,
      frac(favorable,group),
      [frac(favorable,100),frac(group-favorable,group),frac(group,favorable)],
      `The condition restricts the sample space to the ${group} review-course students. Thus the probability is ${favorable}/${group}=${frac(favorable,group)}.`);
  }

  function qCorrelation(rng) {
    const scenario=pick(rng,[
      ["hours studied","exam score","positive"], ["outside temperature","home heating use","negative"],
      ["shoe size","number of books read","approximately zero"], ["age of a used car","resale value","negative"],
      ["distance driven","fuel used","positive"], ["daily exercise time","resting heart rate","negative"],
      ["height","arm span","positive"], ["time since a hot drink was poured","temperature of the drink","negative"],
      ["student identification number","mathematics score","approximately zero"], ["number of practice problems completed","quiz score","positive"],
      ["altitude","air pressure","negative"], ["calendar day of birth","typing speed","approximately zero"]
    ]);
    return makeQuestion(rng,
      `What type of correlation would most reasonably be expected between ${scenario[0]} and ${scenario[1]}?`,
      scenario[2],
      ["positive","negative","approximately zero"].filter(x=>x!==scenario[2]).concat("perfectly positive"),
      `As ${scenario[0]} increases, ${scenario[1]} would generally ${scenario[2]==="positive"?"increase":scenario[2]==="negative"?"decrease":"show no consistent linear change"}, so the expected correlation is ${scenario[2]}.`);
  }

  function qNormalRule(rng) {
    const mean=pick(rng,[50,60,70,80,100]), sd=pick(rng,[5,10,12]), k=pick(rng,[1,2]);
    const pct=k===1?68:95;
    return makeQuestion(rng,
      `A roughly normal distribution has mean ${mean} and standard deviation ${sd}. About what percent of observations lie between ${mean-k*sd} and ${mean+k*sd}?`,
      `${pct}%`,
      k===1?["50%","95%","99.7%"]:["68%","75%","99.7%"],
      `The interval is within ${k} standard deviation${k===1?"":"s"} of the mean. By the empirical rule, about ${pct}% of observations lie there.`);
  }

  function qSamplingInference(rng) {
    const scenarios=[
      ["A random sample of 500 registered voters is used to estimate statewide support.","reasonable if the sampling method is representative"],
      ["Only visitors to a candidate's website are surveyed about statewide support.","likely biased because the sample is self-selected"],
      ["Every tenth item from a production line is inspected.","a systematic sample that can be useful if no periodic pattern interferes"],
      ["The first 30 students entering a gym are used to estimate all students' exercise habits.","likely biased because it is a convenience sample"],
      ["Students are divided by grade level, and a random sample is taken from every grade.","a stratified design that can ensure representation of each grade"],
      ["Ten classrooms are randomly selected, and every student in those classrooms is surveyed.","a cluster sample based on naturally occurring groups"],
      ["A school surveys only students who volunteer after seeing a social-media post.","likely biased because the sample is self-selected"],
      ["A random-number generator selects 80 student IDs from the complete school roster.","a simple random sample if every roster entry has an equal chance"],
      ["A researcher surveys every 25th customer after a random starting point.","a systematic sample that can be useful if no periodic pattern interferes"],
      ["A district samples teachers separately from elementary, middle, and high schools in proportion to staff counts.","a stratified design that can improve representation across school levels"],
      ["A poll about cafeteria quality is conducted only during lunch in the honors hallway.","likely biased because the sampling location is not representative"],
      ["Five schools are randomly selected and all teachers at those schools are surveyed.","a cluster sample based on naturally occurring groups"]
    ];
    const [prompt,correct]=pick(rng,scenarios);
    return makeQuestion(rng,`${prompt} Which conclusion best describes the design?`,correct,
      scenarios.map(x=>x[1]).filter(x=>x!==correct).slice(0,3),
      `The key issue is how the sample was selected. ${correct.charAt(0).toUpperCase()+correct.slice(1)}.`);
  }

  // ---------- Processes, modeling, and financial mathematics ----------
  function qSimpleInterest(rng) {
    const p=pick(rng,[200,400,500,800,1000]), r=pick(rng,[3,4,5,6,8]), t=ri(rng,1,5), interest=p*r/100*t;
    return makeQuestion(rng,
      `${money(p)} is invested at ${r}% simple interest for ${t} year${t===1?"":"s"}. How much interest is earned?`,
      money(interest),
      [money(p*(1+r/100)**t-p),money(p*r/100),money(p+interest)],
      `Simple interest is I=Prt=${p}(${r/100})(${t})=${money(interest)}.`);
  }

  function qBudget(rng) {
    const income=pick(rng,[1800,2200,2500,3000,3600]), rent=Math.round(income*.35), food=Math.round(income*.15), transport=Math.round(income*.1), other=ri(rng,150,350);
    const remaining=income-rent-food-transport-other;
    return makeQuestion(rng,
      `A monthly income is ${money(income)}. Expenses are ${money(rent)} for rent, ${money(food)} for food, ${money(transport)} for transportation, and ${money(other)} for other costs. How much remains?`,
      money(remaining),
      [money(income-rent-food),money(rent+food+transport+other),money(remaining+other)],
      `Total expenses are ${money(rent+food+transport+other)}. Subtract from income: ${money(income)}−${money(rent+food+transport+other)}=${money(remaining)}.`);
  }

  function qEstimation(rng) {
    const a=ri(rng,42,98), b=ri(rng,18,49), c=ri(rng,3,8);
    const exact=(a+b)*c;
    const estimate=Math.round(a/10)*10+Math.round(b/10)*10;
    const est=estimate*c;
    return makeQuestion(rng,
      `Which is the best estimate of <span class="math-display">(${a}+${b})×${c}</span>?`,
      est,
      [exact,Math.round(a/10)*10+Math.round(b/10)*10*c,(a+b)*10],
      `Round ${a} and ${b} to nearby tens: (${Math.round(a/10)*10}+${Math.round(b/10)*10})×${c}=${est}.`);
  }

  function qLogicCounterexample(rng) {
    const claims=[
      ["The sum of two prime numbers is always even.","2 + 3 = 5"], ["The product of two negative integers is negative.","(−2)(−3) = 6"],
      ["Every rectangle is a square.","a 2-by-5 rectangle"], ["If x² = 16, then x = 4.","x = −4"],
      ["Every increasing function has a positive derivative everywhere.","f(x)=x³ at x=0"], ["The sum of two irrational numbers is irrational.","√2 + (−√2) = 0"],
      ["The product of two irrational numbers is irrational.","√2·√2 = 2"], ["Every differentiable function is one-to-one.","f(x)=x²"],
      ["Every bounded sequence converges.","aₙ=(−1)ⁿ"], ["If ab=0, then a=0 and b=0.","a=0, b=5"],
      ["Every quadrilateral with four equal sides is a square.","a non-square rhombus"], ["Every sequence with infinitely many terms is unbounded.","aₙ=1/n"]
    ];
    const [claim,correct]=pick(rng,claims);
    return makeQuestion(rng,`Which is a counterexample to the claim: “${claim}”`,correct,
      claims.map(x=>x[1]).filter(x=>x!==correct).slice(0,3),
      `A counterexample must satisfy the hypothesis but make the conclusion false. ${correct} does exactly that.`);
  }

  function qReasonableness(rng) {
    const price=ri(rng,15,80), qty=ri(rng,3,12), quoted=price*qty+pick(rng,[100,200,-100]);
    const exact=price*qty;
    return makeQuestion(rng,
      `${qty} items cost about ${money(price)} each. A calculator display shows a total of ${money(quoted)}. Which statement is best?`,
      `The display is unreasonable; the total should be about ${money(exact)}.`,
      [`The display is reasonable because ${qty}+${price}=${qty+price}.`,`The display is exact because calculators cannot make input errors.`,`The total should be about ${money(price/qty)}.`],
      `Estimate with multiplication: ${qty}×${price}≈${exact}. The displayed value ${quoted} is far from that estimate, so it is unreasonable.`);
  }

  function qProportionalModel(rng) {
    const rate=ri(rng,2,12), x=ri(rng,3,10), y=rate*x;
    return makeQuestion(rng,
      `A quantity y varies directly with x. When x=${x}, y=${y}. Which equation models the relationship?`,
      `y = ${rate}x`,
      [`y = x + ${rate}`,`y = ${y}x`,`y = x/${rate}`],
      `Direct variation has form y=kx. Here k=y/x=${y}/${x}=${rate}, so y=${rate}x.`);
  }

  function qPatternReasoning(rng) {
    const start=ri(rng,1,8), d=ri(rng,2,7), vals=[0,1,2,3].map(i=>start+i*d);
    const correct=vals[3]+d;
    return makeQuestion(rng,`What is the next number in the pattern ${vals.join(", ")}, … ?`,correct,
      [vals[3]+start,vals[3]*2,vals[3]+d+1],
      `Each term increases by ${d}, so the next term is ${vals[3]}+${d}=${correct}.`);
  }

  function qDifferenceSquares(rng) {
    const a=ri(rng,2,9), b=ri(rng,2,12);
    const correct=`(${a}x − ${b})(${a}x + ${b})`;
    return makeQuestion(rng,
      `Factor <span class="math-display">${a*a}x<sup>2</sup> − ${b*b}</span>.`,
      correct,
      [`(${a}x − ${b})<sup>2</sup>`,`(${a}x + ${b})<sup>2</sup>`,`(${a*a}x − ${b})(${a*a}x + ${b})`],
      `This is a difference of squares: (${a}x)²−${b}²=(${a}x−${b})(${a}x+${b}).`);
  }

  function qFunctionDomain(rng) {
    const a=ri(rng,-6,6);
    const type=rng()<.5?"radical":"rational";
    if(type==="radical"){
      const correct=`x ≥ ${-a}`;
      return makeQuestion(rng,
        `What is the domain of <span class="math-display">f(x)=√(x ${a>=0?"+":"−"} ${Math.abs(a)})</span>?`,
        correct,
        [`x > ${a}`,`x ≠ ${-a}`,"all real numbers"],
        `The expression inside the square root must be nonnegative: x+(${a})≥0, so ${correct}.`);
    }
    const correct=`all real x except ${-a}`;
    return makeQuestion(rng,
      `What is the domain of <span class="math-display">f(x)=1/(x ${a>=0?"+":"−"} ${Math.abs(a)})</span>?`,
      correct,
      [`x ≥ ${-a}`,`x > ${a}`,"all real numbers"],
      `The denominator cannot be zero. x+(${a})≠0, so x≠${-a}.`);
  }

  function qAbsoluteValueEquation(rng) {
    const center=ri(rng,-6,6), dist=ri(rng,2,9);
    const r1=center-dist, r2=center+dist;
    return makeQuestion(rng,
      `Solve <span class="math-display">|x ${center>=0?"−":"+"} ${Math.abs(center)}| = ${dist}</span>.`,
      `x = ${r1} or x = ${r2}`,
      [`x = ${center} only`,`x = ${dist} or x = ${-dist}`,`x = ${r1+r2}`],
      `An absolute-value distance of ${dist} from ${center} gives x=${center}−${dist}=${r1} or x=${center}+${dist}=${r2}.`);
  }

  function qTrigExact(rng) {
    const cases=[
      ["sin(30°)","1/2"],["cos(60°)","1/2"],["sin(45°)","√2/2"],
      ["cos(45°)","√2/2"],["tan(45°)","1"],["sin(90°)","1"],
      ["cos(0°)","1"],["tan(0°)","0"]
    ];
    const [expr,correct]=pick(rng,cases);
    return makeQuestion(rng,`Evaluate <span class="math-display">${expr}</span>.`,correct,
      shuffle(rng,["0","1/2","√2/2","√3/2","1"]).filter(x=>x!==correct).slice(0,3),
      `From the unit circle or special right triangles, ${expr}=${correct}.`);
  }

  function qLimitSequence(rng) {
    const L=ri(rng,-4,8), c=ri(rng,2,12);
    return makeQuestion(rng,
      `The sequence is defined by <span class="math-display">a<sub>n</sub> = ${L} + ${c}/n</span>. What value does a<sub>n</sub> approach as n becomes very large?`,
      L,
      [c,L+c,0],
      `As n grows, ${c}/n approaches 0. Therefore aₙ approaches ${L}+0=${L}.`);
  }

  function qAreaUnderConstant(rng) {
    const rate=ri(rng,2,12), time=ri(rng,3,10), area=rate*time;
    return makeQuestion(rng,
      `A graph of velocity versus time is the horizontal line <span class="math-display">v=${rate}</span> from t=0 to t=${time}. What distance is represented by the area under the graph?`,
      area,
      [rate+time,rate/time,2*(rate+time)],
      `The area is a rectangle with height ${rate} and width ${time}, so distance=${rate}×${time}=${area}.`);
  }

  function qInstantaneousRate(rng) {
    const a=ri(rng,-4,6), slope=2*a;
    return makeQuestion(rng,
      `For <span class="math-display">f(x)=x<sup>2</sup></span>, the slope of the tangent line at x=${a} is given by f′(${a}). What is this instantaneous rate of change?`,
      slope,
      [a*a,a,slope+1],
      `For f(x)=x², f′(x)=2x. Thus f′(${a})=2(${a})=${slope}.`);
  }

  // ---------- Additional Mathematics 7–12 generators ----------
  function qBaseConversion(rng) {
    const base = pick(rng,[2,3,4,5,8]);
    const a=ri(rng,1,Math.min(base-1,4)), b=ri(rng,0,base-1), c=ri(rng,0,base-1);
    const numeral=`${a}${b}${c}`;
    const correct=a*base*base+b*base+c;
    return makeQuestion(rng,
      `What is <span class="math-display">(${numeral})<sub>${base}</sub></span> in base ten?`,
      correct,[a*base+b+c,a*base*base+b+c,(a+b+c)*base],
      `Expand by place value: ${a}(${base}²)+${b}(${base})+${c}=${correct}.`);
  }

  function qFieldProperty(rng) {
    const cases=[
      [String.raw`a(b+c)=ab+ac`,`distributive property`],
      [String.raw`a+0=a`,`additive identity property`],
      [String.raw`a+(-a)=0`,`additive inverse property`],
      [String.raw`ab=ba`,`commutative property of multiplication`],
      [String.raw`(ab)c=a(bc)`,`associative property of multiplication`],
      [String.raw`a+ b=b+a`,`commutative property of addition`],
      [String.raw`(a+b)+c=a+(b+c)`,`associative property of addition`],
      [String.raw`a\cdot1=a`,`multiplicative identity property`],
      [String.raw`a\ne0\Rightarrow a a^{-1}=1`,`multiplicative inverse property`]
    ];
    const [stmt,correct]=pick(rng,cases);
    return makeQuestion(rng,`Which field property is illustrated by ${tex(stmt)}?`,correct,
      [`closure property`,`multiplicative inverse property`,`commutative property of addition`,`associative property of addition`,`distributive property`].filter(x=>x!==correct).slice(0,3),
      `The displayed equation is an instance of the ${correct}.`);
  }

  function qClosure(rng) {
    const sets=[
      [`integers`,`division`,`not closed`,`1 ÷ 2 is not an integer`],
      [`irrational numbers`,`addition`,`not closed`,`√2 + (−√2)=0, which is rational`],
      [`rational numbers`,`multiplication`,`closed`,`the product of two rational numbers is rational`],
      [`real numbers`,`square roots`,`not closed`,`√(−1) is not real`],
      [`even integers`,`addition`,`closed`,`the sum of two even integers is even`]
    ];
    const [set,op,correct,why]=pick(rng,sets);
    return makeQuestion(rng,`Under ${op}, the set of ${set} is`,correct,
      [`closed`,`not closed`,`closed only for positive elements`,`closed only when the operands are unequal`].filter(x=>x!==correct),
      `It is ${correct} because ${why}.`);
  }

  function qComplexConjugate(rng) {
    const a=ri(rng,-8,8), b=ri(rng,1,9);
    const sign=b>=0?"+":"−";
    const z=`${a} ${sign} ${Math.abs(b)}i`;
    const correct=`${a} − ${Math.abs(b)}i`;
    return makeQuestion(rng,`What is the complex conjugate of <span class="math-display">${z}</span>?`,correct,
      [`${-a} + ${Math.abs(b)}i`,`${-a} − ${Math.abs(b)}i`,`${a} + ${Math.abs(b)}i`],
      `The conjugate keeps the real part and reverses the sign of the imaginary part, giving ${correct}.`);
  }

  function qComplexModulus(rng) {
    const triples=pick(rng,[[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
    const a=(rng()<.5?-1:1)*triples[0], b=(rng()<.5?-1:1)*triples[1], m=triples[2];
    return makeQuestion(rng,`Find <span class="math-display">|${a}${b>=0?"+":"−"}${Math.abs(b)}i|</span>.`,m,
      [Math.abs(a)+Math.abs(b),a*a+b*b,Math.abs(a-b)],
      `For z=a+bi, |z|=√(a²+b²). Thus √(${a*a}+${b*b})=√${m*m}=${m}.`);
  }

  function qComplexPolar(rng) {
    const cases=[
      [`1+i`,`√2(cos 45° + i sin 45°)`],
      [`−1+i`,`√2(cos 135° + i sin 135°)`],
      [`−1−i`,`√2(cos 225° + i sin 225°)`],
      [`1−i`,`√2(cos 315° + i sin 315°)`],
      [`2i`,`2(cos 90° + i sin 90°)`]
    ];
    const [z,correct]=pick(rng,cases);
    return makeQuestion(rng,`Which is a polar form of <span class="math-display">${z}</span>?`,correct,
      [`√2(cos 30° + i sin 30°)`,`2(cos 180° + i sin 180°)`,`1(cos 90° + i sin 90°)`,`√2(cos 315° + i sin 315°)`].filter(x=>x!==correct),
      `The modulus and argument of ${z} give ${correct}.`);
  }

  function qModularArithmetic(rng) {
    const m=pick(rng,[5,7,8,9,11]), a=ri(rng,10,40), b=ri(rng,8,30);
    const correct=(a*b)%m;
    return makeQuestion(rng,`What is <span class="math-display">${a}·${b} (mod ${m})</span>?`,correct,
      [(a+b)%m,Math.abs(a-b)%m,(a*b)% (m+1)],
      `${a}·${b}=${a*b}. Dividing by ${m} leaves remainder ${correct}.`);
  }

  function qEuclideanAlgorithm(rng) {
    const pairs=pick(rng,[[252,105,21],[414,662,2],[391,299,23],[144,89,1],[270,192,6]]);
    const [a,b,g]=pairs;
    return makeQuestion(rng,`Use the Euclidean algorithm to find <span class="math-display">gcd(${a},${b})</span>.`,g,
      [Math.abs(a-b),g*2,Math.min(a,b)],
      `Repeated division produces a final nonzero remainder of ${g}, so gcd(${a},${b})=${g}.`);
  }

  function qMatrixDeterminant(rng) {
    const a=ri(rng,-5,6),b=ri(rng,-5,6),c=ri(rng,-5,6),d=ri(rng,-5,6);
    const correct=a*d-b*c;
    return makeQuestion(rng,`Find the determinant of <span class="math-display">[[${a}, ${b}], [${c}, ${d}]]</span>.`,correct,
      [a*d+b*c,a+b+c+d,a*c-b*d],
      `For a 2×2 matrix, det=ad−bc. Here ${a}(${d})−${b}(${c})=${correct}.`);
  }

  function qArithmeticSeries(rng) {
    const a1=ri(rng,2,10), d=ri(rng,2,7), n=ri(rng,6,15);
    const an=a1+(n-1)*d, correct=n*(a1+an)/2;
    return makeQuestion(rng,`Find the sum of the first ${n} terms of the arithmetic sequence with a₁=${a1} and d=${d}.`,correct,
      [an,n*an,(a1+an)/2],
      `aₙ=${a1}+(${n}−1)${d}=${an}. Then Sₙ=n(a₁+aₙ)/2=${n}(${a1}+${an})/2=${correct}.`);
  }

  function qGeometricSeries(rng) {
    const a=pick(rng,[2,3,4,6]), r=pick(rng,[0.25,0.5,-0.5]);
    const correct=fmt(a/(1-r),3);
    return makeQuestion(rng,`Find the sum of the infinite geometric series with first term ${a} and common ratio ${r}.`,correct,
      [fmt(a*(1-r),3),fmt(a/(1+r),3),fmt(a*r,3)],
      `Because |r|<1, S=a/(1−r)=${a}/(1−(${r}))=${correct}.`);
  }

  function qRecursiveSequence(rng) {
    const a1=ri(rng,1,6), k=ri(rng,2,5), c=ri(rng,-3,4);
    const vals=[a1]; for(let i=1;i<4;i++) vals.push(k*vals[i-1]+c);
    const correct=vals[3];
    return makeQuestion(rng,`A sequence is defined by a₁=${a1} and aₙ=${k}aₙ₋₁ ${c>=0?"+":"−"} ${Math.abs(c)}. What is a₄?`,correct,
      [vals[2],k*a1+3*c,a1*k*k*k],
      `Apply the recursion successively: a₂=${vals[1]}, a₃=${vals[2]}, and a₄=${correct}.`);
  }

  function qInductionStep(rng) {
    const cases=[
      [`1+2+⋯+n=n(n+1)/2`,`assume the formula for n=k and prove it for n=k+1`],
      [`1+3+⋯+(2n−1)=n²`,`assume the identity for n=k and add 2k+1`],
      [`2ⁿ≥n+1 for n≥0`,`assume 2ᵏ≥k+1 and show 2ᵏ⁺¹≥k+2`],
      [`1²+2²+⋯+n²=n(n+1)(2n+1)/6`,`assume the formula for n=k and add (k+1)²`],
      [`3 divides n³−n for every positive integer n`,`assume divisibility for k and analyze (k+1)³−(k+1)`],
      [`5ⁿ−1 is divisible by 4 for n≥1`,`assume 5ᵏ−1 is divisible by 4 and rewrite 5ᵏ⁺¹−1`],
      [`n!≥2ⁿ⁻¹ for n≥1`,`assume the inequality at k and multiply by k+1 to reach k+1`],
      [`7 divides 8ⁿ−1 for n≥1`,`assume 8ᵏ−1 is divisible by 7 and rewrite 8ᵏ⁺¹−1`],
      [`1+2+4+⋯+2ⁿ=2ⁿ⁺¹−1`,`assume the sum formula for n=k and add 2ᵏ⁺¹`],
      [`n³+2n is divisible by 3 for every positive integer n`,`assume the claim at k and compare the expression at k+1`],
      [`6 divides n(n+1)(n+2) for every nonnegative integer n`,`assume the product property for k and analyze three consecutive integers at k+1`],
      [`1/2+1/4+⋯+1/2ⁿ=1−1/2ⁿ`,`assume the formula at n=k and add 1/2ᵏ⁺¹`]
    ];
    const [claim,correct]=pick(rng,cases);
    return makeQuestion(rng,`In a proof by induction of <span class="math-display">${claim}</span>, the inductive step should`,correct,
      [`verify only n=1`,`assume the conclusion for every integer without proof`,`prove the statement by checking several examples`,`show the statement is false for one value`],
      `Mathematical induction assumes the statement at k and uses that assumption to establish the statement at k+1.`);
  }

  function qCompoundInterest(rng) {
    const P=pick(rng,[1000,1500,2000,2500]), r=pick(rng,[0.04,0.05,0.06]), n=pick(rng,[1,2,4,12]), t=pick(rng,[2,3,5]);
    const correct=money(P*Math.pow(1+r/n,n*t));
    return makeQuestion(rng,`${money(P)} is invested at ${(100*r).toFixed(0)}% annual interest compounded ${n===1?"annually":n===2?"semiannually":n===4?"quarterly":"monthly"} for ${t} years. What is the balance?`,correct,
      [money(P*(1+r*t)),money(P*Math.pow(1+r,n*t)),money(P*(1+r/n)*n*t)],
      `Use A=P(1+r/n)ⁿᵗ. Substitution gives ${correct}.`);
  }

  function qFunctionTransformation(rng) {
    const h=ri(rng,1,6), k=ri(rng,1,6);
    const cases=[
      [`f(x−${h})+${k}`,`right ${h} and up ${k}`],
      [`f(x+${h})−${k}`,`left ${h} and down ${k}`],
      [`−f(x)+${k}`,`reflect across the x-axis and shift up ${k}`],
      [`f(−x)+${k}`,`reflect across the y-axis and shift up ${k}`]
    ];
    const [expr,correct]=pick(rng,cases);
    return makeQuestion(rng,`Relative to y=f(x), the graph of <span class="math-display">y=${expr}</span> is obtained by moving or reflecting the graph`,correct,
      [`left ${h} and up ${k}`,`right ${h} and down ${k}`,`reflect across the line y=x`,`vertically stretch by ${h}`].filter(x=>x!==correct),
      `Horizontal changes occur inside the input and vertical changes occur outside the function. Therefore the transformation is ${correct}.`);
  }

  function qInverseFunction(rng) {
    const a=pick(rng,[2,3,4,5]), b=ri(rng,-8,8);
    const correct=`(x ${b>=0?"−":"+"} ${Math.abs(b)})/${a}`;
    return makeQuestion(rng,`If <span class="math-display">f(x)=${a}x ${b>=0?"+":"−"} ${Math.abs(b)}</span>, what is f⁻¹(x)?`,correct,
      [`${a}x ${b>=0?"−":"+"} ${Math.abs(b)}`,`(x ${b>=0?"+":"−"} ${Math.abs(b)})/${a}`,`${a}/(x ${b>=0?"−":"+"} ${Math.abs(b)})`],
      `Set y=${a}x${b>=0?"+":"−"}${Math.abs(b)}, interchange x and y, and solve for y. The result is ${correct}.`);
  }

  function qEvenOdd(rng) {
    const cases=[
      [`x⁴−3x²+1`,`even`],[`x⁵−2x³+x`,`odd`],[`x³+x²`,`neither`],[`cos x`,`even`],[`sin x`,`odd`]
    ];
    const [f,correct]=pick(rng,cases);
    return makeQuestion(rng,`Classify <span class="math-display">f(x)=${f}</span>.`,correct,
      [`even`,`odd`,`neither`,`both even and odd`].filter(x=>x!==correct),
      `Evaluate f(−x): an even function satisfies f(−x)=f(x), while an odd function satisfies f(−x)=−f(x). This function is ${correct}.`);
  }

  function qRelationFunction(rng) {
    const sets=[
      [`{(1,2),(2,3),(3,4)}`,`is a function`],
      [`{(1,2),(1,3),(2,4)}`,`is not a function`],
      [`{(−1,2),(0,2),(1,2)}`,`is a function`],
      [`{(2,1),(3,1),(4,1)}`,`is a function`]
    ];
    const [rel,correct]=pick(rng,sets);
    return makeQuestion(rng,`The relation <span class="math-display">${rel}</span>`,correct,
      [`is a function`,`is not a function`,`has no range`,`must be one-to-one`].filter(x=>x!==correct),
      `A relation is a function when each input has exactly one output. Therefore it ${correct}.`);
  }

  function qMatrixSystem(rng) {
    const x=ri(rng,-5,6), y=ri(rng,-5,6);
    const a=pick(rng,[1,2,3]),b=pick(rng,[1,2,4]),c=pick(rng,[1,2,3]);
    let d=pick(rng,[2,3,5]);
    if(a*d-b*c===0) d+=1;
    const e=a*x+b*y,f=c*x+d*y;
    return makeQuestion(rng,`Solve the system <span class="math-display">${a}x+${b}y=${e}<br>${c}x+${d}y=${f}</span>.`,`(${x}, ${y})`,
      [`(${y}, ${x})`,`(${-x}, ${y})`,`(${x}, ${-y})`],
      `Elimination or an inverse-matrix calculation gives x=${x} and y=${y}.`);
  }

  function qRationalAsymptote(rng) {
    const h=ri(rng,-5,5), k=ri(rng,-5,5), a=ri(rng,1,6);
    return makeQuestion(rng,`For <span class="math-display">f(x)=${a}/(x${h>=0?"−":"+"}${Math.abs(h)}) ${k>=0?"+":"−"} ${Math.abs(k)}</span>, what are the vertical and horizontal asymptotes?`,
      `x=${h} and y=${k}`,[`x=${k} and y=${h}`,`x=${-h} and y=${-k}`,`x=0 and y=0`],
      `The denominator is zero at x=${h}, giving the vertical asymptote. The reciprocal term approaches 0, so the horizontal asymptote is y=${k}.`);
  }

  function qPiecewise(rng) {
    const cut=ri(rng,-2,3), a=ri(rng,1,5), b=ri(rng,-4,5), x=pick(rng,[cut-2,cut-1,cut,cut+1,cut+3]);
    const left=x<cut, correct=left?a*x+b:x*x-a;
    const piece=tex(String.raw`f(x)=\begin{cases}${a}x${b>=0?"+":"-"}${Math.abs(b)},&x<${cut}\\x^2-${a},&x\ge ${cut}\end{cases}`);
    return makeQuestion(rng,`Let ${piece}. Find ${tex(`f(${x})`)}.`,correct,
      [left?x*x-a:a*x+b,a*x-b,x*x+a],
      `Since ${tex(`${x}${left?"<":"\\ge"}${cut}`)}, use the ${left?"first":"second"} rule. This gives ${tex(`f(${x})=${correct}`)}.`);
  }

  function qPolynomialEndBehavior(rng) {
    const cases=[
      [`−3x⁵+2x²−1`,`left end up, right end down`],
      [`4x⁶−x+7`,`both ends up`],
      [`−2x⁴+3x`,`both ends down`],
      [`5x³−x²`,`left end down, right end up`]
    ];
    const [poly,correct]=pick(rng,cases);
    return makeQuestion(rng,`What is the end behavior of <span class="math-display">f(x)=${poly}</span>?`,correct,
      [`both ends up`,`both ends down`,`left end up, right end down`,`left end down, right end up`].filter(x=>x!==correct),
      `The leading term determines end behavior. Its degree parity and leading coefficient give ${correct}.`);
  }

  function qLogProperties(rng) {
    const a=ri(rng,2,9),b=ri(rng,2,9);
    return makeQuestion(rng,`Simplify <span class="math-display">log(${a})+log(${b})</span>.`,`log(${a*b})`,
      [`log(${a+b})`,`log(${a}/${b})`,`${a*b}log(1)`],
      `The product rule gives log a+log b=log(ab), so the result is log(${a*b}).`);
  }

  function qContinuousGrowth(rng) {
    const P=pick(rng,[500,1000,1500]), r=pick(rng,[0.03,0.04,0.05]), t=pick(rng,[2,4,6]);
    const correct=money(P*Math.exp(r*t));
    return makeQuestion(rng,`${money(P)} grows continuously at ${(100*r).toFixed(0)}% per year for ${t} years. Find the amount.`,correct,
      [money(P*(1+r*t)),money(P*Math.pow(1+r,t)),money(P*Math.exp(r)*t)],
      `Continuous growth uses A=Peʳᵗ. Thus A=${P}e^(${r}·${t})=${correct}.`);
  }

  function qTrigGraph(rng) {
    const A=pick(rng,[2,3,4]), B=pick(rng,[1,2,3]), C=pick(rng,[0,Math.PI/2]);
    const period=fmt(2*Math.PI/B,3);
    const phase=C===0?"0":fmt(C/B,3);
    return makeQuestion(rng,`For <span class="math-display">y=${A}sin(${B}x−${fmt(C,3)})</span>, what are the amplitude and period?`,
      `amplitude ${A}; period ${period}`,[`amplitude ${B}; period ${fmt(2*Math.PI/A,3)}`,`amplitude ${A}; period ${fmt(Math.PI/B,3)}`,`amplitude ${A*B}; period ${period}`],
      `For y=A sin(Bx−C), amplitude=|A|=${A} and period=2π/|B|=${period}.`);
  }

  function qTrigIdentity(rng) {
    const cases=[
      [`sin²x+cos²x`,`1`],[`1+tan²x`,`sec²x`],[`1−cos²x`,`sin²x`],[`sin x/cos x`,`tan x`]
    ];
    const [expr,correct]=pick(rng,cases);
    return makeQuestion(rng,`Simplify <span class="math-display">${expr}</span>.`,correct,
      [`0`,`1`,`sin x`,`cos x`,`sec²x`,`tan x`].filter(x=>x!==correct),
      `Apply the appropriate Pythagorean or quotient identity to obtain ${correct}.`);
  }

  function qInverseTrig(rng) {
    const cases=[[`sin⁻¹(1/2)`,`30°`],[`cos⁻¹(0)`,`90°`],[`tan⁻¹(1)`,`45°`],[`cos⁻¹(−1)`,`180°`]];
    const [expr,correct]=pick(rng,cases);
    return makeQuestion(rng,`Evaluate the principal value <span class="math-display">${expr}</span>.`,correct,
      [`0°`,`30°`,`45°`,`60°`,`90°`,`180°`].filter(x=>x!==correct),
      `The principal angle with the required trigonometric value is ${correct}.`);
  }

  function qDerivativeRule(rng) {
    const a=ri(rng,2,8), n=ri(rng,2,6), b=ri(rng,-8,8);
    const correct=`${a*n}x^${n-1}${b?` ${b>=0?"+":"−"} ${Math.abs(b)}`:""}`;
    return makeQuestion(rng,`Differentiate <span class="math-display">f(x)=${a}x^${n}${b?` ${b>=0?"+":"−"} ${Math.abs(b)}x`:""}</span>.`,correct,
      [`${a}x^${n-1}${b?` ${b>=0?"+":"−"} ${Math.abs(b)}`:""}`,`${a*n}x^${n}${b?` ${b>=0?"+":"−"} ${Math.abs(b)}`:""}`,`${a+n}x^${n-1}`],
      `Use the power rule: d(axⁿ)/dx=anxⁿ⁻¹, and d(${b}x)/dx=${b}.`);
  }

  function qDefiniteIntegral(rng) {
    const a=ri(rng,1,5), upper=ri(rng,2,6);
    const correct=a*upper*upper/2;
    return makeQuestion(rng,`Evaluate <span class="math-display">∫₀^${upper} ${a}x dx</span>.`,correct,
      [a*upper,a*upper*upper,upper*upper/2],
      `An antiderivative is ${a}/2·x². Evaluating from 0 to ${upper} gives ${correct}.`);
  }

  function qFTC(rng) {
    const a=ri(rng,1,5), at=a===1?"t^2":`${a}t^2`, ax=a===1?"x^2":`${a}x^2`;
    return makeQuestion(rng,`If ${tex(String.raw`F(x)=\int_0^x (${at}+1)\,dt`)}, what is ${tex("F'(x)")}?`,tex(`${ax}+1`),
      [tex(`${2*a}x`),tex(String.raw`\frac{${a}}{3}x^3+x`),tex(`x(${ax}+1)`)],
      `By the Fundamental Theorem of Calculus, the derivative of an integral with variable upper limit is the integrand evaluated at ${tex('x')}.`);
  }

  function qOptimization(rng) {
    const p=pick(rng,[20,24,30,40]);
    const side=p/4, area=side*side;
    return makeQuestion(rng,`A rectangle has perimeter ${p}. What is the greatest possible area?`,area,
      [p*p/2,p*p/8,side],
      `For fixed perimeter, area is maximized by a square. Each side is ${p}/4=${side}, so the maximum area is ${area}.`);
  }

  const qFTCChainAdvanced = markGenerator(function(rng){
    const p=pick(rng,[2,3,4]), c=pick(rng,[1,2,3,5]), mode=pick(rng,['square','linear']);
    if(mode==='square'){
      const integrand=`t^${p}+${c}`;
      const value=`2x\\left(x^${2*p}+${c}\\right)`;
      const polyDistractor=String.raw`\frac{x^{${2*p+2}}}{${p+1}}+${c===1?'':c}x^2`;
      return makeQuestion(rng,`Let ${tex(String.raw`F(x)=\int_1^{x^2}(${integrand})\,dt`)}. What is ${tex("F'(x)")}?`,tex(value),[tex(`x^${2*p}+${c}`),tex(`2x(x^${p}+${c})`),tex(polyDistractor)],`By the Fundamental Theorem of Calculus and the Chain Rule, ${tex(String.raw`F'(x)=\left((x^2)^${p}+${c}\right)(2x)=2x\left(x^${2*p}+${c}\right)`)}.`,advancedMeta('calculus-ftc-chain',4));
    }
    const a=pick(rng,[2,3,4]), b=pick(rng,[1,2,5]);
    const integrand=`t^${p}+${c}`;
    return makeQuestion(rng,`Let ${tex(String.raw`G(x)=\int_0^{${a}x+${b}}(${integrand})\,dt`)}. What is ${tex("G'(x)")}?`,tex(`${a}\\left((${a}x+${b})^${p}+${c}\\right)`),[tex(`(${a}x+${b})^${p}+${c}`),tex(`${a}x^${p}+${c}`),tex(`${p}(${a}x+${b})^${p-1}`)],`Evaluate the integrand at the upper limit and multiply by the derivative of that limit: ${tex(String.raw`G'(x)=\left((${a}x+${b})^${p}+${c}\right)(${a})`)}.`,advancedMeta('calculus-ftc-chain',4));
  },'calculus-ftc-chain',false,4);

  const qOptimizationBoxAdvanced = markGenerator(function(rng){
    const side=pick(rng,[12,18,24,30,36,42,48,54,60]);
    const x=side/6;
    const maxV=x*(side-2*x)*(side-2*x);
    return makeQuestion(rng,`Squares of side length ${tex('x')} are cut from the four corners of a square sheet of side length ${side}, and the sides are folded up to form an open-top box. For ${tex(`0<x<${side/2}`)}, what value of ${tex('x')} maximizes the volume?`,tex(String(x)),[tex(String(side/4)),tex(String(side/3)),tex(String(side/8))],`The volume is ${tex(`V(x)=x(${side}-2x)^2`)}. Differentiating gives ${tex(`V'(x)=(${side}-2x)(${side}-6x)`)}. The interior critical point is ${tex(`x=${side}/6=${x}`)}, which gives the maximum volume ${tex(String(maxV))}.`,advancedMeta('calculus-optimization-box',4));
  },'calculus-optimization-box',false,4);

  const qAccelerationGraphAdvanced = markGenerator(function(rng){
    const t0=pick(rng,[1,2,3]), t1=t0+pick(rng,[2,3]), v0=pick(rng,[1,2,3]), slope=pick(rng,[2,3,4]);
    const v1=v0+slope*(t1-t0);
    const svg=svgAxesPlot([{fn:t=>v0+slope*(t-t0)}],{xmin:0,xmax:t1+1,ymin:0,ymax:v1+3,label:'velocity-versus-time graph with constant positive slope'});
    return makeQuestion(rng,`${svg}<p>On the interval ${tex(String.raw`${t0}\le t\le ${t1}`)}, the graph shows velocity ${tex('v(t)')} in meters per second as a linear function of time. What is the acceleration on this interval?</p>`,tex(String.raw`${slope}\text{ m/s}^2`),[tex(String.raw`${v1}\text{ m/s}^2`),tex(String.raw`${t1-t0}\text{ m/s}^2`),tex(String.raw`${slope*(t1-t0)}\text{ m/s}^2`)],`Acceleration is ${tex("v'(t)")}, the slope of the velocity graph. Here the slope is ${tex(String.raw`\frac{${v1}-${v0}}{${t1}-${t0}}=${slope}`)} meters per second squared.`,visualMeta('calculus-acceleration-graph',4));
  },'calculus-acceleration-graph',true,4);

  function qScaleEffect(rng) {
    const k=pick(rng,[0.25,0.5,0.75,1.5,2,2.5,3,3.5,4,5,6,8]);
    const correct=`${fmt(k*k,2)} times as large`;
    return makeQuestion(rng,`Every linear dimension of a plane figure is multiplied by ${k}. Its area becomes`,correct,
      [`${fmt(k,2)} times as large`,`${fmt(k*k*k,2)} times as large`,`unchanged`],
      `Area scales by the square of the linear scale factor: ${k}²=${fmt(k*k,2)}.`);
  }

  function qRiemannSum(rng) {
    const width=pick(rng,[0.5,1,2]), heights=[ri(rng,1,6),ri(rng,1,6),ri(rng,1,6),ri(rng,1,6)];
    const correct=width*heights.reduce((a,b)=>a+b,0);
    return makeQuestion(rng,`A Riemann sum uses four rectangles of width ${width} with heights ${heights.join(", ")}. What is the estimated area?`,fmt(correct,2),
      [fmt(heights.reduce((a,b)=>a+b,0),2),fmt(width*4,2),fmt(correct/4,2)],
      `Multiply each height by the common width and add: ${width}(${heights.join("+")})=${fmt(correct,2)}.`);
  }

  function qAxiomaticSystem(rng) {
    const cases=[
      [`A statement accepted without proof`,`axiom`],
      [`A statement proved from definitions, axioms, and earlier results`,`theorem`],
      [`A specific case showing a universal claim is false`,`counterexample`],
      [`A term whose meaning is assumed rather than formally defined`,`undefined term`]
    ];
    const [desc,correct]=pick(rng,cases);
    return makeQuestion(rng,`Which term best describes the following: ${desc.toLowerCase()}?`,correct,
      [`axiom`,`theorem`,`counterexample`,`undefined term`].filter(x=>x!==correct),
      `${desc} is the definition of ${correct==='undefined term'?'an':'a'} ${correct}.`);
  }

  function qNonEuclidean(rng) {
    const cases=[
      [`Through a point not on a line, exactly one parallel line exists`,`Euclidean geometry`],
      [`Through a point not on a line, more than one parallel line exists`,`hyperbolic geometry`],
      [`No parallel great-circle line exists through an exterior point`,`spherical geometry`],
      [`Triangles have angle sum less than ${tex(String.raw`180^\circ`)}`,`hyperbolic geometry`],
      [`Triangles have angle sum greater than ${tex(String.raw`180^\circ`)}`,`spherical geometry`],
      [`Triangles have angle sum exactly ${tex(String.raw`180^\circ`)}`,`Euclidean geometry`]
    ];
    const [stmt,correct]=pick(rng,cases);
    return makeQuestion(rng,`The statement “${stmt}” is characteristic of which geometry?`,correct,
      [`Euclidean geometry`,`hyperbolic geometry`,`spherical geometry`,`projective arithmetic`].filter(x=>x!==correct),
      `This is a standard parallel or triangle-angle property of ${correct}.`);
  }

  function qCircleTheorem(rng) {
    const arc=pick(rng,[40,50,60,70,80,90,100,110,120,130,140,150,160]);
    return makeQuestion(rng,`An inscribed angle intercepts an arc measuring ${arc}°. What is the angle measure?`,arc/2,
      [arc,180-arc,360-arc],
      `An inscribed angle has half the measure of its intercepted arc, so the angle is ${arc/2}°.`);
  }

  function qCrossSection(rng) {
    const cases=[
      [`A plane parallel to the base cuts a right circular cone`,`circle`],
      [`A plane parallel to the bases cuts a right circular cylinder`,`circle`],
      [`A plane perpendicular to a pair of opposite faces cuts a rectangular prism`,`rectangle`],
      [`A plane through the apex and center of the base cuts a right circular cone`,`triangle`],
      [`A plane parallel to a face cuts a cube`,`square`],
      [`A plane perpendicular to the base cuts a right circular cylinder through its axis`,`rectangle`],
      [`A plane cuts a sphere at a non-tangent level`,`circle`],
      [`A plane tangent to a sphere meets it in exactly one point`,`point`]
    ];
    const [stmt,correct]=pick(rng,cases);
    return makeQuestion(rng,`${stmt}. What is the cross-section?`,correct,
      [`circle`,`rectangle`,`triangle`,`square`,`point`].filter(x=>x!==correct).slice(0,3),
      `The orientation of the cutting plane produces a ${correct}.`);
  }

  function qConicEquation(rng) {
    const h=ri(rng,-4,4), k=ri(rng,-4,4), r=ri(rng,2,7);
    const eq=`(x${h>=0?"−":"+"}${Math.abs(h)})²+(y${k>=0?"−":"+"}${Math.abs(k)})²=${r*r}`;
    return makeQuestion(rng,`The graph of <span class="math-display">${eq}</span> is a circle with`,
      `center (${h}, ${k}) and radius ${r}`,[`center (${-h}, ${-k}) and radius ${r}`,`center (${h}, ${k}) and radius ${r*r}`,`center (0,0) and radius ${r}`],
      `Compare with (x−h)²+(y−k)²=r². The center is (${h},${k}) and radius is ${r}.`);
  }

  function qVectorOperation(rng) {
    const a=[ri(rng,-5,5),ri(rng,-5,5)],b=[ri(rng,-5,5),ri(rng,-5,5)];
    const correct=`⟨${a[0]+b[0]}, ${a[1]+b[1]}⟩`;
    const vec=(u,v)=>tex(String.raw`\langle ${u},${v}\rangle`);
    const addExpr=(u,v)=>`${u}${v>=0?'+':'-'}${Math.abs(v)}`;
    return makeQuestion(rng,`If ${tex(String.raw`u=\langle ${a[0]},${a[1]}\rangle`)} and ${tex(String.raw`v=\langle ${b[0]},${b[1]}\rangle`)}, find ${tex('u+v')}.`,vec(a[0]+b[0],a[1]+b[1]),
      [vec(a[0]-b[0],a[1]-b[1]),vec(a[0]*b[0],a[1]*b[1]),vec(a[1]+b[1],a[0]+b[0])],
      `Add corresponding components: ${tex(String.raw`\langle ${addExpr(a[0],b[0])},${addExpr(a[1],b[1])}\rangle=\langle ${a[0]+b[0]},${a[1]+b[1]}\rangle`)}.`);
  }

  function qDataTransformation(rng) {
    const a=pick(rng,[2,3,4]),b=ri(rng,-10,10),mean=ri(rng,10,50),sd=ri(rng,2,8);
    return makeQuestion(rng,`Every value in a data set is transformed by y=${a}x${b>=0?"+":"−"}${Math.abs(b)}. If the original mean is ${mean} and standard deviation is ${sd}, what are the new mean and standard deviation?`,
      `mean ${a*mean+b}; standard deviation ${a*sd}`,[`mean ${mean+b}; standard deviation ${sd+b}`,`mean ${a*mean}; standard deviation ${a*sd+b}`,`mean ${a*mean+b}; standard deviation ${sd}`],
      `A linear transformation y=ax+b changes the mean to aμ+b and the standard deviation to |a|σ.`);
  }

  function qExpectedValue(rng) {
    const prize=pick(rng,[10,20,50]), p=pick(rng,[0.1,0.2,0.25,0.4]), cost=pick(rng,[1,2,5]);
    const ev=p*prize-cost;
    return makeQuestion(rng,`A game costs $${cost}. A player wins $${prize} with probability ${p} and otherwise wins $0. What is the expected net value?`,money(ev),
      [money(p*prize),money(prize-cost),money((1-p)*prize-cost)],
      `Expected winnings are ${p}($${prize})=$${(p*prize).toFixed(2)}. Subtract the $${cost} cost to obtain ${money(ev)}.`);
  }

  function qBinomialProbability(rng) {
    const n=pick(rng,[4,5,6]), p=pick(rng,[0.2,0.5,0.7]), k=pick(rng,[1,2,3]);
    if(k>n) k=n;
    const comb=(n,k)=>{let v=1;for(let i=1;i<=k;i++)v=v*(n-k+i)/i;return v};
    const prob=comb(n,k)*Math.pow(p,k)*Math.pow(1-p,n-k);
    const correct=fmt(prob,4);
    return makeQuestion(rng,`For X~Binomial(n=${n}, p=${p}), find P(X=${k}).`,correct,
      [fmt(Math.pow(p,k),4),fmt(comb(n,k)*Math.pow(p,n-k)*Math.pow(1-p,k),4),fmt(k/n,4)],
      `Use P(X=k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ. Substitution gives ${correct}.`);
  }

  function qConfidenceInterval(rng) {
    const mean=ri(rng,40,90), margin=ri(rng,2,8);
    return makeQuestion(rng,`A 95% confidence interval for a population mean is reported as ${mean}±${margin}. Which interval is this?`,`(${mean-margin}, ${mean+margin})`,
      [`(${mean}, ${mean+margin})`,`(${mean-margin/2}, ${mean+margin/2})`,`(${mean-margin}, ${mean})`],
      `Subtract and add the margin of error: (${mean}−${margin}, ${mean}+${margin})=(${mean-margin}, ${mean+margin}).`);
  }

  function qHypothesisDecision(rng) {
    const alpha=pick(rng,[0.01,0.05,0.10]), p=pick(rng,[0.003,0.02,0.04,0.08,0.15]);
    const reject=p<alpha;
    const correct=reject?`reject H₀ because p<α`:`fail to reject H₀ because p≥α`;
    return makeQuestion(rng,`A test has p-value ${p} and significance level α=${alpha}. What is the correct decision?`,correct,
      [`reject H₀ because p>α`,`fail to reject H₀ because p<α`,`accept H₀ as proven true`].filter(x=>x!==correct),
      `Compare p with α. Since ${p} ${p<alpha?"<":"≥"} ${alpha}, ${correct}.`);
  }

  function qRegressionInterpretation(rng) {
    const slope=pick(rng,[1.5,2.2,-0.8,-3.1]), intercept=ri(rng,5,30);
    const correct=`For each 1-unit increase in x, predicted y changes by ${slope} units.`;
    return makeQuestion(rng,`A regression line is ŷ=${intercept}${slope>=0?"+":"−"}${Math.abs(slope)}x. Interpret the slope.`,correct,
      [`When x=0, predicted y is ${slope}.`,`The correlation coefficient equals ${slope}.`,`For each 1-unit increase in y, x changes by ${intercept}.`],
      `The slope is the predicted change in y for a one-unit increase in x.`);
  }

  function qCLT(rng) {
    const n=pick(rng,[10,25,50,100]);
    const correct=n>=30?`the sampling distribution of the mean is approximately normal under broad conditions`:`normality is not guaranteed solely by this sample size`;
    return makeQuestion(rng,`For random samples of size n=${n}, which statement best reflects the Central Limit Theorem?`,correct,
      [`the population itself must be normal`,`the sample mean always equals the population mean`,`the standard deviation of observations becomes zero`],
      `The CLT concerns the sampling distribution of the mean; for sufficiently large n it is approximately normal even when the population is not.`);
  }

  function qProofLogic(rng) {
    const cases=[
      [`If n² is even, then n is even`,`prove the contrapositive: if n is odd, then n² is odd`],
      [`There are infinitely many primes`,`assume finitely many primes and derive a contradiction`],
      [`The sum of two odd integers is even`,`write the integers as 2a+1 and 2b+1 and simplify`],
      [`The square of an odd integer is odd`,`write n=2k+1 and expand n²`],
      [`If a real number x is irrational, then 1/x is irrational`,`prove the contrapositive using the reciprocal of a nonzero rational number`],
      [`There is no greatest integer`,`given an arbitrary integer n, exhibit the larger integer n+1`],
      [`The difference of two even integers is even`,`write the integers as 2a and 2b and factor 2`],
      [`If n is divisible by 6, then n is divisible by 3`,`write n=6k and rewrite it as 3(2k)`],
      [`√2 is irrational`,`assume √2=a/b in lowest terms and derive that both a and b are even`],
      [`For positive x, x+1/x≥2`,`rewrite the inequality using (x−1)²≥0`],
      [`The sum of a rational and an irrational number is irrational`,`assume the sum is rational and subtract the rational addend`],
      [`If two integers have opposite parity, their sum is odd`,`represent the even integer as 2a and the odd integer as 2b+1`],
      [`If n² is divisible by 3, then n is divisible by 3`,`prove the contrapositive using residues modulo 3`],
      [`The product of a rational number and a nonzero irrational number is irrational`,`assume the product is rational and divide by the nonzero rational factor`],
      [`There is no rational number whose square is 3`,`assume a/b is in lowest terms and use divisibility by 3 to force a common factor`],
      [`For real a and b, |a+b|≤|a|+|b|`,`compare squares after using ab≤|ab| or invoke the triangle inequality`],
      [`If a polynomial of odd degree has real coefficients, it has a real zero`,`use opposite end behavior and the Intermediate Value Theorem`],
      [`Every bounded monotone sequence converges`,`use completeness and identify the supremum or infimum as the candidate limit`]
    ];
    const [claim,correct]=pick(rng,cases);
    return makeQuestion(rng,`Which is an appropriate proof strategy for “${claim}”?`,correct,
      [`verify the claim for three examples`,`draw a graph and assume it proves the claim`,`state that the result is obvious`,`use a calculator for one case`],
      `The proposed strategy gives a valid deductive argument for the universal statement.`);
  }

  function qModelEvaluation(rng) {
    const scenarios=[
      ['a linear model with high correlation','inspect residuals and whether proposed predictions stay within the observed range'],
      ['a quadratic model fit to experimental data','inspect residuals and compare the model with the scientific constraints of the situation'],
      ['an exponential growth model for population','check residuals and whether long-term extrapolation is plausible'],
      ['a linear trend for a time series','check residuals for temporal patterns before forecasting'],
      ['a regression model with a very large R²','inspect residuals because a large R² alone does not guarantee an appropriate form'],
      ['a model based on a small convenience sample','evaluate the sampling process before generalizing predictions'],
      ['a model that predicts negative values for a quantity that must be nonnegative','check whether the model is being used outside a reasonable domain'],
      ['two competing models with similar numerical fit statistics','compare residual patterns and interpretability in the application'],
      ['a polynomial model fit exactly through a small set of points','consider overfitting and test performance on additional data'],
      ['a logistic model for bounded growth','check whether the carrying-capacity interpretation is meaningful'],
      ['a linear model based on strongly clustered data','inspect leverage and influential observations'],
      ['a model used far beyond the largest observed input','treat the prediction cautiously because it is an extrapolation']
    ];
    const [desc,correct]=pick(rng,scenarios);
    return makeQuestion(rng,`Before relying on ${desc} for prediction, which additional step is most important?`,correct,
      ['assume a good numerical fit proves causation','round all parameters to integers before checking the model','discard observations that do not agree with the prediction'],
      `Model evaluation should include residual behavior, data-collection quality, domain restrictions, and the risks of extrapolation as appropriate to the situation.`);
  }

  function qRepresentationConnection(rng) {
    const cases=[
      [`The zeros of a polynomial`,`the x-intercepts of its graph`],
      [`The derivative of a position function`,`instantaneous velocity`],
      [`Signed area under a velocity-time graph`,`displacement`],
      [`The determinant of a ${tex('2\\times2')} matrix`,`signed area scale factor of its linear transformation`],
      [`The slope of a distance-time graph`,`speed when the slope is nonnegative`],
      [`The integral of a rate function over a time interval`,`net accumulated change`],
      [`The vertex of ${tex('y=a(x-h)^2+k')}`,`the point ${tex('(h,k)')}`],
      [`The common ratio of a geometric sequence`,`the multiplicative factor between consecutive terms`],
      [`The correlation coefficient close to ${tex('1')}`,`a strong positive linear association`],
      [`The eigenvalue equation ${tex('Av=\\lambda v')}`,`a direction preserved by a linear transformation up to scaling`],
      [`The horizontal asymptote of an exponential decay model`,`a limiting output value approached by the model`],
      [`The median of a data set`,`the 50th percentile after ordering the data`]
    ];
    const [concept,correct]=pick(rng,cases);
    return makeQuestion(rng,`${concept} corresponds most directly to`,correct,
      [`the y-intercept only`,`the average of all inputs`,`a random sample`,`an unrelated domain restriction`],
      `The answer states the standard connection between the two mathematical representations or interpretations.`);
  }
  function qInstructionConceptual(rng) {
    const cases=[
      [`Students can solve 3x+5=20 procedurally but cannot explain why subtracting 5 is valid.`,`Use a balance model and connect each move to preserving equality.`],
      [`Students graph y=2x+3 as isolated points without seeing rate of change.`,`Connect a table, a constant first difference, and the slope triangle on the graph.`],
      [`Students confuse area and perimeter.`,`Use tiles and boundary markers on figures with equal area but different perimeters.`],
      [`Students believe multiplying always makes a number larger.`,`Compare products involving whole numbers, fractions between 0 and 1, and negative factors.`]
    ];
    const [situation,correct]=pick(rng,cases);
    return makeQuestion(rng,`${secondaryContext(rng)}, ${situation[0].toLowerCase()+situation.slice(1)} Which instructional response best develops conceptual understanding?`,correct,
      [`Assign more repetitions of the same algorithm without discussion.`,`Tell students to memorize the rule and avoid models.`,`Remove all visual representations from the lesson.`],
      `The selected response links procedures to representations and mathematical meaning while directly addressing the misconception.`);
  }

  function qInstructionDifferentiation(rng) {
    const cases=[
      [`An English learner understands a geometry diagram but struggles with the written problem.`,`Provide labeled visuals, sentence frames, and opportunities to explain using both symbols and words.`],
      [`A student has mastered the routine linear-equation assignment early.`,`Offer a nonroutine modeling problem that requires comparing multiple solution methods.`],
      [`Several students need support connecting fractions to decimals.`,`Use number lines and hundred grids before moving to symbolic conversion.`]
    ];
    const [situation,correct]=pick(rng,cases);
    return makeQuestion(rng,`${secondaryContext(rng)}, ${situation[0].toLowerCase()+situation.slice(1)} What is the most appropriate differentiation?`,correct,
      [`Lower the mathematical goal for the entire class.`,`Skip the concept and assign unrelated computation.`,`Require silent independent work only.`],
      `The response preserves the mathematical objective while adjusting access, representation, or level of challenge.`);
  }

  function qQuestioningStrategy(rng) {
    const cases=[
      [`A student states that two lines are parallel because they “look parallel.”`,`What measurable or algebraic evidence would prove the lines are parallel?`],
      [`A student obtains a negative length in a geometry problem.`,`What does the negative result tell you about your model or calculation?`],
      [`Two students use different methods to solve a quadratic.`,`How are the two methods connected, and when might one be more efficient?`]
    ];
    const [situation,correct]=pick(rng,cases);
    return makeQuestion(rng,`${secondaryContext(rng)}, ${situation[0].toLowerCase()+situation.slice(1)} Which teacher question best promotes mathematical discourse?`,correct,
      [`What answer did you get?`,`Did you copy the example exactly?`,`Can you finish faster without explaining?`],
      `The selected question asks for justification, interpretation, or comparison rather than a short procedural response.`);
  }

  function qAssessmentType(rng) {
    const cases=[
      [`An exit ticket used to decide what to reteach tomorrow`,`formative assessment`],
      [`A comprehensive end-of-unit examination`,`summative assessment`],
      [`A pretest given before instruction begins`,`diagnostic assessment`],
      [`A rubric-scored modeling project completed over several days`,`performance assessment`]
    ];
    const [desc,correct]=pick(rng,cases);
    return makeQuestion(rng,`${secondaryContext(rng)}, ${desc[0].toLowerCase()+desc.slice(1)} is best classified as a`,correct,
      [`formative assessment`,`summative assessment`,`diagnostic assessment`,`performance assessment`].filter(x=>x!==correct),
      `The purpose and timing of the assessment make it a ${correct}.`);
  }

  function qAssessmentAlignment(rng) {
    const correct=`Require students to interpret slope and intercept in a new contextual model.`;
    return makeQuestion(rng,`${secondaryContext(rng)}, the lesson objective is “Students will interpret slope and intercept in context.” Which assessment is best aligned?`,correct,
      [`Ask students to list the quadratic formula.`,`Give ten context-free integer-addition problems.`,`Ask students to copy the definition of a function.`],
      `An aligned assessment directly measures the stated interpretation skill in a contextual setting.`);
  }

  function qAssessmentErrorAnalysis(rng) {
    const cases=[
      [`A student solves 2(x+3)=10 as 2x+3=10.`,`The student distributed 2 to x but not to 3.`],
      [`A student writes √(a+b)=√a+√b.`,`The student incorrectly assumed that square root distributes over addition.`],
      [`A student reports correlation r=1.4.`,`The student does not recognize that a correlation coefficient must be between −1 and 1.`],
      [`A student gives sin 30°=√3/2.`,`The student interchanged the sine and cosine values for 30°.`]
    ];
    const [work,correct]=pick(rng,cases);
    return makeQuestion(rng,`${secondaryContext(rng)}, a student produces the following work: ${work} Which diagnosis best identifies the error?`,correct,
      [`The student made only a rounding error.`,`The work is correct.`,`The student used too many representations.`],
      `The diagnosis identifies the specific misconception revealed by the student’s work.`);
  }

  function qAssessmentNextStep(rng) {
    const correct=`Group students by the demonstrated misconception and provide targeted representations and follow-up checks.`;
    return makeQuestion(rng,`${secondaryContext(rng)}, an assessment shows that many students can compute slope but cannot interpret negative slope in context. What is the best instructional next step?`,correct,
      [`Move immediately to a new unit because computation scores were high.`,`Average the scores and reteach every topic identically.`,`Assign only more arithmetic practice.`],
      `Assessment data should guide targeted instruction that addresses the specific conceptual weakness and then checks for improvement.`);
  }


  // ---------- Secondary-level visual and advanced generators ----------
  function tex(s) { return `\\(${s}\\)`; }
  function disp(s) { return `\\[${s}\\]`; }
  function visualMeta(family, difficulty = 3) { return {family, visual:true, difficulty}; }
  function advancedMeta(family, difficulty = 3) { return {family, visual:false, difficulty}; }
  function markGenerator(fn, family, visual = false, difficulty = 3) {
    fn.family = family; fn.visual = visual; fn.difficulty = difficulty; return fn;
  }
  function svgAxesPlot(curves, opts={}) {
    const w=430,h=280,pad=38,xmin=opts.xmin??-5,xmax=opts.xmax??5,ymin=opts.ymin??-5,ymax=opts.ymax??5;
    const sx=x=>pad+(x-xmin)/(xmax-xmin)*(w-2*pad), sy=y=>h-pad-(y-ymin)/(ymax-ymin)*(h-2*pad);
    const grid=[];
    for(let x=Math.ceil(xmin);x<=Math.floor(xmax);x++) grid.push(`<line x1="${sx(x)}" y1="${pad}" x2="${sx(x)}" y2="${h-pad}" class="grid-line"/>`);
    for(let y=Math.ceil(ymin);y<=Math.floor(ymax);y++) grid.push(`<line x1="${pad}" y1="${sy(y)}" x2="${w-pad}" y2="${sy(y)}" class="grid-line"/>`);
    const tickLabels=[];
    const xStep=(xmax-xmin)<=12?1:2, yStep=(ymax-ymin)<=12?1:2;
    const xAxisY=(ymin<=0&&0<=ymax)?sy(0):h-pad;
    const yAxisX=(xmin<=0&&0<=xmax)?sx(0):pad;
    for(let x=Math.ceil(xmin);x<=Math.floor(xmax);x+=xStep){ if(x!==0) tickLabels.push(`<text x="${sx(x)}" y="${Math.min(h-6,xAxisY+16)}" text-anchor="middle" class="tick-label">${x}</text>`); }
    for(let y=Math.ceil(ymin);y<=Math.floor(ymax);y+=yStep){ if(y!==0) tickLabels.push(`<text x="${Math.max(8,yAxisX-7)}" y="${sy(y)+4}" text-anchor="end" class="tick-label">${y}</text>`); }
    const paths=curves.map((c,ci)=>{
      const pts=[];
      for(let i=0;i<=180;i++){
        const x=xmin+(xmax-xmin)*i/180, y=c.fn(x);
        if(Number.isFinite(y) && y>=ymin-.5 && y<=ymax+.5) pts.push([sx(x),sy(y)]); else pts.push(null);
      }
      let d='',open=false;
      pts.forEach(pt=>{if(!pt){open=false;return;} d+=(open?' L ':' M ')+pt[0].toFixed(1)+' '+pt[1].toFixed(1); open=true;});
      return `<path d="${d}" class="plot-line plot-${ci+1}"/>`;
    }).join('');
    const points=(opts.points||[]).map(pt=>`<circle cx="${sx(pt.x)}" cy="${sy(pt.y)}" r="4.5" class="plot-point"/>`).join('');
    const holes=(opts.holes||[]).map(pt=>`<circle cx="${sx(pt.x)}" cy="${sy(pt.y)}" r="5" class="plot-hole"/>`).join('');
    return `<svg class="svg-graph" viewBox="0 0 ${w} ${h}" role="img" aria-label="${opts.label||'coordinate graph'}">${grid.join('')}<line x1="${pad}" y1="${xAxisY}" x2="${w-pad}" y2="${xAxisY}" class="axis-line"/><line x1="${yAxisX}" y1="${pad}" x2="${yAxisX}" y2="${h-pad}" class="axis-line"/>${tickLabels.join('')}${paths}${points}${holes}<text x="${w-pad+8}" y="${xAxisY+4}" class="axis-label">x</text><text x="${yAxisX+5}" y="${pad-8}" class="axis-label">y</text></svg>`;
  }
  function svgBarChart(labels, values, opts={}) {
    const w=430,h=270,padL=48,padB=42,padT=20,padR=18,max=Math.max(...values,opts.max||0)*1.12||1;
    const plotW=w-padL-padR, plotH=h-padT-padB, gap=plotW/values.length, bw=opts.histogram?gap:gap*.6;
    const bars=values.map((v,i)=>{const bh=v/max*plotH,x=padL+i*gap+(gap-bw)/2,y=padT+plotH-bh;return `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" class="bar-mark"/><text x="${x+bw/2}" y="${h-18}" text-anchor="middle" class="chart-label">${labels[i]}</text>`;}).join('');
    const ticks=[]; for(let i=0;i<=4;i++){const val=max*i/4,y=padT+plotH-(i/4)*plotH;ticks.push(`<line x1="${padL}" y1="${y}" x2="${w-padR}" y2="${y}" class="grid-line"/><text x="${padL-8}" y="${y+4}" text-anchor="end" class="chart-label">${Math.round(val)}</text>`)}
    return `<svg class="svg-graph" viewBox="0 0 ${w} ${h}" role="img" aria-label="${opts.label||'bar chart'}">${ticks.join('')}<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${h-padB}" class="axis-line"/><line x1="${padL}" y1="${h-padB}" x2="${w-padR}" y2="${h-padB}" class="axis-line"/>${bars}</svg>`;
  }
  function svgScatter(points, opts={}) {
    const w=430,h=280,pad=38,xmin=opts.xmin??0,xmax=opts.xmax??10,ymin=opts.ymin??0,ymax=opts.ymax??10;
    const sx=x=>pad+(x-xmin)/(xmax-xmin)*(w-2*pad),sy=y=>h-pad-(y-ymin)/(ymax-ymin)*(h-2*pad);
    const dots=points.map(p=>`<circle cx="${sx(p[0])}" cy="${sy(p[1])}" r="4" class="plot-point"/>`).join('');
    let line=''; if(opts.line){const [m,b]=opts.line;line=`<line x1="${sx(xmin)}" y1="${sy(m*xmin+b)}" x2="${sx(xmax)}" y2="${sy(m*xmax+b)}" class="trend-line"/>`;}
    return `<svg class="svg-graph" viewBox="0 0 ${w} ${h}" role="img" aria-label="${opts.label||'scatterplot'}"><line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" class="axis-line"/><line x1="${pad}" y1="${pad}" x2="${pad}" y2="${h-pad}" class="axis-line"/>${line}${dots}<text x="${w-pad+8}" y="${h-pad+4}" class="axis-label">x</text><text x="${pad+5}" y="${pad-8}" class="axis-label">y</text></svg>`;
  }
  function svgBoxPlot(min,q1,med,q3,max,label='box plot') {
    const w=430,h=150,p=40,scale=x=>p+(x-min)/(max-min)*(w-2*p),y=65;
    return `<svg class="svg-graph" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><line x1="${scale(min)}" y1="${y}" x2="${scale(max)}" y2="${y}" class="axis-line"/><line x1="${scale(min)}" y1="${y-18}" x2="${scale(min)}" y2="${y+18}" class="axis-line"/><line x1="${scale(max)}" y1="${y-18}" x2="${scale(max)}" y2="${y+18}" class="axis-line"/><rect x="${scale(q1)}" y="${y-25}" width="${scale(q3)-scale(q1)}" height="50" class="box-mark"/><line x1="${scale(med)}" y1="${y-25}" x2="${scale(med)}" y2="${y+25}" class="median-line"/><text x="${scale(min)}" y="${y+55}" text-anchor="middle" class="chart-label">${min}</text><text x="${scale(q1)}" y="${y+55}" text-anchor="middle" class="chart-label">${q1}</text><text x="${scale(med)}" y="${y+55}" text-anchor="middle" class="chart-label">${med}</text><text x="${scale(q3)}" y="${y+55}" text-anchor="middle" class="chart-label">${q3}</text><text x="${scale(max)}" y="${y+55}" text-anchor="middle" class="chart-label">${max}</text></svg>`;
  }
  function tableHtml(headers, rows, label='data table') {
    return `<table class="data-table" aria-label="${label}"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
  function svgTriangle(a,b,c, opts={}) {
    return `<svg class="svg-graph diagram" viewBox="0 0 430 260" role="img" aria-label="${opts.label||'triangle diagram'}"><polygon points="70,220 350,220 245,55" class="shape-fill"/><text x="55" y="238" class="diagram-label">A</text><text x="355" y="238" class="diagram-label">B</text><text x="245" y="45" class="diagram-label">C</text><text x="205" y="242" class="diagram-label">${c}</text><text x="135" y="130" class="diagram-label">${b}</text><text x="300" y="130" class="diagram-label">${a}</text>${opts.right?'<path d="M330 220 L330 200 L350 200" class="diagram-line"/>':''}</svg>`;
  }
  function svgPrism(l,wid,hgt) {
    return `<svg class="svg-graph diagram" viewBox="0 0 430 260" role="img" aria-label="rectangular prism with labeled dimensions"><path d="M85 90 L285 90 L345 50 L145 50 Z M85 90 L85 205 L285 205 L285 90 M285 205 L345 165 L345 50 M85 205 L145 165 L345 165 M145 50 L145 165" class="diagram-line"/><text x="175" y="225" class="diagram-label">${l}</text><text x="310" y="195" class="diagram-label">${wid}</text><text x="65" y="150" class="diagram-label">${hgt}</text></svg>`;
  }
  function svgUnitCircle(angleDeg=45) {
    const rad=angleDeg*Math.PI/180, cx=180, cy=150, r=105;
    const px=cx+r*Math.cos(rad), py=cy-r*Math.sin(rad);
    const lx=cx+48*Math.cos(rad/2), ly=cy-48*Math.sin(rad/2);
    return `<svg class="svg-graph diagram" viewBox="0 0 360 300" role="img" aria-label="unit circle with a radius at ${angleDeg} degrees"><line x1="35" y1="150" x2="325" y2="150" class="axis-line"/><line x1="180" y1="20" x2="180" y2="280" class="axis-line"/><circle cx="180" cy="150" r="105" class="circle-mark"/><line x1="${cx}" y1="${cy}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" class="diagram-line emphasis"/><circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="5" class="plot-point"/><text x="${(px+8).toFixed(1)}" y="${(py-6).toFixed(1)}" class="diagram-label">P</text><text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" class="diagram-label">${angleDeg}°</text></svg>`;
  }

  const qGeoboardVisual = markGenerator(function(rng){
    const shapes=[
      {pts:[[0,0],[4,0],[5,2],[3,4],[1,4],[-1,2]],area:18},
      {pts:[[0,0],[5,0],[5,3],[2,5],[0,3]],area:21},
      {pts:[[0,0],[3,0],[5,2],[3,5],[0,4],[-1,2]],area:19.5},
      {pts:[[0,0],[4,0],[6,2],[4,4],[0,4],[-2,2]],area:24}
    ];
    const sh=pick(rng,shapes), scale=pick(rng,[1,2,3]);
    const pts=sh.pts, area=sh.area*scale*scale;
    const dots=[]; for(let y=0;y<7;y++)for(let x=0;x<9;x++)dots.push(`<circle cx="${34+x*42}" cy="${20+y*36}" r="3" class="grid-dot"/>`);
    const poly=pts.map(([x,y])=>`${76+(x+2)*42},${236-y*36}`).join(' ');
    const svg=`<svg class="svg-graph diagram" viewBox="0 0 430 270" role="img" aria-label="geoboard polygon">${dots.join('')}<polygon points="${poly}" class="shape-fill emphasis"/></svg>`;
    const u=scale===1?'unit':`${scale} units`;
    return makeQuestion(rng,`${svg}<p>Adjacent horizontal and vertical pegs are ${u} apart. What is the area of the shaded polygon?</p>`,tex(`${area}`),[tex(`${area+scale*scale}`),tex(`${Math.max(scale*scale,area-scale*scale)}`),tex(`${area+2*scale*scale}`)],`Using coordinates for the vertices, the shoelace formula gives ${tex(`${sh.area}`)} square grid units. Scaling each grid step by ${scale} multiplies area by ${tex(`${scale}^2`)}, giving ${tex(`${area}`)} square units.`,visualMeta('real-geoboard',4));
  },'real-geoboard',true,4);

  const qRealSubsetStructure = markGenerator(function(rng){
    const cases=[
      ['Which statement about the integers is correct?','The integers are an additive group but not a field.',['Every nonzero integer has a multiplicative inverse in the integers.','The integers are not closed under multiplication.','The integers lack an additive identity.'],'Most nonzero integers do not have multiplicative inverses in the integers.'],
      ['Which statement about the rational numbers is correct?','The rational numbers form an ordered field under the usual operations and order.',['The rational numbers are not closed under multiplication.','The rational numbers have no multiplicative identity.','The rational numbers contain no additive inverses.'],'The rational numbers satisfy the field and compatible order axioms.'],
      ['Which statement about the natural numbers is correct?','They are closed under addition and multiplication but not under additive inverses.',['They form a field.','They are closed under subtraction.','Every nonzero natural number has a natural reciprocal.'],'Positive natural numbers generally lack additive inverses in the same set.'],
      ['Which property distinguishes the real numbers from the rational numbers in elementary real analysis?','Completeness.',['Commutativity of addition.','Existence of a multiplicative identity.','Trichotomy of the usual order.'],'Both systems are ordered fields; completeness is the additional real-number property.'],
      ['Which set is closed under subtraction but not under division by nonzero elements?','The integers.',['The positive natural numbers.','The nonzero rational numbers.','The real numbers.'],'Integer differences are integers, but a quotient such as 1/2 need not be an integer.'],
      ['Which statement about nonzero rational numbers is true?','Every nonzero rational number has a rational multiplicative inverse.',['Every rational number has an integer inverse.','Rational numbers are not closed under addition.','The rational numbers have no zero element.'],'If a/b is nonzero, then b/a is rational and is its reciprocal.'],
      ['Which statement about irrational numbers is correct?','They are not closed under addition.',['They form a field.','They contain 0.','The product of any two irrational numbers is irrational.'],'For example, √2 and −√2 are irrational but their sum is 0.'],
      ['Which statement about the real numbers is correct?','Every nonempty set of real numbers that is bounded above has a least upper bound.',['Every bounded set contains its supremum.','Every real number is rational or an integer.','The real numbers are countable.'],'This is the least-upper-bound form of completeness.'],
      ['Which inclusion is correct?','Every integer is rational, and every rational number is real.',['Every real number is rational.','Every irrational number is an integer.','No integer is rational.'],'An integer n can be written n/1, and rational numbers are real.'],
      ['Which statement about fields is required by the multiplicative inverse axiom?','Every nonzero element has a multiplicative inverse in the field.',['Zero has a multiplicative inverse.','Multiplication must be noncommutative.','Every element is positive.'],'The inverse axiom applies exactly to nonzero field elements.']
    ];
    const [stem,correct,distr,expl]=pick(rng,cases);
    return makeQuestion(rng,stem,correct,distr,expl,advancedMeta('real-algebraic-structure',3));
  },'real-algebraic-structure',false,3);

  const qIrrationalEquation = markGenerator(function(rng){
    const n=pick(rng,[2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26]);
    return makeQuestion(rng,`Which statement best explains why ${tex(String.raw`x^2=${n}`)} has no solution in ${tex(String.raw`\mathbb{Q}`)} but has solutions in ${tex(String.raw`\mathbb{R}`)}?`,`Because ${tex(String.raw`\sqrt{${n}}`)} is irrational, the real solutions ${tex(String.raw`\pm\sqrt{${n}}`)} are not rational.`,[`Every quadratic equation has rational roots.`,`The equation has no real roots because ${n} is positive.`,`The rational numbers are not closed under addition.`],`Since ${n} is not a perfect square, ${tex(String.raw`\sqrt{${n}}`)} is irrational.`,advancedMeta('real-extension-rationals',3));
  },'real-extension-rationals',false,3);

  const qRealModelPrecision = markGenerator(function(rng){
    const d=pick(rng,[7,11,13,17,19,23,29,31,37,41,43,47]), pct=100/d;
    return makeQuestion(rng,`A quantity is exactly ${tex(String.raw`\frac{1}{${d}}`)} of a total. Which representation should be retained when an exact value is required?`,tex(String.raw`\frac{1}{${d}}`),[`${pct.toFixed(2)}%`,`${(1/d).toFixed(4)}`,`${Math.round(pct)}%`],`The fraction ${tex(String.raw`\frac{1}{${d}}`)} is exact; the displayed decimal and percentage representations are rounded.`,advancedMeta('real-representation-choice',3));
  },'real-representation-choice',false,3);

  const qComplexPlaneVisual = markGenerator(function(rng){
    const a=pick(rng,[3,-3,4,-4]),b=pick(rng,[2,-2,5,-5]);
    const svg=svgAxesPlot([], {xmin:-6,xmax:6,ymin:-6,ymax:6,points:[{x:a,y:b}],label:'complex plane with a plotted point'});
    const correct=tex(`${a}${b>=0?'+':''}${b}i`);
    return makeQuestion(rng,`${svg}<p>On the complex plane, the horizontal coordinate is the real part and the vertical coordinate is the imaginary part. Which complex number is represented by the plotted point?</p>`,correct,[tex(`${b}${a>=0?'+':''}${a}i`),tex(`${-a}${b>=0?'+':''}${b}i`),tex(`${a}${b>=0?'-':'+'}${Math.abs(b)}i`)],`The point has coordinates (${a}, ${b}), so it represents ${correct}.`,visualMeta('complex-plane-point',3));
  },'complex-plane-point',true,3);

  const qComplexRotation = markGenerator(function(rng){
    const a=pick(rng,[-4,-3,-2,-1,1,2,3,4]), b=pick(rng,[-4,-3,-2,-1,1,2,3,4]);
    const re=-b, im=a;
    const z=(u,v)=>tex(`${u}${v>=0?'+':''}${v}i`);
    const correct=z(re,im);
    return makeQuestion(rng,`Multiplication by ${tex('i')} is a rotation in the complex plane. If ${z(a,b)} is multiplied by ${tex('i')}, what is the result?`,correct,[z(a,b),z(b,-a),z(-a,-b)],`Multiplying ${tex('a+bi')} by ${tex('i')} gives ${tex('-b+ai')}, a ${tex('90^\\circ')} counterclockwise rotation.`,advancedMeta('complex-rotation',4));
  },'complex-rotation',false,4);

  const qComplexRoots = markGenerator(function(rng){
    const s=pick(rng,[2,3,4,5,6,7,8,9,10,11,12,13,14,15]); const r=s*s;
    return makeQuestion(rng,`What are the solutions of ${tex(`z^2+${r}=0`)} in the complex number system?`,tex(`z=\\pm ${s}i`),[tex(`z=\\pm ${s}`),tex(`z=${s}i`),tex(`z=\\pm i/${s}`)],`The equation gives ${tex(`z^2=-${r}`)}, so ${tex(`z=\\pm\\sqrt{-${r}}=\\pm ${s}i`)}.`,advancedMeta('complex-roots',3));
  },'complex-roots',false,3);

  const qComplexProduct = markGenerator(function(rng){
    const a=ri(rng,1,4),b=ri(rng,1,4),c=ri(rng,1,4),d=ri(rng,1,4); const re=a*c-b*d,im=a*d+b*c;
    return makeQuestion(rng,`Compute ${tex(`(${a}+${b}i)(${c}+${d}i)`)}.`,tex(`${re}${im>=0?'+':''}${im}i`),[tex(`${a*c+b*d}+${im}i`),tex(`${re}+${b*d}i`),tex(`${a*c}${im>=0?'+':''}${im}i`)],`Distribute and use ${tex('i^2=-1')}: the real part is ${a*c}-${b*d}=${re}, and the imaginary part is ${a*d}+${b*c}=${im}.`,advancedMeta('complex-product',3));
  },'complex-product',false,3);

  const qModularClock = markGenerator(function(rng){
    const m=pick(rng,[5,7,8,11]),a=ri(rng,20,80),b=ri(rng,10,50),c=(a*b)%m;
    return makeQuestion(rng,`In ${tex(`\\mathbb Z_{${m}}`)}, what is the residue class of ${tex(`${a}\\cdot ${b}`)}?`,tex(String(c)),[tex(String((c+1)%m)),tex(String((c+m-1)%m)),tex(String((a+b)%m))],`${a*b} leaves remainder ${c} when divided by ${m}, so the product is congruent to ${c} modulo ${m}.`,advancedMeta('number-modular-product',3));
  },'number-modular-product',false,3);

  const qMatrixNoncommute = markGenerator(function(rng){
    const a=pick(rng,[1,2,3,4]), b=pick(rng,[1,2,3]), c=pick(rng,[1,2,4]);
    const A=String.raw`A=\begin{pmatrix}1&${a}\\0&1\end{pmatrix}`,B=String.raw`B=\begin{pmatrix}1&0\\${b}&${c}\end{pmatrix}`;
    const ab12=a*c, ba12=a;
    return makeQuestion(rng,`Let ${tex(A)} and ${tex(B)}. Which statement is necessarily true for the displayed matrices?`,`Matrix multiplication is not commutative here because ${tex('AB\\ne BA')}.`,[`Both matrices lack additive inverses.`,`The matrices are not closed under multiplication.`,`Matrix multiplication is commutative because both matrices are ${tex('2\\times2')}.`],`The (1,2)-entry of ${tex('AB')} is ${tex(String(ab12))}, while the (1,2)-entry of ${tex('BA')} is ${tex(String(ba12))}; the products are therefore different.`,advancedMeta('number-matrix-structure',4));
  },'number-matrix-structure',false,4);

  const qCountingRestriction = markGenerator(function(rng){
    const n=pick(rng,[6,7,8,9,10,11,12]),k=pick(rng,[2,3,4]);
    let total=1; for(let j=0;j<k;j++) total*=n-j;
    const roles=k===2?'president and vice president':k===3?'gold, silver, and bronze medals':'first, second, third, and fourth places';
    return makeQuestion(rng,`${n} distinct people are eligible for ${roles}, with no person allowed to hold two positions. How many ordered outcomes are possible?`,total,[Math.pow(n,k),Math.round(total/k),n*(n-1)],`The positions are distinct and selections cannot repeat, so the count is the permutation ${tex(`${n}P_${k}=${total}`)}.`,advancedMeta('number-permutation',3));
  },'number-permutation',false,3);

  const qSequenceTableVisual = markGenerator(function(rng){
    const a=ri(rng,2,6),d=ri(rng,3,8),vals=[0,1,2,3,4].map(n=>a+n*d);
    const tbl=tableHtml(['n','0','1','2','3','4'],[['aₙ',...vals]],'sequence values');
    return makeQuestion(rng,`${tbl}<p>Which formula generates the sequence shown?</p>`,tex(`a_n=${a}+${d}n`),[tex(`a_n=${a}n+${d}`),tex(`a_n=${a}(${d})^n`),tex(`a_n=${d}-${a}n`)],`The first differences are constant and equal to ${d}, and ${tex('a_0')}=${a}.`,visualMeta('patterns-sequence-table',3));
  },'patterns-sequence-table',true,3);

  const qInfiniteGeometric = markGenerator(function(rng){
    const a=pick(rng,[3,4,6,8]), den=pick(rng,[2,3,4]),r=1/den, sum=a/(1-r);
    return makeQuestion(rng,`Evaluate the convergent geometric series ${disp(String.raw`${a}+\frac{${a}}{${den}}+\frac{${a}}{${den**2}}+\cdots`)}.`,tex(fmt(sum,3)),[tex(fmt(a/(1+r),3)),tex(fmt(a*r/(1-r),3)),`The series diverges.`],`The common ratio is ${tex(String.raw`r=\frac{1}{${den}}`)}, with ${tex('|r|<1')}. Thus ${tex(String.raw`S=\frac{a}{1-r}=${fmt(sum,3)}`)}.`,advancedMeta('patterns-infinite-geometric',4));
  },'patterns-infinite-geometric',false,4);

  const qAnnuity = markGenerator(function(rng){
    const P=pick(rng,[75,100,125,150,200,250]), rate=pick(rng,[1,2,3]), n=pick(rng,[6,8,10,12,18,24]);
    const i=rate/100, base=(1+i).toFixed(2); const fv=P*((1+i)**n-1)/i;
    return makeQuestion(rng,`At the end of each period, ${money(P)} is deposited into an account earning ${rate}% per period. Which expression gives the account value immediately after the ${n}th deposit?`,tex(String.raw`${P}\frac{(${base})^{${n}}-1}{${i}}`),[tex(String.raw`${P}(${base})^{${n}}`),tex(String.raw`${n*P}(${base})`),tex(String.raw`${P}\frac{1-(${base})^{-${n}}}{${i}}`)],`The deposits form a finite geometric series ${tex(String.raw`${P}+${P}(${base})+\cdots+${P}(${base})^{${n-1}}`)}, whose sum is the stated future-value expression (approximately ${money(fv)}).`,advancedMeta('patterns-annuity',4));
  },'patterns-annuity',false,4);

  const qFunctionGraphVerticalLine = markGenerator(function(rng){
    const type=pick(rng,['quadratic','absolute','cubic']);
    const h=pick(rng,[-2,-1,0,1,2]), k=pick(rng,[-2,-1,0,1,2]);
    const fn=type==='quadratic'?(x=>(x-h)**2/2+k):type==='absolute'?(x=>Math.abs(x-h)+k):(x=>(x-h)**3/8+k);
    const svg=svgAxesPlot([{fn}],{xmin:-5,xmax:5,ymin:-5,ymax:6,label:`${type} graph on coordinate axes`});
    return makeQuestion(rng,`${svg}<p>Which statement about the relation shown is correct?</p>`,`It is a function because every vertical line meets the graph at most once.`,[`It is not a function because some horizontal lines may meet it more than once.`,`It fails the vertical-line test.`,`Its domain contains only nonnegative real numbers.`],`The vertical-line test determines whether the graph represents ${tex('y')} as a function of ${tex('x')}. Every vertical line meets this graph at most once.`,visualMeta('function-vertical-line',3));
  },'function-vertical-line',true,3);

  const qInverseGraphVisual = markGenerator(function(rng){
    const m=pick(rng,[.5,1.5,2,-1,-2,3]), b=pick(rng,[-2,-1,0,1,2]);
    const svg=svgAxesPlot([{fn:x=>m*x+b},{fn:x=>(x-b)/m}],{xmin:-5,xmax:5,ymin:-5,ymax:5,label:'a linear function and its inverse'});
    return makeQuestion(rng,`${svg}<p>The two lines represent a one-to-one function and its inverse. Across which line must their graphs be reflections?</p>`,tex('y=x'),[tex('y=-x'),tex('x=0'),tex('y=0')],`The graph of ${tex('f^{-1}')} is obtained by interchanging input and output coordinates, which reflects the graph of ${tex('f')} across ${tex('y=x')}.`,visualMeta('function-inverse-graph',3));
  },'function-inverse-graph',true,3);

  const qFunctionOperationDomain = markGenerator(function(rng){
    const a=pick(rng,[-2,-1,0,1,2,3]);
    let b=pick(rng,[-3,-1,0,2,4,5]); if(b===a)b+=1;
    const lo=Math.min(a,b), hi=Math.max(a,b);
    const shift=x=>x>=0?`x-${x}`:`x+${Math.abs(x)}`;
    const f=tex(String.raw`f(x)=\sqrt{${shift(a)}}`), g=tex(String.raw`g(x)=\frac{1}{${shift(b)}}`);
    const interval=b<a?String.raw`[${a},\infty)`:String.raw`[${a},${b})\cup(${b},\infty)`;
    const wrong1=b<a?String.raw`[${a+1},\infty)`:String.raw`[${a},\infty)`, wrong2=String.raw`(${Math.max(a,b)},\infty)`, wrong3=String.raw`(-\infty,${b})\cup(${b},\infty)`;
    return makeQuestion(rng,`Let ${f} and ${g}. What is the domain of ${tex('(fg)(x)')}?`,tex(interval),[tex(wrong1),tex(wrong2),tex(wrong3)],`Both factors must be defined. The radical requires ${tex(`x\ge ${a}`)}, and the denominator requires ${tex(`x\ne ${b}`)}.`,advancedMeta('function-operation-domain',4));
  },'function-operation-domain',false,4);

  const qQuadraticGraphVisual = markGenerator(function(rng){
    const h=pick(rng,[-2,-1,1,2]),k=pick(rng,[-3,-2,1,2]),a=pick(rng,[1,-1]);
    const svg=svgAxesPlot([{fn:x=>a*(x-h)**2+k}],{xmin:-5,xmax:5,ymin:-6,ymax:6,label:'quadratic function graph'});
    const correct=tex(`y=${a===-1?'-':''}(x${h>=0?'-':'+'}${Math.abs(h)})^2${k>=0?'+':''}${k}`);
    return makeQuestion(rng,`${svg}<p>Which equation could define the graphed parabola?</p>`,correct,[tex(`y=${a===-1?'-':''}(x${h>=0?'+':'-'}${Math.abs(h)})^2${k>=0?'+':''}${k}`),tex(`y=${a===-1?'':'-'}(x${h>=0?'-':'+'}${Math.abs(h)})^2${k>=0?'+':''}${k}`),tex(`y=${a===-1?'-':''}(x${h>=0?'-':'+'}${Math.abs(h)})^2${k>=0?'-':'+'}${Math.abs(k)}`)],`The vertex is (${h}, ${k}) and the parabola opens ${a>0?'upward':'downward'}, so vertex form gives ${correct}.`,visualMeta('quadratic-graph-equation',4));
  },'quadratic-graph-equation',true,4);

  const qSystemGraphVisual = markGenerator(function(rng){
    const x0=pick(rng,[-2,-1,1,2,3]), y0=pick(rng,[-2,1,2,3,4]);
    let m1=pick(rng,[-2,-1,1,2]); let m2=pick(rng,[-3,-1,1,3]); if(m2===m1)m2=-m1;
    const b1=y0-m1*x0,b2=y0-m2*x0;
    const svg=svgAxesPlot([{fn:t=>m1*t+b1},{fn:t=>m2*t+b2}],{xmin:-5,xmax:5,ymin:-6,ymax:7,label:'two intersecting lines'});
    const pt=tex(`(${x0},${y0})`);
    return makeQuestion(rng,`${svg}<p>What is the solution of the system represented by the two lines?</p>`,pt,[tex(`(${y0},${x0})`),tex(`(${x0+1},${y0})`),`The system has no solution.`],`The solution to a graphed system is the intersection point, here ${pt}.`,visualMeta('linear-system-graph',3));
  },'linear-system-graph',true,3);

  const qQuadraticParameter = markGenerator(function(rng){
    const r=pick(rng,[1,2,3,4,5,6,7,8,9,10,11,12]), sign=pick(rng,[1,-1]), coeff=sign*2*r, c=r*r;
    const middle=coeff<0?`+${Math.abs(coeff)}x`:`-${coeff}x`;
    return makeQuestion(rng,`For which value of ${tex('k')} does ${tex(`x^2${middle}+k=0`)} have exactly one real solution?`,tex(String(c)),[tex(String(c-1)),tex(String(c+1)),tex(String(2*c))],`Exactly one real root requires discriminant 0: ${tex(`${coeff}^2-4k=0`)}, so ${tex(`k=${c}`)}.`,advancedMeta('quadratic-parameter-discriminant',4));
  },'quadratic-parameter-discriminant',false,4);

  const qPolynomialGraphVisual = markGenerator(function(rng){
    const roots=shuffle(rng,[-3,-2,-1,1,2,3,4]).slice(0,3).sort((a,b)=>a-b);
    const scale=pick(rng,[2,3,4,5]);
    const svg=svgAxesPlot([{fn:x=>(x-roots[0])*(x-roots[1])*(x-roots[2])/scale}],{xmin:-5,xmax:5,ymin:-8,ymax:8,label:'cubic polynomial graph with three real zeros'});
    const zeroText=roots.join(',');
    return makeQuestion(rng,`${svg}<p>Which statement about a polynomial consistent with this graph must be true?</p>`,tex(`f(${roots[0]})=f(${roots[1]})=f(${roots[2]})=0`),[tex('f(0)=0'),`The polynomial must have even degree.`,`The polynomial must have no real zeros.`],`The graph crosses the ${tex('x')}-axis at ${tex(zeroText)}, so those inputs are zeros of the polynomial.`,visualMeta('polynomial-zeros-graph',3));
  },'polynomial-zeros-graph',true,3);

  const qRationalGraphVisual = markGenerator(function(rng){
    const h=pick(rng,[-2,-1,1,2,3]), k=pick(rng,[-2,-1,0,1,2,3]);
    const a=pick(rng,[1,2,-1,-2]);
    const svg=svgAxesPlot([{fn:x=>a/(x-h)+k}],{xmin:-5,xmax:5,ymin:-6,ymax:7,label:'translated reciprocal-function graph'});
    return makeQuestion(rng,`${svg}<p>Which pair gives the vertical and horizontal asymptotes of the graph?</p>`,tex(`x=${h},\ y=${k}`),[tex(`x=${k},\ y=${h}`),tex(`x=${-h},\ y=${k}`),tex(`x=${h},\ y=0`)],`For a function of the form ${tex(String.raw`\frac{a}{x-h}+k`)}, the vertical asymptote is ${tex(`x=${h}`)} and the horizontal asymptote is ${tex(`y=${k}`)}.`,visualMeta('rational-asymptotes-graph',4));
  },'rational-asymptotes-graph',true,4);

  const qAbsoluteValueGraph = markGenerator(function(rng){
    const h=pick(rng,[-3,-2,-1,1,2,3]), k=pick(rng,[-3,-2,-1,0,1,2]);
    const a=pick(rng,[1,-1]);
    const svg=svgAxesPlot([{fn:x=>a*Math.abs(x-h)+k}],{xmin:-5,xmax:5,ymin:-6,ymax:7,label:'absolute value function graph'});
    const eq=tex(`y=${a<0?'-':''}|x${h>=0?'-':'+'}${Math.abs(h)}|${k>=0?'+':''}${k}`);
    return makeQuestion(rng,`${svg}<p>Which equation could define the graph?</p>`,eq,[tex(`y=${a<0?'-':''}|x${h>=0?'+':'-'}${Math.abs(h)}|${k>=0?'+':''}${k}`),tex(`y=${a>0?'-':''}|x${h>=0?'-':'+'}${Math.abs(h)}|${k>=0?'+':''}${k}`),tex(`y=${a<0?'-':''}|x${h>=0?'-':'+'}${Math.abs(h)}|${k>=0?'-':'+'}${Math.abs(k)}`)],`The vertex is ${tex(`(${h},${k})`)} and the graph opens ${a>0?'upward':'downward'}, which determines the displayed equation.`,visualMeta('absolute-value-graph',3));
  },'absolute-value-graph',true,3);

  const qRationalSlant = markGenerator(function(rng){
    const c=pick(rng,[-3,-2,-1,1,2,3,4]), d=pick(rng,[-3,-2,-1,1,2,3]);
    const rem=pick(rng,[1,2,-1,-2]);
    const B=c+d, C=c*d+rem;
    const numerator=`x^2${B>=0?'+':''}${B}x${C>=0?'+':''}${C}`;
    const denominator=`x${d>=0?'+':''}${d}`;
    const cx=c===1?'x':c===-1?'-x':`${c}x`;
    return makeQuestion(rng,`For ${tex(String.raw`f(x)=\frac{${numerator}}{${denominator}}`)}, what is the slant asymptote?`,tex(`y=x${c>=0?'+':''}${c}`),[tex(`y=x${d>=0?'+':''}${d}`),tex(`y=${cx}+1`),tex(`y=${c}`)],`Polynomial division gives ${tex(String.raw`f(x)=x${c>=0?'+':''}${c}+\frac{${rem}}{${denominator}}`)}, so the slant asymptote is ${tex(`y=x${c>=0?'+':''}${c}`)}.`,advancedMeta('rational-slant-asymptote',4));
  },'rational-slant-asymptote',false,4);

  const qPolynomialMultiplicity = markGenerator(function(rng){
    const r=pick(rng,[-3,-2,-1,1,2,3]), s=pick(rng,[-4,-2,1,4]);
    const even=pick(rng,[2,4]), odd=pick(rng,[1,3]);
    const factorR=`(x${r>=0?'-':'+'}${Math.abs(r)})^${even}`, factorS=`(x${s>=0?'-':'+'}${Math.abs(s)})^${odd}`;
    return makeQuestion(rng,`A polynomial has factorization ${tex(`f(x)=${factorR}${factorS}`)}. Which description of its graph at the zeros is correct?`,`It touches the ${tex('x')}-axis at ${tex(`x=${r}`)} and crosses the ${tex('x')}-axis at ${tex(`x=${s}`)}.`,[`It crosses the ${tex('x')}-axis at both zeros.`,`It touches the ${tex('x')}-axis at both zeros.`,`It crosses at ${tex(`x=${r}`)} and touches at ${tex(`x=${s}`)}.`],`An even multiplicity produces a touch/turn at ${tex(`x=${r}`)}; an odd multiplicity produces a crossing at ${tex(`x=${s}`)}.`,advancedMeta('polynomial-multiplicity',3));
  },'polynomial-multiplicity',false,3);

  const qExponentialGraphVisual = markGenerator(function(rng){
    const base=pick(rng,[2,3,4,5,6,7,8]); const growth=rng()<.5;
    const fn=growth?(x=>base**x):(x=>base**(-x));
    const svg=svgAxesPlot([{fn}],{xmin:-4,xmax:4,ymin:-1,ymax:10,label:`exponential ${growth?'growth':'decay'} graph`});
    const correct=`The function has horizontal asymptote ${tex('y=0')} and is ${growth?'increasing':'decreasing'} on its domain.`;
    return makeQuestion(rng,`${svg}<p>Which property is illustrated by the graph?</p>`,correct,[`The function has vertical asymptote ${tex('x=0')}.`,`The range is all real numbers.`,`The graph crosses the ${tex('x')}-axis.`],`An exponential function ${tex(`y=${base}^{${growth?'x':'-x'}}`)} is always positive and has horizontal asymptote ${tex('y=0')}; its monotonic direction depends on the exponent.`,visualMeta('exponential-graph-properties',3));
  },'exponential-graph-properties',true,3);

  const qLogGraphVisual = markGenerator(function(rng){
    const base=pick(rng,[2,3,4]), h=pick(rng,[-2,-1,0,1,2]);
    const svg=svgAxesPlot([{fn:x=>x>h?Math.log(x-h)/Math.log(base):NaN}],{xmin:-4,xmax:8,ymin:-5,ymax:5,label:'translated logarithmic function graph'});
    const eq=tex(`y=\\log_{${base}}(x${h>=0?'-':'+'}${Math.abs(h)})`);
    return makeQuestion(rng,`${svg}<p>Which equation could define the graph?</p>`,eq,[tex(`y=${base}^x`),tex(`y=\\log_{${base}}(x${h>=0?'+':'-'}${Math.abs(h)})`),tex(`y=-\\log_{${base}}(x${h>=0?'-':'+'}${Math.abs(h)})`)],`The vertical asymptote is ${tex(`x=${h}`)}, and the graph has the shape of an increasing logarithm with base ${tex(String(base))}.`,visualMeta('logarithm-graph',3));
  },'logarithm-graph',true,3);

  const qLogScale = markGenerator(function(rng){
    const coeff=pick(rng,[10,20,30]), power=pick(rng,[1,2,3]), mult=10**power, increase=coeff*power;
    return makeQuestion(rng,`On a logarithmic scale ${tex(`L=${coeff}\\log_{10}(I/I_0)`)}, how much does ${tex('L')} increase when intensity is multiplied by ${tex(String(mult))}?`,tex(String(increase)),[tex(String(coeff)),tex(String(power)),tex(String(mult))],`The increase is ${tex(`${coeff}\\log_{10}(${mult})=${coeff}(${power})=${increase}`)}.`,advancedMeta('logarithmic-scale',4));
  },'logarithmic-scale',false,4);

  const qDifferentialGrowth = markGenerator(function(rng){
    const initial=pick(rng,[20,50,80,100]);
    const k=pick(rng,[.1,.2,.4,-.1,-.2,-.3]);
    return makeQuestion(rng,`A differentiable function satisfies ${tex(`f'(t)=${k}f(t)`)} and ${tex(`f(0)=${initial}`)}. Which formula models ${tex('f')}?`,tex(`f(t)=${initial}e^{${k}t}`),[tex(`f(t)=${initial}${k>=0?'+':'-'}${Math.abs(k)}t`),tex(`f(t)=${initial}(${Math.abs(k)})^t`),tex(`f(t)=e^{${initial*k}t}`)],`A quantity whose rate of change is proportional to its current amount has the exponential form ${tex('f(t)=f(0)e^{kt}')}.`,advancedMeta('exponential-proportional-rate',4));
  },'exponential-proportional-rate',false,4);

  const qUnitCircleVisual = markGenerator(function(rng){
    const cases=[
      [30,String.raw`\frac{\sqrt3}{2}`,String.raw`\frac12`],[45,String.raw`\frac{\sqrt2}{2}`,String.raw`\frac{\sqrt2}{2}`],[60,String.raw`\frac12`,String.raw`\frac{\sqrt3}{2}`],
      [120,String.raw`-\frac12`,String.raw`\frac{\sqrt3}{2}`],[135,String.raw`-\frac{\sqrt2}{2}`,String.raw`\frac{\sqrt2}{2}`],[150,String.raw`-\frac{\sqrt3}{2}`,String.raw`\frac12`],
      [210,String.raw`-\frac{\sqrt3}{2}`,String.raw`-\frac12`],[225,String.raw`-\frac{\sqrt2}{2}`,String.raw`-\frac{\sqrt2}{2}`],[300,String.raw`\frac12`,String.raw`-\frac{\sqrt3}{2}`],
      [315,String.raw`\frac{\sqrt2}{2}`,String.raw`-\frac{\sqrt2}{2}`],[330,String.raw`\frac{\sqrt3}{2}`,String.raw`-\frac12`]
    ];
    const [angle,c,sn]=pick(rng,cases), svg=svgUnitCircle(angle);
    const correct=tex(String.raw`\left(${c},${sn}\right)`);
    const others=shuffle(rng,cases.filter(x=>x[0]!==angle)).slice(0,3).map(x=>tex(String.raw`\left(${x[1]},${x[2]}\right)`));
    return makeQuestion(rng,`${svg}<p>Point P corresponds to an angle of ${tex(`${angle}^\\circ`)} on the unit circle. What are the coordinates of P?</p>`,correct,others,`On the unit circle the coordinates are ${tex('(\\cos\\theta,\\sin\\theta)')}. For ${tex(`${angle}^\\circ`)}, these values give ${correct}.`,visualMeta('trig-unit-circle',3));
  },'trig-unit-circle',true,3);

  const qTrigGraphVisual2 = markGenerator(function(rng){
    const A=pick(rng,[1,2,3]), period=pick(rng,[2,4,6,8]), omega=2*Math.PI/period;
    const svg=svgAxesPlot([{fn:x=>A*Math.sin(omega*x)}],{xmin:-1,xmax:period+1,ymin:-A-1,ymax:A+1,label:'sinusoidal graph'});
    return makeQuestion(rng,`${svg}<p>Which pair gives the amplitude and period of the sinusoid?</p>`,`Amplitude ${A}; period ${period}.`,[`Amplitude ${period}; period ${A}.`,`Amplitude ${A}; period ${period/2}.`,`Amplitude ${2*A}; period ${period}.`],`The vertical distance from the midline to an extremum is ${A}, and one complete cycle spans ${period} horizontal units.`,visualMeta('trig-amplitude-period-graph',4));
  },'trig-amplitude-period-graph',true,4);

  const qTrigEquationAdvanced = markGenerator(function(rng){
    const cases=[
      [String.raw`2\sin^2x-1=0`,String.raw`x=\frac{\pi}{4},\frac{3\pi}{4},\frac{5\pi}{4},\frac{7\pi}{4}`,String.raw`\sin x=\pm\frac{\sqrt2}{2}`],
      [String.raw`2\cos^2x-1=0`,String.raw`x=\frac{\pi}{4},\frac{3\pi}{4},\frac{5\pi}{4},\frac{7\pi}{4}`,String.raw`\cos x=\pm\frac{\sqrt2}{2}`],
      [String.raw`2\sin x-1=0`,String.raw`x=\frac{\pi}{6},\frac{5\pi}{6}`,String.raw`\sin x=\frac12`],
      [String.raw`2\cos x+1=0`,String.raw`x=\frac{2\pi}{3},\frac{4\pi}{3}`,String.raw`\cos x=-\frac12`],
      [String.raw`\tan x=1`,String.raw`x=\frac{\pi}{4},\frac{5\pi}{4}`,String.raw`\tan x=1`],
      [String.raw`\sin(2x)=0`,String.raw`x=0,\frac{\pi}{2},\pi,\frac{3\pi}{2}`,String.raw`2x=k\pi`],
      [String.raw`\cos(2x)=1`,String.raw`x=0,\pi`,String.raw`2x=2k\pi`],
      [String.raw`\sin x(2\cos x-1)=0`,String.raw`x=0,\frac{\pi}{3},\pi,\frac{5\pi}{3}`,String.raw`\sin x=0\text{ or }\cos x=\frac12`],
      [String.raw`2\sin x+\sqrt2=0`,String.raw`x=\frac{5\pi}{4},\frac{7\pi}{4}`,String.raw`\sin x=-\frac{\sqrt2}{2}`],
      [String.raw`2\cos x-\sqrt3=0`,String.raw`x=\frac{\pi}{6},\frac{11\pi}{6}`,String.raw`\cos x=\frac{\sqrt3}{2}`],
      [String.raw`\tan x=-1`,String.raw`x=\frac{3\pi}{4},\frac{7\pi}{4}`,String.raw`\tan x=-1`],
      [String.raw`2\sin(2x)-\sqrt3=0`,String.raw`x=\frac{\pi}{6},\frac{\pi}{3},\frac{7\pi}{6},\frac{4\pi}{3}`,String.raw`\sin(2x)=\frac{\sqrt3}{2}`]
    ];
    const [eq,sol,reason]=pick(rng,cases);
    return makeQuestion(rng,`Solve ${tex(eq)} for ${tex(String.raw`0\le x<2\pi`)}.`,tex(sol),[tex(String.raw`x=0,\pi`),tex(String.raw`x=\frac{\pi}{2},\frac{3\pi}{2}`),tex(String.raw`x=\frac{\pi}{4},\frac{5\pi}{4}`)],`Reduce the equation to ${tex(reason)} and list every solution in ${tex(String.raw`[0,2\pi)`)}.`,advancedMeta('trig-equation',4));
  },'trig-equation',false,4);

  const qSinusoidalModel = markGenerator(function(rng){
    const radius=pick(rng,[10,12,15,18,20,25]), clearance=pick(rng,[1,2,3,4]), center=radius+clearance, period=pick(rng,[24,30,36,40,48,60]);
    const omega=String.raw`\frac{2\pi}{${period}}`;
    return makeQuestion(rng,`A Ferris wheel has radius ${radius} m, its center is ${center} m above the ground, and it completes one revolution every ${period} s. A rider starts at the lowest point. Which model gives height ${tex('h(t)')}?`,tex(String.raw`h(t)=${center}-${radius}\cos\left(${omega}t\right)`),[tex(String.raw`h(t)=${radius}-${center}\cos\left(${omega}t\right)`),tex(String.raw`h(t)=${center}+${radius}\cos\left(${omega}t\right)`),tex(String.raw`h(t)=${center}-${radius}\sin\left(${omega}t\right)`)],`The midline is ${center}, amplitude ${radius}, and angular frequency is ${tex(omega)}. Starting at the minimum requires negative cosine.`,advancedMeta('trig-periodic-model',4));
  },'trig-periodic-model',false,4);

  const qLimitGraphVisual = markGenerator(function(rng){
    const a=pick(rng,[-2,-1,1,2]);
    const m=pick(rng,[-2,-1,1,2]);
    let b=pick(rng,[-1,0,1,2]);
    if (m*a+b===a) b += 1;
    const L=m*a+b;
    const pointY=L+pick(rng,[2,3,-2]);
    const svg=svgAxesPlot([{fn:x=>m*x+b}],{xmin:-4,xmax:4,ymin:-7,ymax:7,holes:[{x:a,y:L}],points:[{x:a,y:pointY}],label:'function with a removable discontinuity and a separately defined point value'});
    return makeQuestion(rng,`${svg}<p>The graph has an open circle at ${tex(`(${a},${L})`)} and a filled point at ${tex(`(${a},${pointY})`)}. Which statement correctly describes the limit and the function value at ${tex(`x=${a}`)}?</p>`,tex(String.raw`\lim_{x\to${a}}f(x)=${L}\quad\text{and}\quad f(${a})=${pointY}`),[tex(String.raw`\lim_{x\to${a}}f(x)=${pointY}`),`The limit does not exist because ${tex(String.raw`f(${a})\ne ${L}`)}.`,tex(String.raw`\lim_{x\to${a}}f(x)=${a}`)],`The limit is determined by nearby values of the graph. From both sides, ${tex(`f(x)`)} approaches ${tex(String(L))}, while the filled point gives ${tex(`f(${a})=${pointY}`)}.`,visualMeta('calculus-limit-graph',4));
  },'calculus-limit-graph',true,4);

  const qDerivativeGraphAnalysis = markGenerator(function(rng){
    const c=pick(rng,[1,2,3]), scale=pick(rng,[1,2,3]);
    const svg=svgAxesPlot([{fn:x=>scale*((x**3)/3-(c*c)*x)}],{xmin:-4.5,xmax:4.5,ymin:-18,ymax:18,label:'cubic function graph used for derivative sign analysis'});
    const dec=tex(`(-${c},${c})`);
    const scaleText=scale===1?'':String(scale);
    const linearCoeff=c*c===1?'x':`${c*c}x`;
    const derivScale=scale===1?'':String(scale);
    return makeQuestion(rng,`${svg}<p>The graph is consistent with ${tex(String.raw`f(x)=${scaleText}\left(\frac{x^3}{3}-${linearCoeff}\right)`)}. On which interval is ${tex('f')} decreasing?</p>`,dec,[tex(`(-\\infty,-${c})`),tex(`(${c},\\infty)`),tex(`(-\\infty,-${c})\\cup(${c},\\infty)`) ],`Since ${tex(`f'(x)=${derivScale}(x^2-${c*c})`)}, the positive scale factor does not change the sign; ${tex("f'(x)<0")} exactly when ${tex(`|x|<${c}`)}.`,visualMeta('calculus-derivative-graph-analysis',4));
  },'calculus-derivative-graph-analysis',true,4);

  const qSecondDerivativeConcept = markGenerator(function(rng){
    const c=pick(rng,[-3,-2,-1,0,1,2,3]), mode=pick(rng,['min','max','concaveUp','concaveDown']);
    if(mode==='min') return makeQuestion(rng,`Suppose ${tex(`f'(${c})=0`)}, ${tex(`f''(${c})>0`)}, and ${tex('f')} is twice differentiable near ${tex(String(c))}. What follows from the second-derivative test?`,`${tex('f')} has a local minimum at ${tex(`x=${c}`)}.`,[`${tex('f')} has a local maximum at ${tex(`x=${c}`)}.`,`${tex('f')} must have an inflection point at ${tex(`x=${c}`)}.`,`No local conclusion is possible.`],`A critical point with positive second derivative is a local minimum.`,advancedMeta('calculus-second-derivative',3));
    if(mode==='max') return makeQuestion(rng,`Suppose ${tex(`f'(${c})=0`)}, ${tex(`f''(${c})<0`)}, and ${tex('f')} is twice differentiable near ${tex(String(c))}. What follows?`,`${tex('f')} has a local maximum at ${tex(`x=${c}`)}.`,[`${tex('f')} has a local minimum there.`,`${tex('f')} must be increasing on all real numbers.`,`No local conclusion is possible.`],`A critical point with negative second derivative is a local maximum.`,advancedMeta('calculus-second-derivative',3));
    if(mode==='concaveUp') return makeQuestion(rng,`On an interval ${tex('I')}, ${tex("f''(x)>0")} for every ${tex('x\\in I')}. Which conclusion is valid?`,`${tex('f')} is concave upward on ${tex('I')}.`,[`${tex('f')} is necessarily increasing on ${tex('I')}.`,`${tex('f')} is concave downward on ${tex('I')}.`,`${tex("f'(x)=0")} throughout ${tex('I')}.`],`A positive second derivative means the first derivative is increasing, which characterizes concave-up behavior.`,advancedMeta('calculus-second-derivative',3));
    return makeQuestion(rng,`On an interval ${tex('I')}, ${tex("f''(x)<0")} for every ${tex('x\\in I')}. Which conclusion is valid?`,`${tex('f')} is concave downward on ${tex('I')}.`,[`${tex('f')} is necessarily decreasing on ${tex('I')}.`,`${tex('f')} is concave upward on ${tex('I')}.`,`${tex("f'(x)=0")} throughout ${tex('I')}.`],`A negative second derivative means the first derivative is decreasing, which characterizes concave-down behavior.`,advancedMeta('calculus-second-derivative',3));
  },'calculus-second-derivative',false,3);
  const qVelocityGraphIntegral = markGenerator(function(rng){
    const T=pick(rng,[4,5,6,7]), br=pick(rng,[1,2,3]), m=pick(rng,[1,2,3,4]);
    const b=Math.min(br,T-1), plateau=m*b;
    const displacement=0.5*b*plateau+(T-b)*plateau;
    const svg=svgAxesPlot([{fn:t=>t<=b?m*t:plateau}],{xmin:0,xmax:T+1,ymin:0,ymax:Math.max(6,plateau+2),label:'velocity versus time graph'});
    const fmt=x=>Number.isInteger(x)?String(x):x.toFixed(1);
    const correct=`${fmt(displacement)} meters`;
    const d1=`${fmt(plateau*T)} meters`, d2=`${fmt(0.5*T*plateau)} meters`, d3=`${fmt(plateau)} meters`;
    return makeQuestion(rng,`${svg}<p>The graph gives an object's velocity, in meters per second, for ${tex(`0\\le t\\le ${T}`)}. What is the object's displacement over this interval?</p>`,correct,[d1,d2,d3],`Displacement is signed area under the velocity graph: ${tex(`\\frac12(${b})(${plateau})+(${T-b})(${plateau})=${fmt(displacement)}`)} meters.`,visualMeta('calculus-velocity-area',4));
  },'calculus-velocity-area',true,4);

  const qRelatedRates = markGenerator(function(rng){
    const r=pick(rng,[2,3,4,5]);
    const dr=pick(rng,[1,2,3]);
    const coeff=2*r*dr;
    const wrong=[coeff/2, coeff+2, coeff+4];
    return makeQuestion(rng,`The radius of a circular oil spill is increasing at ${tex(`${dr}\\text{ m/min}`)}. At the instant ${tex(`r=${r}\\text{ m}`)}, how fast is the area increasing?`,tex(`${coeff}\\pi\\text{ m}^2/\\text{min}`),wrong.map(x=>tex(`${x}\\pi\\text{ m}^2/\\text{min}`)),`Differentiate ${tex('A=\\pi r^2')}: ${tex(String.raw`\frac{dA}{dt}=2\pi r\frac{dr}{dt}`)}. Substitution gives ${tex(`${coeff}\\pi\\text{ m}^2/\\text{min}`)}.`,advancedMeta('calculus-related-rates',4));
  },'calculus-related-rates',false,4);

  const qWorkIntegral = markGenerator(function(rng){
    const p=pick(rng,[1,2]);
    const b=pick(rng,[2,3]);
    const k=pick(rng,[2,3,4,6]);
    const numerator=k*(b**(p+1));
    const denom=p+1;
    const value=numerator/denom;
    const force=p===1?`${k}x`:`${k}x^2`;
    const exact=Number.isInteger(value)?`${value}`:String.raw`\frac{${numerator}}{${denom}}`;
    const choices=[value/2,value*1.5,value*(p+1)].map(v=>Number.isInteger(v)?tex(`${v}\\text{ J}`):tex(`${v.toFixed(1)}\\text{ J}`));
    return makeQuestion(rng,`A variable force is ${tex(`F(x)=${force}`)} newtons for ${tex(`0\\le x\\le ${b}`)} meters. How much work is done?`,tex(`${exact}\\text{ J}`),choices,`Work is ${tex(String.raw`W=\int_0^{${b}} ${force}\,dx=${exact}`)} joules.`,advancedMeta('calculus-work',4));
  },'calculus-work',false,4);

  const qCenterMass = markGenerator(function(rng){
    const b=pick(rng,[1,2,3]);
    const c=pick(rng,[1,2,3]);
    return makeQuestion(rng,`A thin rod occupies ${tex(`0\\le x\\le ${b}`)} with density ${tex(`\\rho(x)=x+${c}`)}. Which expression correctly gives its center of mass ${tex('\\bar x')}?`,tex(String.raw`\bar x=\frac{\int_0^{${b}} x(x+${c})\,dx}{\int_0^{${b}}(x+${c})\,dx}`),[tex(String.raw`\bar x=\int_0^{${b}}(x+${c})\,dx`),tex(String.raw`\bar x=\frac{\int_0^{${b}}(x+${c})\,dx}{\int_0^{${b}}x(x+${c})\,dx}`),tex(String.raw`\bar x=\frac1{${b}}\int_0^{${b}}x(x+${c})\,dx`)],`Center of mass is first moment divided by total mass: ${tex(String.raw`\bar x=\frac{\int x\rho(x)\,dx}{\int\rho(x)\,dx}`)}.`,advancedMeta('calculus-center-mass',4));
  },'calculus-center-mass',false,4);

  const qPrismDiagram = markGenerator(function(rng){
    const l=pick(rng,[4,5,6,7,8,9]),wid=pick(rng,[2,3,4,5]),h=pick(rng,[3,4,5,6,7]),sa=2*(l*wid+l*h+wid*h),svg=svgPrism(l,wid,h);
    return makeQuestion(rng,`${svg}<p>What is the surface area of the rectangular prism?</p>`,tex(`${sa}\\text{ square units}`),[tex(`${l*wid*h}\\text{ square units}`),tex(`${2*(l+wid+h)}\\text{ square units}`),tex(`${l*wid+l*h+wid*h}\\text{ square units}`)],`Add the areas of the three pairs of congruent faces: ${tex(`2(${l*wid}+${l*h}+${wid*h})=${sa}`)}.`,visualMeta('measurement-prism-diagram',3));
  },'measurement-prism-diagram',true,3);

  const qTriangleMeasureDiagram = markGenerator(function(rng){
    const triples=[[3,4,5],[5,12,13],[7,24,25],[8,15,17],[9,40,41],[12,35,37]];
    const [opp,adj,hyp]=pick(rng,triples), ask=pick(rng,['sin','cos','tan']);
    const svg=svgTriangle(String(opp),String(hyp),String(adj),{right:true,label:'right triangle with side lengths'});
    const correct=ask==='sin'?String.raw`\frac{${opp}}{${hyp}}`:ask==='cos'?String.raw`\frac{${adj}}{${hyp}}`:String.raw`\frac{${opp}}{${adj}}`;
    const ds=ask==='sin'?[String.raw`\frac{${adj}}{${hyp}}`,String.raw`\frac{${opp}}{${adj}}`,String.raw`\frac{${hyp}}{${opp}}`]:ask==='cos'?[String.raw`\frac{${opp}}{${hyp}}`,String.raw`\frac{${adj}}{${opp}}`,String.raw`\frac{${hyp}}{${adj}}`]:[String.raw`\frac{${adj}}{${opp}}`,String.raw`\frac{${opp}}{${hyp}}`,String.raw`\frac{${hyp}}{${adj}}`];
    return makeQuestion(rng,`${svg}<p>In the right triangle shown, what is ${tex(`\\${ask} A`)}?</p>`,tex(correct),ds.map(tex),`Relative to angle A, the opposite, adjacent, and hypotenuse lengths are ${opp}, ${adj}, and ${hyp}, respectively.`,visualMeta('measurement-right-triangle-diagram',3));
  },'measurement-right-triangle-diagram',true,3);

  const qArcLength = markGenerator(function(rng){
    const a=pick(rng,[1,2,3]), b=pick(rng,[1,2,3,4]);
    const ax=a===1?'':String(a), a2=a*a===1?'':String(a*a), da=2*a===1?'':String(2*a);
    return makeQuestion(rng,`Which integral gives the arc length of ${tex(`y=${ax}x^2`)} from ${tex('x=0')} to ${tex(`x=${b}`)}?`,tex(String.raw`\int_0^${b}\sqrt{1+${4*a*a}x^2}\,dx`),[tex(String.raw`\int_0^${b}(1+${2*a}x)\,dx`),tex(String.raw`\int_0^${b}\sqrt{1+${a2}x^4}\,dx`),tex(String.raw`\int_0^${b} ${2*a}x\,dx`)],`For ${tex('y=f(x)')}, arc length is ${tex(String.raw`\int_a^b\sqrt{1+[f'(x)]^2}\,dx`)}. Here ${tex(`f'(x)=${2*a}x`)}.`,advancedMeta('measurement-arc-length',4));
  },'measurement-arc-length',false,4);

  const qParallelLinesDiagram = markGenerator(function(rng){
    const ang=pick(rng,[96,102,108,112,118,124,128,132,136,142,148,154]);
    const svg=`<svg class="svg-graph diagram" viewBox="0 0 430 240" role="img" aria-label="parallel lines cut by a transversal"><line x1="50" y1="70" x2="380" y2="70" class="diagram-line"/><line x1="50" y1="170" x2="380" y2="170" class="diagram-line"/><line x1="120" y1="220" x2="300" y2="20" class="diagram-line emphasis"/><text x="245" y="60" class="diagram-label">${ang}°</text><text x="190" y="198" class="diagram-label">x°</text></svg>`;
    return makeQuestion(rng,`${svg}<p>The horizontal lines are parallel. What is ${tex('x')}?</p>`,tex(`${ang}^\\circ`),[tex(`${180-ang}^\\circ`),tex(`${Math.abs(ang-90)}^\\circ`),tex(`${360-ang}^\\circ`)],`The marked angles are alternate exterior angles, so they are congruent.`,visualMeta('geometry-parallel-lines',3));
  },'geometry-parallel-lines',true,3);

  const qTriangleCongruenceDiagram = markGenerator(function(rng){
    const mode=pick(rng,['SAS','SSS','ASA','AAS']);
    const labels=pick(rng,[['A','B','C','P','Q','R'],['J','K','L','R','S','T'],['M','N','P','X','Y','Z'],['D','E','F','G','H','J'],['P','Q','R','U','V','W'],['A','C','D','K','M','N']]);
    const [A,B,C,P,Q,R]=labels;
    const left={A:[55,205],B:[175,205],C:[105,55]}, right={A:[255,205],B:[385,205],C:[325,55]};
    const line=(x1,y1,x2,y2,cls='diagram-line')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
    const tick=(P,Q,n=1)=>{const mx=(P[0]+Q[0])/2,my=(P[1]+Q[1])/2,dx=Q[0]-P[0],dy=Q[1]-P[1],len=Math.hypot(dx,dy),nx=-dy/len,ny=dx/len,tx=dx/len,ty=dy/len;let out='';for(let k=0;k<n;k++){const off=(k-(n-1)/2)*8;const cx=mx+tx*off,cy=my+ty*off;out+=line((cx-nx*6).toFixed(1),(cy-ny*6).toFixed(1),(cx+nx*6).toFixed(1),(cy+ny*6).toFixed(1),'diagram-line emphasis');}return out;};
    const arc=(P,u,v,r=22,second=false)=>{const a1=Math.atan2(u[1]-P[1],u[0]-P[0]),a2=Math.atan2(v[1]-P[1],v[0]-P[0]);let d=a2-a1;while(d<=-Math.PI)d+=2*Math.PI;while(d>Math.PI)d-=2*Math.PI;const rr=r+(second?8:0);const x1=P[0]+rr*Math.cos(a1),y1=P[1]+rr*Math.sin(a1),x2=P[0]+rr*Math.cos(a1+d),y2=P[1]+rr*Math.sin(a1+d);return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${rr} ${rr} 0 0 ${d>0?1:0} ${x2.toFixed(1)} ${y2.toFixed(1)}" class="diagram-line emphasis"/>`;};
    let marks='';
    if(mode==='SSS'){
      marks=tick(left.A,left.B,1)+tick(right.A,right.B,1)+tick(left.A,left.C,2)+tick(right.A,right.C,2)+tick(left.B,left.C,3)+tick(right.B,right.C,3);
    } else if(mode==='SAS'){
      marks=tick(left.A,left.B,1)+tick(right.A,right.B,1)+tick(left.A,left.C,2)+tick(right.A,right.C,2)+arc(left.A,left.B,left.C)+arc(right.A,right.B,right.C);
    } else if(mode==='ASA'){
      marks=tick(left.A,left.B,1)+tick(right.A,right.B,1)+arc(left.A,left.B,left.C)+arc(right.A,right.B,right.C)+arc(left.B,left.A,left.C)+arc(left.B,left.A,left.C,22,true)+arc(right.B,right.A,right.C)+arc(right.B,right.A,right.C,22,true);
    } else {
      marks=tick(left.A,left.B,1)+tick(right.A,right.B,1)+arc(left.A,left.B,left.C)+arc(right.A,right.B,right.C)+arc(left.C,left.A,left.B)+arc(left.C,left.A,left.B,22,true)+arc(right.C,right.A,right.B)+arc(right.C,right.A,right.B,22,true);
    }
    const svg=`<svg class="svg-graph diagram" viewBox="0 0 440 245" role="img" aria-label="two triangles with matching congruence marks"><polygon points="55,205 175,205 105,55" class="shape-fill"/><polygon points="255,205 385,205 325,55" class="shape-fill"/>${marks}<text x="45" y="225" class="diagram-label">${A}</text><text x="178" y="225" class="diagram-label">${B}</text><text x="100" y="45" class="diagram-label">${C}</text><text x="245" y="225" class="diagram-label">${P}</text><text x="389" y="225" class="diagram-label">${Q}</text><text x="320" y="45" class="diagram-label">${R}</text></svg>`;
    const desc=mode==='SAS'?'two pairs of corresponding sides and the included angles':mode==='SSS'?'all three pairs of corresponding sides':mode==='ASA'?'two pairs of corresponding angles and the included sides':'two pairs of corresponding angles and a nonincluded pair of sides';
    const distractors=['SAS','SSS','ASA','AAS','SSA','AAA'].filter(x=>x!==mode).slice(0,3);
    return makeQuestion(rng,`${svg}<p>The matching tick marks and angle arcs indicate that ${desc} are congruent. Which congruence theorem proves ${tex(`\\triangle ${A}${B}${C}\\cong\\triangle ${P}${Q}${R}`)}?</p>`,mode,distractors,`The marked information matches the ${mode} congruence criterion.`,visualMeta('geometry-congruence-diagram',3));
  },'geometry-congruence-diagram',true,3);

  const qSimilarTrianglesDiagram = markGenerator(function(rng){
    const k=pick(rng,[1.5,2,2.5,3,4]);
    const a=pick(rng,[3,4,5,6,8]), b=pick(rng,[4,5,6,7,9]);
    const ak=a*k, bk=b*k;
    const fmtN=n=>Number.isInteger(n)?String(n):n.toFixed(1);
    const svg=`<svg class="svg-graph diagram" viewBox="0 0 470 250" role="img" aria-label="two similar triangles with corresponding side lengths"><polygon points="45,205 175,205 85,75" class="shape-fill"/><polygon points="255,205 425,205 310,45" class="shape-fill"/><text x="95" y="228" class="diagram-label">${a}</text><text x="55" y="135" class="diagram-label">${b}</text><text x="330" y="228" class="diagram-label">${fmtN(ak)}</text><text x="270" y="125" class="diagram-label">x</text><path d="M65 191 A24 24 0 0 1 83 170" class="diagram-line"/><path d="M280 190 A30 30 0 0 1 303 164" class="diagram-line"/></svg>`;
    return makeQuestion(rng,`${svg}<p>The two triangles are similar, and the marked lower-left angles correspond. The side of length ${a} corresponds to the side of length ${fmtN(ak)}, while the side of length ${b} corresponds to the side of length ${tex('x')}. What is ${tex('x')}?</p>`,tex(fmtN(bk)),[tex(fmtN(b/k)),tex(fmtN(ak+b)),tex(fmtN(a*k*k))],`The scale factor from the smaller triangle to the larger triangle is ${tex(fmtN(k))}. Therefore ${tex(`x=${fmtN(k)}(${b})=${fmtN(bk)}`)}.`,visualMeta('geometry-similarity-diagram',3));
  },'geometry-similarity-diagram',true,3);

  const qConstruction = markGenerator(function(rng){
    const names=pick(rng,[['A','B','C'],['P','Q','R'],['X','Y','Z'],['M','N','T']]); const [A,B,C]=names;
    const cases=[
      [`Equal-radius arcs are drawn from endpoints ${tex(A)} and ${tex(B)} of segment ${tex(A+B)}. The two arc-intersection points are joined. What line is constructed?`,`The perpendicular bisector of ${tex(A+B)}.`,[`A line parallel to ${tex(A+B)}.`,`An angle bisector at ${tex(A)}.`,`A tangent through ${tex(B)}.`]],
      [`An arc centered at vertex ${tex(A)} meets both sides of ${tex(`\\angle ${A}`)}. Equal-radius arcs centered at those two intersection points meet inside the angle. Joining ${tex(A)} to that new point constructs what?`,`The angle bisector of ${tex(`\\angle ${A}`)}.`,[`The perpendicular bisector of an opposite side.`,`A line parallel to one side.`,`A median of an unspecified triangle.`]],
      [`Circles of radius ${tex(A+B)} are drawn with centers ${tex(A)} and ${tex(B)}. One intersection point is ${tex(C)}. What can be concluded about ${tex(`\\triangle ${A}${B}${C}`)}?`,`It is equilateral.`,[`It is right.`,`It is scalene.`,`It is isosceles but cannot be equilateral.`]],
      [`A perpendicular is constructed from point ${tex(A)} to line ${tex('\\ell')}, meeting the line at ${tex(B)}. Which property characterizes segment ${tex(A+B)}?`,`${tex(A+B)} gives the shortest distance from ${tex(A)} to ${tex('\\ell')}.`,[`Every segment from ${tex(A)} to ${tex('\\ell')} has the same length.`,`${tex(A+B)} is parallel to ${tex('\\ell')}.`,`${tex(B)} is the midpoint of every segment on ${tex('\\ell')}.`]],
      [`A circle is drawn with center ${tex(A)} and radius ${tex(A+B)}. Which condition exactly characterizes a point ${tex(C)} on this circle?`,tex(`${A}${C}=${A}${B}`),[tex(`${A}${C}<${A}${B}`),tex(`${A}${C}>${A}${B}`),tex(`${B}${C}=${A}${B}`)]],
      [`A point ${tex(C)} is constructed on the perpendicular bisector of ${tex(A+B)}. Which equality follows from the construction?`,tex(`${A}${C}=${B}${C}`),[tex(`${A}${B}=${A}${C}`),tex(`${A}${B}=${B}${C}`),tex(`${A}${C}=2${B}${C}`)]]
    ];
    const [stem,correct,distr]=pick(rng,cases);
    return makeQuestion(rng,stem,correct,distr,`The conclusion follows from the defining equal-distance or equal-angle property of the stated Euclidean construction.`,advancedMeta('geometry-construction',3));
  },'geometry-construction',false,3);

  const qCircleChordDiagram = markGenerator(function(rng){
    const ang=pick(rng,[40,50,60,70,80,90,100,110,120,130,140,150]);
    const x=ang/2;
    const svg=`<svg class="svg-graph diagram" viewBox="0 0 360 300" role="img" aria-label="circle with central and inscribed angles"><circle cx="180" cy="150" r="105" class="circle-mark"/><line x1="180" y1="150" x2="95" y2="88" class="diagram-line"/><line x1="180" y1="150" x2="260" y2="83" class="diagram-line"/><line x1="245" y1="220" x2="95" y2="88" class="diagram-line"/><line x1="245" y1="220" x2="260" y2="83" class="diagram-line"/><text x="165" y="120" class="diagram-label">${ang}°</text><text x="250" y="205" class="diagram-label">x</text></svg>`;
    const ds=[ang,180-x,180-ang,ang/4,90-x].filter(v=>v!==x && v>=0).slice(0,3).map(v=>tex(`${v}^\\circ`));
    return makeQuestion(rng,`${svg}<p>The central angle subtending the same arc as inscribed angle ${tex('x')} measures ${tex(`${ang}^\\circ`)}. What is ${tex('x')}?</p>`,tex(`${x}^\\circ`),ds,`An inscribed angle equals one-half the corresponding central angle, so ${tex(`x=${ang}/2=${x}^\\circ`)}.`,visualMeta('geometry-circle-inscribed',3));
  },'geometry-circle-inscribed',true,3);

  const qNetCrossSectionVisual = markGenerator(function(rng){
    const mode=pick(rng,['rectangle','triangle','hexagon']), side=pick(rng,[2,3,4,5,6,8]);
    const poly=mode==='rectangle'?'80,70 245,190 330,155 165,35':mode==='triangle'?'80,70 245,190 330,35':'95,100 155,55 255,55 320,105 260,160 160,160';
    const svg=`<svg class="svg-graph diagram" viewBox="0 0 430 230" role="img" aria-label="cube with shaded planar cross-section"><path d="M80 70 L245 70 L330 35 L165 35 Z M80 70 L80 190 L245 190 L245 70 M245 190 L330 155 L330 35 M80 190 L165 155 L330 155 M165 35 L165 155" class="diagram-line"/><polygon points="${poly}" class="slice-fill"/><text x="350" y="205" class="diagram-label">side ${side}</text></svg>`;
    const correct=mode==='rectangle'?'A rectangle':mode==='triangle'?'A triangle':'A hexagon';
    return makeQuestion(rng,`${svg}<p>The shaded polygon represents a planar cross-section of the cube. What is the shape of the cross-section?</p>`,correct,[`A circle`,`A pentagon`,mode==='rectangle'?`A triangle`:`A rectangle`],`The cross-section is classified by the number and arrangement of the line segments where the slicing plane meets the cube's faces; the shaded section is ${correct.toLowerCase()}.`,visualMeta('geometry-cross-section',4));
  },'geometry-cross-section',true,4);

  const qTransformationVisual = markGenerator(function(rng){
    const x=pick(rng,[-4,-3,-2,-1,1,2,3,4]), y=pick(rng,[-4,-3,-2,-1,1,2,3,4]);
    const mode=pick(rng,['ccw','cw','half']);
    const img=mode==='ccw'?[-y,x]:mode==='cw'?[y,-x]:[-x,-y];
    const label=mode==='ccw'?String.raw`90^\circ\text{ counterclockwise}`:mode==='cw'?String.raw`90^\circ\text{ clockwise}`:String.raw`180^\circ`;
    const svg=svgAxesPlot([],{xmin:-5,xmax:5,ymin:-5,ymax:5,points:[{x,y}],label:'point P on coordinate plane'});
    const correct=tex(`(${img[0]},${img[1]})`);
    return makeQuestion(rng,`${svg}<p>Point ${tex(`P=(${x},${y})`)} is rotated ${tex(label)} about the origin. What are the coordinates of its image?</p>`,correct,[tex(`(${-img[0]},${img[1]})`),tex(`(${img[1]},${img[0]})`),tex(`(${x},${y})`)],`Apply the coordinate rule for the stated rotation; the image is ${correct}.`,visualMeta('coordinate-rotation',3));
  },'coordinate-rotation',true,3);

  const qConicGraphVisual = markGenerator(function(rng){
    const a=pick(rng,[1.5,2,2.5,3]), b=pick(rng,[2,3,4]);
    const svg=svgAxesPlot([{fn:x=>{const v=b*b*(1-x*x/(a*a));return v>=0?Math.sqrt(v):NaN;}},{fn:x=>{const v=b*b*(1-x*x/(a*a));return v>=0?-Math.sqrt(v):NaN;}}],{xmin:-5,xmax:5,ymin:-5,ymax:5,label:'ellipse centered at origin'});
    const af=Number.isInteger(a)?String(a):String.raw`\frac{${Math.round(a*2)}}{2}`;
    const correct=tex(String.raw`\frac{x^2}{(${af})^2}+\frac{y^2}{${b}^2}=1`);
    return makeQuestion(rng,`${svg}<p>Which equation represents the conic shown?</p>`,correct,[tex(String.raw`\frac{x^2}{${b}^2}+\frac{y^2}{(${af})^2}=1`),tex(String.raw`\frac{x^2}{${b}^2}-\frac{y^2}{(${af})^2}=1`),tex(`y=x^2-${b}`)],`The ellipse is centered at the origin with horizontal semiaxis ${tex(af)} and vertical semiaxis ${tex(String(b))}.`,visualMeta('coordinate-conic-graph',4));
  },'coordinate-conic-graph',true,4);

  const qVectorDiagram = markGenerator(function(rng){
    const pairs=[[3,4],[5,12],[8,15],[7,24],[9,12],[12,16],[6,8],[10,24],[20,21],[20,15],[16,30],[18,24]];
    const [x,y]=pick(rng,pairs), mag=Math.sqrt(x*x+y*y);
    const ex=80+Math.min(250,x*20), ey=220-Math.min(160,y*10);
    const svg=`<svg class="svg-graph diagram" viewBox="0 0 430 260" role="img" aria-label="vector on coordinate plane"><line x1="40" y1="220" x2="390" y2="220" class="axis-line"/><line x1="80" y1="245" x2="80" y2="25" class="axis-line"/><line x1="80" y1="220" x2="${ex}" y2="${ey}" class="diagram-line emphasis" marker-end="url(#arrow)"/><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" class="arrow-fill"/></marker></defs><text x="${ex+5}" y="${ey-5}" class="diagram-label">(${x},${y})</text></svg>`;
    const radical=x*x+y*y, simp=Number.isInteger(mag)?String(mag):String.raw`\sqrt{${radical}}`;
    return makeQuestion(rng,`${svg}<p>The vector begins at the origin and ends at ${tex(`(${x},${y})`)}. What is its magnitude?</p>`,tex(simp),[tex(String(x+y)),tex(String.raw`\sqrt{${x+y}}`),tex(String(radical))],`The magnitude is ${tex(String.raw`\sqrt{${x}^2+${y}^2}=\sqrt{${radical}}`)}${Number.isInteger(mag)?`=${tex(String(mag))}`:''}.`,visualMeta('vector-magnitude-diagram',3));
  },'vector-magnitude-diagram',true,3);

  const qHistogramVisual = markGenerator(function(rng){
    const start=pick(rng,[0,10,20,30]), width=pick(rng,[5,10]);
    const labels=Array.from({length:5},(_,i)=>`${start+i*width}–${start+(i+1)*width-1}`);
    const vals=shuffle(rng,[3,5,7,9,12]).slice(); const imax=vals.indexOf(Math.max(...vals));
    const svg=svgBarChart(labels,vals,{label:'histogram of grouped values',max:14,histogram:true});
    const correct=labels[imax], distract=labels.filter(x=>x!==correct).slice(0,3);
    return makeQuestion(rng,`${svg}<p>Which interval is the modal class?</p>`,correct,distract,`The modal class is represented by the tallest histogram bar, with frequency ${Math.max(...vals)}.`,visualMeta('statistics-histogram',3));
  },'statistics-histogram',true,3);

  const qBoxPlotVisual2 = markGenerator(function(rng){
    const min=pick(rng,[0,2,4,5]), q1=min+pick(rng,[3,4,5]), med=q1+pick(rng,[3,4,6]), q3=med+pick(rng,[4,5,7]), max=q3+pick(rng,[4,6,8]);
    const svg=svgBoxPlot(min,q1,med,q3,max), iqr=q3-q1;
    return makeQuestion(rng,`${svg}<p>What is the interquartile range of the distribution?</p>`,tex(String(iqr)),[tex(String(med-q1)),tex(String(max-min)),tex(String(q3-med))],`The interquartile range is ${tex(`Q_3-Q_1=${q3}-${q1}=${iqr}`)}.`,visualMeta('statistics-boxplot',3));
  },'statistics-boxplot',true,3);

  const qBarChartInference = markGenerator(function(rng){
    const labels=['A','B','C','D'],vals=shuffle(rng,[12,17,23,29,34,38]).slice(0,4);
    const [ii,jj]=pick(rng,[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]]), diff=Math.abs(vals[jj]-vals[ii]);
    const svg=svgBarChart(labels,vals,{label:'bar chart of four category counts',max:42});
    return makeQuestion(rng,`${svg}<p>What is the absolute difference between the counts for categories ${labels[ii]} and ${labels[jj]}?</p>`,tex(String(diff)),[tex(String(diff+2)),tex(String(Math.abs(vals[jj]+vals[ii]))),tex(String(Math.max(1,diff-2)))],`Read the two bar heights and subtract: ${tex(`|${vals[jj]}-${vals[ii]}|=${diff}`)}.`,visualMeta('statistics-bar-chart',3));
  },'statistics-bar-chart',true,3);

  const qScatterVisual = markGenerator(function(rng){
    const mode=pick(rng,['positive','negative','weak']);
    const slope=mode==='positive'?pick(rng,[.7,.9,1.1]):mode==='negative'?pick(rng,[-.7,-.9,-1.1]):0;
    const offsets=[.2,-.25,.35,-.1,.25,-.3,.15,.05].map(v=>v*pick(rng,[1,1.5,2]));
    const pts=Array.from({length:8},(_,i)=>[i+1, mode==='weak'?pick(rng,[2,4,6,8])+offsets[i]:5+slope*(i-3)+offsets[i]]);
    const svg=svgScatter(pts,{xmin:0,xmax:9,ymin:-1,ymax:10,line:mode==='weak'?undefined:[slope,5-3*slope],label:`scatterplot with ${mode} association`});
    const correct=mode==='positive'?'There is a strong positive linear association.':mode==='negative'?'There is a strong negative linear association.':'There is little evidence of a strong linear association.';
    const ds=['There is a strong positive linear association.','There is a strong negative linear association.','There is little evidence of a strong linear association.','The graph proves that x causes y.'].filter(x=>x!==correct).slice(0,3);
    return makeQuestion(rng,`${svg}<p>Which statement best describes the relationship?</p>`,correct,ds,`The direction and strength are judged by how the points cluster around a line; association alone does not establish causation.`,visualMeta('statistics-scatterplot',3));
  },'statistics-scatterplot',true,3);

  const qDataTransformAdvanced = markGenerator(function(rng){
    const a=pick(rng,[-4,-3,-2,2,3,4,5]), b=pick(rng,[-10,-7,-3,4,6,9]);
    return makeQuestion(rng,`Every observation in a data set is transformed by ${tex(`y=${a}x${b>=0?'+':''}${b}`)}. How do the mean and standard deviation change?`,`The mean becomes ${tex(`${a}\\bar x${b>=0?'+':''}${b}`)} and the standard deviation becomes ${tex(`${Math.abs(a)}s`)}.`,[`Both mean and standard deviation are transformed by exactly the same linear formula.`,`The mean is unchanged and the standard deviation becomes ${tex(`${a}s${b>=0?'+':''}${b}`)}.`,`The mean becomes ${tex(`${a}\\bar x`)} and the standard deviation is unchanged.`],`Adding ${b} shifts the mean but not spread; multiplying by ${a} scales the standard deviation by ${tex(`|${a}|=${Math.abs(a)}`)}.`,advancedMeta('statistics-linear-transformation',4));
  },'statistics-linear-transformation',false,4);

  const qProbabilityAreaVisual = markGenerator(function(rng){
    const side=pick(rng,[6,8,10,12,15]); const mode=pick(rng,['half','quarter']);
    const poly=mode==='half'?'<polygon points="80,225 270,225 270,35" class="slice-fill emphasis"/>':'<rect x="80" y="130" width="95" height="95" class="slice-fill emphasis"/>';
    const frac=mode==='half'?String.raw`\frac12`:String.raw`\frac14`;
    const svg=`<svg class="svg-graph diagram" viewBox="0 0 360 280" role="img" aria-label="square target with shaded region"><rect x="80" y="35" width="190" height="190" class="shape-fill"/>${poly}<text x="170" y="250" class="diagram-label">${side}</text><text x="45" y="135" class="diagram-label">${side}</text></svg>`;
    return makeQuestion(rng,`${svg}<p>A point is selected uniformly at random from the square. What is the probability that it lies in the shaded region?</p>`,tex(frac),[tex(String.raw`\frac13`),tex(mode==='half'?String.raw`\frac14`:String.raw`\frac12`),tex(String.raw`\frac34`)],`For a uniform geometric model, probability is area ratio. The shaded region occupies ${mode==='half'?'one-half':'one-quarter'} of the square.`,visualMeta('probability-geometric-area',3));
  },'probability-geometric-area',true,3);

  const qProbabilityTree = markGenerator(function(rng){
    const pA=pick(rng,[.3,.4,.5,.6,.7]), pSA=pick(rng,[.2,.4,.5,.6,.8]), pSB=pick(rng,[.1,.3,.5,.7,.9]);
    const pB=1-pA, total=pA*pSA+pB*pSB, f=x=>Number(x.toFixed(2));
    const svg=`<svg class="svg-graph diagram" viewBox="0 0 430 260" role="img" aria-label="probability tree"><text x="25" y="130" class="diagram-label">Start</text><line x1="65" y1="125" x2="190" y2="70" class="diagram-line"/><line x1="65" y1="135" x2="190" y2="190" class="diagram-line"/><text x="105" y="82" class="diagram-label">${f(pA)} A</text><text x="105" y="188" class="diagram-label">${f(pB)} B</text><line x1="195" y1="70" x2="340" y2="40" class="diagram-line"/><line x1="195" y1="70" x2="340" y2="100" class="diagram-line"/><text x="245" y="45" class="diagram-label">${f(pSA)} S</text><text x="245" y="100" class="diagram-label">${f(1-pSA)} F</text><line x1="195" y1="190" x2="340" y2="160" class="diagram-line"/><line x1="195" y1="190" x2="340" y2="220" class="diagram-line"/><text x="245" y="165" class="diagram-label">${f(pSB)} S</text><text x="245" y="220" class="diagram-label">${f(1-pSB)} F</text></svg>`;
    return makeQuestion(rng,`${svg}<p>What is ${tex('P(S)')}?</p>`,tex(String(f(total))),[tex(String(f(pA*pSA))),tex(String(f(pB*pSB))),tex(String(f((pSA+pSB)/2)))],`Use total probability: ${tex(`P(S)=${f(pA)}(${f(pSA)})+${f(pB)}(${f(pSB)})=${f(total)}`)}.`,visualMeta('probability-tree',4));
  },'probability-tree',true,4);

  const qDistributionVariance = markGenerator(function(rng){
    const vals=pick(rng,[[0,1,2],[1,2,4],[2,3,5],[0,2,5]]), p1=pick(rng,[.2,.3,.4]), p2=pick(rng,[.2,.3,.4,.5]);
    let p3=Number((1-p1-p2).toFixed(1)); if(p3<=0){p3=.3;}
    const probs=[p1,p2,p3], total=probs.reduce((a,b)=>a+b,0); probs[2]=Number((probs[2]+1-total).toFixed(1));
    const ex=vals.reduce((a,x,i)=>a+x*probs[i],0), fmt=x=>Number(x.toFixed(2));
    const tbl=tableHtml(['x',...vals.map(String)],[['P(X=x)',...probs.map(x=>x.toFixed(1))]],'discrete probability distribution');
    return makeQuestion(rng,`${tbl}<p>What is ${tex('E[X]')}?</p>`,tex(String(fmt(ex))),[tex(String(fmt(ex+.5))),tex(String(fmt(ex-.5))),tex(String(fmt(vals.reduce((a,b)=>a+b,0)/3)))],`Compute the weighted mean ${tex(`E[X]=\\sum xP(X=x)=${fmt(ex)}`)}.`,visualMeta('probability-distribution-table',3));
  },'probability-distribution-table',true,3);

  const qContinuousUniformAdvanced = markGenerator(function(rng){
    const a=pick(rng,[0,2,4]);
    const width=pick(rng,[6,8,10]);
    const b=a+width;
    const c=a+width/2;
    return makeQuestion(rng,`A continuous random variable ${tex('X')} is uniformly distributed on ${tex(`[${a},${b}]`)}. What is ${tex(`P(X>${c})`)}?`,tex(String.raw`\frac12`),[tex(String.raw`\frac14`),tex(String.raw`\frac34`),tex('0')],`For a uniform distribution, probability is proportional to interval length. The interval from ${tex(String(c))} to ${tex(String(b))} is half of ${tex(`[${a},${b}]`)}.`,advancedMeta('probability-continuous-uniform',3));
  },'probability-continuous-uniform',false,3);

  const qResidualPlotVisual = markGenerator(function(rng){
    const mode=pick(rng,['random','curve']);
    const pts=mode==='random'?[[1,.2],[2,-.1],[3,.15],[4,-.05],[5,.1],[6,-.2],[7,.05]].map(([x,y])=>[x,y*pick(rng,[1,1.5,2])]):[[1,.7],[2,.25],[3,-.2],[4,-.45],[5,-.2],[6,.25],[7,.7]];
    const svg=svgScatter(pts,{xmin:0,xmax:8,ymin:-1,ymax:1,label:`residual plot with ${mode==='random'?'random scatter':'curvature'}`});
    const correct=mode==='random'?'A linear model is reasonably appropriate for these data.':'The residual pattern suggests that a linear model is missing systematic curvature.';
    const ds=mode==='random'?[`A quadratic model is necessarily exact.`,`The regression slope must be zero.`,`The variables have no relationship at all.`]:[`The linear model is ideal because the residuals are patterned.`,`The response variable must be categorical.`,`The residuals prove causation.`];
    return makeQuestion(rng,`${svg}<p>Which conclusion is best supported by the residual plot?</p>`,correct,ds,mode==='random'?`Random residual scatter around zero supports the adequacy of a linear model.`:`A U-shaped residual pattern indicates systematic nonlinear structure not captured by the linear model.`,visualMeta('inference-residual-plot',4));
  },'inference-residual-plot',true,4);

  const qSamplingDesignAdvanced = markGenerator(function(rng){
    const cases=[
      [`A district randomly chooses 5 schools and surveys every teacher at those schools.`,`Cluster sampling`,[`Simple random sampling`,`Stratified sampling`,`Systematic sampling`]],
      [`A district separates teachers by elementary, middle, and high school level and randomly samples teachers within each level.`,`Stratified sampling`,[`Cluster sampling`,`Convenience sampling`,`Systematic sampling`]],
      [`From an alphabetized roster, a researcher chooses a random starting position and then surveys every 20th teacher.`,`Systematic sampling`,[`Cluster sampling`,`Stratified sampling`,`Voluntary-response sampling`]],
      [`A computer randomly selects 80 teacher identification numbers from the complete district roster, with every set of 80 equally likely.`,`Simple random sampling`,[`Cluster sampling`,`Systematic sampling`,`Convenience sampling`]],
      [`A researcher surveys the first 100 teachers who arrive at a voluntary workshop.`,`Convenience sampling`,[`Simple random sampling`,`Stratified sampling`,`Cluster sampling`]]
    ]; const [stem,correct,distr]=pick(rng,cases);
    return makeQuestion(rng,stem,correct,distr,`The sampling label follows from how units or groups are selected in the described design.`,advancedMeta('inference-sampling-design',3));
  },'inference-sampling-design',false,3);

  const qConfidenceWidth = markGenerator(function(rng){
    const n=pick(rng,[25,36,49,64,81,100,144,196]);
    const cases=[
      [`All else equal, which change will generally make a confidence interval for a population mean narrower?`,`Increase the sample size.`,[`Increase the confidence level.`,`Increase the sample standard deviation.`,`Use a smaller sample size.`]],
      [`A ${tex('90\\%')} confidence interval and a ${tex('99\\%')} confidence interval are computed from the same sample. Which is generally wider?`,`The ${tex('99\\%')} interval.`,[`The ${tex('90\\%')} interval.`,`They must have identical width.`,`The one with the smaller sample mean.`]],
      [`A study increases its random-sample size from ${n} to ${4*n} while holding the confidence level and variability approximately fixed. How does the margin of error change?`,`It is approximately halved.`,[`It approximately doubles.`,`It is divided by 4.`,`It is unchanged.`]],
      [`At fixed confidence level and sample size ${n}, the sample standard deviation is substantially larger in a second study. What happens to the margin of error?`,`It becomes larger.`,[`It becomes smaller.`,`It becomes zero.`,`It is unaffected by variability.`]],
      [`Two studies use the same variability and confidence level. One uses sample size ${n}, and the other uses sample size ${9*n}. Approximately how do their margins of error compare?`,`The larger study has about one-third the margin of error.`,[`The larger study has nine times the margin of error.`,`The margins of error are equal.`,`The larger study has one-ninth the margin of error.`]]
    ]; const [stem,correct,distr]=pick(rng,cases);
    return makeQuestion(rng,stem,correct,distr,`Interval width depends on the critical value and standard error; standard error scales approximately as ${tex(String.raw`1/\sqrt n`)}.`,advancedMeta('inference-confidence-width',3));
  },'inference-confidence-width',false,3);

  const qMarginOfErrorAdvanced = markGenerator(function(rng){
    const factor=pick(rng,[4,9,16,25,36,49,64,81,100,121,144,169]);
    const shrink=Math.sqrt(factor);
    return makeQuestion(rng,`For a confidence interval based on a large random sample, suppose the sample size is multiplied by ${tex(String(factor))} while the confidence level and estimated variability remain essentially unchanged. What happens to the margin of error?`,`It is divided by ${tex(String(shrink))}.`,[`It is multiplied by ${tex(String(shrink))}.`,`It is divided by ${tex(String(factor))}.`,`It does not change.`],`Standard error is proportional to ${tex(String.raw`1/\sqrt n`)}. Multiplying ${tex('n')} by ${factor} divides the margin of error by ${tex(String(shrink))}.`,advancedMeta('inference-margin-of-error',4));
  },'inference-margin-of-error',false,4);

  const qReasoningGraphCounterexample = markGenerator(function(rng){
    const h=pick(rng,[-2,-1,0,1,2]), a=pick(rng,[1,2,3]);
    const cases=[
      {fn:x=>a*Math.abs(x-h),label:'absolute value graph',claim:'Every function with a minimum is differentiable at the minimum.',correct:`The graph of ${tex(`f(x)=${a}|x${h>=0?'-':'+'}${Math.abs(h)}|`)} is a counterexample: it has a minimum at ${tex(`x=${h}`)} but is not differentiable there.`},
      {fn:x=>a*(x-h)**3,label:'shifted cubic graph',claim:'Every increasing polynomial is bounded above.',correct:`This cubic is increasing and unbounded above, so it is a counterexample.`},
      {fn:x=>1/(1+a*(x-h)*(x-h)),label:'positive rational graph',claim:'Every positive function is increasing.',correct:`The displayed function is positive for all real ${tex('x')} but is not increasing on all of ${tex('\\mathbb R')}.`},
      {fn:x=>(x-h)**2-a,label:'parabola',claim:'Every function whose graph has y-axis symmetry is one-to-one.',correct:`A parabola is not one-to-one, so symmetry does not establish the claim.`}
    ]; const c=pick(rng,cases), svg=svgAxesPlot([{fn:c.fn}],{xmin:-5,xmax:5,ymin:-5,ymax:7,label:c.label});
    return makeQuestion(rng,`${svg}<p>A student claims, “${c.claim}” Which response correctly evaluates the claim?</p>`,c.correct,[`The claim is true for every real-valued function.`,`One numerical example is sufficient to prove a universal claim.`,`A graph can never provide a counterexample.`],`A universal statement is disproved by one valid counterexample; the displayed graph supplies one.`,visualMeta('reasoning-graph-counterexample',4));
  },'reasoning-graph-counterexample',true,4);
  const qProofQuantifier = markGenerator(function(rng){
    const cases=[
      [String.raw`\forall x\in\mathbb R\,\exists y\in\mathbb R\;(y>x)`,String.raw`\exists x\in\mathbb R\,\forall y\in\mathbb R\;(y\le x)`],
      [String.raw`\forall x\in\mathbb R\;(x^2\ge0)`,String.raw`\exists x\in\mathbb R\;(x^2<0)`],
      [String.raw`\exists n\in\mathbb N\;(n^2=49)`,String.raw`\forall n\in\mathbb N\;(n^2\ne49)`],
      [String.raw`\forall n\in\mathbb N\;\exists m\in\mathbb N\;(m>n)`,String.raw`\exists n\in\mathbb N\;\forall m\in\mathbb N\;(m\le n)`],
      [String.raw`\exists x\in\mathbb R\;\forall y\in\mathbb R\;(x\le y)`,String.raw`\forall x\in\mathbb R\;\exists y\in\mathbb R\;(y<x)`],
      [String.raw`\forall x\in A\;(P(x)\lor Q(x))`,String.raw`\exists x\in A\;(\neg P(x)\land\neg Q(x))`],
      [String.raw`\exists x\in A\;(P(x)\land Q(x))`,String.raw`\forall x\in A\;(\neg P(x)\lor\neg Q(x))`],
      [String.raw`\forall x\in A\;(P(x)\Rightarrow Q(x))`,String.raw`\exists x\in A\;(P(x)\land\neg Q(x))`],
      [String.raw`\exists x\in\mathbb R\;(x>5)`,String.raw`\forall x\in\mathbb R\;(x\le5)`],
      [String.raw`\forall n\in\mathbb Z\;(n\text{ is even }\lor n\text{ is odd})`,String.raw`\exists n\in\mathbb Z\;(n\text{ is neither even nor odd})`],
      [String.raw`\exists x\in A\;P(x)`,String.raw`\forall x\in A\;\neg P(x)`],
      [String.raw`\forall x\in A\;P(x)`,String.raw`\exists x\in A\;\neg P(x)`]
    ]; const [statement,neg]=pick(rng,cases);
    return makeQuestion(rng,`Which formula is the logical negation of ${tex(statement)}?`,tex(neg),[tex(statement),tex(String.raw`\neg P\Rightarrow\neg Q`),tex(String.raw`\exists x\,P(x)`) ],`Negation reverses each quantifier and negates the predicate; De Morgan's laws and ${tex(String.raw`\neg(P\Rightarrow Q)\equiv P\land\neg Q`)} are applied where needed.`,advancedMeta('reasoning-quantifiers',4));
  },'reasoning-quantifiers',false,4);

  const qModelResidualDecision = markGenerator(function(rng){
    const pattern=pick(rng,['U-shaped','wave-shaped','funnel-shaped','randomly scattered']), r2=pick(rng,[.82,.88,.91,.94,.96,.98]);
    const correct=pattern==='randomly scattered'?`The linear model is reasonably supported because the residuals show no systematic pattern.`:`The residual plot warns that the linear model is inadequate despite ${tex(`R^2=${r2}`)}.`;
    return makeQuestion(rng,`A fitted linear model has ${tex(`R^2=${r2}`)}. Its residual plot is ${pattern} about zero. Which conclusion is best?`,correct,[`A large ${tex('R^2')} guarantees the model is appropriate.`,`Any visible residual pattern is evidence of an ideal linear fit.`,`Residual plots are irrelevant once ${tex('R^2')} is known.`],pattern==='randomly scattered'?`Random scatter is consistent with a linear form.`:`Systematic residual structure indicates that the model has left predictable structure unexplained.`,advancedMeta('reasoning-model-residuals',4));
  },'reasoning-model-residuals',false,4);

  const qRepresentationGraphTable = markGenerator(function(rng){
    const b=pick(rng,[-5,-3,-1,2,3,5]), m=pick(rng,[-4,-3,-2,2,3,4]);
    const xs=[0,1,2,3], ys=xs.map(x=>m*x+b), tbl=tableHtml(['x',...xs.map(String)],[['y',...ys.map(String)]],'function table');
    const inc=m>0?'increases':'decreases', step=Math.abs(m);
    const correct=`The output starts at ${b} when the input is 0 and ${inc} by ${step} for each 1-unit increase in the input.`;
    return makeQuestion(rng,`${tbl}<p>Which verbal description matches this table?</p>`,correct,[`The output starts at ${m} and changes by ${b} each step.`,`The output is multiplied by ${step} for every 1-unit increase in input.`,`The relationship has zero rate of change.`],`The constant first difference is ${m}, and ${tex(`y=${b}`)} when ${tex('x=0')}; thus the relationship is linear with slope ${m} and intercept ${b}.`,visualMeta('connections-table-verbal',3));
  },'connections-table-verbal',true,3);

  const qRepresentationAreaIntegral = markGenerator(function(rng){
    const m=pick(rng,[1,2,3]), b=pick(rng,[1,2,4]), end=pick(rng,[2,3,4]);
    const mx=m===1?'x':`${m}x`;
    const svg=svgAxesPlot([{fn:x=>m*x+b}],{xmin:0,xmax:end+1,ymin:0,ymax:m*(end+1)+b+1,label:'positive line above x-axis'});
    const correct=tex(String.raw`\int_0^${end} (${mx}+${b})\,dx`);
    return makeQuestion(rng,`${svg}<p>Which symbolic expression represents the signed area between this graph and the ${tex('x')}-axis from ${tex('x=0')} to ${tex(`x=${end}`)}?</p>`,correct,[tex(String.raw`\int_0^${end} (${mx}-${b})\,dx`),tex(String.raw`\frac{d}{dx}(${mx}+${b})`),tex(String.raw`\int_1^${end+1} ${mx}\,dx`)],`A definite integral represents accumulated signed area. The graphed function is ${tex(`y=${mx}+${b}`)} on ${tex(`[0,${end}]`)}.`,visualMeta('connections-area-integral',3));
  },'connections-area-integral',true,3);

  function scenarioGen(family, stem, correct, distractors, explanation, difficulty=3, visual=false) {
    const fn=function(rng){
      const lead=secondaryContext(rng);
      const adjusted=stem.length?stem[0].toLowerCase()+stem.slice(1):stem;
      return makeQuestion(rng,`${lead}, ${adjusted}`,correct,distractors,explanation,{family,visual,difficulty});
    };
    return markGenerator(fn,family,visual,difficulty);
  }

  const qInstrPriorKnowledge=scenarioGen('instruction-prior-knowledge',`Students are about to study quadratic functions. Which opening task best activates prerequisite knowledge that directly supports the new topic?`,`Ask students to connect factoring, solving linear equations, and features of linear graphs to a simple quadratic pattern.`,[`Begin with an unrelated arithmetic speed drill.`,`Give the final quadratic formula and ask students to memorize it immediately.`,`Avoid asking students what they already know.`],`Instruction should build explicit conceptual links from relevant prior knowledge to the new ideas.`);
  const qInstrConcreteAbstract=scenarioGen('instruction-concrete-abstract',`Students are learning why multiplying two binomials produces four products. Which sequence best follows a concrete-to-abstract progression?`,`Area model with algebra tiles → drawn area model → symbolic distributive multiplication.`,[`Symbolic rule only → timed drill → unrelated graph.`,`Calculator expansion → memorize answer → skip representation.`,`Formal proof first → remove all visual models.`],`A concrete-to-representational-to-symbolic progression supports conceptual understanding before abstraction.`);
  const qInstrTechnology=scenarioGen('instruction-technology',`Students use graphing technology to investigate ${tex('y=a(x-h)^2+k')}. Which task best uses the technology to build mathematical understanding?`,`Systematically vary one parameter at a time, record changes in the graph, conjecture each parameter's effect, and justify the conjecture.`,[`Press random keys until an interesting graph appears.`,`Use the calculator only to avoid discussing the algebra.`,`Copy screenshots without comparing features.`],`Technology is most instructionally useful when it supports structured exploration, conjecture, and connection to symbolic structure.`);
  const qInstrELL=scenarioGen('instruction-ell-access',`An English-language learner can reason correctly from diagrams but has difficulty explaining a similarity argument in English. Which support best preserves the mathematical goal?`,`Provide a labeled diagram, key mathematical vocabulary, and sentence frames for stating corresponding sides and proportional relationships.`,[`Replace the similarity task with single-digit arithmetic.`,`Excuse the student from explaining mathematical reasoning.`,`Grade only English grammar and ignore the mathematics.`],`The support improves language access while maintaining the same mathematical reasoning objective.`);
  const qInstrDiscourse=scenarioGen('instruction-discourse',`During discussion of a nonroutine problem, two students have different correct solution methods. What should the teacher do next to deepen mathematical understanding?`,`Ask students to compare the methods, identify assumptions, and explain when each method is efficient.`,[`Choose the faster student and end the discussion.`,`Require everyone to copy one method without explanation.`,`Tell the class that multiple methods create confusion.`],`Comparing valid methods promotes reasoning, communication, and strategic competence.`);
  const qInstrMisconception=scenarioGen('instruction-misconception',`Several students believe ${tex(String.raw`\sqrt{a+b}=\sqrt a+\sqrt b`)} for positive ${tex('a,b')}. Which response best addresses the misconception?`,`Use a numerical counterexample, then connect the failure to the meaning of square roots and valid radical properties.`,[`State the rule is wrong and assign 30 identical exercises.`,`Avoid square roots for the rest of the unit.`,`Tell students that radicals always distribute over operations.`],`A counterexample creates cognitive conflict and conceptual explanation distinguishes valid from invalid properties.`);
  const qInstrTaskDemand=scenarioGen('instruction-task-demand',`Which task has the highest mathematical cognitive demand?`,`Determine all parameter values for which a quadratic and a line intersect in exactly one point, justify the result algebraically and graphically, and compare the representations.`,[`Evaluate five given linear expressions.`,`Copy the quadratic formula from the board.`,`Plot three points from a supplied table.`],`The selected task requires problem formulation, multiple representations, justification, and generalization rather than routine execution.` ,4);
  const qInstrCareer=scenarioGen('instruction-career-connection',`A teacher wants to connect exponential functions to a career context without weakening the mathematics. Which task is strongest?`,`Analyze a pharmacokinetic decay model, interpret parameters and half-life, and evaluate when the model is reasonable.`,[`Mention that pharmacists use math and then give unrelated equations.`,`Replace the mathematics with a career-interest survey.`,`Ask students only to memorize the word “exponential.”`],`The task preserves mathematical analysis while situating it in an authentic application.`);

  const qAssessFormativeAction=scenarioGen('assessment-formative-action',`An exit ticket shows that 70% of students can factor a quadratic but only 30% can connect factors to x-intercepts. What is the best next instructional move?`,`Plan a short lesson connecting factored form, zeros, and the graph, then use a follow-up check.`,[`Reteach integer addition to the entire class.`,`Move on because most students can factor.`,`Replace the assessment data with final grades.`],`Assessment should identify the specific conceptual gap and guide targeted instruction followed by reassessment.`);
  const qAssessRubric=scenarioGen('assessment-rubric',`A modeling project requires students to formulate a model, justify assumptions, analyze results, and communicate limitations. Which scoring method best matches those goals?`,`An analytic rubric with separate criteria for model formulation, justification, analysis, and communication.`,[`One point for the final numerical answer only.`,`A rubric based only on neat handwriting.`,`A multiple-choice score unrelated to the project.`],`An analytic rubric can directly assess the distinct dimensions of the stated performance goals.`);
  const qAssessValidity=scenarioGen('assessment-validity',`A teacher's objective is “Students will interpret the meaning of the derivative in context,” but the assessment asks only for symbolic differentiation. What is the main assessment problem?`,`The assessment has weak alignment with the intended learning objective.`,[`The assessment is too formative.`,`The derivative cannot be assessed.`,`The assessment uses too many contextual problems.`],`Computational fluency alone does not directly measure contextual interpretation, so content alignment is weak.`);
  const qAssessDistractor=scenarioGen('assessment-distractor',`For the question ${tex('2(x+3)=10')}, a distractor is ${tex('x=3.5')}, obtained by writing ${tex('2x+3=10')}. Why is this a useful distractor?`,`It targets a specific distributive-property misconception and can provide diagnostic information.`,[`It is useful only because it is close to the correct answer.`,`Distractors should be random so students cannot learn from them.`,`It tests spelling rather than mathematics.`],`A diagnostic distractor corresponds to a plausible error pattern and helps reveal student thinking.`);
  const qAssessReliability=scenarioGen('assessment-reliability',`A teacher wants a unit test score to represent broad achievement rather than performance on one narrow skill. Which design choice most improves that goal?`,`Use a blueprint that samples multiple important objectives with several well-designed items across the unit.`,[`Use one very difficult item.`,`Use only items from the last lesson.`,`Change scoring rules for different students after the test.`],`Systematic content sampling reduces overreliance on one narrow task and improves the consistency of the inference.`);
  const qAssessFeedback=scenarioGen('assessment-feedback',`Which feedback is most likely to improve a student's mathematical learning after an assessment?`,`“Your equation is correct, but your graph uses the intercept as the slope. Recheck how each parameter appears in the representation and revise the graph.”`,[`“Wrong.”`,`“You need to try harder.”`,`“Nice handwriting.”`],`Effective feedback is specific, tied to the mathematical goal, and gives the student a usable next step.`);
  const qAssessPrePost=scenarioGen('assessment-diagnostic-growth',`A teacher gives a short preassessment before a trigonometry unit and a parallel assessment afterward. What is the primary value of using both?`,`The pair can identify starting knowledge and provide evidence of growth on the targeted objectives.`,[`The preassessment should count as the final course grade.`,`The postassessment makes instruction unnecessary.`,`The pair guarantees that every score is unbiased.`],`Preassessment diagnoses readiness; a parallel postassessment can document changes after instruction.`);
  const qAssessELL=scenarioGen('assessment-ell',`An English-language learner is being assessed on geometric reasoning, not English composition. Which accommodation best preserves the construct being assessed?`,`Use clear language and labeled diagrams while requiring the same geometric reasoning and justification.`,[`Replace the geometry with easier arithmetic.`,`Give the correct theorem names in advance and score only copying.`,`Remove all reasoning requirements.`],`Access supports should reduce irrelevant language barriers without changing the mathematical construct or standard.`);

  // Mark existing graph/diagram generators so the selection engine can enforce visual quotas.
  [qGraphSlope,qTrigGraph].forEach(fn=>{fn.visual=true;});

  // Additional generators added during the comprehensive 235 audit to keep
  // the four fixed competency quizzes structurally independent.
  const qPartialSumsVisual = markGenerator(function(rng){
    const a=pick(rng,[1,2,3,4,5,6]), den=pick(rng,[2,3,4,5]); const r=1/den, sum=a/(1-r);
    const partial=[]; let S=0; for(let n=0;n<5;n++){S+=a*Math.pow(r,n);partial.push(Number(S.toFixed(4)));}
    const tbl=tableHtml(['n','1','2','3','4','5'],[['S_n',...partial.map(String)]],'partial sums of a geometric series');
    const fmt=x=>Number.isInteger(x)?String(x):Number(x.toFixed(4)).toString();
    return makeQuestion(rng,`${tbl}<p>The table gives the first five partial sums of an infinite geometric series. Which value is the limit of the partial sums?</p>`,tex(fmt(sum)),[tex(fmt(partial[4])),tex(fmt(a)),`The series diverges.`],`The first term is ${tex(String(a))} and the common ratio is ${tex(String.raw`\frac1{${den}}`)}. Since ${tex('|r|<1')}, the series sum is ${tex(String.raw`\frac{${a}}{1-1/${den}}=${fmt(sum)}`)}.`,visualMeta('patterns-partial-sums-table',4));
  },'patterns-partial-sums-table',true,4);

  const qExponentialTableVisual = markGenerator(function(rng){
    const a=pick(rng,[2,3,4,5,6,8,10]), b=pick(rng,[2,3,4,.5]);
    const xs=[0,1,2,3], vals=xs.map(x=>Number((a*Math.pow(b,x)).toFixed(3)));
    const tbl=tableHtml(['x',...xs.map(String)],[['f(x)',...vals.map(String)]],'values of an exponential function');
    const btex=b===.5?String.raw`\frac12`:String(b);
    return makeQuestion(rng,`${tbl}<p>The table represents an exponential function ${tex('f')}. Which formula agrees with all displayed values?</p>`,tex(String.raw`f(x)=${a}(${btex})^x`),[tex(String.raw`f(x)=${btex}(${a})^x`),tex(`f(x)=${a}+${b}x`),tex(String.raw`f(x)=${a*b}(${btex})^x`)],`The initial value is ${tex(`f(0)=${a}`)}, and each 1-unit increase in ${tex('x')} multiplies the output by ${tex(btex)}.`,visualMeta('exponential-table-model',3));
  },'exponential-table-model',true,3);

  const qLogEquationAdvanced = markGenerator(function(rng){
    const base=pick(rng,[2,3,4,5]), target=pick(rng,[3,4,5]);
    let i=pick(rng,[1,2,3,4]); i=Math.min(i,target-1); if(2*i===target)i=1;
    const pwr1=Math.pow(base,i), pwr2=Math.pow(base,target-i), shift=pick(rng,[-3,-1,0,2,4,6]);
    const v=Math.max(pwr1,pwr2)+shift, a=v-pwr1, b=v-pwr2, lo=Math.min(a,b), hi=Math.max(a,b);
    const other=v-pwr1-pwr2;
    const term=x=>x>=0?`x-${x}`:`x+${Math.abs(x)}`;
    return makeQuestion(rng,`Solve ${tex(String.raw`\log_${base}(${term(a)})+\log_${base}(${term(b)})=${target}`)} over the real numbers.`,tex(`x=${v}`),[tex(`x=${other}`),tex(`x=${hi}`),`Both algebraic roots are valid.`],`The domain requires ${tex(`x>${hi}`)}. Combining logarithms gives ${tex(`(${term(a)})(${term(b)})=${Math.pow(base,target)}`)}. The algebraic roots are ${tex(String.raw`x=${v}`)} and ${tex(String.raw`x=${other}`)}, but only ${tex(`x=${v}`)} lies in the domain.`,advancedMeta('log-equation-domain',4));
  },'log-equation-domain',false,4);
  const qTrigTriangleVisualAdvanced = markGenerator(function(rng){
    const triples=[[3,4,5],[5,12,13],[7,24,25],[8,15,17],[9,40,41],[12,35,37]];
    const [opp,adj,hyp]=pick(rng,triples), ask=pick(rng,['sin','cos','tan']);
    const svg=svgTriangle(String(opp),String(hyp),String(adj),{right:true,label:'right triangle with labeled side lengths'});
    const correct=ask==='sin'?String.raw`\frac{${opp}}{${hyp}}`:ask==='cos'?String.raw`\frac{${adj}}{${hyp}}`:String.raw`\frac{${opp}}{${adj}}`;
    const ds=[String.raw`\frac{${adj}}{${hyp}}`,String.raw`\frac{${opp}}{${adj}}`,String.raw`\frac{${hyp}}{${opp}}`,String.raw`\frac{${adj}}{${opp}}`].filter(x=>x!==correct).slice(0,3);
    return makeQuestion(rng,`${svg}<p>Angle ${tex('B')} is a right angle. What is ${tex(`\\${ask} A`)}?</p>`,tex(correct),ds.map(tex),`Relative to angle ${tex('A')}, the opposite, adjacent, and hypotenuse side lengths are ${opp}, ${adj}, and ${hyp}.`,visualMeta('trig-right-triangle-diagram-advanced',3));
  },'trig-right-triangle-diagram-advanced',true,3);

  const qInverseTrigComposition = markGenerator(function(rng){
    const triples=[[3,4,5],[5,12,13],[7,24,25],[8,15,17],[9,40,41],[12,35,37]];
    const [a,b,c]=pick(rng,triples), mode=pick(rng,['sinacos','cosasin']);
    if(mode==='sinacos'){
      return makeQuestion(rng,`Evaluate ${tex(String.raw`\sin\!\left(\arccos\frac{${a}}{${c}}\right)`)} exactly.`,tex(String.raw`\frac{${b}}{${c}}`),[tex(String.raw`\frac{${a}}{${c}}`),tex(String.raw`-\frac{${b}}{${c}}`),tex(String.raw`\frac{${c}}{${b}}`)],`Let ${tex(String.raw`\theta=\arccos\frac{${a}}{${c}}`)}. On the principal range of arccos, ${tex(String.raw`\sin\theta\ge0`)}, and the right triangle gives ${tex(String.raw`\sin\theta=\frac{${b}}{${c}}`)}.`,advancedMeta('trig-inverse-composition',4));
    }
    return makeQuestion(rng,`Evaluate ${tex(String.raw`\cos\!\left(\arcsin\frac{${a}}{${c}}\right)`)} exactly.`,tex(String.raw`\frac{${b}}{${c}}`),[tex(String.raw`\frac{${a}}{${c}}`),tex(String.raw`-\frac{${b}}{${c}}`),tex(String.raw`\frac{${c}}{${b}}`)],`Let ${tex(String.raw`\theta=\arcsin\frac{${a}}{${c}}`)}. The principal range has ${tex(String.raw`\cos\theta\ge0`)}, and the right triangle gives ${tex(String.raw`\cos\theta=\frac{${b}}{${c}}`)}.`,advancedMeta('trig-inverse-composition',4));
  },'trig-inverse-composition',false,4);

  const qAxiomaticAngleDiagram = markGenerator(function(rng){
    const ang=pick(rng,[52,58,64,70,76,82,98,104,110,116,122,128]);
    const svg=`<svg class="svg-graph diagram" viewBox="0 0 430 250" role="img" aria-label="two parallel lines cut by a transversal"><line x1="50" y1="70" x2="380" y2="70" class="diagram-line"/><line x1="50" y1="180" x2="380" y2="180" class="diagram-line"/><line x1="135" y1="225" x2="285" y2="25" class="diagram-line emphasis"/><text x="235" y="92" class="diagram-label">${ang}°</text><text x="190" y="165" class="diagram-label">x°</text><text x="320" y="55" class="diagram-label">ℓ</text><text x="320" y="165" class="diagram-label">m</text></svg>`;
    return makeQuestion(rng,`${svg}<p>Suppose ${tex(String.raw`\ell\parallel m`)}. The marked angles occupy alternate-interior positions. What is ${tex('x')}?</p>`,tex(`${ang}^\\circ`),[tex(`${180-ang}^\\circ`),tex(`${90-ang}^\\circ`),tex(`${360-ang}^\\circ`)],`For parallel lines cut by a transversal, alternate interior angles are congruent.`,visualMeta('axiomatic-parallel-transversal',3));
  },'axiomatic-parallel-transversal',true,3);

  const qParallelPostulateCompare = markGenerator(function(rng){
    const cases=[
      [`Through a point not on a line, which parallel behavior is characteristic of hyperbolic geometry?`,`More than one line through the point can fail to meet the given line.`,[`Exactly one such line exists.`,`No such line exists.`,`Every line is perpendicular to the given line.`]],
      [`Through a point not on a line, what does Euclidean geometry assert?`,`Exactly one parallel line passes through the point.`,[`No parallel passes through the point.`,`More than one parallel passes through the point.`,`Every line through the point is parallel.`]],
      [`What happens to distinct great circles when great circles are treated as lines in spherical geometry?`,`They intersect; there are no parallel great circles.`,[`Exactly one parallel great circle exists through an exterior point.`,`Infinitely many parallel great circles exist.`,`Distinct great circles never intersect.`]],
      [`A triangle has angle sum less than ${tex(String.raw`180^\circ`)}. Which geometry is consistent with this?`,`Hyperbolic geometry`,[`Euclidean plane geometry`,`Spherical geometry`,`Only projective geometry`]],
      [`A triangle has angle sum greater than ${tex(String.raw`180^\circ`)}. Which geometry is consistent with this?`,`Spherical geometry`,[`Euclidean plane geometry`,`Hyperbolic geometry`,`Ordinary affine plane geometry`]],
      [`Which statement is true of every Euclidean triangle?`,`Its interior angles sum to ${tex(String.raw`180^\circ`)}.`,[`Its interior angles sum to less than ${tex(String.raw`180^\circ`)}.`,`Its interior angles sum to more than ${tex(String.raw`180^\circ`)}.`,`Its angle sum depends on its size.`]],
      [`Which geometry is obtained by replacing Euclid's unique-parallel behavior with infinitely many limiting parallels through an exterior point?`,`Hyperbolic geometry`,[`Spherical geometry`,`Euclidean geometry`,`Taxicab metric geometry necessarily`]],
      [`Which feature of spherical geometry is incompatible with Euclid's parallel postulate?`,`Any two great-circle lines intersect.`,[`Every great circle has constant curvature.`,`A sphere is bounded.`,`Angles can be measured in degrees.`]],
      [`In which geometry can a triangle have three right angles?`,`Spherical geometry`,[`Euclidean plane geometry`,`Hyperbolic geometry`,`Ordinary coordinate geometry only`]],
      [`In which geometry can similar triangles of different sizes fail to exist because angle data determine scale?`,`Spherical geometry`,[`Euclidean geometry`,`Only affine geometry`,`No metric geometry`]]
    ]; const [stem,correct,distr]=pick(rng,cases);
    return makeQuestion(rng,stem,correct,distr,`Parallel behavior and triangle angle sums are standard ways to distinguish Euclidean, hyperbolic, and spherical geometries.`,advancedMeta('axiomatic-parallel-postulate-compare',4));
  },'axiomatic-parallel-postulate-compare',false,4);

  const qMatrixTransformAdvanced = markGenerator(function(rng){
    const x=pick(rng,[-4,-3,-2,-1,1,2,3,4]), y=pick(rng,[-4,-3,-2,-1,1,2,3,4]);
    const modes=[
      {name:String.raw`90^\circ\text{ counterclockwise}`,pt:[-y,x],M:String.raw`\begin{pmatrix}0&-1\\1&0\end{pmatrix}`},
      {name:String.raw`90^\circ\text{ clockwise}`,pt:[y,-x],M:String.raw`\begin{pmatrix}0&1\\-1&0\end{pmatrix}`},
      {name:String.raw`180^\circ`,pt:[-x,-y],M:String.raw`\begin{pmatrix}-1&0\\0&-1\end{pmatrix}`},
      {name:'reflection across the x-axis',pt:[x,-y],M:String.raw`\begin{pmatrix}1&0\\0&-1\end{pmatrix}`}
    ]; const m=pick(rng,modes);
    const svg=svgAxesPlot([],{xmin:-5,xmax:5,ymin:-5,ymax:5,points:[{x,y},{x:m.pt[0],y:m.pt[1]}],label:'point and its image under a linear transformation'});
    const mats=[String.raw`\begin{pmatrix}0&-1\\1&0\end{pmatrix}`,String.raw`\begin{pmatrix}0&1\\-1&0\end{pmatrix}`,String.raw`\begin{pmatrix}-1&0\\0&-1\end{pmatrix}`,String.raw`\begin{pmatrix}1&0\\0&-1\end{pmatrix}`];
    return makeQuestion(rng,`${svg}<p>The point ${tex(`(${x},${y})`)} is mapped to ${tex(`(${m.pt[0]},${m.pt[1]})`)} by ${m.name.startsWith('reflection')?m.name:tex(m.name)}. Which matrix represents this transformation?</p>`,tex(m.M),mats.filter(M=>M!==m.M).slice(0,3).map(tex),`The transformation's coordinate rule gives the displayed image; its standard matrix is ${tex(m.M)}.`,visualMeta('transform-matrix-rotation-visual',4));
  },'transform-matrix-rotation-visual',true,4);

  const qStudyBiasAdvanced = markGenerator(function(rng){
    const cases=[
      [`A website posts a voluntary poll asking visitors whether a new graduation requirement should be adopted. What most threatens generalizing the result to all district students?`,`Voluntary-response bias, because those who choose to respond may differ systematically from nonrespondents.`],
      [`A school estimates average student sleep by surveying only students in an 8:00 a.m. athletics class. What is the main concern?`,`Selection bias: the sampled class may not represent the sleep patterns of all students.`],
      [`In a survey about cheating, students must write their names on the response sheet. What is a major concern?`,`Response bias: students may not answer a sensitive question truthfully when responses are identifiable.`],
      [`A study compares a new tutoring program with no tutoring, but students choose whether to enroll in tutoring. What threatens a causal conclusion?`,`Self-selection creates confounding because the groups may differ before tutoring begins.`],
      [`A phone survey calls only landline numbers to estimate opinions of all adults in a city. What is the main sampling concern?`,`Undercoverage, because adults without landlines cannot enter the sample.`]
    ]; const [stem,correct]=pick(rng,cases);
    return makeQuestion(rng,stem,correct,[`A large sample automatically removes every source of bias.`,`The response variable must be quantitative for the study to be valid.`,`A census is always required before any population conclusion can be drawn.`],`The identified feature creates a systematic difference between the observed data and the target population or causal comparison.`,advancedMeta('inference-voluntary-response-bias',3));
  },'inference-voluntary-response-bias',false,3);

  const qContrapositiveValidity = markGenerator(function(rng){
    const cases=[
      ['If an integer is divisible by 6, then it is divisible by 3.','If an integer is not divisible by 3, then it is not divisible by 6.','If an integer is divisible by 3, then it is divisible by 6.','If an integer is not divisible by 6, then it is not divisible by 3.'],
      ['If a function is differentiable at a point, then it is continuous at that point.','If a function is not continuous at a point, then it is not differentiable at that point.','If a function is continuous at a point, then it is differentiable at that point.','If a function is not differentiable at a point, then it is not continuous at that point.'],
      ['If a quadrilateral is a square, then it is a rectangle.','If a quadrilateral is not a rectangle, then it is not a square.','If a quadrilateral is a rectangle, then it is a square.','If a quadrilateral is not a square, then it is not a rectangle.'],
      ['If two coplanar lines are parallel, then corresponding angles formed by a transversal are congruent.','If a pair of corresponding angles formed by a transversal is not congruent, then the two coplanar lines are not parallel.','If corresponding angles are congruent, then the lines are parallel.','If two coplanar lines are not parallel, then no pair of corresponding angles can be congruent.'],
      ['If a real sequence converges, then it is bounded.','If a real sequence is unbounded, then it does not converge.','If a real sequence is bounded, then it converges.','If a real sequence does not converge, then it is unbounded.'],
      ['If an integer is divisible by 4, then it is even.','If an integer is odd, then it is not divisible by 4.','If an integer is even, then it is divisible by 4.','If an integer is not divisible by 4, then it is odd.']
    ];
    const [statement,correct,converse,inverse]=pick(rng,cases);
    return makeQuestion(rng,`Consider the implication: “${statement}” Which statement is its contrapositive?`,correct,[converse,inverse,'The original implication and its converse are logically equivalent for every implication.'],`For ${tex('P\\Rightarrow Q')}, the contrapositive is ${tex(String.raw`\\neg Q\\Rightarrow\\neg P`)}. It reverses the implication and negates both parts.`,advancedMeta('reasoning-contrapositive',3));
  },'reasoning-contrapositive',false,3);

  const qInductiveConjectureTable = markGenerator(function(rng){
    const mode=pick(rng,['odd','natural','squares','geometric']);
    let tbl,correct,expl,distr;
    if(mode==='odd'){
      tbl=tableHtml(['n','1','2','3','4','5'],[['1+3+⋯+(2n−1)','1','4','9','16','25']],'partial sums of odd integers');
      correct=tex(String.raw`1+3+\cdots+(2n-1)=n^2`); distr=[tex(String.raw`=2n`),tex(String.raw`=n(n+1)`),tex(String.raw`=2^n`)]; expl=`The partial sums are consecutive squares, suggesting ${tex(String.raw`\sum_{k=1}^{n}(2k-1)=n^2`)}.`;
    } else if(mode==='natural'){
      tbl=tableHtml(['n','1','2','3','4','5'],[['1+2+⋯+n','1','3','6','10','15']],'partial sums of natural numbers');
      correct=tex(String.raw`1+2+\cdots+n=\frac{n(n+1)}2`); distr=[tex('=n^2'),tex('=2n+1'),tex(String.raw`=\frac{n(n-1)}2`)]; expl=`The triangular-number pattern suggests ${correct}.`;
    } else if(mode==='squares'){
      tbl=tableHtml(['n','1','2','3','4','5'],[['1²+⋯+n²','1','5','14','30','55']],'partial sums of squares');
      correct=tex(String.raw`1^2+\cdots+n^2=\frac{n(n+1)(2n+1)}6`); distr=[tex(String.raw`=\frac{n(n+1)}2`),tex('=n^3'),tex(String.raw`=\frac{n(n+1)(n+2)}6`)]; expl=`The displayed values agree with the classical sum-of-squares formula ${correct}.`;
    } else {
      tbl=tableHtml(['n','1','2','3','4','5'],[['1+2+⋯+2ⁿ⁻¹','1','3','7','15','31']],'geometric partial sums');
      correct=tex(String.raw`1+2+\cdots+2^{n-1}=2^n-1`); distr=[tex('=2n-1'),tex('=2^n'),tex('=n^2-1')]; expl=`The partial sums are one less than successive powers of two, suggesting ${correct}.`;
    }
    return makeQuestion(rng,`${tbl}<p>Which conjecture is most strongly suggested by the displayed cases and is suitable for proof by induction?</p>`,correct,distr,`${expl} The table motivates the conjecture; induction is needed to prove it for all ${tex(String.raw`n\in\mathbb N`)}.`,visualMeta('reasoning-inductive-table',3));
  },'reasoning-inductive-table',true,3);

  const qTerminologyPrecision = markGenerator(function(rng){
    const k=pick(rng,[-8,-6,-4,-3,2,3,4,5,6,8]), a=pick(rng,[1,2,3,4]);
    const cases=[
      [`A student says, “The line changes by ${k} vertically for every 1 unit to the right.” Which statement is most precise?`,`The slope of the line is ${tex(String(k))}.`,[`The ${tex('y')}-intercept is ${tex(String(k))}.`,`The domain has ${Math.abs(k)} elements.`,`The line has maximum value ${tex(String(k))}.`]],
      [`A student says, “The graph crosses the vertical axis at ${tex(String(k))}.” Which statement is most precise?`,`The ${tex('y')}-intercept is ${tex(String(k))}.`,[`The slope is ${tex(String(k))}.`,`A zero of the function is ${tex(String(k))}.`,`The domain ends at ${tex(String(k))}.`]],
      [`For each additional hour, a quantity changes by ${tex(String(k))} units. Which term names this number in a linear model?`,`The rate of change (slope).`,[`The horizontal intercept.`,`The domain.`,`The maximum value.`]],
      [`A student says, “The outputs approach ${k} as the inputs approach ${a}.” Which notation communicates this precisely?`,tex(String.raw`\lim_{x\to${a}}f(x)=${k}`),[tex(`f(${a})=${k}`),tex(`f'(${a})=${k}`),tex(String.raw`\int_${a}^${k}f(x)\,dx=0`)]],
      [`A data set has middle value ${k} after the observations are ordered. Which statistical term is most precise?`,`The median is ${tex(String(k))}.`,[`The mean must be ${tex(String(k))}.`,`The range is ${tex(String(k))}.`,`The standard deviation is ${tex(String(k))}.`]]
    ]; const [stem,correct,distr]=pick(rng,cases);
    return makeQuestion(rng,stem,correct,distr,`Precise mathematical communication names the specific quantity or limiting relationship being described.`,advancedMeta('connections-terminology-precision',3));
  },'connections-terminology-precision',false,3);

  const qInterdisciplinaryGraphVisual = markGenerator(function(rng){
    const rate=pick(rng,[30,40,45,50,55,60,65,70]), contexts=pick(rng,[['time in hours','distance in miles','miles per hour'],['time in minutes','water in gallons','gallons per minute'],['time in seconds','distance in meters','meters per second']]);
    const svg=svgAxesPlot([{fn:x=>rate*x}],{xmin:0,xmax:4,ymin:0,ymax:rate*4+10,label:'linear quantity-versus-time graph'});
    return makeQuestion(rng,`${svg}<p>The horizontal axis represents ${contexts[0]} and the vertical axis represents ${contexts[1]}. Which interpretation of the graph's slope is correct?</p>`,`The modeled rate is ${tex(String(rate))} ${contexts[2]}.`,[`The process lasts ${tex(String(rate))} time units.`,`The initial amount is ${tex(String(rate))}.`,`The measured quantity decreases by ${tex(String(rate))} each time unit.`],`Slope is change in the vertical quantity divided by change in the horizontal quantity, so its units are ${contexts[2]} and its value is ${rate}.`,visualMeta('connections-interdisciplinary-rate-graph',3));
  },'connections-interdisciplinary-rate-graph',true,3);

  const challenge3=[qMatrixDeterminant,qInductionStep,qRationalAsymptote,qRegressionInterpretation];
  challenge3.forEach(fn=>{ if(fn && fn.difficulty==null) fn.difficulty=3; });
  const challenge4=[qHypothesisDecision,qProofLogic,qModelEvaluation];
  challenge4.forEach(fn=>{ if(fn) fn.difficulty=4; });
  const calculusLegacy3=[qDerivativeRule,qFTC,qOptimization,qRiemannSum,qInstantaneousRate,qDefiniteIntegral];
  calculusLegacy3.forEach(fn=>{ if(fn) fn.difficulty=3; });

  const advPools = {
    c001:[qGeoboardVisual,qRealSubsetStructure,qIrrationalEquation,qRealModelPrecision],
    c002:[qComplexPlaneVisual,qComplexRotation,qComplexRoots,qComplexProduct,qQuadraticRoots,qMatrixDeterminant],
    c003:[qModularClock,qMatrixNoncommute,qCountingRestriction,qBaseConversion],
    c004:[qSequenceTableVisual,qPartialSumsVisual,qInfiniteGeometric,qAnnuity,qCompoundInterest,qRecursiveSequence],
    c005:[qFunctionGraphVerticalLine,qInverseGraphVisual,qFunctionOperationDomain],
    c006:[qQuadraticGraphVisual,qSystemGraphVisual,qQuadraticParameter,qMatrixSystem],
    c007:[qPolynomialGraphVisual,qRationalGraphVisual,qAbsoluteValueGraph,qRationalSlant,qPolynomialMultiplicity],
    c008:[qExponentialGraphVisual,qLogGraphVisual,qExponentialTableVisual,qLogEquationAdvanced,qLogScale,qDifferentialGrowth,qCompoundInterest,qContinuousGrowth],
    c009:[qUnitCircleVisual,qTrigGraphVisual2,qTrigTriangleVisualAdvanced,qTrigEquationAdvanced,qSinusoidalModel,qInverseTrigComposition,qInverseTrig,qTrigIdentity],
    c010:[qLimitGraphVisual,qDerivativeGraphAnalysis,qSecondDerivativeConcept,qVelocityGraphIntegral,qAccelerationGraphAdvanced,qRelatedRates,qWorkIntegral,qCenterMass,qOptimizationBoxAdvanced,qFTCChainAdvanced,qOptimization,qFTC,qDefiniteIntegral],
    c011:[qPrismDiagram,qTriangleMeasureDiagram,qArcLength,qVelocityGraphIntegral,qRiemannSum,qScaleEffect],
    c012:[qParallelLinesDiagram,qAxiomaticAngleDiagram,qConstruction,qParallelPostulateCompare,qNonEuclidean],
    c013:[qTriangleCongruenceDiagram,qCircleChordDiagram,qSimilarTrianglesDiagram,qCrossSection],
    c014:[qTransformationVisual,qConicGraphVisual,qVectorDiagram,qMatrixTransformAdvanced,qDistanceMidpoint,qLineEquation],
    c015:[qHistogramVisual,qBoxPlotVisual2,qBarChartInference,qScatterVisual,qDataTransformAdvanced,qMeanMedian],
    c016:[qProbabilityAreaVisual,qProbabilityTree,qDistributionVariance,qContinuousUniformAdvanced,qConditionalProbability,qExpectedValue],
    c017:[qResidualPlotVisual,qSamplingDesignAdvanced,qConfidenceWidth,qStudyBiasAdvanced,qMarginOfErrorAdvanced,qHypothesisDecision,qCLT,qRegressionInterpretation],
    c018:[qReasoningGraphCounterexample,qInductiveConjectureTable,qProofQuantifier,qContrapositiveValidity,qModelResidualDecision,qProofLogic,qLogicCounterexample,qReasonableness],
    c019:[qRepresentationGraphTable,qRepresentationAreaIntegral,qInterdisciplinaryGraphVisual,qTerminologyPrecision,qRepresentationConnection],
    c020:[qInstrPriorKnowledge,qInstrConcreteAbstract,qInstrTechnology,qInstrELL,qInstrDiscourse,qInstrMisconception,qInstrTaskDemand,qInstrCareer,qInstructionConceptual,qInstructionDifferentiation,qQuestioningStrategy,qAssessmentErrorAnalysis],
    c021:[qAssessFormativeAction,qAssessRubric,qAssessValidity,qAssessDistractor,qAssessReliability,qAssessFeedback,qAssessPrePost,qAssessELL,qAssessmentType,qAssessmentAlignment,qAssessmentErrorAnalysis,qAssessmentNextStep]
  };

  const categories = {};
  function category(id, label, description, pool, group = "") {
    categories[id] = { id, label, description, pool, group, domain: group };
    return id;
  }

  const c001=category("235-c001","Competency 001: Real Number System","Place value, representations, real-number structure, operations, algorithms, closure, modeling, and justification.",
    [qBaseConversion,qFieldProperty,qClosure,qNumberSet,qScientificNotation,qExponentLaw,qEquivalentRepresentations,qCompareNumbers].concat(advPools.c001),"Domain I — Number Concepts");
  const c002=category("235-c002","Competency 002: Complex Number System","Complex-number structure, conjugates, modulus, representations, operations, roots, and geometric meaning.",
    [qComplexArithmetic,qComplexConjugate,qComplexModulus,qComplexPolar,qDiscriminant,qVectorOperation].concat(advPools.c002),"Domain I — Number Concepts");
  const c003=category("235-c003","Competency 003: Number Theory and Numerical Modeling","Prime factorization, divisibility, modular arithmetic, Euclidean algorithm, counting, matrices, estimation, ratios, and applications.",
    [qPrimeFactorization,qGcdLcm,qEuclideanAlgorithm,qModularArithmetic,qCounting,qMatrixDeterminant,qEstimation,qDimensionalAnalysis].concat(advPools.c003),"Domain I — Number Concepts");

  const c004=category("235-c004","Competency 004: Patterns, Sequences, Series, and Finance","Recursive and iterative patterns, induction, arithmetic and geometric sequences and series, and financial applications.",
    [qPatternReasoning,qSequence,qRecursiveSequence,qArithmeticSeries,qGeometricSeries,qInductionStep,qCompoundInterest,qLimitSequence].concat(advPools.c004),"Domain II — Patterns and Algebra");
  const c005=category("235-c005","Competency 005: Functions, Relations, and Graphs","Function definitions, representations, domain and range, inverse and one-to-one functions, transformations, parity, operations, and composition.",
    [qRelationFunction,qFunctionEvaluate,qFunctionComposition,qFunctionDomain,qFunctionTransformation,qInverseFunction,qEvenOdd,qGraphSlope,qRateOfChange].concat(advPools.c005),"Domain II — Patterns and Algebra");
  const c006=category("235-c006","Competency 006: Linear and Quadratic Functions","Slope, lines, systems, matrices, equations and inequalities, quadratic zeros, forms, graphs, and modeling.",
    [qSlope,qLineEquation,qGraphSlope,qLinearInequality,qLinearApplication,qSystemEquations,qFactorQuadratic,qQuadraticRoots,qQuadraticVertex,qDiscriminant].concat(advPools.c006),"Domain II — Patterns and Algebra");
  const c007=category("235-c007","Competency 007: Polynomial, Rational, Radical, Absolute-Value, and Piecewise Functions","Representations, domains, zeros, extrema, discontinuities, asymptotes, equations, inequalities, and modeling.",
    [qPolynomialRemainder,qPolynomialEndBehavior,qRationalEquation,qRationalAsymptote,qRadicalEquation,qAbsoluteValueEquation,qPiecewise,qFunctionDomain].concat(advPools.c007),"Domain II — Patterns and Algebra");
  const c008=category("235-c008","Competency 008: Exponential and Logarithmic Functions","Representations, laws, inverse relationships, equations, growth and decay, logarithmic scales, finance, and proportional-rate models.",
    [qExponentialGrowth,qLogarithm,qLogProperties,qContinuousGrowth,qCompoundInterest,qExponentLaw].concat(advPools.c008),"Domain II — Patterns and Algebra");
  const c009=category("235-c009","Competency 009: Trigonometric and Circular Functions","Unit-circle relationships, graphs, transformations, inverse functions, identities, equations, and periodic modeling.",
    [qTrigRightTriangle,qTrigExact,qTrigGraph,qTrigIdentity,qInverseTrig,qPythagorean].concat(advPools.c009),"Domain II — Patterns and Algebra");
  const c010=category("235-c010","Competency 010: Differential and Integral Calculus","Limits, continuity, rates of change, derivatives, graph analysis, integration, the FTC, optimization, and applications.",
    [qRateOfChange,qInstantaneousRate,qDerivativeRule,qDefiniteIntegral,qFTC,qRiemannSum,qOptimization].concat(advPools.c010),"Domain II — Patterns and Algebra");

  const c011=category("235-c011","Competency 011: Measurement","Dimensional analysis, area, surface area, volume, scaling, right-triangle measurement, Riemann sums, and calculus-based measurement.",
    [qDimensionalAnalysis,qUnitConversion,qMeasurementError,qTriangleArea,qCircle,qVolumePrism,qCylinderVolume,qScaleEffect,qPythagorean,qTrigRightTriangle,qRiemannSum].concat(advPools.c011),"Domain III — Geometry and Measurement");
  const c012=category("235-c012","Competency 012: Axiomatic and Euclidean Geometry","Axioms, undefined terms, theorems, counterexamples, lines, planes, congruence, similarity, constructions, proof, and non-Euclidean geometry.",
    [qAxiomaticSystem,qNonEuclidean,qAngles,qSimilarityScale,qLogicCounterexample,qProofLogic,qDistanceMidpoint,qPythagorean].concat(advPools.c012),"Domain III — Geometry and Measurement");
  const c013=category("235-c013","Competency 013: Euclidean Geometry Results and Applications","Polygons, circles, composite figures, similarity, congruence, sectors, cross-sections, nets, views, and spatial problem solving.",
    [qPolygonAngles,qCircle,qCircleTheorem,qRectangleAreaPerimeter,qTriangleArea,qSimilarityScale,qCrossSection,qVolumePrism,qCylinderVolume].concat(advPools.c013),"Domain III — Geometry and Measurement");
  const c014=category("235-c014","Competency 014: Coordinate, Transformational, and Vector Geometry","Transformations, symmetry, coordinate proofs, conic sections, matrix transformations, vectors, distance, slope, and midpoint.",
    [qTransformation,qDistanceMidpoint,qSlope,qLineEquation,qConicEquation,qVectorOperation,qMatrixDeterminant,qFunctionTransformation].concat(advPools.c014),"Domain III — Geometry and Measurement");

  const c015=category("235-c015","Competency 015: Exploring and Describing Data","Measurement scales, displays, center, spread, shape, outliers, transformations, and one-variable conclusions.",
    [qMeanMedian,qWeightedMean,qRangeIqr,qNormalRule,qCorrelation,qDataTransformation,qSamplingInference].concat(advPools.c015),"Domain IV — Probability and Statistics");
  const c016=category("235-c016","Competency 016: Probability and Distributions","Sample spaces, compound events, counting, geometric probability, conditional probability, expected value, and discrete and continuous distributions.",
    [qSimpleProbability,qCompoundProbability,qWithoutReplacement,qCounting,qSetProbability,qConditionalProbability,qExpectedValue,qBinomialProbability].concat(advPools.c016),"Domain IV — Probability and Statistics");
  const c017=category("235-c017","Competency 017: Sampling and Statistical Inference","Study design, sampling, misleading statistics, regression, transformations, confidence intervals, CLT, estimation, and hypothesis testing.",
    [qSamplingInference,qCorrelation,qRegressionInterpretation,qConfidenceInterval,qHypothesisDecision,qCLT,qDataTransformation].concat(advPools.c017),"Domain IV — Probability and Statistics");

  const c018=category("235-c018","Competency 018: Mathematical Reasoning and Problem Solving","Proof, indirect reasoning, conjectures, justification, strategy selection, reasonableness, and model evaluation.",
    [qProofLogic,qLogicCounterexample,qReasonableness,qEstimation,qModelEvaluation,qPatternReasoning,qDimensionalAnalysis].concat(advPools.c018),"Domain V — Mathematical Processes and Perspectives");
  const c019=category("235-c019","Competency 019: Connections and Communication","Multiple representations, interdisciplinary models, verbal-symbolic translation, visual communication, and mathematical terminology.",
    [qRepresentationConnection,qProportionalModel,qLinearApplication,qDimensionalAnalysis,qCompoundInterest,qGraphSlope,qConicEquation,qDataTransformation].concat(advPools.c019),"Domain V — Mathematical Processes and Perspectives");

  const c020=category("235-c020","Competency 020: Mathematical Learning and Instruction","Learning theory, prior knowledge, differentiation, representations, technology, discourse, TEKS-aligned tasks, and inclusive instruction.",
    advPools.c020,"Domain VI — Mathematical Learning, Instruction and Assessment");
  const c021=category("235-c021","Competency 021: Mathematical Assessment","Formative, summative, diagnostic, and performance assessment; alignment; scoring; error analysis; and data-informed instruction.",
    advPools.c021,"Domain VI — Mathematical Learning, Instruction and Assessment");

  const exams = {
    math712: {
      id:"math712", family:"TExES", code:"235", title:"Mathematics 7–12", shortTitle:"Mathematics 7–12 (235)",
      description:"Comprehensive secondary mathematics certification practice covering all six official domains and all 21 competencies, including instruction and assessment.",
      fullCount:100, duration:300, forms:5, topicVersions:4, topicCount:12,
      categories:[c001,c002,c003,c004,c005,c006,c007,c008,c009,c010,c011,c012,c013,c014,c015,c016,c017,c018,c019,c020,c021],
      weights:{
        [c001]:5,[c002]:4,[c003]:5,
        [c004]:4,[c005]:5,[c006]:5,[c007]:5,[c008]:5,[c009]:5,[c010]:4,
        [c011]:5,[c012]:5,[c013]:5,[c014]:4,
        [c015]:5,[c016]:5,[c017]:4,
        [c018]:5,[c019]:5,[c020]:5,[c021]:5
      },
      visualMins:{
        [c001]:1,[c002]:1,[c003]:0,[c004]:1,[c005]:2,[c006]:2,[c007]:2,[c008]:2,[c009]:2,[c010]:2,
        [c011]:2,[c012]:2,[c013]:2,[c014]:2,[c015]:3,[c016]:2,[c017]:2,[c018]:1,[c019]:2,[c020]:0,[c021]:0
      },
      note:"The official Mathematics 7–12 (235) exam contains 100 selected-response questions and allows five hours. These forms follow the published domain weights: 14%, 33%, 19%, 14%, 10%, and 10%. The practice forms deliberately include substantial graphical, tabular, and diagrammatic reasoning."
    }
  };

  const examGroups = {};

  function generateCategoryQuestions(categoryId, count, seedText, visualMin = 0) {
    const cat = categories[categoryId];
    if (!cat) throw new Error(`Unknown category: ${categoryId}`);
    const rng = rngFromSeed(seedText);
    const uniquePoolMap = new Map();
    for (const fn of cat.pool) {
      const fam = fn.family || fn.name || `generator-${uniquePoolMap.size}`;
      if (!uniquePoolMap.has(fam)) uniquePoolMap.set(fam, fn);
    }
    const pool = shuffle(rng, [...uniquePoolMap.values()]);
    const visualPool = pool.filter(fn => fn.visual);
    const selected = [];
    const usedFamilies = new Set();

    function addFrom(candidates, wantVisual=false) {
      const ordered = shuffle(rng, candidates).sort((a,b)=>(b.difficulty||2)-(a.difficulty||2));
      for (const fn of ordered) {
        const fam = fn.family || fn.name || 'generator';
        if (usedFamilies.has(fam) && usedFamilies.size < pool.length) continue;
        let q = fn(rng);
        q.family = q.family || fam;
        q.visual = Boolean(q.visual || fn.visual);
        q.difficulty = q.difficulty || fn.difficulty || 2;
        if (wantVisual && !q.visual) continue;
        q.categoryId=categoryId; q.categoryLabel=cat.label; q.domain=cat.group;
        q.id=`${categoryId}-${hashString(seedText+":"+selected.length+":"+q.prompt).toString(36)}`;
        selected.push(q); usedFamilies.add(q.family);
        return true;
      }
      return false;
    }

    for(let i=0;i<Math.min(visualMin,count);i++) {
      if(!addFrom(visualPool,true)) break;
    }
    while(selected.length<count) {
      if(!addFrom(pool,false)) {
        // If every family has been used, permit another family but require a new prompt.
        const fn=pick(rng,pool); let q=null;
        for(let attempt=0;attempt<30;attempt++) {
          const candidate=fn(rng);
          if(!selected.some(x=>x.prompt===candidate.prompt)){q=candidate;break;}
        }
        if(!q) q=fn(rng);
        q.family=q.family||fn.family||fn.name||'generator'; q.visual=Boolean(q.visual||fn.visual); q.difficulty=q.difficulty||fn.difficulty||2;
        q.categoryId=categoryId; q.categoryLabel=cat.label; q.domain=cat.group;
        q.id=`${categoryId}-${hashString(seedText+":"+selected.length+":"+q.prompt).toString(36)}`;
        selected.push(q);
      }
    }
    return selected;
  }

  function generateFullExamDynamic(examId, seedText) {
    const exam=exams[examId];
    if(!exam) throw new Error(`Unknown exam: ${examId}`);
    let questions=[];
    exam.categories.forEach(categoryId=>{
      const count=exam.weights[categoryId];
      const vmin=(exam.visualMins||{})[categoryId]||0;
      questions=questions.concat(generateCategoryQuestions(categoryId,count,`${seedText}:${categoryId}`,vmin));
    });
    const seen=new Set(), seenPrompts=new Set();
    const familiesByCategory=new Map();
    questions=questions.map((q,i)=>{
      const fams=familiesByCategory.get(q.categoryId)||new Set();
      let candidate=q,attempt=0;
      // If the same mathematical prompt arose in another competency, first
      // regenerate this same family with different parameters rather than
      // replacing it with a different content family.
      if((seen.has(questionSignature(candidate))||seenPrompts.has(candidate.prompt)) && !fams.has(candidate.family)){
        for(let k=0;k<160;k++){
          const trial=regenerateFamilyQuestion(q.categoryId,q.family,`${seedText}:same-family:${q.categoryId}:${i}:${k}`,q.visual);
          if(trial && !seen.has(questionSignature(trial)) && !seenPrompts.has(trial.prompt)){candidate=trial;break;}
        }
      }
      while((seen.has(questionSignature(candidate))||seenPrompts.has(candidate.prompt)||fams.has(candidate.family)) && attempt<250){
        const trial=generateCategoryQuestions(q.categoryId,1,`${seedText}:dedupe:${q.categoryId}:${i}:${attempt}`,q.visual?1:0)[0];
        if(!seen.has(questionSignature(trial)) && !seenPrompts.has(trial.prompt) && !fams.has(trial.family)) candidate=trial;
        attempt++;
        if(!seen.has(questionSignature(candidate)) && !seenPrompts.has(candidate.prompt) && !fams.has(candidate.family)) break;
      }
      seen.add(questionSignature(candidate)); seenPrompts.add(candidate.prompt); fams.add(candidate.family); familiesByCategory.set(q.categoryId,fams); return candidate;
    });
    const rng=rngFromSeed(`${seedText}:shuffle`);
    questions=shuffle(rng,questions);
    questions.forEach((q,i)=>q.order=i+1);
    return questions;
  }

  function generateTopicQuizDynamic(examId, categoryId, seedText) {
    const exam=exams[examId];
    if(!exam || !exam.categories.includes(categoryId)) throw new Error("Topic does not belong to exam");
    const cat=categories[categoryId];
    const hasVisual=cat.pool.some(fn=>fn.visual);
    const visualMin=hasVisual?Math.min(3,exam.topicCount):0;
    return generateCategoryQuestions(categoryId,exam.topicCount,seedText,visualMin).map((q,i)=>({...q,order:i+1}));
  }


  function questionSignature(q){ return `${q.prompt}||${q.choices.map(String).slice().sort().join('||')}`; }
  function cloneQuestions(qs){ return qs.map(q=>({...q,choices:q.choices.slice()})); }
  function contextualVariant(q, key) {
    const courses=['Algebra I','Geometry','Algebra II','Precalculus','a secondary mathematics methods course','a mathematics review'];
    const settings=['during guided practice','during an independent check','during a technology-supported investigation','during a small-group discussion','during a modeling activity','during a formative check'];
    const h=hashString(key), course=courses[h%courses.length], setting=settings[Math.floor(h/7)%settings.length];
    const copy={...q,choices:q.choices.slice()};
    copy.prompt=`<p class="context-lead">A teacher uses the following item ${setting} in ${course}.</p>${copy.prompt}`;
    copy.id=`${copy.id||'q'}-${hashString(key).toString(36)}`;
    return copy;
  }
  function regenerateFamilyQuestion(categoryId,family,key,visualWanted=false){
    const cat=categories[categoryId];
    const fn=cat.pool.find(g=>(g.family||g.name||'generator')===family);
    if(!fn) return null;
    const rng=rngFromSeed(key); const q=fn(rng);
    q.family=q.family||family; q.visual=Boolean(q.visual||fn.visual); q.difficulty=q.difficulty||fn.difficulty||2;
    if(visualWanted && !q.visual) return null;
    q.categoryId=categoryId; q.categoryLabel=cat.label; q.domain=cat.group;
    q.id=`${categoryId}-${hashString(key+":"+q.prompt).toString(36)}`;
    return q;
  }
  function buildUniqueCategorySet(categoryId,count,key,visualMin,usedPrompts){
    const out=generateCategoryQuestions(categoryId,count,key,visualMin);
    return out.map((q,i)=>{
      let candidate=q, n=0;
      while(usedPrompts.has(questionSignature(candidate)) && n<120){
        const trial=regenerateFamilyQuestion(categoryId,q.family,`${key}:${i}:regen:${n++}`,q.visual);
        if(trial && !usedPrompts.has(questionSignature(trial))) { candidate=trial; break; }
      }
      // Only use a contextual parallel version after the generator has exhausted
      // genuinely different prompts/values/answer sets for this family.
      n=0;
      while(usedPrompts.has(questionSignature(candidate))) candidate=contextualVariant(q,`${key}:${i}:variant:${n++}`);
      usedPrompts.add(questionSignature(candidate));
      return candidate;
    });
  }
  function buildFixedBanks(){
    const exam=exams.math712, used=new Set(), full={}, topic={};
    const calculusBreadthSeeds={A:'breadth-0:235-c010',B:'breadth-5:235-c010',C:'breadth-9:235-c010',D:'breadth-11:235-c010',E:'breadth-28:235-c010'};
    for(const letter of ['A','B','C','D','E']){
      let qs=[];
      for(const categoryId of exam.categories){
        const count=exam.weights[categoryId], v=(exam.visualMins||{})[categoryId]||0;
        const categorySeed=categoryId==='235-c010'?calculusBreadthSeeds[letter]:`fixed-full-${letter}:${categoryId}`;
        qs=qs.concat(buildUniqueCategorySet(categoryId,count,categorySeed,v,used));
      }
      qs=shuffle(rngFromSeed(`fixed-full-${letter}:shuffle`),qs); qs.forEach((q,i)=>q.order=i+1); full[`form-${letter}`]=qs;
    }
    for(const categoryId of exam.categories){
      topic[categoryId]={};
      const visualFamilies=new Set(categories[categoryId].pool.filter(fn=>fn.visual).map(fn=>fn.family||fn.name)); const v=Math.min(3,visualFamilies.size);
      for(let version=1;version<=4;version++){
        const qs=buildUniqueCategorySet(categoryId,exam.topicCount,`fixed-topic-${categoryId}-${version}`,v,used);
        qs.forEach((q,i)=>q.order=i+1); topic[categoryId][`topic-${version}`]=qs;
      }
    }
    return {full,topic};
  }
  const FIXED_BANKS=buildFixedBanks();

  function generateFullExam(examId,seedText){
    if(examId==='math712' && FIXED_BANKS.full[seedText]) return cloneQuestions(FIXED_BANKS.full[seedText]);
    return generateFullExamDynamic(examId,seedText);
  }
  function generateTopicQuiz(examId,categoryId,seedText){
    if(examId==='math712' && FIXED_BANKS.topic[categoryId] && FIXED_BANKS.topic[categoryId][seedText]) return cloneQuestions(FIXED_BANKS.topic[categoryId][seedText]);
    return generateTopicQuizDynamic(examId,categoryId,seedText);
  }

  global.MathQuizData = {
    LETTERS,
    exams,
    examGroups,
    categories,
    rngFromSeed,
    generateFullExam,
    generateTopicQuiz
  };
})(window);

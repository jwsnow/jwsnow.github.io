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

  function makeQuestion(rng, prompt, correct, distractors, explanation, meta = {}) {
    let values = uniqueStrings([String(correct), ...distractors.map(String)]);
    const fallbackChoices = ["None of the other choices", "Cannot be determined from the information given", "The expression is undefined", "0"];
    let fallbackIndex = 0;
    while (values.length < 4) {
      const candidate = fallbackChoices[fallbackIndex++];
      if (!values.includes(candidate)) values.push(candidate);
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
    return `<svg class="svg-graph" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label || "coordinate graph"}">
      <line x1="${pad}" y1="${sy(0)}" x2="${w-pad}" y2="${sy(0)}" stroke="#506070"/>
      <line x1="${sx(0)}" y1="${pad}" x2="${sx(0)}" y2="${h-pad}" stroke="#506070"/>
      <path d="${path}" fill="none" stroke="#184e77" stroke-width="3"/>
      ${points.map(p => `<circle cx="${sx(p[0])}" cy="${sy(p[1])}" r="4" fill="#184e77"/>`).join("")}
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
    const pairs = [[1,2,.5,50],[1,4,.25,25],[3,4,.75,75],[2,5,.4,40],[3,5,.6,60],[7,10,.7,70],[1,5,.2,20],[4,5,.8,80]];
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
      `Choose the correct comparison: <span class="math-display">${a}/${b} ___ ${dec}</span>.`,
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
    const a=ri(rng,1,4), b=ri(rng,-5,5), c=ri(rng,-8,8), k=ri(rng,-3,4);
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
        `Average corresponding coordinates: ((${x1}+${x2})/2, (${y1}+${y2})/2) = ${correct}.`);
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
    else { const a=ri(rng,-4,5), b=ri(rng,-4,5); correct=`(${x+a}, ${y+b})`; prompt=`Point (${x},${y}) is translated by the vector ⟨${a},${b}⟩. What is its image?`; explanation=`Add the vector components: (${x}+${a}, ${y}+${b}) = ${correct}.`; }
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
      ["hours studied","exam score","positive"],
      ["outside temperature","home heating use","negative"],
      ["shoe size","number of books read","approximately zero"],
      ["age of a used car","resale value","negative"]
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
      ["The first 30 students entering a gym are used to estimate all students' exercise habits.","likely biased because it is a convenience sample"]
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
      ["The sum of two prime numbers is always even.","2 + 3 = 5"],
      ["The product of two negative integers is negative.","(−2)(−3) = 6"],
      ["Every rectangle is a square.","a 2-by-5 rectangle"],
      ["If x² = 16, then x = 4.","x = −4"]
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
      [`a(b+c)=ab+ac`,`distributive property`],
      [`a+0=a`,`additive identity property`],
      [`a+(-a)=0`,`additive inverse property`],
      [`ab=ba`,`commutative property of multiplication`],
      [`(ab)c=a(bc)`,`associative property of multiplication`]
    ];
    const [stmt,correct]=pick(rng,cases);
    return makeQuestion(rng,`Which property is illustrated by <span class="math-display">${stmt}</span>?`,correct,
      [`closure property`,`multiplicative inverse property`,`commutative property of addition`,`associative property of addition`].filter(x=>x!==correct),
      `The equation is precisely the ${correct}.`);
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
      [`2ⁿ≥n+1 for n≥0`,`assume 2ᵏ≥k+1 and show 2ᵏ⁺¹≥k+2`]
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
    return makeQuestion(rng,`Let <span class="math-display">f(x)={ ${a}x${b>=0?"+":"−"}${Math.abs(b)} if x&lt;${cut}; x²−${a} if x≥${cut} }</span>. Find f(${x}).`,correct,
      [left?x*x-a:a*x+b,a*x-b,x*x+a],
      `${x} ${left?"is less than":"is at least"} ${cut}, so use the ${left?"first":"second"} rule. This gives ${correct}.`);
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
    const a=ri(rng,1,5);
    return makeQuestion(rng,`If <span class="math-display">F(x)=∫₀ˣ (${a}t²+1)dt</span>, what is F′(x)?`,`${a}x²+1`,
      [`${2*a}x`,`(${a}/3)x³+x`,`x(${a}x²+1)`],
      `By the Fundamental Theorem of Calculus, the derivative of an integral with variable upper limit is the integrand evaluated at x.`);
  }

  function qOptimization(rng) {
    const p=pick(rng,[20,24,30,40]);
    const side=p/4, area=side*side;
    return makeQuestion(rng,`A rectangle has perimeter ${p}. What is the greatest possible area?`,area,
      [p*p/2,p*p/8,side],
      `For fixed perimeter, area is maximized by a square. Each side is ${p}/4=${side}, so the maximum area is ${area}.`);
  }

  function qScaleEffect(rng) {
    const k=pick(rng,[2,3,4,0.5]);
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
    return makeQuestion(rng,`${desc} is called a(n)`,correct,
      [`axiom`,`theorem`,`counterexample`,`undefined term`].filter(x=>x!==correct),
      `${desc} is the definition of a ${correct}.`);
  }

  function qNonEuclidean(rng) {
    const cases=[
      [`Through a point not on a line, exactly one parallel line exists`,`Euclidean geometry`],
      [`Through a point not on a line, more than one parallel line exists`,`hyperbolic geometry`],
      [`No parallel lines exist`,`elliptic geometry`]
    ];
    const [stmt,correct]=pick(rng,cases);
    return makeQuestion(rng,`The statement “${stmt}” characterizes`,correct,
      [`Euclidean geometry`,`hyperbolic geometry`,`elliptic geometry`,`projective arithmetic`].filter(x=>x!==correct),
      `This is the standard parallel-postulate behavior of ${correct}.`);
  }

  function qCircleTheorem(rng) {
    const arc=pick(rng,[60,80,100,120,140]);
    return makeQuestion(rng,`An inscribed angle intercepts an arc measuring ${arc}°. What is the angle measure?`,arc/2,
      [arc,180-arc,360-arc],
      `An inscribed angle has half the measure of its intercepted arc, so the angle is ${arc/2}°.`);
  }

  function qCrossSection(rng) {
    const cases=[
      [`A plane parallel to the base cuts a right circular cone`,`circle`],
      [`A plane parallel to the base cuts a cylinder`,`circle`],
      [`A plane perpendicular to the bases cuts a rectangular prism`,`rectangle`],
      [`A plane through the apex and center of the base cuts a cone`,`triangle`]
    ];
    const [stmt,correct]=pick(rng,cases);
    return makeQuestion(rng,`${stmt}. The cross-section is a`,correct,
      [`circle`,`rectangle`,`triangle`,`parabola`].filter(x=>x!==correct),
      `The stated orientation of the cutting plane produces a ${correct}.`);
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
    return makeQuestion(rng,`If u=⟨${a[0]},${a[1]}⟩ and v=⟨${b[0]},${b[1]}⟩, find u+v.`,correct,
      [`⟨${a[0]-b[0]}, ${a[1]-b[1]}⟩`,`⟨${a[0]*b[0]}, ${a[1]*b[1]}⟩`,`⟨${a[1]+b[1]}, ${a[0]+b[0]}⟩`],
      `Add corresponding components: ⟨${a[0]}+${b[0]}, ${a[1]}+${b[1]}⟩=${correct}.`);
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
      [`The sum of two odd integers is even`,`write the integers as 2a+1 and 2b+1 and simplify`]
    ];
    const [claim,correct]=pick(rng,cases);
    return makeQuestion(rng,`Which is an appropriate proof strategy for “${claim}”?`,correct,
      [`verify the claim for three examples`,`draw a graph and assume it proves the claim`,`state that the result is obvious`,`use a calculator for one case`],
      `The proposed strategy gives a valid deductive argument for the universal statement.`);
  }

  function qModelEvaluation(rng) {
    const correct=`check residuals and whether predictions are made within the observed range`;
    return makeQuestion(rng,`A linear model fits a data set with a high correlation. Before using it for prediction, the most important additional step is to`,correct,
      [`assume correlation proves causation`,`round the slope to an integer`,`discard all points below the mean`,`replace the model with a quadratic automatically`],
      `Residual patterns and the range of observed data help determine whether a model is appropriate and whether extrapolation is risky.`);
  }

  function qRepresentationConnection(rng) {
    const cases=[
      [`The zeros of a polynomial`,`x-intercepts of its graph`],
      [`The derivative of position`,`velocity`],
      [`The area under a velocity-time graph`,`displacement`],
      [`The determinant of a 2×2 matrix`,`signed area scale factor of its linear transformation`]
    ];
    const [concept,correct]=pick(rng,cases);
    return makeQuestion(rng,`${concept} corresponds most directly to`,correct,
      [`the y-intercept only`,`the average of all inputs`,`a random sample`,`the domain restriction`],
      `This is a standard connection among symbolic, graphical, and applied representations.`);
  }

  function qInstructionConceptual(rng) {
    const cases=[
      [`Students can solve 3x+5=20 procedurally but cannot explain why subtracting 5 is valid.`,`Use a balance model and connect each move to preserving equality.`],
      [`Students graph y=2x+3 as isolated points without seeing rate of change.`,`Connect a table, a constant first difference, and the slope triangle on the graph.`],
      [`Students confuse area and perimeter.`,`Use tiles and boundary markers on figures with equal area but different perimeters.`],
      [`Students believe multiplying always makes a number larger.`,`Compare products involving whole numbers, fractions between 0 and 1, and negative factors.`]
    ];
    const [situation,correct]=pick(rng,cases);
    return makeQuestion(rng,`${situation} Which instructional response best develops conceptual understanding?`,correct,
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
    return makeQuestion(rng,`${situation} What is the most appropriate differentiation?`,correct,
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
    return makeQuestion(rng,`${situation} Which teacher question best promotes mathematical discourse?`,correct,
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
    return makeQuestion(rng,`${desc} is best classified as a`,correct,
      [`formative assessment`,`summative assessment`,`diagnostic assessment`,`performance assessment`].filter(x=>x!==correct),
      `The purpose and timing of the assessment make it a ${correct}.`);
  }

  function qAssessmentAlignment(rng) {
    const correct=`Require students to interpret slope and intercept in a new contextual model.`;
    return makeQuestion(rng,`A lesson objective is “Students will interpret slope and intercept in context.” Which assessment is best aligned?`,correct,
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
    return makeQuestion(rng,`${work} Which diagnosis best identifies the error?`,correct,
      [`The student made only a rounding error.`,`The work is correct.`,`The student used too many representations.`],
      `The diagnosis identifies the specific misconception revealed by the student’s work.`);
  }

  function qAssessmentNextStep(rng) {
    const correct=`Group students by the demonstrated misconception and provide targeted representations and follow-up checks.`;
    return makeQuestion(rng,`An assessment shows that many students can compute slope but cannot interpret negative slope in context. What is the best instructional next step?`,correct,
      [`Move immediately to a new unit because computation scores were high.`,`Average the scores and reteach every topic identically.`,`Assign only more arithmetic practice.`],
      `Assessment data should guide targeted instruction that addresses the specific conceptual weakness and then checks for improvement.`);
  }

  const categories = {};
  function category(id, label, description, pool, group = "") {
    categories[id] = { id, label, description, pool, group, domain: group };
    return id;
  }

  const c001=category("235-c001","Competency 001: Real Number System","Place value, representations, real-number structure, operations, algorithms, closure, modeling, and justification.",
    [qBaseConversion,qFieldProperty,qClosure,qNumberSet,qScientificNotation,qExponentLaw,qEquivalentRepresentations,qCompareNumbers,qFractionAdd,qFractionMultiply,qDecimalOperation],"Domain I — Number Concepts");
  const c002=category("235-c002","Competency 002: Complex Number System","Complex-number structure, conjugates, modulus, representations, operations, roots, and geometric meaning.",
    [qComplexArithmetic,qComplexConjugate,qComplexModulus,qComplexPolar,qQuadraticRoots,qDiscriminant],"Domain I — Number Concepts");
  const c003=category("235-c003","Competency 003: Number Theory and Numerical Modeling","Prime factorization, divisibility, modular arithmetic, Euclidean algorithm, counting, matrices, estimation, ratios, and applications.",
    [qPrimeFactorization,qGcdLcm,qEuclideanAlgorithm,qModularArithmetic,qCounting,qMatrixDeterminant,qEstimation,qPercentChange,qDimensionalAnalysis,qReasonableness],"Domain I — Number Concepts");

  const c004=category("235-c004","Competency 004: Patterns, Sequences, Series, and Finance","Recursive and iterative patterns, induction, arithmetic and geometric sequences and series, and financial applications.",
    [qPatternReasoning,qSequence,qRecursiveSequence,qArithmeticSeries,qGeometricSeries,qInductionStep,qCompoundInterest,qSimpleInterest,qLimitSequence],"Domain II — Patterns and Algebra");
  const c005=category("235-c005","Competency 005: Functions, Relations, and Graphs","Function definitions, representations, domain and range, inverse and one-to-one functions, transformations, parity, operations, and composition.",
    [qRelationFunction,qFunctionEvaluate,qFunctionComposition,qFunctionDomain,qFunctionTransformation,qInverseFunction,qEvenOdd,qGraphSlope,qRateOfChange],"Domain II — Patterns and Algebra");
  const c006=category("235-c006","Competency 006: Linear and Quadratic Functions","Slope, lines, systems, matrices, equations and inequalities, quadratic zeros, forms, graphs, and modeling.",
    [qSlope,qLineEquation,qGraphSlope,qLinearEquation,qLinearInequality,qLinearApplication,qSystemEquations,qMatrixSystem,qFactorQuadratic,qQuadraticRoots,qQuadraticVertex,qDiscriminant],"Domain II — Patterns and Algebra");
  const c007=category("235-c007","Competency 007: Polynomial, Rational, Radical, Absolute-Value, and Piecewise Functions","Representations, domains, zeros, extrema, discontinuities, asymptotes, equations, inequalities, and modeling.",
    [qPolynomialRemainder,qPolynomialEndBehavior,qFactorQuadratic,qDifferenceSquares,qRationalEquation,qRationalAsymptote,qRadicalEquation,qAbsoluteValueEquation,qPiecewise,qFunctionDomain],"Domain II — Patterns and Algebra");
  const c008=category("235-c008","Competency 008: Exponential and Logarithmic Functions","Representations, laws, inverse relationships, equations, growth and decay, logarithmic scales, finance, and proportional-rate models.",
    [qExponentialGrowth,qLogarithm,qLogProperties,qContinuousGrowth,qCompoundInterest,qScientificNotation,qExponentLaw],"Domain II — Patterns and Algebra");
  const c009=category("235-c009","Competency 009: Trigonometric and Circular Functions","Unit-circle relationships, graphs, transformations, inverse functions, identities, equations, and periodic modeling.",
    [qTrigRightTriangle,qTrigExact,qTrigGraph,qTrigIdentity,qInverseTrig,qPythagorean,qAngles],"Domain II — Patterns and Algebra");
  const c010=category("235-c010","Competency 010: Differential and Integral Calculus","Limits, continuity, rates of change, derivatives, graph analysis, integration, the FTC, optimization, and applications.",
    [qLimitSequence,qRateOfChange,qInstantaneousRate,qDerivativeRule,qDefiniteIntegral,qFTC,qAreaUnderConstant,qRiemannSum,qOptimization],"Domain II — Patterns and Algebra");

  const c011=category("235-c011","Competency 011: Measurement","Dimensional analysis, area, surface area, volume, scaling, right-triangle measurement, Riemann sums, and calculus-based measurement.",
    [qDimensionalAnalysis,qUnitConversion,qMeasurementError,qRectangleAreaPerimeter,qTriangleArea,qCircle,qVolumePrism,qCylinderVolume,qScaleEffect,qPythagorean,qTrigRightTriangle,qRiemannSum],"Domain III — Geometry and Measurement");
  const c012=category("235-c012","Competency 012: Axiomatic and Euclidean Geometry","Axioms, undefined terms, theorems, counterexamples, lines, planes, congruence, similarity, constructions, proof, and non-Euclidean geometry.",
    [qAxiomaticSystem,qNonEuclidean,qAngles,qSimilarityScale,qLogicCounterexample,qProofLogic,qDistanceMidpoint,qPythagorean],"Domain III — Geometry and Measurement");
  const c013=category("235-c013","Competency 013: Euclidean Geometry Results and Applications","Polygons, circles, composite figures, similarity, congruence, sectors, cross-sections, nets, views, and spatial problem solving.",
    [qPolygonAngles,qCircle,qCircleTheorem,qRectangleAreaPerimeter,qTriangleArea,qSimilarityScale,qCrossSection,qVolumePrism,qCylinderVolume],"Domain III — Geometry and Measurement");
  const c014=category("235-c014","Competency 014: Coordinate, Transformational, and Vector Geometry","Transformations, symmetry, coordinate proofs, conic sections, matrix transformations, vectors, distance, slope, and midpoint.",
    [qTransformation,qDistanceMidpoint,qSlope,qLineEquation,qConicEquation,qVectorOperation,qMatrixDeterminant,qFunctionTransformation],"Domain III — Geometry and Measurement");

  const c015=category("235-c015","Competency 015: Exploring and Describing Data","Measurement scales, displays, center, spread, shape, outliers, transformations, and one-variable conclusions.",
    [qMeanMedian,qWeightedMean,qRangeIqr,qNormalRule,qCorrelation,qDataTransformation,qSamplingInference],"Domain IV — Probability and Statistics");
  const c016=category("235-c016","Competency 016: Probability and Distributions","Sample spaces, compound events, counting, geometric probability, conditional probability, expected value, and discrete and continuous distributions.",
    [qSimpleProbability,qCompoundProbability,qWithoutReplacement,qCounting,qSetProbability,qConditionalProbability,qExpectedValue,qBinomialProbability,qNormalRule],"Domain IV — Probability and Statistics");
  const c017=category("235-c017","Competency 017: Sampling and Statistical Inference","Study design, sampling, misleading statistics, regression, transformations, confidence intervals, CLT, estimation, and hypothesis testing.",
    [qSamplingInference,qCorrelation,qRegressionInterpretation,qConfidenceInterval,qHypothesisDecision,qCLT,qNormalRule,qDataTransformation],"Domain IV — Probability and Statistics");

  const c018=category("235-c018","Competency 018: Mathematical Reasoning and Problem Solving","Proof, indirect reasoning, conjectures, justification, strategy selection, reasonableness, and model evaluation.",
    [qProofLogic,qLogicCounterexample,qReasonableness,qEstimation,qModelEvaluation,qPatternReasoning,qDimensionalAnalysis],"Domain V — Mathematical Processes and Perspectives");
  const c019=category("235-c019","Competency 019: Connections and Communication","Multiple representations, interdisciplinary models, verbal-symbolic translation, visual communication, and mathematical terminology.",
    [qRepresentationConnection,qProportionalModel,qLinearApplication,qDimensionalAnalysis,qCompoundInterest,qGraphSlope,qConicEquation,qDataTransformation],"Domain V — Mathematical Processes and Perspectives");

  const c020=category("235-c020","Competency 020: Mathematical Learning and Instruction","Learning theory, prior knowledge, differentiation, representations, technology, discourse, TEKS-aligned tasks, and inclusive instruction.",
    [qInstructionConceptual,qInstructionDifferentiation,qQuestioningStrategy,qAssessmentErrorAnalysis],"Domain VI — Mathematical Learning, Instruction and Assessment");
  const c021=category("235-c021","Competency 021: Mathematical Assessment","Formative, summative, diagnostic, and performance assessment; alignment; scoring; error analysis; and data-informed instruction.",
    [qAssessmentType,qAssessmentAlignment,qAssessmentErrorAnalysis,qAssessmentNextStep],"Domain VI — Mathematical Learning, Instruction and Assessment");

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
      note:"The official Mathematics 7–12 (235) exam contains 100 selected-response questions and allows five hours. These forms follow the published domain weights: 14%, 33%, 19%, 14%, 10%, and 10%."
    }
  };

  const examGroups = {};

  function generateCategoryQuestions(categoryId, count, seedText) {
    const cat = categories[categoryId];
    if (!cat) throw new Error(`Unknown category: ${categoryId}`);
    const rng = rngFromSeed(seedText);
    const questions = [];
    let lastIndex = -1;
    for (let i=0;i<count;i++) {
      let idx = Math.floor(rng()*cat.pool.length);
      if (cat.pool.length>1 && idx===lastIndex) idx=(idx+1+ri(rng,0,cat.pool.length-2))%cat.pool.length;
      lastIndex=idx;
      const q=cat.pool[idx](rng);
      q.categoryId=categoryId;
      q.categoryLabel=cat.label;
      q.domain=cat.group;
      q.id=`${categoryId}-${hashString(seedText+":"+i+":"+q.prompt).toString(36)}`;
      questions.push(q);
    }
    return questions;
  }

  function generateFullExam(examId, seedText) {
    const exam=exams[examId];
    if(!exam) throw new Error(`Unknown exam: ${examId}`);
    let questions=[];
    exam.categories.forEach(categoryId=>{
      const count=exam.weights[categoryId];
      questions=questions.concat(generateCategoryQuestions(categoryId,count,`${seedText}:${categoryId}`));
    });
    // Avoid exact duplicate prompts within a full form, especially in scenario-based competencies.
    const seen=new Set();
    questions=questions.map((q,i)=>{
      let candidate=q, attempt=0;
      while(seen.has(candidate.prompt) && attempt<40){
        candidate=generateCategoryQuestions(q.categoryId,1,`${seedText}:dedupe:${q.categoryId}:${i}:${attempt}`)[0];
        attempt++;
      }
      seen.add(candidate.prompt);
      return candidate;
    });
    const rng=rngFromSeed(`${seedText}:shuffle`);
    questions=shuffle(rng,questions);
    questions.forEach((q,i)=>q.order=i+1);
    return questions;
  }

  function generateTopicQuiz(examId, categoryId, seedText) {
    const exam=exams[examId];
    if(!exam || !exam.categories.includes(categoryId)) throw new Error("Topic does not belong to exam");
    return generateCategoryQuestions(categoryId,exam.topicCount,seedText).map((q,i)=>({...q,order:i+1}));
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

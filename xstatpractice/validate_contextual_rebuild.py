import json,re,math,collections
from pathlib import Path
root=Path(__file__).parent
text=(root/'question-bank.js').read_text(encoding='utf-8').strip()
prefix='window.StatisticsPracticeData = '
assert text.startswith(prefix) and text.endswith(';')
D=json.loads(text[len(prefix):-1])
errors=[]
checks={}
# structure
questions=sum(len(v) for v in D['questions'].values())
checks.update(exams=len(D['exams']),skills=len(D['skills']),questions=questions)
for sid,qs in D['questions'].items():
    seen=set()
    for q in qs:
        if len(q['choices'])!=4 or len(set(q['choices']))!=4 or not 0<=q['answer']<4:
            errors.append(f'{q["id"]}: invalid choices or answer index')
        if not q.get('explanation','').strip(): errors.append(f'{q["id"]}: missing explanation')
        if q['prompt'] in seen: errors.append(f'{sid}: exact duplicate prompt in full bank')
        seen.add(q['prompt'])
        sec=int(re.match(r's(\d+)',sid).group(1))
        alltxt=q['prompt']+' '+q['explanation']+' '+' '.join(q['choices'])
        if sec>=3 and 'Mendelian cross' in alltxt: errors.append(f'{q["id"]}: casual Mendelian-cross wording')
        if sec>=5 and re.search(r'X\s*~|X\\sim|~\s*Bin|\\operatorname\{Bin\}',q['prompt'],re.I): errors.append(f'{q["id"]}: abstract distribution shorthand')
        if sec>=8 and re.search(r'complete analysis|which complete',alltxt,re.I): errors.append(f'{q["id"]}: complete-analysis format')
        if sec>=8 and re.search(r'critical value',alltxt,re.I): errors.append(f'{q["id"]}: hypothesis-test critical-value language')
# section 4 arithmetic/table audit
pat=re.compile(r'<tr><td>\\\(([-0-9.]+)\\\)</td><td>\\\(([-0-9.]+)\\\)</td></tr>')
rv_valid=[q for q in D['questions']['s4_rv'] if q.get('diagnosticGroup')=='valid-distribution']
checks['random_variable_validity_tables']=sum('<table' in q['prompt'] for q in rv_valid)
for q in rv_valid:
    if '<table' not in q['prompt']: errors.append(f'{q["id"]}: validity question missing table')
arithmetic_checked=0
for sid in ['s4_mean','s4_sd']:
    for q in D['questions'][sid]:
        rows=[(float(a),float(b)) for a,b in pat.findall(q['prompt'])]
        if not rows or abs(sum(p for _,p in rows)-1)>1e-9:
            errors.append(f'{q["id"]}: invalid displayed probability table'); continue
        mu=sum(x*p for x,p in rows)
        sd=math.sqrt(sum((x-mu)**2*p for x,p in rows))
        expected=mu if sid=='s4_mean' else sd
        m=re.search(r'\\\(([-0-9.]+)\\\)',q['choices'][q['answer']])
        got=float(m.group(1)) if m else None
        if got is None or abs(got-round(expected,4))>5e-5:
            errors.append(f'{q["id"]}: arithmetic mismatch')
        arithmetic_checked+=1
checks['random_variable_mean_sd_independent_recalculations']=arithmetic_checked
checks['five_percent_rule_tables']=sum('<table' in q['prompt'] for q in D['questions']['s4_5rule'])
if checks['five_percent_rule_tables']!=len(D['questions']['s4_5rule']):errors.append('5% Rule questions missing tables')
# required source-style groups
required={
's5_bin_prob':['exact-probability','at-most-probability','at-least-probability','rare-event-interpretation'],
's5_bin_summary':['mean','standard-deviation','minimum-usual','maximum-usual','unusual-guessing'],
's5_pois_prob':['exact-probability','at-most-probability','more-than-probability','rare-event-interpretation'],
's5_pois_summary':['rate-mean','standard-deviation','capacity-percentile','rare-event-summary'],
's6_stdnormal':['mean-and-standard-deviation','left-quantile','right-quantile','middle-quantile','left-area','right-area','between-area'],
's7_prop_interp':['interpretation','majority','overlap','claim-rare-event','margin-of-error'],
's7_mean_interp':['interpretation','claim-rare-event','margin-of-error','overlap'],
's10_reg':['predict-y-from-x','predict-x-from-y']}
checks['required_group_counts']={}
for sid,reqs in required.items():
    groups=collections.Counter(q.get('diagnosticGroup') for q in D['questions'][sid])
    checks['required_group_counts'][sid]=dict(groups)
    for g in reqs:
        if not groups[g]: errors.append(f'{sid}: missing source-style group {g}')
# H0/H1 coverage and calculation separation
checks['hypothesis_setup_groups']={}
for sid in ['s8_prop_setup','s8_mean_setup','s9_prop_setup','s9_mean_setup','s10_match_setup','s10_corr_setup']:
    groups=collections.Counter(q.get('diagnosticGroup') for q in D['questions'][sid])
    checks['hypothesis_setup_groups'][sid]=dict(groups)
    if not groups['state-H0'] or not groups['state-H1']: errors.append(f'{sid}: missing H0 or H1 practice')
calc_sids=['s8_prop_full','s8_mean_full','s9_prop_full','s9_mean_full','s10_match_full','s11_gof_full','s11_cont_full','s12_anova_full']
for sid in calc_sids:
    for q in D['questions'][sid]:
        if 'P-value' not in q['prompt'] and 'P value' not in q['prompt']: errors.append(f'{q["id"]}: calculation bank is not a P-value question')
        if re.search(r'reject|fail to reject|conclusion',q['prompt'],re.I): errors.append(f'{q["id"]}: P-value calculation improperly includes decision/conclusion')
# t-only mean inference
mean_sids=['s7_mean_ci_summary','s7_mean_ci_data','s7_mean_interp','s8_mean_setup','s8_mean_full','s9_mean_setup','s9_mean_full','s10_match_setup','s10_match_full']
for sid in mean_sids:
    for q in D['questions'][sid]:
        if re.search(r'\bz[- ]?(?:test|interval|distribution|statistic)|standard normal',q['prompt']+' '+q['explanation'],re.I):
            errors.append(f'{q["id"]}: z procedure used for mean inference')
checks['choosing_test_procedures']=dict(collections.Counter(q.get('diagnosticGroup') for q in D['questions']['s12_choose']))
if len(checks['choosing_test_procedures'])!=9: errors.append('choosing-test bank does not represent all nine procedures')
checks['errors']=len(errors)
checks['error_messages']=errors
(root/'CONTEXTUAL_REBUILD_VALIDATION.json').write_text(json.dumps(checks,indent=2),encoding='utf-8')
print(f'contextual rebuild validation errors={len(errors)}')
if errors:
    print('\n'.join(errors[:50])); raise SystemExit(1)

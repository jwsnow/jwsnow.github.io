# Texas Educator Certification Diagnostic & Practice Portal

Open `index.html` after uploading the complete folder to a static web host.

## Practice centers

1. Mathematics
   - Core Subjects EC–6 Mathematics 902
   - Core Subjects 4–8 Mathematics 807
   - Mathematics 4–8 (115)
   - ACCUPLACER Arithmetic, QAS, and AAF

2. Science
   - Core Subjects EC–6 Science 904
   - Core Subjects 4–8 Science 809
   - Science 4–8 (116)

3. Social Studies
   - Core Subjects EC–6 Social Studies 903
   - Core Subjects 4–8 Social Studies 808
   - Social Studies 4–8 (118)

4. English Language Arts and Reading
   - Core Subjects EC–6 ELAR 901
   - Core Subjects 4–8 ELAR 806
   - ELAR 4–8 (217)
   - Science of Teaching Reading (293)

5. Fine Arts, Health and Physical Education
   - Core Subjects EC–6 Subject Exam 905
   - Separate practice for visual arts, music, theatre, health, and physical education

6. Combined Grades 4–8 exams
   - ELAR/Social Studies 4–8 (113)
   - Mathematics/Science 4–8 (114)

## New centers in this revision

### Subject Exam 905

- Four fixed 40-question forms and a random form
- 35-minute timer
- 120 original base questions
- Three fixed targeted quizzes plus random practice for each of the five competencies
- Answer explanations and weakness reports

### Combined exam 113

- Four fixed 120-question forms and a random form
- 4-hour-45-minute testing timer
- Published domain balance: 17% Language Arts Part I, 33% Language Arts Part II, 36% Social Studies Content, and 14% Social Studies Foundations/Skills/Instruction
- Twenty detailed reporting and practice areas

### Combined exam 114

- Four fixed 120-question forms and a random form
- 4-hour-45-minute testing timer
- Eleven published domains represented
- Mathematics and science content plus the official learning, instruction, and assessment domains
- Eleven targeted reporting and practice areas

## Technical behavior

- All processing occurs in the browser.
- Completed results are stored in browser `localStorage` by practice center.
- No names, answers, or scores are sent to a server.
- Progress remains tied to the same browser, device, and hosted domain.
- Unfinished quiz answers are not automatically saved.

## Validation

The final automated checks covered 10,684 fixed-form/fixed-topic question instances and 2,622 additional randomly generated question instances across 19 exam configurations with zero structural errors. Fixed full forms, fixed topic versions, and their cross-overlap were also checked for exact prompt duplication within each exam configuration. Local links, JavaScript syntax, and MathJax delimiter balance were checked.

This revision also adds substantial chart/table/graph/diagram practice and MathJax typesetting to the mathematics portions. See `REVISION_NOTES.md` for details.

## Alignment and limitations

The practice materials are independently written and aligned to publicly available exam frameworks. They have not been field-tested or psychometrically calibrated. Raw percentages are diagnostic and do not reproduce official scaled scores.

Official frameworks used for the new centers:

- Core Subjects EC–6 (391), including Subject Exam 905: `https://www.tx.nesinc.com/Content/StudyGuide/TX_SG_obj_391.htm`
- ELAR/Social Studies 4–8 (113): `https://www.tx.nesinc.com/Content/StudyGuide/TX_SG_obj_113_2021.htm`
- Mathematics/Science 4–8 (114): `https://www.tx.nesinc.com/Content/StudyGuide/TX_SG_obj_114.htm`


## Local MathJax

MathJax 3.2.2 is bundled locally in `vendor/mathjax/`. The mathematics and combined 4–8 centers load `vendor/mathjax/es5/tex-chtml.js` rather than an external CDN, so mathematical notation remains available on restricted or offline networks. MathJax is distributed under the Apache License 2.0; its license is included at `vendor/mathjax/LICENSE`.

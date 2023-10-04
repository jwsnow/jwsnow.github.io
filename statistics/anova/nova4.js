questionID[currentProblem]='nova4';
question[currentProblem]='Listed below are head injury measurements of crash test dummies:<br> \
<table border=1> \
<tr><td>Small Cars</td>	<td>290, 406, 371, 544, 374, 501, 376, 499, 479, 475</td></tr> \
<tr><td>Medium Cars</td>	<td>245, 502, 474, 505, 393, 264, 368, 510, 296, 349</td></tr> \
<tr><td>Large Cars</td>	<td>342, 216, 335, 698, 216, 169, 608, 432, 510, 332</td></tr></table> \
Test the claim that the different categories have the same mean.<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.68';
hint[currentProblem]='Enter the categories into different lists.  Use the anova test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L25-anova.pdf';
currentProblem++;

questionID[currentProblem]='nova4b';
question[currentProblem]='What is your conclusion?';
type[currentProblem]='MC';
answer[currentProblem]='B';
hint[currentProblem]='Use the anova test on the calculator.  HO is that the different categories all have the same mean.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L25-anova.pdf';
options[currentProblem]=[];
options[currentProblem]['A']='A) There is enough sample evidence to reject the claim.';
options[currentProblem]['B']='B) There is not enough sample evidence to reject the claim.';
options[currentProblem]['C']='C) The sample evidence supports the claim.';
options[currentProblem]['D']='D) The sample evidence does not support the claim.';
currentProblem++;

questionID[currentProblem]='nova4c';
question[currentProblem]='Does this data suggest that larger cars are safer than smaller cars?';
type[currentProblem]='MC';
answer[currentProblem]='N';
hint[currentProblem]='Use the anova test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L25-anova.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


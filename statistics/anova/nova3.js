questionID[currentProblem]='nova3';
question[currentProblem]='Listed below are measure loads (in pounds) on the left femur of crash test dummies:<br> \
<table border=1> \
<tr><td>Small Cars</td>	<td>548, 782, 1188, 707, 324, 320, 634, 501, 274, 437</td></tr> \
<tr><td>Medium Cars</td>	<td>194, 280, 1076, 411, 617, 133, 719, 656, 874, 445</td></tr> \
<tr><td>Large Cars</td>	<td>215, 937, 953, 1636, 937, 472, 882, 562, 656, 433</td></tr></table> \
Test the claim that the different categories have the same mean.<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.26';
hint[currentProblem]='Enter the categories into different lists.  Use the anova test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L25-anova.pdf';
currentProblem++;

questionID[currentProblem]='nova3b';
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

questionID[currentProblem]='nova3c';
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


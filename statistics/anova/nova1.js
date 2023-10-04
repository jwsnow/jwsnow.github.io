questionID[currentProblem]='nova1';
question[currentProblem]='Below are skull breadths obtained from skulls of Egyptian males from three different epochs:<br> \
<table border=1> \
<tr><td>400 BC</td>	<td>131, 138, 125, 129, 132, 135, 132, 134, 138</td></tr> \
<tr><td>1850 BC</td>	<td>129, 134, 136, 137, 137, 129, 136, 138, 134</td></tr> \
<tr><td>150 AD</td>	<td>128, 138, 136, 139, 141, 142, 137, 145, 137</td></tr></table> \
Test the claim that the mean skull breadths from the different epochs are all the same.<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.03';
hint[currentProblem]='Enter the categories into different lists.  Use the anova test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L25-anova.pdf';
currentProblem++;

questionID[currentProblem]='nova1b';
question[currentProblem]='What is your conclusion?';
type[currentProblem]='MC';
answer[currentProblem]='A';
hint[currentProblem]='Use the anova test on the calculator.  HO is that the different categories all have the same mean.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L25-anova.pdf';
options[currentProblem]=[];
options[currentProblem]['A']='A) There is enough sample evidence to reject the claim.';
options[currentProblem]['B']='B) There is not enough sample evidence to reject the claim.';
options[currentProblem]['C']='C) The sample evidence supports the claim.';
options[currentProblem]['D']='D) The sample evidence does not support the claim.';
currentProblem++;

questionID[currentProblem]='nova1c';
question[currentProblem]='Do the different epochs all have the same mean skull breadth?';
type[currentProblem]='MC';
answer[currentProblem]='N';
hint[currentProblem]='Use the anova test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L25-anova.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


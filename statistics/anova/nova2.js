questionID[currentProblem]='nova2';
question[currentProblem]='Listed below are measured amounts of greenhouse gas emissions from cars in three different categories.:<br> \
<table border=1> \
<tr><td>Four Cylinder</td>	<td>7.2, 7.9, 6.8, 7.4, 6.5, 6.6, 6.7, 6.5, 6.5, 7.1, 6.7, 5.5, 7.3</td></tr> \
<tr><td>Six Cylinder</td>	<td>8.7, 7.7, 7.7, 8.7, 8.2, 9.0, 9.3, 7.4, 7.0, 7.2, 7.2, 8.2</td></tr> \
<tr><td>Eight Cylinder</td>	<td>9.3, 9.3, 9.3, 8.6, 8.7, 9.3, 9.3</td></tr></table> \
Test the claim that the different types of cars all have the same mean amount of greenhouse gas emissions.<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.00';
hint[currentProblem]='Enter the categories into different lists.  Use the anova test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L25-anova.pdf';
currentProblem++;

questionID[currentProblem]='nova2b';
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

questionID[currentProblem]='nova2c';
question[currentProblem]='Do the different types of cars have the same greenhouse gas emissions?';
type[currentProblem]='MC';
answer[currentProblem]='N';
hint[currentProblem]='Use the anova test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L25-anova.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


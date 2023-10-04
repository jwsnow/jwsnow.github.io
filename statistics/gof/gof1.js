questionID[currentProblem]='gof1';
question[currentProblem]='A modern legend is the tale of four students who missed a test and gave as an excuse a flat tire.  The professor agreed to a make-up test.  This test had one question, "Which tire?"<br>\
Forty students were asked which tire they would pick on such a test with these results:<br> \
<table border=1> <tr> <td>Tire:</td><td>Left Front</td><td>Right Front</td><td>Left Rear</td><td>Right Rear</td></tr> \
<tr><td>Number Selected:</td><td>11,</td><td>15,</td><td>8,</td><td>6</td></tr> </table> \
Test the claim that students will pick each of the four tires with equal frequency.<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.20';
hint[currentProblem]='Enter observed frequencies in List 0.  Enter expected frequencies in List 1.  Use the chi2GOF test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L23-gof.pdf';
currentProblem++;

questionID[currentProblem]='gof1b';
question[currentProblem]='What is your conclusion?';
type[currentProblem]='MC';
answer[currentProblem]='B';
hint[currentProblem]='Use the chi2GOF test on the calculator.  HO is that the observations match the expectations.  H1 is that they do not.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L23-gof.pdf';
options[currentProblem]=[];
options[currentProblem]['A']='A) There is enough sample evidence to reject the claim.';
options[currentProblem]['B']='B) There is not enough sample evidence to reject the claim.';
options[currentProblem]['C']='C) The sample evidence supports the claim.';
options[currentProblem]['D']='D) The sample evidence does not support the claim.';
currentProblem++;

questionID[currentProblem]='gof1c';
question[currentProblem]='Do the four tires seem equally likely?.';
type[currentProblem]='MC';
answer[currentProblem]='Y';
hint[currentProblem]='Use the chi2GOF test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L23-gof.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


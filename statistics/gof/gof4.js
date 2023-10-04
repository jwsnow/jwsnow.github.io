questionID[currentProblem]='gof4';
question[currentProblem]='Below are counts of M&Ms from a bag of candy by color:<br> \
<table border=1> <tr> <td>Color:</td><td>Blue</td><td>Orange</td><td>Greey</td><td>Yellow</td><td>Red</td><td>Brown</td></tr> \
<tr><td>Count:</td><td>20,</td><td>16,</td><td>9,</td><td>12,</td><td>18,</td><td>32</td></tr> </table> \
Test the claim that these counts do not match the claimed frequencies below:<br>\
<table border=1> <tr> <td>Color:</td><td>Blue</td><td>Orange</td><td>Greey</td><td>Yellow</td><td>Red</td><td>Brown</td></tr> \
<tr><td>Frequency:</td><td>24%,</td><td>20%,</td><td>16%,</td><td>14%,</td><td>13%,</td><td>13%,</td></tr> </table> \
<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.00';
hint[currentProblem]='Enter observed frequencies in List 0.  Enter expected frequencies in List 1.  Use the chi2GOF test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L23-gof.pdf';
currentProblem++;

questionID[currentProblem]='gof4b';
question[currentProblem]='What is your conclusion?';
type[currentProblem]='MC';
answer[currentProblem]='C';
hint[currentProblem]='Use the chi2GOF test on the calculator.  HO is that the observations match the expectations.  H1 is that they do not.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L23-gof.pdf';
options[currentProblem]=[];
options[currentProblem]['A']='A) There is enough sample evidence to reject the claim.';
options[currentProblem]['B']='B) There is not enough sample evidence to reject the claim.';
options[currentProblem]['C']='C) The sample evidence supports the claim.';
options[currentProblem]['D']='D) The sample evidence does not support the claim.';
currentProblem++;

questionID[currentProblem]='gof4c';
question[currentProblem]='Do these counts match the claimed distribution?';
type[currentProblem]='MC';
answer[currentProblem]='N';
hint[currentProblem]='Use the chi2GOF test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L23-gof.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


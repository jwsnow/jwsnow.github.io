questionID[currentProblem]='gof2';
question[currentProblem]='Below are listed counts of nonfatal occupational injuries by days of the week:<br> \
<table border=1> <tr> <td>Day:</td><td>Monday</td><td>Tuesday</td><td>Wednesday</td><td>Thursday</td><td>Friday</td></tr> \
<tr><td>Injuries:</td><td>27,</td><td>19,</td><td>11,</td><td>10,</td><td>23</td></tr> </table> \
Test the claim that injuries occur on each day of the week with equal frequency.<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.02';
hint[currentProblem]='Enter observed frequencies in List 0.  Enter expected frequencies in List 1.  Use the chi2GOF test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L23-gof.pdf';
currentProblem++;

questionID[currentProblem]='gof2b';
question[currentProblem]='What is your conclusion?';
type[currentProblem]='MC';
answer[currentProblem]='A';
hint[currentProblem]='Use the chi2GOF test on the calculator.  HO is that the observations match the expectations.  H1 is that they do not.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L23-gof.pdf';
options[currentProblem]=[];
options[currentProblem]['A']='A) There is enough sample evidence to reject the claim.';
options[currentProblem]['B']='B) There is not enough sample evidence to reject the claim.';
options[currentProblem]['C']='C) The sample evidence supports the claim.';
options[currentProblem]['D']='D) The sample evidence does not support the claim.';
currentProblem++;

questionID[currentProblem]='gof2c';
question[currentProblem]='Do injuries occur on each day of the week with equal frequency?';
type[currentProblem]='MC';
answer[currentProblem]='N';
hint[currentProblem]='Use the chi2GOF test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L23-gof.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


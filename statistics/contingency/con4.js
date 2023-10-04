questionID[currentProblem]='con4';
question[currentProblem]='The table below shows results of home games for the Houston Astros:<br> \
<table border=1> \
<tr><td></td><td>Win</td><td>Loss</td></tr> \
<tr><td>Closed Roof:</td><td>36,</td><td>17 </td></tr> \
<tr><td>Open Roof:</td><td>15,</td><td>11</td></tr></table> \
Test the claim that whether or not the Astros win is dependent on whether or not the roof is open.<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.37';
hint[currentProblem]='Enter the table as shown in the lists.  Use the contingency test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
currentProblem++;

questionID[currentProblem]='con4b';
question[currentProblem]='What is your conclusion?';
type[currentProblem]='MC';
answer[currentProblem]='D';
hint[currentProblem]='Use the contingency test on the calculator.  HO is that the rows and columns are independent.  H1 is that they are dependent.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
options[currentProblem]=[];
options[currentProblem]['A']='A) There is enough sample evidence to reject the claim.';
options[currentProblem]['B']='B) There is not enough sample evidence to reject the claim.';
options[currentProblem]['C']='C) The sample evidence supports the claim.';
options[currentProblem]['D']='D) The sample evidence does not support the claim.';
currentProblem++;

questionID[currentProblem]='con4c';
question[currentProblem]='Do the Astros seem to win more with the roof open?';
type[currentProblem]='MC';
answer[currentProblem]='N';
hint[currentProblem]='Use the contingency test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


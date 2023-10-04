questionID[currentProblem]='con3';
question[currentProblem]='The table below lists data obtained from randomly selected crime victims:<br> \
<table border=1> \
<tr><td></td><td>Homicide</td><td>Robbery</td><td>Assault</td></tr> \
<tr><td>Criminal did not know victim:</td><td>12,</td><td>379, </td><td>727</td></tr> \
<tr><td>Criminal knew victim:</td><td>39,</td><td>106,</td><td>642</td></tr></table> \
Test the claim that whether or not the criminal knew the victim is independent of the type crime.<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.00';
hint[currentProblem]='Enter the table as shown in the lists.  Use the contingency test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
currentProblem++;

questionID[currentProblem]='con3b';
question[currentProblem]='What is your conclusion?';
type[currentProblem]='MC';
answer[currentProblem]='A';
hint[currentProblem]='Use the contingency test on the calculator.  HO is that the rows and columns are independent.  H1 is that they are dependent.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
options[currentProblem]=[];
options[currentProblem]['A']='A) There is enough sample evidence to reject the claim.';
options[currentProblem]['B']='B) There is not enough sample evidence to reject the claim.';
options[currentProblem]['C']='C) The sample evidence supports the claim.';
options[currentProblem]['D']='D) The sample evidence does not support the claim.';
currentProblem++;

questionID[currentProblem]='con3c';
question[currentProblem]='Does the type of crime seem to be related to whether or not the criminal knows the victim?';
type[currentProblem]='MC';
answer[currentProblem]='Y';
hint[currentProblem]='Use the contingency test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


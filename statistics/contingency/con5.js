questionID[currentProblem]='con5';
question[currentProblem]='A study of injuries sustained by motorcycle riders and the colors of their helmets gave the following data:<br> \
<table border=1> \
<tr><td>Helmet Color:</td><td>Black</td><td>White</td><td>Orange</td><td>Red</td><td>Blue</td></tr> \
<tr><td>Not Injured:</td><td>491,</td><td>377,</td><td>31,</td><td>170,</td><td>55</td></tr> \
<tr><td>Injured:</td><td>213,</td><td>112,</td><td>8,</td><td>70,</td><td>26</td></table> \
Test the claim injuries are independent of helmet color.<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.04';
hint[currentProblem]='Enter the table as shown in the lists.  Use the contingency test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
currentProblem++;

questionID[currentProblem]='con5b';
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

questionID[currentProblem]='con5c';
question[currentProblem]='Do injuries seem to depend on helmet color?';
type[currentProblem]='MC';
answer[currentProblem]='Y';
hint[currentProblem]='Use the contingency test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


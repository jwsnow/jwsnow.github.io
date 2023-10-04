questionID[currentProblem]='con1';
question[currentProblem]='Below are the results of a test of the Salk Polio vaccine:<br> \
<table border=1> \
<tr><td></td><td>Contracted Polio</td><td>Did not Contract Polio</td></tr> \
<tr><td>Vaccinated:</td><td>33,</td><td>200712</td></tr> \
<tr><td>Not Vaccinated:</td><td>115,</td><td>201224</td></tr></table> \
Test the claim that whether or not a child contracts Polio is dependent on whether or not the child has received the vaccine.<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.00';
hint[currentProblem]='Enter the table as shown in the lists.  Use the contingency test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
currentProblem++;

questionID[currentProblem]='con1b';
question[currentProblem]='What is your conclusion?';
type[currentProblem]='MC';
answer[currentProblem]='C';
hint[currentProblem]='Use the contingency test on the calculator.  HO is that the rows and columns are independent.  H1 is that they are dependent.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
options[currentProblem]=[];
options[currentProblem]['A']='A) There is enough sample evidence to reject the claim.';
options[currentProblem]['B']='B) There is not enough sample evidence to reject the claim.';
options[currentProblem]['C']='C) The sample evidence supports the claim.';
options[currentProblem]['D']='D) The sample evidence does not support the claim.';
currentProblem++;

questionID[currentProblem]='con1c';
question[currentProblem]='Is the vaccine effective?';
type[currentProblem]='MC';
answer[currentProblem]='Y';
hint[currentProblem]='Use the contingency test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


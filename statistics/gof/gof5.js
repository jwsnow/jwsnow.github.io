questionID[currentProblem]='gof5';
question[currentProblem]='In analyzing hits by V1 buzz bombs in London during WWII, South London was divided into regions with area 0.25 square km.  Show below is a table of actual frequencies of hits and the frequencies expected from a Poisson Distribution.<br> \
<table border=1> \
<tr><td>Number Hits:</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4 or more</td></tr> \
<tr><td>Actual:</td><td>229,</td><td>211,</td><td>93,</td><td>35,</td><td>8</td></tr>  \
<tr><td>Expected:</td><td>227.5,</td><td>211.4,</td><td>97.9,</td><td>30.5,</td><td>8.7</td></tr> </table> \
Test the claim that the actual frequencies fit a Poisson Distribution. \
<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.91';
hint[currentProblem]='Enter observed frequencies in List 0.  Enter expected frequencies in List 1.  Use the chi2GOF test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L23-gof.pdf';
currentProblem++;

questionID[currentProblem]='gof5b';
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

questionID[currentProblem]='gof5c';
question[currentProblem]='Do the actual frequencies fit a Poisson Distribution?';
type[currentProblem]='MC';
answer[currentProblem]='Y';
hint[currentProblem]='Use the chi2GOF test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L23-gof.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


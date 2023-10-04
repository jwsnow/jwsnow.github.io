questionID[currentProblem]='gof6';
question[currentProblem]='In a genetics experiment with fruit flies, numbers of flies were counted in each of these categories: red-eye/normal-wing (RN), sepia-eye/normal-wing (SN), red-eye/vestigial-wing (RV), sepia-eye/vestigial-wing (sV).  The table summarizes the actual accounts along with the expect frequencies based on a theoretical model.\
<table border=1> \
<tr><td></td><td>RN</td><td>SN</td><td>RV</td><td>SV</td></tr> \
<tr><td>Actual:</td><td>59,</td><td>15,</td><td>2,</td><td>4</td></tr>  \
<tr><td>Expected Frequency:</td><td>9/16,</td><td>3/16,</td><td>3/16,</td><td>1/16</td></tr> </table> \
Test the claim that the actual frequencies fit the model. \
<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.00';
hint[currentProblem]='Enter observed frequencies in List 0.  Enter expected frequencies in List 1.  Use the chi2GOF test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L23-gof.pdf';
currentProblem++;

questionID[currentProblem]='gof6b';
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

questionID[currentProblem]='gof6c';
question[currentProblem]='Does the model seem accurate?';
type[currentProblem]='MC';
answer[currentProblem]='N';
hint[currentProblem]='Use the chi2GOF test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L23-gof.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


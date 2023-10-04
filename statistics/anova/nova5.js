questionID[currentProblem]='nova5';
question[currentProblem]='Listed below are chest deceleration measurements of crash test dummies:<br> \
<table border=1> \
<tr><td>Small Cars</td>	<td>44, 43, 44, 54, 38, 43, 42, 45, 44, 50</td></tr> \
<tr><td>Medium Cars</td>	<td>41, 49, 43, 41, 47, 42, 37, 43, 44, 34</td></tr> \
<tr><td>Large Cars</td>	<td>32, 37, 38, 45, 37, 33, 38, 45, 43, 42</td></tr></table> \
Test the claim that the different categories have the same mean.<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.03';
hint[currentProblem]='Enter the categories into different lists.  Use the anova test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L25-anova.pdf';
currentProblem++;

questionID[currentProblem]='nova5b';
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

questionID[currentProblem]='nova5c';
question[currentProblem]='Does this data suggest that larger cars are safer than smaller cars (smaller deceleration numbers are better as they indicate less trauma to dummies)?';
type[currentProblem]='MC';
answer[currentProblem]='Y';
hint[currentProblem]='Use the anova test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L25-anova.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


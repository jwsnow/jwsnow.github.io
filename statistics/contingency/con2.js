questionID[currentProblem]='con2';
question[currentProblem]='Winning and losing team data were collected for teams in different sports.  The results are summarized in this table:<br> \
<table border=1> \
<tr><td></td><td>Basketball</td><td>Baseball</td><td>Hockey</td><td>Football</td></tr> \
<tr><td>Home Team Wins:</td><td>127,</td><td>53, </td><td>50, </td><td>57</td></tr> \
<tr><td>Visiting Team Wins:</td><td>71,</td><td>47,</td><td>43,</td><td>42</td></tr></table> \
Test the claim that whether or not the home or visitor team wins is independent of sport.<p>  What is the P-Value? (Round to two decimal places.)';
type[currentProblem]='N';
answer[currentProblem]='0.19';
hint[currentProblem]='Enter the table as shown in the lists.  Use the contingency test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
currentProblem++;

questionID[currentProblem]='con2b';
question[currentProblem]='What is your conclusion?';
type[currentProblem]='MC';
answer[currentProblem]='B';
hint[currentProblem]='Use the contingency test on the calculator.  HO is that the rows and columns are independent.  H1 is that they are dependent.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
options[currentProblem]=[];
options[currentProblem]['A']='A) There is enough sample evidence to reject the claim.';
options[currentProblem]['B']='B) There is not enough sample evidence to reject the claim.';
options[currentProblem]['C']='C) The sample evidence supports the claim.';
options[currentProblem]['D']='D) The sample evidence does not support the claim.';
currentProblem++;

questionID[currentProblem]='con2c';
question[currentProblem]='Does home field advantage depend on the sport?';
type[currentProblem]='MC';
answer[currentProblem]='N';
hint[currentProblem]='Use the contingency test on the calculator.';
epsilon[currentProblem]=0.011;
notes[currentProblem]='notes/L24-contingency.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;


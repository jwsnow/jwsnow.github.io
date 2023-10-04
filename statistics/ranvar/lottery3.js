questionID[currentProblem]='lottery3';
question[currentProblem]='A certain lottery game costs $1 to play.  Players in the game select one digit from 0,1,2,3,4,5,6,7,8,9.  There is one winning digit. \
 \
If a player wins, he gets $2.<p> \
 \
What is the probability that a player wins this game? (Enter an exact decimal or a fraction.)';
type[currentProblem]='N';
answer[currentProblem]='1/10';
hint[currentProblem]='Divide the number of ways to win by the number of options.';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L08-randomvariables.pdf';
currentProblem++;

questionID[currentProblem]='lottery3b';
question[currentProblem]='What is a player\'s profit if he wins? (Enter an exact answer with no $.)';
type[currentProblem]='N';
answer[currentProblem]='1';
hint[currentProblem]='Profit=winnings-cost';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L08-randomvariables.pdf';
currentProblem++;

questionID[currentProblem]='lottery3c';
question[currentProblem]='What is the probability that a player loses this game? (Enter an exact decimal or a fraction.)';
type[currentProblem]='N';
answer[currentProblem]='9/10';
hint[currentProblem]='Divide the number of ways to lose by the number of options.';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L08-randomvariables.pdf';
currentProblem++;

questionID[currentProblem]='lottery3d';
question[currentProblem]='What is a player\'s profit if he loses? (Enter an exact answer with no $.)';
type[currentProblem]='N';
answer[currentProblem]='-1';
hint[currentProblem]='Profit=winnings-cost';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L08-randomvariables.pdf';
currentProblem++;

questionID[currentProblem]='lottery3e';
question[currentProblem]='What is the expected profit for someone who plays this game? (Round to three decimal places as necessary.  Do not include a $.)';
type[currentProblem]='N';
answer[currentProblem]='-0.8';
hint[currentProblem]='Expected profit = (winning profit)xP(win)+(losing profit)xP(lose)';
epsilon[currentProblem]=.0011;
notes[currentProblem]='notes/L08-randomvariables.pdf';
currentProblem++;

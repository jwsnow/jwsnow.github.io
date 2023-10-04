questionID[currentProblem]='five1';
question[currentProblem]='Bob claims that a coin he has is fair.  He flips the coin 100 times.  It lands on H 56 times.<p> \
Would it be unusual for a fair coin to land on H 56 or more times?';
type[currentProblem]='MC';
answer[currentProblem]='N';
hint[currentProblem]='Consider an event unusual if the probability of that event is less than or equal to 5%.';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L09-binomial.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;

questionID[currentProblem]='five1b';
question[currentProblem]='What does this say about the claim? ';
type[currentProblem]='MC';
answer[currentProblem]='B';
hint[currentProblem]='If the event is unusual, then it contradicts the assumption used to calculate the probability.';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L09-binomial.pdf';
options[currentProblem]=[];
options[currentProblem]['A']='A) The results contradict the claim, so the claim is probably false.';
options[currentProblem]['B']='B) The results are consistent with the claim, so the claim could be true.';
currentProblem++;

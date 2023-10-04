questionID[currentProblem]='five3';
question[currentProblem]='Bob claims that three quarters of a certain type of bird are blue.  In a random sample of 100 of such birds, he found 67 to be blue.<p> \
If the claim is correct, would it be unusual to find 67 or fewer blue birds in a sample of 100?';
type[currentProblem]='MC';
answer[currentProblem]='Y';
hint[currentProblem]='Consider an event unusual if the probability of that event is less than or equal to 5%.';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L09-binomial.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;

questionID[currentProblem]='five3b';
question[currentProblem]='What does this say about the claim?';
type[currentProblem]='MC';
answer[currentProblem]='A';
hint[currentProblem]='If the event is unusual, then it contradicts the assumption used to calculate the probability.';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L09-binomial.pdf';
options[currentProblem]=[];
options[currentProblem]['A']='A) The results contradict the claim, so the claim is probably false.';
options[currentProblem]['B']='B) The results are consistent with the claim, so the claim could be true.';
currentProblem++;

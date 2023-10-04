questionID[currentProblem]='five2';
question[currentProblem]='Bob claims that half of the residents of a certain town have brown eyes.  He selects a random sample of 100 residents.  Of these residents, 35 have brown eyes.<p> \
If half of the residents of the town have brown eyes, would it be unusual to find a random sample of 100 in which 35 or fewer have brown eyes?';
type[currentProblem]='MC';
answer[currentProblem]='Y';
hint[currentProblem]='Consider an event unusual if the probability of that event is less than or equal to 5%.';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L09-binomial.pdf';
options[currentProblem]=[];
options[currentProblem]['Y']='Yes';
options[currentProblem]['N']='No';
currentProblem++;

questionID[currentProblem]='five2b';
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

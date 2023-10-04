questionID[currentProblem]='rrt1';
question[currentProblem]='Forty percent of the population of the US has brown eyes. <p> \
 \
What is the expected number of people with brown eyes in a random sample of 50?  \
<br>(Round to two decimal places as needed.)';
type[currentProblem]='N';
answer[currentProblem]='20';
hint[currentProblem]='The expected value of a binomial distribution is np.';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L09-binomial.pdf';
currentProblem++;

questionID[currentProblem]='rrt1b';
question[currentProblem]='What is the standard deviation of the number of people with brown eyes in a random sample of 50?  \
<br>(Round to two decimal places as needed.)';
type[currentProblem]='N';
answer[currentProblem]='3.46';
hint[currentProblem]='The standard deviation of a binomial distribution is sqrt(np(1-p)).';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L09-binomial.pdf';
currentProblem++;

questionID[currentProblem]='rrt1c';
question[currentProblem]='What is the minimum usual number of people with brown eyes in a random sample of 50?  \
<br>(Use the results of the previous questions. Round to two decimal places as needed.)';
type[currentProblem]='N';
answer[currentProblem]='13.08';
hint[currentProblem]='The minimum usual value is the mean minus two standard deviations.';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L09-binomial.pdf';
currentProblem++;

questionID[currentProblem]='rrt1d';
question[currentProblem]='What is the maximum usual number of people with brown eyes in a random sample of 50?  \
<br>(Use the results of the previous questions. Round to two decimal places as needed.)';
type[currentProblem]='N';
answer[currentProblem]='26.92';
hint[currentProblem]='The maximum usual value is the mean plus two standard deviations.';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L09-binomial.pdf';
currentProblem++;

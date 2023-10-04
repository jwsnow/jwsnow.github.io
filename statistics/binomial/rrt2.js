questionID[currentProblem]='rrt2';
question[currentProblem]='Ten percent of the population of the US is left handed. <p> \
 \
What is the expected number of left handed people in a random sample of 50?  \
<br>(Round to two decimal places as needed.)';
type[currentProblem]='N';
answer[currentProblem]='5';
hint[currentProblem]='The expected value of a binomial distribution is np.';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L09-binomial.pdf';
currentProblem++;

questionID[currentProblem]='rrt2b';
question[currentProblem]='What is the standard deviation of the number of left handed people in a random sample of 50?  \
<br>(Round to two decimal places as needed.)';
type[currentProblem]='N';
answer[currentProblem]='2.12';
hint[currentProblem]='The standard deviation of a binomial distribution is sqrt(np(1-p)).';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L09-binomial.pdf';
currentProblem++;

questionID[currentProblem]='rrt2c';
question[currentProblem]='What is the minimum usual number of left handed people in a random sample of 50?  \
<br>(Use the results of the previous questions. Round to two decimal places as needed.)';
type[currentProblem]='N';
answer[currentProblem]='0.76';
hint[currentProblem]='The minimum usual value is the mean minus two standard deviations.';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L09-binomial.pdf';
currentProblem++;

questionID[currentProblem]='rrt2d';
question[currentProblem]='What is the maximum usual number of left handed people in a random sample of 50?  \
<br>(Use the results of the previous questions. Round to two decimal places as needed.)';
type[currentProblem]='N';
answer[currentProblem]='9.24';
hint[currentProblem]='The maximum usual value is the mean plus two standard deviations.';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L09-binomial.pdf';
currentProblem++;

questionID[currentProblem]='rrt3';
question[currentProblem]='A multiple choice test has 100 questions.  Each question has four options, with one being correct.  <p>\
What is the expected number of correct questions if a person guesses on all 100?\
<br>(Round to two decimal places as needed.)';
type[currentProblem]='N';
answer[currentProblem]='25';
hint[currentProblem]='The expected value of a binomial distribution is np.';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L09-binomial.pdf';
currentProblem++;

questionID[currentProblem]='rrt3b';
question[currentProblem]='What is the standard deviation of the number of correct questions if a person guesses on all 100?  \
<br>(Round to two decimal places as needed.)';
type[currentProblem]='N';
answer[currentProblem]='4.33';
hint[currentProblem]='The standard deviation of a binomial distribution is sqrt(np(1-p)).';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L09-binomial.pdf';
currentProblem++;

questionID[currentProblem]='rrt3c';
question[currentProblem]='What is the minimum usual number of correct questions if a person guesses on all 100?  \
<br>(Use the results of the previous questions. Round to two decimal places as needed.)';
type[currentProblem]='N';
answer[currentProblem]='16.34';
hint[currentProblem]='The minimum usual value is the mean minus two standard deviations.';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L09-binomial.pdf';
currentProblem++;

questionID[currentProblem]='rrt3d';
question[currentProblem]='What is the maximum usual number of correct questions if a person guesses on all 100?  \
<br>(Use the results of the previous questions. Round to two decimal places as needed.)';
type[currentProblem]='N';
answer[currentProblem]='33.66';
hint[currentProblem]='The maximum usual value is the mean plus two standard deviations.';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L09-binomial.pdf';
currentProblem++;

questionID[currentProblem]='insurance2';
question[currentProblem]='An insurance company is running a sale on $100,000 life insurance policies for  25 year old males in a certain city.  They are selling the policies for $50 for one year.<p> \
 \
The probability that such an individual lives through the year is 0.99975 according to mortality data from the US CDC.<p> \
 \
If Hank buys such a policy, what is Hank\'s monetary profit if he lives through the year?  (Enter an exact value without a $.)';
type[currentProblem]='N';
answer[currentProblem]='-50';
hint[currentProblem]='The profit will be the payoff if he lives minus the the cost.';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L08-randomvariables.pdf';
currentProblem++;

questionID[currentProblem]='insurance2b';
question[currentProblem]='What is Hank\'s monetary profit if he does not live through the year?  (Enter an exact value without a $.)';
type[currentProblem]='N';
answer[currentProblem]='99950';
hint[currentProblem]='The profit will be the payoff if he dies minus the the cost.';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L08-randomvariables.pdf';
currentProblem++;

questionID[currentProblem]='insurance2c';
question[currentProblem]='What is Hank\'s expected monetary profit from this policy?  (Round to the nearest dollar.  Do not include a $.)';
type[currentProblem]='N';
answer[currentProblem]='-25';
hint[currentProblem]='Expected profit = (profit if Hank lives)xP(lives)+(profit if Hank dies)xP(dies).';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L08-randomvariables.pdf';
currentProblem++;


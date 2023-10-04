questionID[currentProblem]='insurance1';
question[currentProblem]='A $100,000 life insurance policy for a 25 year old male in a certain city costs $225 for one year.<p> \
 \
The probability that such an individual lives through the year is 0.9995 according to mortality data from the US CDC.<p> \
 \
If Bob buys such a policy, what is Bob\'s monetary profit if he lives through the year?  (Enter an exact value without a $.)';
type[currentProblem]='N';
answer[currentProblem]='-225';
hint[currentProblem]='The profit will be the payoff if he lives minus the the cost.';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L08-randomvariables.pdf';
currentProblem++;

questionID[currentProblem]='insurance1b';
question[currentProblem]='What is Bob\'s monetary profit if he does not live through the year?  (Enter an exact value without a $.)';
type[currentProblem]='N';
answer[currentProblem]='99775';
hint[currentProblem]='The profit will be the payoff if he dies minus the the cost.';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L08-randomvariables.pdf';
currentProblem++;

questionID[currentProblem]='insurance1c';
question[currentProblem]='What is Bob\'s expected monetary profit from this policy?  (Round to the nearest dollar.  Do not include a $.)';
type[currentProblem]='N';
answer[currentProblem]='-175';
hint[currentProblem]='Expected profit = (profit if Bob lives)xP(lives)+(profit if Bob dies)xP(dies).';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L08-randomvariables.pdf';
currentProblem++;

questionID[currentProblem]='insurance1d';
question[currentProblem]='Can the insurance company expect to make a profit off customers like Bob?  (Enter Y for yes and N for no.)';
type[currentProblem]='T';
answer[currentProblem]='Y';
hint[currentProblem]='If Bob loses money, the company makes money.';
epsilon[currentProblem]=.0001;
notes[currentProblem]='notes/L08-randomvariables.pdf';
currentProblem++;

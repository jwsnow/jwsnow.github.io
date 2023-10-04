questionID[currentProblem]='hilo1';
question[currentProblem]='According to the 5% rule, what are the unusually high and low values of this random variable?:<br> \
<table border=1> \
<tr><td>X</td><td>P(X)</td></tr> \
<tr><td>1</td><td>.03</td></tr> \
<tr><td>2</td><td>.07</td></tr> \
<tr><td>3</td><td>.70</td></tr> \
<tr><td>4</td><td>.10</td></tr> \
<tr><td>5</td><td>.10</td></tr> \
</table><p> \
Which values are unusuall high?';
type[currentProblem]='MC';
answer[currentProblem]='F';
hint[currentProblem]='A value N is unusually low if P(X<=N)<=0.05.<p>A value N is unusually high if P(X>=N)<=0.05.';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L08-randomvariables.pdf';
options[currentProblem]=[];
options[currentProblem]['A']='A) 5'; 
options[currentProblem]['B']='B) 5, 4';
options[currentProblem]['C']='C) 5,4,3';
options[currentProblem]['D']='D) 5,4,3,2';
options[currentProblem]['E']='E) All values are unusually high';
options[currentProblem]['F']='F) No values are unusually high';
currentProblem++;

questionID[currentProblem]='hilo1b';
question[currentProblem]='Which values are unusuall low?';
type[currentProblem]='MC';
answer[currentProblem]='A';
hint[currentProblem]='A value N is unusually low if P(X<=N)<=0.05.<p>A value N is unusually high if P(X>=N)<=0.05.';
epsilon[currentProblem]=.011;
notes[currentProblem]='notes/L08-randomvariables.pdf';
options[currentProblem]=[];
options[currentProblem]['A']='A) 1 ';
options[currentProblem]['B']='B) 1,2 ';
options[currentProblem]['C']='C) 1,2,3 ';
options[currentProblem]['D']='D) 1,2,3,4'; 
options[currentProblem]['E']='E) All values are unusually low ';
options[currentProblem]['F']='F) No values are unusually low';
currentProblem++;


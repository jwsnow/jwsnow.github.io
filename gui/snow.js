jsLoaded=true;
var navVisible=0;

function showNav(){
	navDiv.style.width='400px';
	mainNavIcon1.style.webkitTransform='rotate(180deg)';
	mainNavIcon1.style.transform='rotate(180deg)';
	mainNavIcon2.style.webkitTransform='rotate(-180deg)';
	mainNavIcon2.style.transform='rotate(-180deg)';
}
function hideNav(){
	navDiv.style.width='50px';
	mainNavIcon1.style.webkitTransform='rotate(0deg)';
	mainNavIcon1.style.transform='rotate(0deg)';
	mainNavIcon2.style.webkitTransform='rotate(0deg)';
	mainNavIcon2.style.transform='rotate(0deg)';
}
function toggleNav(){
	if (navVisible ==0)
		showNav();
	else
		hideNav();
	clickToBegin.style.display='none';
	navVisible=1-navVisible;
}
function showPage(s){
	var l = allPageDivs.length;
	for (i=0;i<l;i++)
		allPageDivs[i].style.display='none';
	toggleNav();
	document.getElementById(s).style.display='block';
}
function showHeader(){
	document.write("\
<div id='navDiv' class='navDiv'>\
	<div id='innerNavDiv' class='innerNavDiv'>\
		<button class='icon' onclick='showPage(this.title);' title='calculator'><img class='icon' src='png/calculator.png' title='Calculator'></button>\
		<button class='icon' onclick='showPage(this.title);' title='math142'><img class='icon' src='png/m142.png' title='Math 142'></button>\
		<button class='icon' onclick='showPage(this.title);' title='algebra'><img class='icon' src='png/algebra.png' title='Algebra'></button>\
		<button class='icon' onclick='showPage(this.title);' title='geometry'><img class='icon' src='png/geometry.png' title='Geometry'></button>\
		<button class='icon' onclick='showPage(this.title);' title='statistics'><img class='icon' src='png/statistics.png' title='Statistics'></button>\
		<button class='icon' onclick='showPage(this.title);' title='home'><img class='icon' src='png/home.png' title='Home'></button>\
	</div>\
	<button class='icon' id='mainNavButton' onclick='toggleNav();'><img class='icon' id='mainNavIcon1' src='png/cross1.png' title='Home'><img class='icon' id='mainNavIcon2' src='png/cross2.png' title='Home'></button>\
</div>\
	");
}
function expandWith(t){
	var n=t.nextElementSibling;

	if (n.style.height=='auto'){
		n.style.height='0px';
		n.style.overflow='hidden';
	}
	else{
		n.style.height='auto';
		n.style.overflow='auto';
	}
}
function setupExpanders(){
	var e=document.getElementsByClassName('expander');
	var i;
	for (i =0; i<e.length; i++){
		e[i].onclick=function(){expandWith(this);}
	}
}
function shrinkWith(t){
	var p=t.parentElement;
	p.style.height='0px';
	p.style.overflow='hidden';
}
function setupShrinkers(){
	var e=document.getElementsByClassName('expandable');
	var i;
	for (i =0; i<e.length; i++){
		e[i].innerHTML ="<hr><button class='shrinker' onclick='shrinkWith(this);'>&darr; click to collapse &darr;</button><br>" + e[i].innerHTML + "<br><button class='shrinker' onclick='shrinkWith(this);'>&uarr; click to collapse &uarr;</button><br><hr>";
	}	
}
var allPageDivs;
function setupPageDivs(){
	allPageDivs = document.getElementsByClassName('classPage');
}
function setupAll(){
	setupPageDivs();
	setupShrinkers();
	setupExpanders();
	home.style.display='block';
}

//Syllabus stuff
var term='Spring 2015';
var officeHours='12:30-2:00 MWF. Other times by appointment';
var fiveTestDays='September 12, October 3, October 24, November 14, and December 12';
var fourTestDays='September 12, October 10, November 7, and December 12';
var threeTestDays='February 5, March 5, and April 9';

var topMatter = "<div class='sylP'>\
	<table>\
	<tr><td><b>Term:</b></td><td>"+term+"</td></tr>\
	<tr><td><b>Instructor:</b></td><td>Dr. J.W. Snow</td></tr>\
	<tr><td><b>Office:</b></td><td>Jesse 215</td></tr>\
	<tr><td><b>Phone:</b></td><td>402.643.7417</td></tr>\
	<tr><td><b>Email:</b></td><td>John.Snow@cune.edu</td></tr>\
	<tr><td><b>Web:</b></td><td>JWSnow.com</td></tr>\
	<tr><td><b>Office Hours:</b></td><td>"+officeHours+"</td></tr>\
	</table></div>\
	";
	
var bottomMatter = "\
	<hr><div class='sylP'><b>Format of Answers: </b>\
	This is a math class. Math relies on structure, discipline, and method. As such, unless I say otherwise, I expect to see complete work and exact answers. Your work should be neatly written so that the grader can easily follow it and find your answers. \
	</div>\
	<div class='sylP'><b>Attendance: </b>\
	You are expected to be in class on time every day. If you miss class for any reason, it is your responsibility to get the notes and assignments from that class meeting. A sign-up sheet will be passed around each class period to monitor attendance. \
	</div>\
	<div class='sylP'><b>Commitment: </b>\
	You are a student; your job is to study. You will not succeed in this class without spending time studying and doing homework. For each hour in class, I expect you to spend two hours outside of class preparing (some will need to spend more time). \
	</div>\
	<div class='sylP'><b>Behavior: </b>\
	It is assumed that at all times you will conduct yourself in a manner consistent with being a member of a Christian community.\
	</div>\
	<div class='sylP'><b>Electronics:</b>\
		Unless being used for class work, all electronic communication devices such as phones, tablets, laptops, earphones, etc. should be put away during class.\
		Use of such devices in class for non-approved reasons is disrespectful to your classmates and to your instructor.\
	</div>\
	<div class='sylP'><b>Work Samples:</b>\
		Samples of student work are occasionally used (without names) for assessment purposes. If you do not want your work used in such a way, you should let me know.\
	</div>\
		<hr>\
<div class='sylP'><b>Course Workload:</b> \
In the face-to-face, online, and hybrid classrooms at Concordia University, Nebraska, credit hours are amassed in a course through student-to-instructor interaction, student-to-student interaction, Blackboard activities, contact with course-specific content, assignments, assigned videos, and other activities. No matter the length of the course meeting time in weeks or the amount of face-to-face instruction in the course, students can expect to devote at least 135 hours for each 3-credit course.</div>\
<div class='sylP'><b>Course Participation:</b> \
Federal Financial Aid regulations, which Concordia observes for all students, require that students regularly participate in courses in which they are enrolled. All students must log into the course management system (Blackboard) or participate in a face-to-face session weekly in order to avoid being tagged as a non-participant. Students must use the Concordia Blackboard and e-mail messaging systems to contact instructors and advisors. Students who are unable to participate regularly in their course for any reason should contact their instructor and their advisor. Students who intend to withdraw from a course or a program should notify their instructor and advisor.</div>\
<div class='sylP'><b>Academic Integrity:</b> \
At Concordia University Nebraska, we are guided in all of our work by the values of academic integrity: honesty, trust, fairness, responsibility, and respect. As a student, you are required to demonstrate these values in all of the work you do. Participating in a behavior that violates academic integrity (e.g., plagiarism, unauthorized collaboration, multiple submissions, cheating on examinations, or fabricating information) will result in your being sanctioned. Violations may subject you to disciplinary action including the following: receiving a failing grade on an assignment or examination, receiving a failing grade for the course, and/or being suspended from the university.</div>\
<div class='sylP'><b>ADA:</b> \
Students with a documented disability, who need reasonable accommodations, should contact ADA & Academic Support located in Link Library to arrange an appointment to discuss their individual needs. Students are also encouraged to notify their instructors immediately about any disability-related academic needs they may have. To contact the Academic Resource and Disability Support Services Coordinator, Bethany Landrey, please call 402.643.7187 or 800.535.5494 ext. 7187 or email Bethany.Landrey@cune.edu.</div>\
<div class='sylP'><b>Emergency Information:</b> \
In inclement weather, check your e-mail, Blackboard, and the Concordia website (www.cune.edu) for information. Your instructor may utilize Blackboard to make-up course time, so please check Blackboard if a class is cancelled. In the event of an emergency while you are in a face-to-face class, follow the instructions of your instructor, ensure you are in a safe location, and, after you are in a safe location, check in with your instructor before leaving so that he or she can account for all students. Also, if you have not already done so, please update emergency contact information in “Banner Self-Service” on the connectCUNE portal (http://connectCUNE.cune.edu).</div>\
";
	
var letterGrades = "<div class='sylP'><b>Letter Grades:</b>\
	Passing grades will be assigned according to:<br>\
	<table border='1'>\
	<tr><td>A</td><td>A-</td><td>B+</td><td>B</td><td>B-</td><td>C+</td><td>C</td><td>C-</td><td>D+</td><td>D</td><td>D-</td></tr>\
	<tr><td>95-100</td><td>90-95</td><td>88-90</td><td>82-88</td><td>80-82</td><td>78-80</td><td>72-78</td><td>70-72</td><td>68-70</td><td>62-68</td><td>60-62</td></tr>\
	</table>\
	</div>";
	
var finalExam = "\
	<div class='sylP'><b>Final Exam: </b> You will have a cumulative final exam during exam week. If you are going to miss the final for a university approved reason, you must let me know in advance. A strict time limit will be enforced on the final exam.\
	</div>\
	";
	
var ungradedHomework = "\
	<div class='sylP'><b>Homework: </b> Homework will be assigned daily to direct you in your studies. This homework is for exposure \
	and practice and will be ungraded. It will be to your advantage to do all of the homework and to do it as \
	soon after class as possible. You are strongly encouraged to work with other students on your homework. \
	For direct feedback on homework, you should bring your work to my office to let me look at it.</div>\
	";
	
var checkYourOwnHomework = "\
	<div class='sylP'><b>Homework: </b> Homework will be assigned daily to direct you in your studies. This homework is for exposure \
	and practice and will be ungraded. It will be to your advantage to do all of the homework and to do it as \
	soon after class as possible. You are strongly encouraged to work with other students on your homework. \
	For direct feedback on homework, you should bring your work to my office to let me look at it.\
	You may check your own homework with solutions that are on reserve in the library.</div>\
	";
	
var gradedHomework = "\
	<div class='sylP'><b>Homework: </b> Homework will be assigned daily to direct you in your studies. Some of this homework \
	will be collected for a grade. It will be to your advantage to do all of the homework and to do it as \
	soon after class as possible. You are strongly encouraged to work with other students on your homework. \
	For direct feedback on homework, you should bring your work to my office to let me look at it.</div>\
	";
	
var collectedHomework = "\
	<div class='sylP'><b>Homework: </b> Homework will be assigned and collected daily to direct you in your studies.  \
	It will be to your advantage to do all of the homework and to do it as \
	soon after class as possible. You are strongly encouraged to work with other students on your homework. For direct feedback on homework, you should bring your work to my office to let me look at it.</div>\
	";
	
var electronicHomework = "\
	<div class='sylP'><b>Homework: </b> Homework will be assigned daily through <a href='http://www.pearsonmylabandmastering.com/northamerica/mymathlab/'>Pearson's MyMathLab</a> to direct you in your studies.  \
	It will be to your advantage to do all of the homework and to do it as \
	soon after class as possible. You are strongly encouraged to work with other students on your homework.</div>\
	";

var fiveTests = "<div class='sylP'><b>Tests: </b> You will have five in-class tests on or around "+fiveTestDays+". Each test will focus on recent material, but each may also have a cumulative component. If you are going to miss a test for a university approved reason, you must let me know in advance. Strict time limits will be enforced on every test. </div>";

var weeklyQuizzes = "<div class='sylP'><b>Quizzes: </b> Written quizzes will be given in class about once each week. Some of these will be announced. Some will not. </div>";

var threeTests = "<div class='sylP'><b>Tests: </b> You will have three in-class tests on or around "+threeTestDays+". Each test will focus on recent material, but each may also have a cumulative component. If you are going to miss a test for a university approved reason, you must let me know in advance. Strict time limits will be enforced on every test. </div>";

var chapterTests = "<div class='sylP'><b>Tests: </b> You will have a test over each chapter we cover. Each test will focus on recent material, but each may also have a cumulative component. If you are going to miss a test for a university approved reason, you must let me know in advance. Strict time limits will be enforced on every test. </div>";

var upperAttendance = "<div class='sylP'><b>Attendance: </b> You will find that this class is different from almost every other class you have taken in focus, methodology, and time commitment. Absences will negatively affect your performance and the performance of your classmates. </div>";

var standardWeightsNoHomework = "<div class='sylP'>\
	<b>Grade Weights:</b> Grades will be weighted according to: <br>\
	<table>\
	<tr><td>Tests</td><td>75%</td></tr>\
	<tr><td>Final Exam</td><td>25%</td></tr>\
	</table>\
	</div>";

var standardWeightsProject = "<div class='sylP'>\
	<b>Grades:</b> Grades will be weighted according to: <br>\
	<table>\
	<tr><td>Project</td><td>10%</td></tr>\
	<tr><td>Tests</td><td>65%</td></tr>\
	<tr><td>Final Exam</td><td>25%</td></tr>\
	</table>\
	</div>";
var statProjects = "\
<div class='sylP'>\
<b>Projects:</b> You will complete three small projects this semester related to sampling, confidence intervals, and hypothesis testing. Information about the projects will be shared later in the semester.\
</div>\
";
var standardWeightsHomework = "<div class='sylP'>\
	<b>Grades:</b> Grades will be weighted according to: <br>\
	<table>\
	<tr><td>Homework</td><td>10%</td></tr>\
	<tr><td>Tests</td><td>65%</td></tr>\
	<tr><td>Final Exam</td><td>25%</td></tr>\
	</table>\
	</div>";
var standardWeightsHomeworkQuiz = "<div class='sylP'>\
	<b>Grades:</b> Grades will be weighted according to: <br>\
	<table>\
	<tr><td>Homework</td><td>10%</td></tr>\
	<tr><td>Quizzes</td><td>10%</td></tr>\
	<tr><td>Tests</td><td>55%</td></tr>\
	<tr><td>Final Exam</td><td>25%</td></tr>\
	</table>\
	</div>";
var standardWeightsStats = "<div class='sylP'>\
	<b>Grades:</b> Grades will be weighted according to: <br>\
	<table>\
	<tr><td>Homework and Quizzes</td><td>10%</td></tr>\
	<tr><td>Projects</td><td>10%</td></tr>\
	<tr><td>Tests</td><td>80%</td></tr>\
	</table>\
	</div>";
var calculusDescription = "<div class='sylP'>\
	<b>Course Description: </b> A continuation of Calculus I. Topics include integration, techniques and applications of integration, sequences, series, and power series. <br>\
	<table>\
	<tr><td><b>Prerequisite: </b></td><td>Calculus I or equivalent</td></tr>\
	<tr><td><b>Academic Credit:	</b></td><td>4 Semester Hours </td></tr>\
	<tr><td><b>Text:	</b></td><td><b>Thomas' Calculus</b>, 13<sup>th</sup> Edition.</td></tr>\
	</table>\
	</div>";
var algebraDescription = "<div class='sylP'>\
	<b>Course Description: </b> An introduction to algebraic structures with an emphasis on groups, subgroups, and group isomorphisms. A brief introduction to rings, domains and fields. <br>\
	<table>\
	<tr><td><b>Prerequisite: </b></td><td>Math 252 and upper level standing</td></tr>\
	<tr><td><b>Academic Credit:	</b></td><td>3 Semester Hours </td></tr>\
	<tr><td><b>Text:	</b></td><td>Judson, Thomas. <b>Abstract Algebra, Theory and Applications</b>.</td></tr>\
	</table>\
	</div>";
var geometryDescription = "<div class='sylP'>\
	<b>Course Description: </b> An introduction to the general study of geometries including projective, finite, and non-Euclidean geometries.<br>\
	<table>\
	<tr><td><b>Prerequisite: </b></td><td>high school geometry, three semesters of college mathematics and a grade of a C or higher in Math 252</td></tr>\
	<tr><td><b>Academic Credit:	</b></td><td>3 Semester Hours </td></tr>\
	<tr><td><b>Text:	</b></td><td>Venema, Gerard. <b>Foundations of Geometry</b>.</td></tr>\
	</table>\
	</div>";
	

var conceptsDescription = "<div class='sylP'>\
	<b>Course Description: </b>  An activities approach to studying mathematics concepts in probability, functions and algebra, and numerous topics in geometry. Geometrical topics include two and three-dimensional geometry, constructions, congruences, motion and coordinate geometry symmetries and concepts of measurement. <br>\
	<table>\
	<tr><td><b>Prerequisite: </b></td><td>Math 201 or one semester of calculus.</td></tr>\
	<tr><td><b>Academic Credit:	</b></td><td>3 Semester Hours </td></tr>\
	<tr><td><b>Text:	</b></td><td>Beckman. <b>Mathematics for Elementary Teachers</b>, 4<sup>th</sup> Edition.</td></tr>\
	</table>\
	</div>";
	
var conceptsNote = "<div class='sylP'>\
	<b>Note: </b> This is not a methods course. This is a content-area course. The purpose of this course is not to discuss various methods of teaching elementary and middle level mathematics. The purpose of this course is to survey topics which you might teach in an elementary or middle level math class. \
	</div>";

var logicDescription = "<div class='sylP'>\
	<b>Course Description: </b> An introduction to mathematical logic including history and development, sentential and predicate logic (including equivalence, implication, deduction, completeness, compactness, and soundness) cardinality, computability, and incompleteness. <br>\
	<table>\
	<tr><td><b>Academic Credit:	</b></td><td>3 Semester Hours </td></tr>\
	<tr><td><b>Text:	</b></td><td>Notes can be found <a href=\"logic.pdf\">here</a>. These notes will be added to and updated as the semester progresses.</td></tr>\
	</table>\
	</div>";
	
var logicProject = "<div class='sylP'>\
	<b>Project:</b> Each student will complete a project which will include a brief report on a mathematical analysis of an argument from theology or philosophy.\
	</div>";
	
var numbersDescription = "<div class='sylP'>\
	<b>Course Description: </b> Mathematical induction, greatest common divisors, fundamental theorem of arithmetic, prime and composite integers, and congruences.<br>\
	<table>\
	<tr><td><b>Prerequisite: </b></td><td>Math 252 and three semesters of college mathematics </td></tr>\
	<tr><td><b>Academic Credit:	</b></td><td>3 Semester Hours </td></tr>\
	<tr><td><b>Text:	</b></td><td><b>Elementary Number Theory in Nine Chapters</b> (second edition), James J. Tattersall.</td></tr>\
	</table>\
	</div>";
	
var groups = "<div class='sylP'><b>Groups: </b>The class will be divided into groups of two or three each. All assignments except tests and exams will be completed in these groups. </div>";

var mooreOverview = "<div class='sylP'><b>Moore Method:</b> This class will be conducted using a <i>pseudo-Moore Method</i> approach. Reading and homework will be assigned for each class period. Class time will be spent with students presenting homework problems. These presentations will make up a significant portion of your grade. Failing to keep up with the homework will be detrimental to your grade.</div>";

var limitedResources = "<div class='sylP'><b>Resources:</b> Much of the focus of this class will be on <i>doing</i> mathematics rather than on <i>reading about</i> mathematics. You will be operating with limited resources while working on problems for this class. Your available resources are your text book, your class notes, your classmates, and your instructor. If it is discovered that you have used  resources other than these for homework problems, you will lose credit for those problems. </div>";

var mooreWeights = "<div class='sylP'>\
	<b>Grades:</b> Grades will be weighted according to: <br>\
	<table>\
	<tr><td>Homework</td><td>25%</td></tr>\
	<tr><td>Tests</td><td>50%</td></tr>\
	<tr><td>Final Exam</td><td>25%</td></tr>\
	</table>\
	</div>";
	
var statDescription="<div class='sylP'>\
	<b>Course Description: </b> The fundamentals of elementary statistics, data collection and analysis, probability, distributions, sampling, hypothesis testing, correlation and regression.\
	</div>";
var noTextBook = "<div class='sylP'><b>Textbook:</b> Notes for this class will be provided online.</div>"

var onlineHomework = "<div class='sylP'>\
<b>Homework:</b> Homework will be assigned daily to direct you in your studies.  \
Most of this homework will be online on the course web page.\
	It will be to your advantage to do all of the homework and to do it as \
	soon after class as possible. You are strongly encouraged to work with other students on your homework.</div>"
var statCalculator = "<div class='sylP'><b>Calculator:</b> You will need a calculator with capabilities similar to a TI-83/84. You will \
use this calculator on almost every homework, quiz, and test. A calculator with adequate \
capabilities is available on the course web page.</div>"
var onlineQuizzes = "<div class='sylP'><b>Quizzes:</b> There will be at least five online quizzes during the semester. These will be \
completed outside of class and can be reworked to improve your grade.</div>";
var fiveStatTests = "<div class='sylP'><b>Tests:</b> Five tests will be given in class on or around January 28, February 27, March 27, April 28, and during Final Exam Week. The last test will be cumulative.</div>";

var statWeights = "<div class='sylP'>\
	<b>Grades:</b> Grades will be weighted according to: <br>\
	<table>\
	<tr><td>Homework</td><td>10%</td></tr>\
	<tr><td>Quizzes</td><td>10%</td></tr>\
	<tr><td>Tests</td><td>80%</td></tr>\
	</table>\
	</div>";
	
var mooreRules = '<h1>Number Theory -- The Rules of the Game</h1>\
Most of our class time will be spent with students presenting homework questions. You are to view this process as a learning game. Since your homework grade will be a substantial proportion of your semester grade, and since your homework grade will be graded based on your presentations, you should take this game seriously.\
Here are the rules of the game:\
<ol>\
<li>Reading and homework problems will be assigned befor each class period.</li>\
<li>For each class period, a collection of homework problems will be considered <i>in play</i>. These will typically be recently assigned homework questions which have not yet been presented.</li>\
<li>At the beginning of each class period, you will <i>claim</i> problems by declaring which of the in play homework problems you are able to present during that class period.</li>\
<li>You must have your problems to claim ready at the beginning of class. I will not wait for you to sift through your homework.</li>\
<li>You may not claim a problem that has already been correctly presented.</li>\
<li>After the claiming process is completed on a given day, I will select a student to begin the game for that day. Students will then take turns alphabetically.</li>\
<li>When it is your turn, you may select any problem which you have claimed and present it to the class.</li>\
<li>If you miss a day of class, you forfeit your turns for that day.</li>\
<li>If you know in advance that you are going to miss a class period, you may claim problems for that day if you turn those problems in neatly and correctly written before the class period starts.</li>\
<li>If you have no problems claimed when it is your turn to present, then you may claim a problem <i>on the spot</i> to work. Note that this can be dangerous.</li>\
<li>If you attempt to present a problem in class but are unsuccessful, then you will lose claim to that problem and to all other unpresented problems you have claimed.</li>\
<li>While another student is presenting, you are to give that student your undivided attention. Egregious cases of failing to pay attention will result in loss of claims.</li>\
<li>While another student is presenting, you may ask questions. These questions might be for your own understanding or to challenge the understanding of the student presenting. When you ask each other questions, you must be respectful.</li>\
<li>To earn credit for a presentation, you must successfully field all fair questions from the class.</li>\
<li>Once a problem has been presented, everyone who claimed that problem will be awarded <i>2n-c</i> points where <i>n</i> is the number of students in class and <i>c</i> is the number of students who claimed that problem. </li>\
<li>Your success rate will be the number of problems you present in class successfully divided by the number of problems you attempt to present.</li>\
<li>Your score in the game will be the total number of points you earn from your claiming multiplied by your success rate.</li>\
</ol>\
';
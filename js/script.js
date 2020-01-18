const stellingTitle = document.getElementById("stellingTitle");
const stellingStatement = document.getElementById("stellingStatement");
const stellingParties = document.getElementById('parties');
const buttons = document.getElementById('buttons');
const buttonBack = document.getElementById('buttonBack');
const multiply = document.getElementById('multiply');
// Answers
var answers = [];

// Bar length
var questionCount = 0;
var baseLength = 14.2857142857;
var curLength = 14.2857142857;

document.getElementById("start").addEventListener("click", function start(){	
	// Hiding Main page elements
	document.getElementById("titles").style.display = 'none';
	document.getElementById("footer").style.display = 'none';

	// Show question elements
	stellingStatement.classList.remove('w3-hide');
	stellingParties.classList.add('mt-5');
	stellingParties.classList.remove('w3-hide');
	buttons.classList.remove('w3-hide');
	buttonBack.classList.remove('w3-hide');
	document.getElementById('multiplyDiv').classList.remove('w3-hide');
	document.getElementById("bar").style.width = baseLength + "%";

	// Gets stelling
	getStelling()
})

// Sets stelling on page
function getStelling(){
	console.log(answers)
	stellingTitle.innerHTML = questionCount + 1 + '. ' + subjects[questionCount].title
	stellingStatement.innerHTML = subjects[questionCount].statement
}

function changeStelling(opinion){
	var newAnswers = {
		question_id: questionCount,
		opinion: opinion,
		heavy: multiply.checked,
	}
	if(answers.length === 0){
		answers.push(newAnswers);
		questionCount++;
	} else{
		// Replaces old choise when going back
		const item = answers.find(element => element.question_id === questionCount);
		if(item === undefined){
			answers.push(newAnswers);
		} else{
			item.opinion = opinion;	
			item.heavy = multiply.checked;	
		}
		questionCount++;
	}
	getStelling();
}

// Back button
function goBack(){
	if(questionCount === 0){
		location.href = "/"
	} else{
		questionCount--;	
		getStelling();
	}
}
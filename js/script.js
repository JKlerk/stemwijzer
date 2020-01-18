const stellingTitle = document.getElementById("stellingTitle");
const stellingStatement = document.getElementById("stellingStatement");
const stellingParties = document.getElementById('parties');
const buttons = document.getElementById('buttons');
const buttonBack = document.getElementById('buttonBack');
const multiply = document.getElementById('multiply');

// Answers
var pro = [];
var contra = [];
var ambivalent = [];
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

	// Gets stelling
	getStelling()
})

// Sets stelling on page
function getStelling(){
	if(answers.length !== 7){
		stellingTitle.innerHTML = questionCount + 1 + '. ' + subjects[questionCount].title
		stellingStatement.innerHTML = subjects[questionCount].statement
		document.getElementById("bar").style.width = curLength + "%";
		subjects[questionCount].parties.forEach(function(element) {
			if (element.position == "pro") {
				document.getElementById("eens").innerHTML += "<details class=\"opinion__party\"><summary class=\"party__title\">" + element.name + "</summary><p class=\"party__description\"> " + element.explanation + "</p></details>"
			} else if (element.position == "ambivalent") {
				document.getElementById("none").innerHTML += "<details class=\"opinion__party\"><summary class=\"party__title\">" + element.name + "</summary><p class=\"party__description\"> " + element.explanation + "</p></details>"
			} else if (element.position == "contra") {
				document.getElementById("oneens").innerHTML += "<details class=\"opinion__party\"><summary class=\"party__title\">" + element.name + "</summary><p class=\"party__description\"> " + element.explanation + "</p></details>"
			}
		});
	} else{
		calculate();
	}
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


// Calculate
function calculate(){
	// Haalt alle antwoord op index = question nummer
	for (let index = 0; index < answers.length; index++) {
		var yourOpinions = answers[index].opinion
		// Haalt alle parties op. logged elke keer voor elke vraag opnieuw de positions van de partijen
		for (let i = 0; i < subjects[index].parties.length; i++) {
			var party = subjects[index].parties[i]
			console.log('Question: ' + index)
			console.log('Party:' + party.name)
			console.log('Position:' + party.position)
			// Geeft punten als mening zelfde is als party
			if(party.position === 'pro' && yourOpinions){
				if (isNaN(party.points)) party.points = 0
				console.log(party.points += 1);
			} else{
				if (isNaN(party.points)) party.points = 0
				console.log(party.points -= 1);
			}
		}
	}
}

// Shows end result
function showResult(){
	var div = document.getElementById("results")
	var result = document.createElement("span")

	for (let index = 0; index < subjects.length; index++) {
		result.innerHTML += '<p class="mb-0 mt-1">' + parties[i].name + '</p>' + '<div class="w3-'+ color +'" style="max-width:1000px;width:'+ calcLength +'%">'+ status + percent + '%</div>';
	}
	div.appendChild(result)
}
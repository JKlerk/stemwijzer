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

	// Sets party points to 0
	for (let i = 0; i < parties.length; i++) {
		if (isNaN(parties[i].points)){
			parties[i].points = 0
		}		
	}

	// Gets stelling
	getStelling()
})

// Sets stelling on page
function getStelling(){
	if(answers.length !== 7){
		stellingTitle.innerHTML = questionCount + 1 + '. ' + subjects[questionCount].title
		stellingStatement.innerHTML = subjects[questionCount].statement
		document.getElementById("bar").style.width = 14.2857142857 + "%";

		document.getElementById("eens").innerHTML = "";
		document.getElementById("none").innerHTML = "";
		document.getElementById("oneens").innerHTML = "";

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
		showResult();
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
		var multiplier = 1;
		if(newAnswers.heavy){
			multiplier = 2;
		}
		for (let i = 0; i < subjects[questionCount].parties.length; i++) {
			if(subjects[questionCount].parties[i].position === newAnswers.opinion){
				const party = parties.find(element => element.name === subjects[questionCount].parties[i].name);
				party.points += multiplier;
			}
		}
	} else{
		// Finds item
		const item = answers.find(element => element.question_id === questionCount);
		// Sets choice if there is no item that exists
		if(item === undefined){
			answers.push(newAnswers);
			var multiplier = 1;
			if(newAnswers.heavy){
				multiplier = 2;
			}
			for (let i = 0; i < subjects[questionCount].parties.length; i++) {
				if(subjects[questionCount].parties[i].position === newAnswers.opinion){
					const party = parties.find(element => element.name === subjects[questionCount].parties[i].name);
					party.points += multiplier;
				}
			}
		} else{
			// Replaces old choice when going back
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

// Shows end result
function showResult(){
	// Styling
	stellingStatement.classList.add('w3-hide');
	stellingParties.classList.add('w3-hide');
	stellingTitle.innerHTML = 'Eind resultaat';
	multiplyDiv.classList.add('w3-hide');
	buttons.classList.add('w3-hide');
	buttonBack.classList.add('w3-hide');

	var div = document.getElementById("results")
	var result = document.createElement("span")

	// 7 punten is 100%;
	var baseLength = 14.2857142857;

	for (let index = 0; index < parties.length; index++) {
		var barLength = baseLength * parties[index].points
		result.innerHTML += '<p class="mb-0 mt-1">' + parties[index].name + '</p>' + '<div class="w3-green" style="max-width:1000px;width:'+ barLength +'%">'+ Math.round(barLength) + '%</div>';
	}
	div.appendChild(result)
}
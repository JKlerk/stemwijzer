const desc = document.getElementById("desc");
const stel = document.getElementById("stelling");
const q = document.getElementById("question");
const back = document.getElementById("back");

var partiesElement = document.getElementById('parties');
const animate = document.getElementById('animate');
const multButton = document.getElementById('multiply')

var weight = 0;

var answers = [];
var weightsArray = [];

var curLength = 0;
var qcount = 0;


document.getElementById("start").addEventListener("click", function start(){	
	console.log("Started")
	document.getElementById("titles").style.display = "none";
	desc.style.display = "none";
	document.getElementById("footer").style.display = "none";
	document.getElementById("button").classList.remove('w3-hide');
	q.classList.remove('w3-hide')
	addClassR();
	back.classList.remove('w3-hide');
	document.getElementById("multiplyDiv").classList.remove('w3-hide');
	document.getElementById("container").classList.remove('mt-4')
	q.style.marginBottom = "100px";
	partiesElement.classList.remove('w3-hide')
	stelling();
	curLength += 14.2857142857;
	document.getElementById("bar").style.width = curLength + "%";
	document.getElementById(1).addEventListener("click", function(){reply_click(1)})
	document.getElementById(2).addEventListener("click", function(){reply_click(2)})
	document.getElementById(3).addEventListener("click", function(){reply_click(3)})
	document.getElementById(4).addEventListener("click", function(){reply_click(4)})
})

//Verandering Vraag

function stelling(){
	if (qcount == subjects.length){
		stel.innerHTML = "Eind resultaat";
		q.classList.add('w3-hide');
		back.classList.add('w3-hide');
		partiesElement.classList.add('w3-hide');
		document.getElementById("multiplyDiv").classList.add('w3-hide');
		document.getElementById("container").classList.add('mt-4')
		for (var i = 1; i <= 4; i++) {
			document.getElementById(i).classList.add("w3-hide");
		}
		calculate()
	} else{
		document.getElementById("bar").style.width = curLength + "%";
		stel.innerHTML = qcount+1 + ". " + subjects[qcount].title;
		q.innerHTML = subjects[qcount].statement;
	}
	weight = weightsArray.length > qcount ? weightsArray[qcount] : 1;

	if (weight == 2) {
		document.getElementById("multiply").checked = true;
	} else{
		document.getElementById("multiply").checked = false;
	}
	
	console.log(weightsArray)
	console.log(answers)

	document.getElementById("eens").innerHTML = "";document.getElementById("none").innerHTML = "";document.getElementById("oneens").innerHTML = "";

	if (qcount != 7) {
		subjects[qcount].parties.forEach(function(element) {
			if (element.position == "pro") {
				document.getElementById("eens").innerHTML += "<details class=\"opinion__party\"><summary class=\"party__title\">" + element.name + "</summary><p class=\"party__description\"> " + element.explanation + "</p></details>"
			} else if (element.position == "ambivalent") {
				document.getElementById("none").innerHTML += "<details class=\"opinion__party\"><summary class=\"party__title\">" + element.name + "</summary><p class=\"party__description\"> " + element.explanation + "</p></details>"
			} else if (element.position == "contra") {
				document.getElementById("oneens").innerHTML += "<details class=\"opinion__party\"><summary class=\"party__title\">" + element.name + "</summary><p class=\"party__description\"> " + element.explanation + "</p></details>"
			}
		});
	}
}

function goBack(){
	curLength -= 14.2857142857;
	if (qcount != 0){
		qcount--
		stelling();
		for (var i = 1; i < 4; i++) {
			document.getElementById(i).classList.remove('w3-teal');
			document.getElementById(i).classList.add('w3-black');
		}
		document.getElementById(answers[qcount]).classList.add('w3-teal');
		document.getElementById(answers[qcount]).classList.remove('w3-black');
	} else{
		location.reload();
	}
	removeClass();
	animate.classList.add('w3-animate-left');
	partiesElement.classList.add('w3-animate-left');
}

//Knoppen
function reply_click(clicked_id){
	var buttonid = document.getElementById(clicked_id)
	answers[qcount] = clicked_id;
	weightsArray[qcount] = weight;
	for (var i = 1; i < 4; i++) {
		document.getElementById(i).classList.remove('w3-teal');
		document.getElementById(i).classList.add('w3-black');
	}
	curLength += 14.2857142857;
	qcount++;
	if (answers.length > qcount){
		document.getElementById(answers[qcount]).classList.add('w3-teal');
		document.getElementById(answers[qcount]).classList.remove('w3-black');
	}	
	stelling(); 
	removeClass();
	addClassR();
}

function calculate(){
	for(var i = 0; i < answers.length; i++) {
	    var q = answers[i]
	    var weight = weightsArray[i]
	    for(var j = 0; j < subjects[i].parties.length; j++) {
	    	var party = getParty(subjects[i].parties[j].name)
	    	if(party == null) continue;
	    	console.log(getParty(subjects[i].parties[j].name).points)
	        if(party.points == undefined) {
	            party.points = 0
	        }
	        var points = calcPoints(subjects[i].parties[j].position, q)
	        console.log(points)
	        party.points += points
	    }
	}
	showResult();
}

function getParty(name) {
	for (var i = parties.length - 1; i >= 0; i--) {
		if(parties[i].name == name) return parties[i]
	}
	return null
}

function calcPoints(expected, given){
	let conv = 0
	if(expected == "pro") {
		conv = 1
	}else if(expected == "contra") {
		conv = -1
	}

	if(given == conv) {
		return 1
	}else if(given == 0) {
		return given
	}
	return -1
}

function showResult(){
	var div = document.getElementById("results")
	var result = document.createElement("span")

	for (var i = parties.sort((a, b) => { return a.points - b.points}).length - 1; i >= 0; i--) {
		var calcLength = 5 * parties[i].points; 
		var negLength = 5 * Math.abs(parties[i].points);

		if(parties[i].points > -1){
			result.innerHTML += '<p class="mb-0 mt-1">' + parties[i].name + '</p>' + '<div class="w3-light-blue" style="max-width:1000px;width:'+ calcLength +'%">' + calcLength + '%</div>';
		} else{
			result.innerHTML += '<p class="mb-0 mt-1">' + parties[i].name + '</p>' + '<div class="w3-red" style="max-width:1000px;width:'+ negLength +'%">-' + negLength + '%</div>';
		}
	}
	div.appendChild(result)
}

function multiply(){
	weight = multButton.checked +1;
}

function removeClass(){
	animate.classList.remove("w3-animate-left");
	animate.classList.remove("w3-animate-right");
	partiesElement.classList.remove("w3-animate-left");
	partiesElement.classList.remove("w3-animate-right");
	void animate.offsetWidth;
}

function addClassR(){
	animate.classList.add('w3-animate-right');
	partiesElement.classList.add('w3-animate-right');
}








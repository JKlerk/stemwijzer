var desc = document.getElementById("desc");
var stel = document.getElementById("stelling");
var q = document.getElementById("question");
var back = document.getElementById("back");

var parties = document.getElementById('parties');
var animate = document.getElementById('animate');

var answers = [];

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
	document.getElementById("container").classList.remove('mt-4')
	q.style.marginBottom = "100px";
	parties.classList.remove('w3-hide')
	stelling();
	curLength += 14.2857142857;
	document.getElementById("bar").style.width = curLength + "%";
	document.getElementById(1).addEventListener("click", function(){reply_click(1)})
	document.getElementById(2).addEventListener("click", function(){reply_click(2)})
	document.getElementById(3).addEventListener("click", function(){reply_click(3)})
})

//Verandering Vraag

function stelling(){
	if (qcount == subjects.length){
		stel.innerHTML = "Eind resultaat";
		q.innerHTML = answers;
		back.classList.add('w3-hide');
		parties.classList.add('w3-hide');
		document.getElementById("container").classList.add('mt-4')
		for (var i = 1; i <= 4; i++) {
			document.getElementById(i).classList.add("w3-hide");
		}
	} else{
		document.getElementById("bar").style.width = curLength + "%";
		stel.innerHTML = qcount+1 + ". " + subjects[qcount].title;
		q.innerHTML = subjects[qcount].statement;
	}
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
			// console.log("Removed from" + i)	
		}
		document.getElementById(answers[qcount]).classList.add('w3-teal');
		document.getElementById(answers[qcount]).classList.remove('w3-black');
		// console.log("Added to" + answers[qcount])
	} else{
		location.reload();
	}
	removeClass();
	animate.classList.add('w3-animate-left');
	parties.classList.add('w3-animate-left');
}

//Knoppen
function reply_click(clicked_id){
	var buttonid = document.getElementById(clicked_id)

	answers[qcount] = clicked_id;
	for (var i = 1; i < 4; i++) {
		document.getElementById(i).classList.remove('w3-teal');
		document.getElementById(i).classList.add('w3-black');
		// console.log("Removed from" + i)	
	}
	curLength += 14.2857142857;
	qcount++;
	if (answers.length > qcount){
		document.getElementById(answers[qcount]).classList.add('w3-teal');
		document.getElementById(answers[qcount]).classList.remove('w3-black');
		// console.log("Added to" + answers[qcount])
	}
	stelling(); 
	removeClass();
	addClassR();
}

function removeClass(){
	animate.classList.remove("w3-animate-left");
	animate.classList.remove("w3-animate-right");
	parties.classList.remove("w3-animate-left");
	parties.classList.remove("w3-animate-right");
	void animate.offsetWidth;
}

function addClassR(){
	animate.classList.add('w3-animate-right');
	parties.classList.add('w3-animate-right');
}








var titles = document.getElementById("titles");
var desc = document.getElementById("desc");
var footer = document.getElementById("footer");
var stel = document.getElementById("stelling");
var q = document.getElementById("question");
var button = document.getElementById("button");
var back = document.getElementById("back");

var answers = [];
var buttonStart = document.getElementById("start")

buttonStart.addEventListener("click", function start(){
	console.log("Started")
	titles.style.display = "none";
	desc.style.display = "none";
	footer.style.display = "none";
	button.classList.remove('w3-hide');
	q.classList.remove('w3-hide')
	document.getElementById('animate').classList.add('w3-animate-right');
	back.classList.remove('w3-hide');
	document.getElementById("container").classList.remove('mt-4')
	q.style.marginBottom = "100px";
	stelling();
})

qcount = 0;
// console.log(subjects[0])

//Verandering Vraag

function stelling(){
	
	if (qcount == subjects.length){
		stel.innerHTML = "Eind resultaat";
		q.innerHTML = answers;
		back.classList.add('w3-hide');
		document.getElementById("container").classList.add('mt-4')
		for (var i = 1; i <= 4; i++) {
			document.getElementById(i).classList.add("w3-hide");
		}
	} else{
		stel.innerHTML = qcount+1 + ". " + subjects[qcount].title;
		q.innerHTML = subjects[qcount].statement;
	}
	console.log(answers)
}

function goBack(){
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
}

//Knoppen

function reply_click(clicked_id){
	var buttonid = document.getElementById(clicked_id)

	answers[qcount] = clicked_id;
	for (var i = 1; i < 3; i++) {
		document.getElementById(i).classList.remove('w3-teal');
		document.getElementById(i).classList.add('w3-black');	
	}

	qcount++;
	if (answers.length > qcount){
		document.getElementById(answers[qcount]).classList.add('w3-teal');
		document.getElementById(answers[qcount]).classList.remove('w3-black');
	}
	stelling();
}



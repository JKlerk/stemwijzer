var titles = document.getElementById("titles")
var desc = document.getElementById("desc")
var footer = document.getElementById("footer")
var stel = document.getElementById("stelling")
var q = document.getElementById("question")
var button = document.getElementById("button")
qcount = 1;

var random  = Math.floor(Math.random() * subjects.length);
console.log(random)
console.log(subjects[0])

//Start function

function start(){
	console.log("Started")
	titles.style.display = "none";
	desc.style.display = "none";
	footer.style.display = "none";
	button.classList.remove('w3-hide');
	q.classList.remove('w3-hide');
	q.style.marginBottom = "100px";
	stelling();
}

function stelling(){
	var subjectTitle = subjects.map(function(subjects) {
  		return subjects['title'];
	});
	var subjectStatement = subjects.map(function(subjects) {
  		return subjects['statement'];
	});

	q.innerHTML = subjectStatement[random];
	stel.innerHTML = qcount + ". " + subjectTitle[random];
	console.log(subjectTitle[random]);
}

function reply_click(clicked_id){
	if (element.classList.contains(class)){
		alert ("Already selected");
	} else{
		alert (clicked_id)
		var buttonid = document.getElementById(clicked_id)
		buttonid.classList.remove("w3-black");
    	buttonid.classList.add("w3-teal");
    	qcount++;
	}

}


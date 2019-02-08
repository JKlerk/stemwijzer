var titles = document.getElementById("titles");
var desc = document.getElementById("desc");
var footer = document.getElementById("footer");
var stel = document.getElementById("stelling");
var q = document.getElementById("question");
var button = document.getElementById("button");
var back = document.getElementById("back");
qcount = 1;
console.log(subjects[0])

//Start function

function start(){
	console.log("Started")
	titles.style.display = "none";
	desc.style.display = "none";
	footer.style.display = "none";
	button.classList.remove('w3-hide');
	q.classList.remove('w3-hide')
	back.classList.remove('w3-hide');
	document.getElementById("container").classList.remove('mt-4')
	q.style.marginBottom = "100px";
	stelling();
}

function stelling(){
	removeColor();
	if (qcount == 7){
		q.innerHTML = "Einde";
		stel.innerHTML = "Einde";
		for (var i = 1; i <= 4; i++) {
			document.getElementById(i).classList.add("w3-hide");
		}
	} else{
		var subjectTitle = subjects.map(function(subjects) {
  			return subjects['title'];
		});
		var subjectStatement = subjects.map(function(subjects) {
	  		return subjects['statement'];
		});
		q.innerHTML = subjectStatement[qcount];
		stel.innerHTML = qcount + ". " + subjectTitle[qcount];
		console.log(subjectTitle[qcount]);
	}
}

function reply_click(clicked_id){
	var buttonid = document.getElementById(clicked_id)

	if (buttonid.classList.contains("w3-teal")){
		alert ("Already selected");	
	} else{
		removeColor();
		// alert (clicked_id)	
		buttonid.classList.remove("w3-black");
    	buttonid.classList.add("w3-teal");
    	qcount++;
    	stelling();
    	console.log(qcount)
	}
}

function removeColor(){
	for (var i = 1; i <= 3; i++) {
		document.getElementById(i).classList.remove("w3-teal");
		document.getElementById(i).classList.add("w3-black");
	}
}


var titles = document.getElementById("titles")
var desc = document.getElementById("desc")
var footer = document.getElementById("footer")
var q = document.getElementById("question")


var random  = Math.floor(Math.random() * subjects.length);
console.log(random)
console.log(subjects[0])

function start(){
	console.log("Started")
	titles.style.display = "none";
	desc.style.display = "none";
	footer.style.display = "none";
	stelling();
}

function stelling(){
	q.innerHTML = subjects["title"];

	var object = Object.values(subjects);
	console.log(object['title']);
}

function reply_click(clicked_id){
	alert (clicked_id)
	console.log(clicked_id)
    clicked_id.classList.add("w3-teal");;
}


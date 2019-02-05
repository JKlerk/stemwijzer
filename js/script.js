var titles = document.getElementById("titles")
var desc = document.getElementById("desc")
var footer = document.getElementById("footer")
var q = document.getElementById("question")

var quest = [
	"Stelling 1",
	"Stelling 2",
	"Stelling 3",
	"Stelling 4",
	"Stelling 5",
	"Stelling 6",
	"Stelling 7",
];

var ra  = Math.floor(Math.random() * quest.length);

function start(){
	console.log("Started")
	titles.style.display = "none";
	desc.style.display = "none";
	footer.style.display = "none";
	questions();
}

function questions(){
	q.innerHTML = "1." + quest[ra];
}

function reply_click(clicked_id){
	alert (clicked_id)
	console.log(clicked_id)
    clicked_id.classList.add("w3-teal");;
}

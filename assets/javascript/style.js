var triviaQuestions = [{
	question: "In S1E1, who started their first day at Dunder Mifflin?",
	answerList: ["Jim Halpert", "Michael Scott", "Ryan Howard", "Phyllis Vance"],
	answer: 2
},{
	question: "Which of these is not one of Jim and Pam's made up diseases?",
	answerList: ["Killer Nanorobots", "Hot Dog Fingers", "Spontaneous Dental Hydroplosion", "Hair Cancer"],
	answer: 3
},{
	question: "What is Jim and Pam's daughter's name?",
	answerList: ["Peepa", "Jenna", "Cecelia", "Kristen"],
	answer: 2
},{
	question: "What is the name of Michael's criminal alter-ego?",
	answerList: ["Crime Mike", "Bandana Scott", "Indigo Mike", "Prison Mike"],
	answer: 3
},{
	question: "What's the name of Angela's cat that Dwight killed?",
	answerList: ["Sprinkles", "Peppin", "Boots", "Bandit Jr."],
	answer: 0
},{
	question: "Who was the manager at Dunder Mifflin before Michael?",
	answerList: ["Bob Vance", "Ed Truck", "Todd Packer", "Toby Flenderson"],
	answer: 1
},{
	question: "Which warehouse worker did Oscar have a crush on?",
	answerList: ["Roy", "Daryl", "Matt", "Mark"],
	answer: 2
},{
	question: "What was the name of the virtual assistant that was really just Dwight?",
	answerList: ["Dwight-o-matic", "Dwight2-D2", "Vir-Tron", "Compu-Tron"],
	answer: 3
},{
	question: "State that Michael moves to with Holly?",
	answerList: ["California", "Connecticut", "Colorado", "Oregon"],
	answer: 2
},{
	question: "Name of Jan's candle company.",
	answerList: ["Serendipity", "Serenity", "Placidity", "Tranquility"],
	answer: 1
},{
	question: "Item of Dwight's that Jim puts in Jello",
	answerList: ["Coffee Mug", "Phone", "Watch", "Stapler"],
	answer: 3
},{
	question: "What Halloween costume did Pam buy for Jim that he didn't want to wear?",
	answerList: ["Scream Mask", "Peter Pan", "Popeye", "King"],
	answer: 2
},{
	question: "What is the name of Jim's sports marketing business?",
	answerList: ["AthLead", "AthLeadic", "Halpert Sports Marketing", "AthLeap"],
	answer: 0
},{
	question: "While working from a portable workspace, what food did the staff go to get?",
	answerList: ["crepes", "funnel cakes", "candy apples", "pies"],
	answer: 3
},{
	question: "What restaurant does Michael describe as 'the new golfcourse'?",
	answerList: ["Applebees", "Chili's", "TGI Friday's", "Cracker Barrel"],
	answer: 1
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];

var messages = {
	correct: "Correct!",
	incorrect: "No! Please nooo!",
	endTime: "You ran out of time!",
	finished: "Let's see how many you got right."
}

var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	$('#currentQuestion').html('Question '+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}

	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} 
	else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} 
	else {
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} 
	else {
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over');
}
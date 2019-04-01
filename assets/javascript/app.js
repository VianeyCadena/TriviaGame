$(document).ready(function(){
    $("#startBtn").on("click", gameState.startTimer);
});

//Array with all the questions, options, and answers

var questionsBank = [{
    ques: "Pregunta uno",
    ans: ["optionA", "optionB", "optionC", "optionD"],
    correct: "optionA",
},
{
    ques: "Pregunta dos",
    ans: ["optionA", "optionB", "optionC", "optionD"],
    correct: "optionA",
},
{
    ques: "Pregunta tres",
    ans: ["optionA", "optionB", "optionC", "optionD"],
    correct: "optionA",
},
{
    ques: "Pregunta cuatro",
    ans: ["optionA", "optionB", "optionC", "optionD"],
    correct: "optionA",
},
{
    ques: "Pregunta cinco",
    ans: ["optionA", "optionB", "optionC", "optionD"],
    correct: "optionA",
},
{
    ques: "Pregunta seis",
    ans: ["optionA", "optionB", "optionC", "optionD"],
    correct: "optionA",
},
{
    ques: "Pregunta siete",
    ans: ["optionA", "optionB", "optionC", "optionD"],
    correct: "optionA",
},
{
    ques: "Pregunta ocho",
    ans: ["optionA", "optionB", "optionC", "optionD"],
    correct: "optionA",
},
{
    ques: "Pregunta nueve",
    ans: ["optionA", "optionB", "optionC", "optionD"],
    correct: "optionA",
},
{
    ques: "Pregunta diez",
    ans: ["optionA", "optionB", "optionC", "optionD"],
    correct: "optionA",
}
]

//start functions of the start-button

var gameState = {

    timeRemaining : 60,

    startTimer: function() {
        $("#counter").text("Time remaining: " + gameState.timeRemaining);
        setInterval(gameState.countdown, 1000);
        $("#startPage").hide();
        trivia.displayQuestions();
    },

    countdown: function() {
        gameState.timeRemaining--;
        $("#counter").text("Time Remaining: " + gameState.timeRemaining);
        if (gameState.timeRemaining === 0) {
            gameState.stopTimer();
            $("#counter").empty();
        }
    },

    stopTimer: function() {
        clearInterval();
        trivia.checkAnswers();
    },

    showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
        $("#result-box").show();
        $("#questions-box").empty();
        $("#counter").empty();
        $("#counter").hide();
        $("#correctAnswer").text("Corrects: " + numCorrect);
        $("#wrongAnswer").text("Incorrect: " + numIncorrect);
        $("#unanswer").text("Unanswered: " + numUnanswered);

    }
}


var trivia = {

    displayQuestions: function() {
        var divContainer = $("#questions-box");
        var answerGroup = $(".form-check");
        divContainer.append("<h2>Answer the following questions:</h2>");

        for (var i = 0; i < questionsBank.length; i++) {

            divContainer.append("<div id='question'>" + questionsBank[i].ques + "</div>");

            var answer1 = questionsBank[i].ans[0];
            var answer2 = questionsBank[i].ans[1];
            var answer3 = questionsBank[i].ans[2];
            var answer4 = questionsBank[i].ans[3];

            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer4 + '</label></div>');

        }

        var doneButton = $("#doneBtn");
        divContainer.append(doneButton);
        $("#doneBtn").on("click", gameState.stopTimer);
    },

    checkAnswers: function() {
        var correctAnswer;
        var userAnswer;
        var numCorrect = 0;
        var numIncorrect = 0;
        var numUnanswered = 0;

        for (var i = 0; i < questionsBank.length; i++) {
            correctAnswer = questionsBank[i].correct;
            userAnswer = $('input[id=radio'+i+']:checked + label').text();

            if (userAnswer === correctAnswer) {
                numCorrect++;
            }else if (userAnswer === "") {
                numUnanswered++;
            }else if (userAnswer !== correctAnswer) {
                {
                    numIncorrect++;
                }

            }
        }

        gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
}

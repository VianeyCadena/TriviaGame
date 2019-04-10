$(document).ready(function(){
    $("#startBtn").on("click", gameState.startTimer);
});

//Array with all the questions, options, and answers

var questionsBank = [{
    ques: "Escuela fundada en 1919 en Alemania, considerada como la cuna del diseño moderno",
    ans: ["Escuela de Chicago", "Bauhaus", "INBA", "Universidad de Yale"],
    correct: "Bauhaus",
},
{
    ques: "¿Qué es la estética?",
    ans: ["El gusto del artista", "La opinión del espectador", "Doctrina filosófica del arte", "Lo que es bello"],
    correct: "Doctrina filosófica del arte",
},
{
    ques: "¿Cuál de los siguientes términos corresponden a la anatomía de la letra?",
    ans: ["Ápice, espolón, ojal", "Medianil, margen, calle", "Tracking y kerning", "Sans, Sans Serif"],
    correct: "Ápice, espolón, ojal",
},
{
    ques: "En tipografía: Grupo de signos escriturales que comparten rasgos de diseño comunes",
    ans: ["Anatomía de la letra", "Manual tipográfico", "Tipos de letras", "Familia tipográfica"],
    correct: "Familia tipográfica",
},
{
    ques: "Es un grupo de reglas básicas en la mezcla de percepción de colores para conseguir el efecto deseado",
    ans: ["Psicología del color", "Teoría del color", "Colores complementarios", "Triada"],
    correct: "Teoría del color",
},
{
    ques: "¿Cuáles son los llamados colores luz?",
    ans: ["CMYK: Cian, Magenta, Amarillo y Negro", "Colores primarios", "Colores secundarios", "RGB: Red, Green, Blue"],
    correct: "RGB: Red, Green, Blue",
},
{
    ques: "¿Cuáles son los colores pigmento?",
    ans: ["Tintas acuosas", "CMYK: Cian, Magenta, Amarillo y Negro", "RGB: Red, Green, Blue", "Monocromias"],
    correct: "CMYK: Cian, Magenta, Amarillo y Negro",
},
{
    ques: "¿Qué es la asimetría?",
    ans: ["Desequilibrio", "Diferencia entre partes", "Desequilibrio visual", "Desigualdad entre las partes de un todo"],
    correct: "Desigualdad entre las partes de un todo",
},
{
    ques: "Disposición de los distintos elementos dentro del espacio visual de manera equilibrada y ordenada",
    ans: ["Composición", "Estética", "Simetria", "Mensaje"],
    correct: "Composición",
},
{
    ques: "Disciplina que se ocupa del estudio comparativo de los sistemas de signos",
    ans: ["Sintaxis", "Semantica", "Semiótica", "Estética"],
    correct: "Semiótica",
}
]

//start functions of the start-button

var gameState = {

    timeRemaining : 90,

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

            divContainer.append('<div class="form-check"> <input class="form-check-input" type="radio" name="radio-group'+ i +'" id="radio'+ i +'"><label class="form-check-label" id="radio'+ i +'label" for="radio'+ i +'">' + answer1 + '</label></div>');
            divContainer.append('<div class="form-check"> <input class="form-check-input" type="radio" name="radio-group'+ i +'" id="radio'+ i +'"><label class="form-check-label" id="radio'+ i +'label" for="radio'+ i +'">' + answer2 + '</label></div>');
            divContainer.append('<div class="form-check"> <input class="form-check-input" type="radio" name="radio-group'+ i +'" id="radio'+ i +'"><label class="form-check-label" id="radio'+ i +'label" for="radio'+ i +'">' + answer3 + '</label></div>');
            divContainer.append('<div class="form-check"> <input class="form-check-input" type="radio" name="radio-group'+ i +'" id="radio'+ i +'"><label class="form-check-label" id="radio'+ i +'label" for="radio'+ i +'">' + answer4 + '</label></div>');

        }

        var doneButton = "<div id='divBtn'><button class='btn btn-primary' id='doneBtn' type='button'>Submite</button></div>";
        divContainer.append(doneButton);
        $("#doneBtn").on("click", gameState.stopTimer)
        console.log(doneButton);
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

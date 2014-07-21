(function () {
  function BusinessLogic() {

  var currentQuestion = 0;

  function getCurrentQuestion(index) {
    if (!index) { index = currentQuestion }
    currentQuestion = index
    return questionsAnswers[index]['question'];
  }

  function validateAndShowAnswer(answer) {
    var correct_answer = questionsAnswers[currentQuestion]['answer'];
    var correct  = (answer === correct_answer);
    return [correct, correct_answer];
  };

  function nextQuestion() {
    currentQuestion++;
  };

  function previousQuestion() {
    currentQuestion--;
  };

  return {question  : getCurrentQuestion,
          next      : nextQuestion,
          previous  : previousQuestion,
          testAnswer: validateAndShowAnswer};
})();

function displayAnswerField() {


$(document).on('click', '.start', function () {
  $('.start').css('display', 'none');
  $('.question').text(questions.question());
});

$('#container').on('click', '.previous-question', function () {
  questions.previous();
  $('.question').text(questions.question());
});

$('#container').on('click', '.next-question', function () {
  questions.next();
  $('.question').text(questions.question());
});

$('#container').on('click', '.submit-answer', function () {
  correct = questions.testAnswer($('.answer').val());
  if (correct) {
    
  }
  
});
})();

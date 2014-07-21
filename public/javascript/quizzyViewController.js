(function () {
  var questionPanelHTML = $('.question-panel').html()
    , questionPanel     = _.template(questionPanelHTML);

  var answerPanelHTML   = $('.answer-panel').html()
    , answerPanel       = _.template(answerPanelHTML);

  var DisplayQuestion = Backbone.View.extend((function (){

    function displayQuestion() {
      this.$el.html( this.questionTemplate( this.model.toJSON() ) );
      return this;
    };

    function testAnswer() {
      this.$el.html( this.template

    return {
      render            : displayQuestion,
      template          : questionPanel,

      events            : {
        "click .submit-answer"  : "testAnswer"
 
    }

    function PreviousQuestion() {
    };

    function NextQuestion() {
    };

    function

    return {
      render            : Render,
      template          : displayQuestion,
      previousQuestion  : PreviousQuestion,
      nextQuestion      : NextQuestion,

      events            : {
        "click .previous-question" : "previousQuestion",
      }

    }
  })());

  window.people


})();












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

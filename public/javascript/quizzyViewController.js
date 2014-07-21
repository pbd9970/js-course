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

    function submitAnswer() {
      answer = this.$el.val();
      return quizzy.isCorrect(answer, this.model.answer);
    };

    return {
      render            : displayQuestion,
      template          : questionPanel,

      events            : {
        "click .submit-answer"  : "testAnswer",
      }
    }
  })();)

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

  window.quiz


})();

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

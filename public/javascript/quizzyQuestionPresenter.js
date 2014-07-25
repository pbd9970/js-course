(function () {
  var DisplayQuestion = Backbone.View.extend((function (){

    function displayQuestion(quiz_id) {
      //console.log(this.collection);
      this.quiz_id = quiz_id;
      this.$el.html( this.questionTemplate( this.model.toJSON() ) );
      this.displayAnswerSubmitButton('answer');
      return this;
    };

    function displayAnswerSubmitButton(type) {
      var buttonJSON = {
        'answer': {left: {cssClass: 'previous-question',     display: 'Prev Question'},
                  right: {cssClass: 'submit-answer',         display: 'Submit Answer'}}
        ,'right': {left: {cssClass: 'reveal-answer success', display: 'Correct!'},
                  right: {cssClass: 'next-question',         display: 'Next Question'}}
        ,'wrong': {left: {cssClass: 'reveal-answer',         display: 'Reveal Answer'},
                  right: {cssClass: 'next-question',         display: 'Next Question'}}
      };

      this.$('.button-div').html( this.answerButtonTemplate( buttonJSON[type] ));
      return this;
    };

    function submitAnswer() {
      if (this.model.get('userAnswer')) {
        return this;
      }
      var userAnswer = this.$('.answer > input').val();
      this.model.set({'userAnswer': userAnswer}, {validate:true});
      var quizAnswer = this.model.get('answer');

      correct = quizzy.bl.isCorrect(userAnswer, quizAnswer);
      if (correct) {
        this.correctAnswer();
      }
      else {
        this.incorrectAnswer();
      }
      this.questionStats = quizzy.bl.trackQuestionStats(this.model.get('id'), correct);
      return this;
    };

    function scoreQuiz() {
    };

    function correctAnswer() {
      this.displayAnswerSubmitButton('right');
      this.$('.result-label').prepend("Correct!").addClass('correct');
      this.$('.result').text("You got it!").addClass('correct');
      this.model.set({'correct': true});
      return this;
    };

    function incorrectAnswer() {
      this.displayAnswerSubmitButton('wrong');
      this.$('.result-label').prepend("Incorrect").addClass('error');
      this.$('.result').text("Click left button for answer!").addClass('error');
      return this;
    };

    function revealAnswer() {
      var answerModel = this.model.toJSON();

      // Store question scores to model
      answerModel['questionScore'  ] = this.questionStats[0];
      answerModel['questionCorrect'] = this.questionStats[1];
      answerModel['questionTotal'  ] = 
      quizzy.bl.computeScore(answerModel.answeredCorrectly, answerModel.answeredQuestions);

      // Store quiz scores to answer model
      answerModel['quizScore'  ] = this.collection.get('answeredQuestions');
      answerModel['quizCorrect'] = this.collection.get('answeredCorrectly');
      answerModel['quizTotal'  ] = quizzy.bl.computeScore(answerModel.answeredCorrectly, answerModel.answeredQuestions);

      this.$el.append( this.answerModalTemplate(answerModel) );
      this.$('#answerModal').foundation('reveal', 'open');
      return this;
    };

    //The final values passed to the Backbone View
    return {
      render                    : displayQuestion,
      displayAnswerSubmitButton : displayAnswerSubmitButton,
      questionTemplate          : quizzy.questionPanel,
      answerButtonTemplate      : quizzy.answerButtons,
      answerModalTemplate       : quizzy.answerPanel,
      submitAnswer              : submitAnswer,
      revealAnswer              : revealAnswer,
      correctAnswer             : correctAnswer,
      incorrectAnswer           : incorrectAnswer,

      events                    : {
        "click .submit-answer"  : "submitAnswer",
        "click  .reveal-answer" : "revealAnswer"
      }
    }
  })());

  quizzy.DisplayQuestion = DisplayQuestion;

})();

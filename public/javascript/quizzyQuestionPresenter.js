(function () {
  var DisplayQuestion = Backbone.View.extend((function (){

    function displayQuestion(quiz_id) {
      this.quiz_id = quiz_id;
      this.$el.html( this.questionTemplate( this.model.toJSON() ) );
      this.displayAnswerSubmitButton('answer');
      return this;
    };

    function displayAnswerSubmitButton(type) {
      var buttonJSON = {
        'answer': {left: {cssClass: 'previous-question',     display: 'Prev Question'},
                  right: {cssClass: 'submit-answer',         display: 'Submit Answer'}},
        'right' : {left: {cssClass: 'reveal-answer success', display: 'Correct!'},
                  right: {cssClass: 'next-question',         display: 'Next Question'}},
        'wrong' : {left: {cssClass: 'reveal-answer',         display: 'Reveal Answer'},
                  right: {cssClass: 'next-question',         display: 'Next Question'}}
      };

      this.$('.button-div').html( this.answerButtonTemplate( buttonJSON[type] ));
      return this;
    };

    function submitAnswer() {
      this.model.userAnswer = this.$('.answer > input').val();
      var correctAnswer = this.model.get('answer')
      correct = quizzy.bl.isCorrect(userAnswer, correctAnswer);
      if (correct) {
        this.correctAnswer();
      }
      else {
        this.incorrectAnswer();
      }
      this.questionStats = quizzy.bl.trackQuestionStats(this.model.get('id'), correct);
      this.quizStats     = quizzy.bl.keepScore(this.quiz_id, correct);
      return this;
    };

    function correctAnswer() {
      this.displayAnswerSubmitButton('right');
      this.$('.result-label').prepend("Correct!").addClass('correct');
      this.$('.result').text("You got it!").addClass('error correct');
      return this;
    };

    function incorrectAnswer() {
      this.displayAnswerSubmitButton('wrong');
      this.$('.result-label').prepend("Incorrect").addClass('error');
      this.$('.result').text("Click left button for answer!").addClass('error success');
      return this;
    };

    function revealAnswer() {
      var answerModel = this.model.toJSON();

      // Compute average and store to model
      var questionStatsAvg = parseFloat(this.questionStats[0]) / parseFloat(this.questionStats[1]) * 100;
      this.questionStats.push( Math.round(questionStatsAvg) );
      answerModel['questionStats'] = this.questionStats;

      // Compute average and store to model
      var quizStatsAvg = parseFloat(this.quizStats[0]) / parseFloat(this.quizStats[1]) * 100;
      this.quizStats.push( Math.round(quizStatsAvg) );
      answerModel['quizStats'] = this.quizStats;

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
        "submit .submit-answer"  : "submitAnswer",
        "click  .reveal-answer"  : "revealAnswer"
      }
    }
  })());

  quizzy.DisplayQuestion = DisplayQuestion;

})();

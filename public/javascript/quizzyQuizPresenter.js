(function () {
  var QuizPresenter = Backbone.View.extend((function () {

    function initialize() {
      this.collection.on('reset', function(index) {
        this.quiz_id = _.uniqueId('quiz_');
        this.index = 0;
        this.displayCurrentQuestion();
      }, this);
    };

    function getCurrentQuestion () {
      return this.collection.at(this.index);
    };

    function displayCurrentQuestion () {
      this.$el.empty();
      var questionView = new quizzy.DisplayQuestion({
        model: this.getCurrentQuestion()
      });
      this.$el.html(questionView.render(this.quiz_id).el);
    };

    function nextQuestion() {
      this.index++;
      if (this.index < this.collection.length) {
        this.displayCurrentQuestion();
      } else {
        this.quizOver();
      }
      return this;
    };

    function previousQuestion() {
      if (!(this.index <= 0)) {
        this.index--;
        this.displayCurrentQuestion();
      } else {
        console.log("ERROR: CAN'T GO BACK FROM HERE");
        return this;
      }
    };

    function quizOver() {
      console.log("GAME OVER");
      this.$el.text("GAME OVER");
      quizResults = {}
      quizResults.name = this.name;

      quizzy.bl.hasHigherValue(quizzy.bl.get);
      console.log(this);
      console.log
      //quizzy.bl.logUserResult
      quizzy.reset();
      return this;
    };

    //The final values passed to the Backbone View
    return {
      initialize              : initialize,
      displayCurrentQuestion  : displayCurrentQuestion,
      getCurrentQuestion      : getCurrentQuestion,
      nextQuestion            : nextQuestion,
      previousQuestion        : previousQuestion,
      quizOver                : quizOver,
      quizReset               : quizzy.reset,

      events                  : {
        "click .next-question"      : "nextQuestion",
        "click .previous-question"  : "previousQuestion",
        "click .reset-quiz"         : "quizReset",
      }
    }
  })());

  quizzy.quiz = new QuizPresenter({
    el         : ".quiz-app",
    collection : quizzy.questions
  }); 

})();

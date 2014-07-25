(function () {
  var QuizPresenter = Backbone.View.extend((function () {

    function initialize() {
      this.collection.on('reset', function() {
        this.quiz_id = 'quiz_' + _.random(10,99);
        this.index = 0;
        this.displayCurrentQuestion();
      }, this);

      this.collection.on('change:userAnswer', function() {
        this.collection.answeredQuestions = _.filter( this.collection.models, function(model) { return model.has('userAnswer'); } );
        this.collection.answeredCorrectly = _.filter( this.collection.answeredQuestions, function(model) { return model.get('correct') === true; });;
      }, this);
    };

    function getCurrentQuestion () {
      return this.collection.at(this.index);
    };

    function displayCurrentQuestion () {
      this.$el.empty();
      var questionView = new quizzy.DisplayQuestion({
        model: this.getCurrentQuestion(),
        collection: this.collection
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
      var message = "GAME OVER"; 
      finalScore = quizzy.bl.computeScore( this.collection.answeredCorrectly, this.collection.answeredQuestions );
      highScore = quizzy.bl.getUserHighScore(quizzy.name);
      if ( quizzy.bl.isHighScore( [finalScore, this.collection.answeredCorrectly], highScore )) {
        message += " Congratulations! You set a new high score!";
        quizzy.bl.setUserHighScore(quizzy.name, finalScore, this.collection.answeredCorrectly); 
      }

      this.$el.text(message);
      //this.$el.html( this.questionTemplate( this.model.toJSON() ) );
      quizResults = {}
      quizResults.name = quizzy.name;

      quizzy.bl.hasHigherValue(quizzy.bl.get);
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
        "click  .reveal-answer"     : "revealAnswer"
      }
    }
  })());

  quizzy.quiz = new QuizPresenter({
    el         : ".quiz-app",
    collection : quizzy.questions
  }); 

})();

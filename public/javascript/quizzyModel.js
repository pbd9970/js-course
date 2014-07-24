(function () {
  var Question = Backbone.Model.extend({
    defaults : {
      "correct"     : false,
      "userAnswer"  : undefined
    }
  });

  var Questions = Backbone.Collection.extend({
    model: Question
  });

  quizzy.questions = new Questions();
})();

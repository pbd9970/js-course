(function () {
  var Question = Backbone.Model.extend();

  var Questions = Backbone.Collection.extend({
    model: Question
  });

  quizzy.questions = new Questions();
})();

(function () {
  var Question = Backbone.Model.extend({
    defaults : {
      "correct"     : false,
    },

    validate : function(attrs, options) {
      if (this.has('userAnswer')) {
        return "You've already answered this question!";
      }
    }
  });

  var Questions = Backbone.Collection.extend({
    model: Question
  });

  quizzy.questions = new Questions();
})();

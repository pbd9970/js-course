(function () {
  window.questionsAnswers = [
    { question : "question1"
      , answer : "answer1"
    },
    { question : "question2"  
      , answer : "answer2"
    },
    { question : "question3"
      , answer : "answer2"
    },
    { question : "question4"
      , answer : "answer4"
    },
    { question : "question5"
      , answer : "answer5"
    },
    { question : "question6"
      , answer : "answer6"
    },
    { question : "question7"
      , answer : "answer7"
    },
    { question : "question8"
      , answer : "answer8"
    },
    { question : "question9"
      , answer : "answer9"
    },
    { question : "question10"
      , answer : "answer10"
    }
  ];

  var Question = Backbone.Model.extend();

  var Questions = Backbone.Collection.extend({
    model: Question
  });

  window.questions = new Questions();
})();

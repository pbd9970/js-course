(function () {

  var questionPanelHTML = $('.question-panel').html()
  quizzy.questionPanel  = _.template(questionPanelHTML);

  var answerButtonsHTML  = $('.answer-buttons').html()
  quizzy.answerButtons   = _.template(answerButtonsHTML);

  var answerPanelHTML   = $('.answer-modal').html()
  quizzy.answerPanel    = _.template(answerPanelHTML);

})();

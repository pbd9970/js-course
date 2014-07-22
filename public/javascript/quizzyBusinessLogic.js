(function () {
  function BusinessLogic() {

    var scores = {}

    this.isCorrect = function (answer, correctAnswer) {
      return answer.toLowerCase() === correctAnswer.toLowerCase();
    };

    this.trackQuestionStats = function (questionId, answerIsCorrect) {
      // Score is kept by array [correctAnswers, totalQuestions]
      var localQuestionStats = [0, 0];
      var ls = localStorage.getItem(questionId);
      if (ls) {
        ls = ls.split(',');
        localQuestionStats = _.map(ls, function(num) {return parseInt(num)});
      }
      localQuestionStats[0] += answerIsCorrect;
      localQuestionStats[1] ++;
      localStorage.setItem(questionId, localQuestionStats)
      return localQuestionStats;
    };

    this.keepScore = function (quizId, answerIsCorrect) {
      // Score is kept by array [correctAnswers, totalQuestions]
      var score = scores[quizId] || [0, 0];
      score[0] += answerIsCorrect;
      score[1] ++;
      scores[quizId] = score;
      return score.slice();
    };
  };

  quizzy.bl = new BusinessLogic();

})();

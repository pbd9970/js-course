(function () {
  function BusinessLogic() {

    var scores = {}

    this.isCorrect = function (answer, correctAnswer) {
      return answer.toLowerCase() === correctAnswer.toLowerCase();
    };

    this._sanitizeArray = function (score) {
      scoreStr = score.toString();
      scoreStr = scoreStr.replace(/[\[\]]/g, ''); // Remove any stringified brackets
      scoreArray = scoreStr.split(',');
      return _.map(scoreArray, function(n) { return parseInt(n) } );
    };

    this._computeScore = function (score, answerIsCorrect) {
      scoreArray = this._sanitizeArray(score);
      if (typeof answerIsCorrect !== 'undefined') {
        scoreArray[0] += answerIsCorrect;
        scoreArray[1] ++;
        newScoreAvg = ( parseFloat(scoreArray[0]) / parseFloat(scoreArray[1]) ) * 100;
        scoreArray[2] = parseInt(newScoreAvg);
      }
      return scoreArray;
    };
      
    this.trackQuestionStats = function (questionId, answerIsCorrect) {
      // Score is kept by array [correctAnswers, totalQuestions, percentCorrect]
      var localQuestionStats = localStorage.getItem(questionId) || [0, 0, 0];
      localQuestionStats = this._computeScore(localQuestionStats, answerIsCorrect);

      localStorage.setItem(questionId, localQuestionStats)
      return localQuestionStats;
    };

    this.keepScore = function (quizId, answerIsCorrect) {
      // Score is kept by array [correctAnswers, totalQuestions, percentCorrect]
      var score = scores[quizId] || [0, 0, 0];
      score = this._computeScore(score, answerIsCorrect);

      scores[quizId] = score;
      return score.slice();
    };

    this.getScore = function (quizId, returnObj) {
      returnObj = returnObj || {};
      score = scores[quizId];
      returnObj.correctAnswers = score[0];
      returnObj.totalQuestions = score[1];
      returnObj.percentCorrect = score[2];
      return returnObj;
    };

    this.logUserResults = function (name, quizId) {
      // Returns an array [correctAnswers, percentCorrect]
      name = name.toLowerCase();
      var score = scores[quizId];
      score = this._computeScore(score, answerIsCorrect);

      localStorage.setItem(name, [score[0], score[2]]);
      return [score[0], score[2]];
    };

    this.getUserHighScore = function(name) {
      var userHighScore = localStorage.getItem( name.toLowerCase() ) || [0, 0];
      return this._sanitizeArray(userHighScore);
    };

    this.hasHigherValue = function(valueArray, testArray) {
      // Returns true if correctAnswers or percentCorrect match or exceed all-time high for user.
      var result = false;
      index = resultArray.length;
      while (index--) {
        if (currentResultArray[index] >= userHighScoreArray[index]) {
          result = true;
        }
      }
      return result;
    };
  };

  quizzy.bl = new BusinessLogic();

})();

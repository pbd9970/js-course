(function () {
  function BusinessLogic() {

    this.isCorrect = function (answer, correctAnswer) {
      return answer.toLowerCase() === correctAnswer.toLowerCase();
    };

    this._sanitizeArray = function (score) {
      scoreStr = score.toString();
      scoreStr = scoreStr.replace(/[\[\]]/g, ''); // Remove any stringified brackets
      scoreArray = scoreStr.split(',');
      return _.map(scoreArray, function(n) { return parseInt(n) } );
    };

    this.compareArrays = function(array1) {
      var index = array1.length;
      while (index--) {
        test = array1[index];
        _.each( arguments, function(array) {
          if (!array[index] && array[index] !== test) {
            return false;
          }
        });
      }
      return true;
    };

    this.computeScore = function(correctAnswers, totalQuestions) {
      if ( Array.isArray( correctAnswers ) ) { correctAnswers = correctAnswers.length; }
      if ( Array.isArray( totalQuestions ) ) { totalQuestions = totalQuestions.length; }

      score = 100 * ( parseFloat(correctAnswers) / parseFloat(totalQuestions) );
      return parseInt(score);
    };

    this.trackQuestionStats = function (questionId, answerIsCorrect) {
      // Score is kept by array [correctAnswers, totalQuestions]
      var localQuestionStats = localStorage.getItem(questionId) || [0, 0];
      localQuestionStats[0] += answerIsCorrect;
      localQuestionStats[1] ++;

      localStorage.setItem(questionId, localQuestionStats)
      return localQuestionStats;
    };

    this.setUserHighScore = function (name, userScore, numberCorrect) {
      // Returns true if successful
      if (!name || !userScore || !numberCorrect) { return false; }

      name = name.toLowerCase();

      localStorage.setItem(name, [userScore, numberCorrect]);
      return this.compareArrays([userScore, numberCorrect], this.getUserHighScore(name) );
    };

    this.getUserHighScore = function(name) {
      var userHighScore = localStorage.getItem( name.toLowerCase() ) || [0, 0];
      return this._sanitizeArray(userHighScore);
    };

    this.isHighScore = function(userScore, highScore) {
      // Returns true if percentCorrect exceeds all-time high or
      // if it matches and correctAnswers exceeds all-time high for user.
      if (userScore[0] === highScore[0]) {
        return userScore[1] > highScore[1];
        }
      return userScore[0] > highScore[0];
    };
  };

  quizzy.bl = new BusinessLogic();

})();

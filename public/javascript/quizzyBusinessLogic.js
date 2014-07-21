(function () {
  function BusinessLogic() {

  this.isCorrect(answer, correctAnswer) {
    return answer.toLowerCase() === correctAnswer.toLowerCase();
  };

  window.quizzy = new BusinessLogic();

})();

window.quizzy = {};

$('.start').on('click', function () {
  $('.start').hide('slow', function() {
    quizzy.questions.reset( quizzy.data, {reset:true} );
  });
});

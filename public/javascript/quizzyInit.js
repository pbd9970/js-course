window.quizzy = (function () {
  function init() {
    this.captureName( _init_.bind(this) );
  };

  function _init_(e) {
    this.name = e.target[0].value;
    $('.start > form').hide('slow', function() {
    quizzy.questions.reset( quizzy.data, {reset:true});
    });
  };

  function reset() {
    this.name = null;
    $('.start > button').show('slow');
    return;
  };

  function del() {
    this.name = null;
    return;
  };

  function captureName (callback) {
    $('.start > form').show('slow').on('submit', callback);
  };

  return {
    init            : init,
    _init_          : _init_,
    reset           : reset,
    del             : del,
    captureName     : captureName
  };

})();

$('.start > button').on('click', function () {
  $('.start > button').hide('slow', function() {
    quizzy.init();
  });
});

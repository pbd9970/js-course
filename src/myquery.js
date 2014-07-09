(function () {

  var QueryWrapper = function (elems) {

    this.get = function(index) {
      console.log(elems);
      console.log("index: " + index);
      return elems[index];
    };

    this.length = elems.length;

    this.each = function (func) { myQuery.each(elems, func); }

    this.css = function(
  };

  var myQuery = function (selector) {
    var elements;

    switch (selector.slice(0,1)) {
      case "." :
        elements = document.getElementsByClassName(selector.slice(1));
        break;
      case "#" :
        elements = new Array(document.getElementById(selector.slice(1)));
        break;
      default :
        elements = document.getElementsByTagName(selector);
        break;
    }

    return new QueryWrapper(elements);
  };
  
  myQuery.each = function (array, func) {
    for (var i=0; i<array.length; i++) {
      func(array[i]);
    }
  };

  myQuery.version = 'beta';
  window.$ = myQuery;

})();

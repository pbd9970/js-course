var endpointCount = 77;
var returnArray = [];
var ajaxCalls = {};
for (var i = 0; i < endpointCount; i++) {
  (function (i) {
    returnArray.push(undefined);
    ajaxCalls[i] = false;
    $.ajax({
      type: 'GET',
      url: '/' + i,
      dataType: 'json',
      success: function(valueObject) {
        ajaxCalls[i] = true;
        valString = "";
        for (val in valueObject) {
          valString += valueObject[val];
        }
        returnArray[i] = valString;

        // Test if complete
        var test_complete = true;
        for (i in ajaxCalls) {
          test_complete = test_complete && ajaxCalls[i];
        }
        if (test_complete) {
          $('#container').css("white-space", "pre");
          $('#container').text(returnArray.join('')).trim();
        }
      }
    });
  })(i);
}


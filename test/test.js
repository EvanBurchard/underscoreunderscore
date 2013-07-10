var wish = require('wish');
var __ = require("../__");

suite("__ tests", function(){
  test("should confirm that the test file can be retrieved", function(){
    __.init();
    wish(__.file.match(/.*test.js/));
  });
  test("should confirm that line and column correspond to the following init function call", function(){
    __.init();
    wish(__.line == 10);
    wish(__.column == 8);
  });
  test("should confirm that the caller is not test.js", function(){
    __.init();
    wish(!__.caller.file.match(/.*test.js/));
  });
  test("should confirm that the caller has line and column numbers", function(){
    __.init();
    wish(__.caller.line.match(/[0-9]*/));
    wish(__.caller.column.match(/[0-9]*/));
  });
  test("should confirm that traces are arrays (objects)", function(){
    __.init();
    wish((typeof __.trace.files) == "object");
    wish((typeof __.trace.list) == "object");
  });
});

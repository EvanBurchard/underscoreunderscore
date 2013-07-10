var fs = require('fs');
var esprima = require('esprima');

var createLineFromErrorObject = function(){
  var stackLevel = 7;
  var line = {};
  line.full = getErrorObject().stack.split("\n")[stackLevel];
  line.fileName = line.full.match(/(\/.*\.js)/)[1];
  line.number = line.full.match(/.js:([0-9]*)/)[1];
  return line;
};

var getErrorObject = function(){
  try {
    throw Error('');
  } catch(err) {
    return err;
  }
};

var parseLine = function(content, lineNumber){
  // TODO: fix for lines with multiple function calls (e.g. func1(); test(); func3(); )
  return content.split("\n")[lineNumber].match(/\((.*)\)/)[1];
};

var parseExpression = function(content, lineNumber){
  //console.log(contentParsed);
  
  // TODO: fix for lines with multiple function calls (e.g. func1(); test(); func3(); )

  var lines = content.split("\n");

  var restOfContent = lines.slice(lineNumber, lines.length).join("");
  //console.log(restOfContent);

  var expression= lines[lineNumber].match(/\((.*)\)/)[1];
  return expression;
};

module.exports = function(){
  var line = createLineFromErrorObject();
  var content = fs.readFileSync(line.fileName, "utf8");
  return parseExpression(content, line.number-1);
};

module.exports = (function(){
  return {
    trace: {},
    init: function(){
      var set = function(){ try { throw Error(''); } catch(err) { return err; } };
      this.trace.list = set().stack.split("\n");
      this.trace.files = [];
      var j = 0;
      for(var i = 0; i < this.trace.list.length; i++){
        try{
          var fileName = this.trace.list[i].match(/\((.*)\)/)[1];
        }catch(e){};
        if(fileName != null && fileName != "" && fileName != "unknown source" && fileName != "native" && !fileName.match("module.js") && !fileName.match(/.*__.js/)){
          try{
            this.trace.files[j] = [fileName, fileName.match(/(.*):.*:.*/)[1], fileName.match(/:([0-9]*)/)[1], fileName.match(/:[0-9]*:([0-9]*)/)[1]];
          }catch(e){
            this.trace.files[j] = fileName;
          };
          j++;
        };
      };

      this.file = this.trace.files[0][1];
      this.line = this.trace.files[0][2];
      this.column = this.trace.files[0][3];

      var callerFileNumber;
      for (var k = 0; k < this.trace.files.length; k++){
        if(this.file != this.trace.files[k][1]){
          callerFileNumber = k;
          break;
        }
      };

      if(callerFileNumber==undefined){
        this.caller = null;
      } else{
        this.caller = {
          file: this.trace.files[callerFileNumber][1],
          line: this.trace.files[callerFileNumber][2],
          column: this.trace.files[callerFileNumber][3]
        }
      }
    }
  }
})();

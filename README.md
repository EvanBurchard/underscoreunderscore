## Note
There are other approaches to this in node by using the __file global variable and the console.trace() function.  For getting true cross-browser functionality, you might want something like this: https://github.com/eriwen/javascript-stacktrace

## Across browsers and node however, this is how you get a stack trace

    function(){{ try { throw Error(''); } catch(err) { return err; } }; };

That'll give you a stack trace (as a string), but for just the relevant data, __ comes to the rescue.

## Setup
    npm install -g underscoreunderscore
    var __ = require("underscoreunderscore");
    __.init();

## Getting Info
You can get files like this:

    __.trace.files;
You can get the whole stack trace like this:

    __.trace.list;

You can get the whole file (+line and column numbers) like this:

    __.file;
    __.line;
    __.column;

Lastly, you can grab the filename that executed code before like this:

    var callingFile  = __.caller;
    callingFile.file;
    callingFile.line;
    callingFile.column;

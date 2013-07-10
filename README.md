The `__FILE__` magic variable has a fairly long history, but sadly, it's nowhere to be found in JavaScript.

So what do you do if you want to figure out what file you're executing in js?  Basically, the only option is to throw an error.

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

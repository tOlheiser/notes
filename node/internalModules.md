# Internal Modules

**How to require internal modules:**
```javascript
const fs = require('fs')
// A lack of a dot in front of the module name indicates to node that it is not a relative file path.
```

Ensure you read the documentation to see the compatibility of these modules with the version of node you're using.

## File System / 'fs'

**fs** - This refers to the file system module, which allows you to interact with files on a machine. 

**Reading a file**
```javascript
const file = fs.readFileSync('./lib.js', {encoding: 'utf-8'}).toString()

console.log(file)
```

This just returns the contents of the file as a string. 

**Writing to a file**
```javascript
fs.writeFileSync('./lib.js', 'var me = "me"')
```

This will overwrite the contents of lib.js to the 2nd argument that was assigned in the writeFileSync function. If you instead want to add to it, use an append function. 

### http
http is a module used for creating network based programs like APIs. 

### Path
Path is a module that normalizes relative file paths so that it is compatible for all operating systems. You would use this module anywhere you're using a relative file path (except in require statements, where path is built in).

```javascript
path.join('../../hello', 'app;', '../things')
```

## Remote Modules
Download and use other modules from the internet.






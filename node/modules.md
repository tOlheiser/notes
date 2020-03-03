# Modules

Modules are encapsulated code.

When you create a function, Nodejs injects its globals into it:
```javascript
let module1 = (function(exports, require, module, __filename, __dirname){
    // ... code here
})
```

## Creating Modules

All you have to do is write regular code, and export it. You do this with the **module** global object provided to you be the Nodejs runtime. 

**Using ES6 Exports**
```javascript
// math.js
export const add = (num, num2) => {num + num2};
```

**CommonJS Exports**
```javascript
// math.js
const add = (num, num2) => {num + num2};

module.exports = add;
```

**Module.exports**
This is essentially an object that you want to store all the values you wish to export.

```javascript
module.exports = {add, {}, value: 1}
```

If you have already declared module.exports, but you want to add a property to it, you could easily write:

```javascript
module.exports.subtract = (num, num2) => {}
```

*Don't mix and match syntax. import/export go together, require() and module.exports go together.*

## Importing Modules

```javascript
// lib.js
module.exports = () => {
    console.log('name')
}

//app.js
const nameFn = require('./lib');

nameFn();

```

## Overview of Importing Modules

**Custom local modules**
```javascript
var lib = require('../rel/path/to/lib') // must use the '.' first.
```

**Remote Modules & Shipping Modules**
```javascript
var lib = require('lib') 
// the same name you used to install it with npm for remote modules.
```



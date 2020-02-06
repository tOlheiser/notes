# Node.js & NPM

## Benefits of Node & NPM
* Automation
* Organization
* Package Management

## Node.js

Things Node.js can do:
* Has access to the file system.
* Interact with databases.
* Send emails.
* Create and serve your own API.

### Node Demo

*touch "test.js"* - Create a test.js file inside the working directory. 
*node test.js* - Displays the contents of test.js inside of the command line.

**Generating an HTML File**
```javascript
var fs = require('fs');

fs.writeFile(__dirname + "/index.html", "<h1>HTML is great</h1>", function(error) {
    if (error) {
        return console.log(error);
    } else {
        return console.log("Congrats");
    }
});
```

Output: 
Returns "Congrats" in the console, and creates an HTML file.

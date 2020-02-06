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

**Downloading an IMG**
```javascript
var https = require('https');

var myPhotoLocation = url; 

https.get(myPhotoLocation, function(response) {
    response.pipe(fs.createWriteStream(__dirname + "/mydog.jpg"));
});
```

## NPM
NPM is a centralized place where developers share their code with the world.

To use a grocery store analogy:
IT would be time consuming to run to one store for one thing, and to another store for another thing, and so on. With a package manager, you can give your 'personal robot assistant' a grocery list, letting them do everything for you.

### NPM DEMO

*npm init -y* - Creates a package.json file, think of it as a grocery list.

With a package.json created, I ran the command: *npm install lodash*. It added this to my package.json file:

```javascript
"dependencies": {
    "lodash": "^4.17.15"
```

**Benefit of a grocery list:** Lets say we need to install all the dependencies for a project. When we run **npm install**, npm will **install all the dependencies specified in the package.json file**. 
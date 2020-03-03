# Node.js & NPM

Npm is a repository of modules, and it serves as a tool to manage them.

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

Starting off: **npm init -y**
* Creates a package.json file, think of it as a grocery list.
* Creates an empty 'node_modules' folder. 

**package.json** - This contains the meta information for your project. List of packages, the versions your project depends on, as well as how to run your project.  

**node_modules** - Whenever you install a package, the source code for that package will be stored inside this folder. Whenever you import a module into your file that isn't a file path, *import React from 'react'* your app will look inside the node_modules folder for the corresponding source code. 

With a package.json created, I ran the command: *npm install lodash*. It added this to my package.json file:

```javascript
"dependencies": {
    "lodash": "^4.17.15"
```

Installing a package: **npm install react**
*Adds react to node_modules, and react to dependencies to package.json*

### Dependencies & npm install

**dependencies** - These are packages your application needs to run. 
**devDependencies** - Packages your application needs during development.
*Using '--save-dev' installs the package as a dev dependency.*
**npm install** - Downloads all of the packages inside of both dependencies and devDependencies and places them inside of the node_modules folder. 

**Benefit of a grocery list:** Lets say we need to install all the dependencies for a project. When we run **npm install**, npm will **install all the dependencies specified in the package.json file**. 

### A Note on Saving Packages

**Difference between --save-dev and --save**
--save-dev is used to save the package for development purpose. Example: unit tests, minification..
--save is used to save the package required for the application to run.

For a more detailed answer, look at the 2nd highest rated answer: [stackoverflow](https://stackoverflow.com/questions/22891211/what-is-the-difference-between-save-and-save-dev)

**Save Globally**: *npm install module --global* 
Installing a package globally allows you to use the code in the package as a set of tools on your local computer. 

"Global install, instead puts the module into your Node.js path (OS dependent), and will be accessible from any project, without the need to install it separately for each." [stackoverflow](https://stackoverflow.com/questions/24606341/what-does-it-mean-to-npm-install-g) 

### Scripts

NPM scripts are used to automate tasks. Here's an example:

```javascript
"scripts": {
    "start": "webpack-dev-server --open",
    "build": "NODE_ENV='production' webpack",
}
```

Executing the script: **npm run [name of script]**
*npm run start - would start the webpack dev server.*

### Versioning

v.1.2.3

1 - Major version - Breaking changes
2 - Minor Version - New but not breaking feature
3 - Patch Version - Everything else

Making sense of carrots '^'
"^15.7.2" - Instructs npm to install the newest version of the package with the **same major**. 

"~15.7.2" - Instructs npm to install the newest version with the **same major and minor**.

Exact version: "15.7.2"
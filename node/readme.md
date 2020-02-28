# Node.js Intro

Node.js is an environment to run JavaScript outside the browser. 
* Has it's own runtime
* Built on Chrome's V8 JavaScript engine

**Node vs Ruby & Python**
From the instructor's perspective, JavaScript is more difficult to learn than Ruby & Python. However, once you get past that, it far exceeds the other languages when it comes to its community, package manager, and flexibility (seamless integration with the frontend). 

Node is not ideal for cpu intensive tasks such as Machine Learning, Learge Arithmentic, reading the File System synchronously.

**What can I create with Node.js?**
Pretty much anything a scripting and server language like python or ruby can, but with JavaScript.
* Tooling (build, automation)
* API (REST, Realtime, GraphQL) 
* CDNs
* Shareable libraries
* Desktop Applications (Electron)
* IOT

Install Node using the NVM

Running Node.js code: The REPL is for playing around, the cli is for everything else. Think of it as the console on the browser.

**CLI executable**:
To execute your node apps, point it to a javascript file.
```javascript
node path/to/your/file.js
```
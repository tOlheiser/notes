# Async Node

Nodejs is single threaded and has an event loop.

## Async / Await

This essentially takes your asynchronous code, and makes it synchronous.

```javascript
// async keyword is used in front of a function
const run = async() => {
    const results = await doAsyncThing() // must return a promise
    // won't move onto the next line until that promise resolves. 
    console.log('hello')
}
```

*If you have a lot of async operations, consider promises or promise.all()*

Client: Everyone has their own instance of the same app.
Server: One server for everyone. It handles a request from some sort of client (browser, mobile, app, another server, etc).

tldr; One server instance will handle many client requests. Compared to a client app where that code only cared about itself on the host machine. 
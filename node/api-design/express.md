# Intro to Express

```javascript
import express from 'express'
// We'll be using this app object that's created from express.
export const app = express()

// Performing a GET request to the index route ('/')
// the 2nd paramater is a controller function (req, res) =>
app.get('/', (req, res) => {
    // sending back some json
    res.send({ message: 'hello' })
})

// Sending data to the server with a POST request
app.post('/', (req, res) => {
    console.log(req.body)
    res.send({ message: 'ok' })
})
```

## Insomnia

This is a nice CLI tool to interact with your APIs. It's supposedly a better alternative to Postman, it has GraphQL supports and it's free!

* Create a new request
* Set your entry point into the address bar
* When making a POST request, specify how your data is being sent (JSON?)

## Deep dive into Routing & Middleware

Middleware - This allows you to execute functions on an incoming request with a quaranteed order, before your controllers. You'd use it in such operations as authenticating, transforming the request, tracking, and error handling.

Example of Middleware:
```javascript
// cross origin resource sharing.
app.use(cors())
// Allows you to use req.body
app.use(json())
// allows you to attach parameters to a URL
app.use(urlencoded({extended: true}))
// allows you to use logs
app.use(morgan('dev'))
```

None of the above middlewares respond to the request, they just transform the request and go to the next one. 

### Custom Middleware

**Next** - This is a function ensures that when that middleware does its thing, it moves on to the next middleware. 

If you have a piece of code that's doing something and not responding, it shouldn't be a route. It should be middleware that you register on a route somewhere.

```javascript
const log = (req, res, next) => {
    console.log('logging')
    next()
}
```

Implementation of the custom Log Middleware

If you wanted to run the Log middleware on a specific route:
```javascript
app.get('/data', log, (req, res) => {
```

If you wanted to run it for the entire server:
```javascript
app.use(log)
```

If you have multiple pieces of middleware you want to run, pass in an array:
```javascript
app.get('/data', [log, log, log], (req, res) => {
```

### REST Routes with Express

Express can match using
* Exact routes
* REGEX
* glob
* parameter

**PUT** - Very similar to POST, except where POST creates data, PUT updates data.

```javascript
app.put('/data', (req, res) => {
```

### Subrouting

Everything so far has been at the root-router level. Subrouters are great for having a different part of the api to have its own router, its own middleware stack, etc. 

**Creating a Router**
```javascript
const router = express.Router()
```

To use this router, **we need to mount it.**

**Mounting a router on the app**
```javascript
router.get('/me', (req, res) => {
    res.send({ me: 'hello'})
})

// Mounting it
app.use('/api', router)
```

If a response comes in for any verb that has 'api' on it, we'll use the newly created router.

### Chainable Route Handlers

This gives you a concise way of writing your route handlers.

```javascript
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```

**Exercise**

*The 'Router & Sub Routes' solution was great for demonstrating how to create and mount a router*. In the solution, he created a sub-router in a separate file, and gave it the path of '/'. He then imported this router, mounting it to the exact path he needed it to.

Essentially, let the mounting dictate the path.

#### CRUD Overview

```javascript
//CRUD
app.post() // Create
app.get() // Read
app.put() // Update
app.delete() // Delete
```
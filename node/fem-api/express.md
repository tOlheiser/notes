# Express

Tasks: 
* Create a route that sends back some json
* Create a route that accepts json and logs it
* Start the server

## Beginning Code
'app' is an express object.

```js
//server.js

import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

export const start = () => {}
```

## Changes
```js
import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// Task: Get some JSON
// app.get() corresponds to GET; an HTTP request
app.get('/', (req, res) => {
  res.send({ message: 'hello' })
})

// same structure, just a different method (post)
app.post('/', (req, res) => {
  // getting the data from the request body -> req.body
  console.log(req.body)
  // sending the data back in json form
  res.send({ message: 'ok' })
})

// start the server
export const start = () => {
  // pass in a port to app.listen
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
  // it connects to localhost on your machine, to the port you pass in. 
}

/* app.get('/') - ('/') refers to the index. So, when you get a GET request for the index, do something.

This is the controller; it is the function you want to execute based on the request. It takes up to three arguments:
 - req: request
 - res: response
 - next
() => {
  res.send({ message: 'hello' })
}

"When a GET request to the index '/' is made, we run a controller that sends a response containing a bit of json ({message: 'hello'})
*/
```

app.get('/') - ('/') refers to the index. So, when you get a GET request for the index, do something.


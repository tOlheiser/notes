# Intro to Express

```javascript
import express from 'express'
// We'll be using this app object that's created from express.
export const app = express()

// Performing a GET request
app.get('/', (req, res) => {
    res.send({message: 'hello'})
})


```
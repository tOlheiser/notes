# Routing

When a user visits a URL, you need to:
* Query the DB
* Filter through a list of stores
* Modify the data in some way
* When you have the data you need, send it to the user

**Wes Bos chooses to define all his routes in /routes/index.js**

```javascript
// index.js

const express = require('express'); // import express
const router = express.Router(); // grab the router off of express

// get the url '/' | run a callback function whenever someone visits this url
router.get('/', (req, res) => {
    res.send('Hey! it works!');
});

module.exports = router;
```

## Callback function

This callback function gives you 3 specific things:

**req** - The request; an object full of **information coming in**
**res** - The response; an object full of **methods for sending data back to the user.**
**next**

*An alternative to res.send is res.json, which allows you to send JSON back to the user.*

Push out data as JSON, on the client side we use AJAX to request that data.

### Working with res
res.send - 
res.json - Send a JSON doc 

**Pulling in values from the url:**
Given the URL: localhost:7777/?name=wes&age=100

```javascript
res.send(req.query.name)
```

**Pulling in all values from the url**
Given the same URL:

```javascript
res.json(req.query) // returns all the query params
```

This will return:
```javascript
{
    'name': 'kait',
    'age': '100'
}
```
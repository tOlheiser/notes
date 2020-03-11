# Authentication

You can never truly protect an API, but requesting authentication makes it safer. 

**Authentication** is controlling if an incoming request can proceed or not.

**Authorization** is controlling if an authenticated request has the correct permissions to access a resource.

**Identification** is determining who the requester is.

## JWT Authentications

Tokens passed on every request to check auth on the server. It allows the API to be stateless with user auth. It is created by a combination of secrets on the API and a payload like a user object.

## Sign Up using JWT
* Creates new JWT from user
* Validates JWT and returns payload
* requires email and password
* Creates user and sends new token from user

```javascript
// auth.js

export const signup = async (req, res) => {
    // First, checking to see if there is a email & password in the request & that it isn't null
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'Email and password required' })
    }
    
    // try/catch is used because sign ups are error prone. What if the username/email exists?
    try {
        const user = await User.create(req.body)
        // if the sign up is successful, create a token
        const token = newToken(user)
        // send the token
        return res.status(201).send({ token })
    } catch (e) {
        console.error(e)
        return res.status(400).end()
    }
}

// .send() sends data, .end() ends the request without sending anything.
```

## Sign In using JWT
* Requires email and password
* User must be real
* The passwords must match
* Create a new token

```javascript
export const signin = async (req, res) => {
    // Because it requires email & pass, we check for these fields
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'Email and password required' })
    }

    // Searching for the user that matches the email passed in
    const user = await User.findOne({ email: req.body.email }).exec()

    // If the user doesn't exist, end the request.
    if (!user) {
        return res.status(401).send({ message: 'Not auth' })
    }

    // Since we do have a user, verify that the passwords match
    try {
        const match = await user.checkPassword(req.body.password)

        // if the password doesn't match end the request
        if (!match) {
            return res.status(401).send({ message: 'Not auth' })
        }

        // Since it did match, we create a new token
        const token = newToken(user)
        return res.status(200).send({ token })
    } catch (e) {
        console.error(e)
        return res.status(401).send({ message: 'Not auth' })
    }
}
```

## Protect Routes with JWT
* Look for the Bearer Token in headers
* Token must have the correct prefix
* Must be a real user
* Finds user from token and passes on

**Note**: The express-jwt package on npm comes with Middleware that validates JWT for you. 

```javascript
export const protect = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).end()
    }

    // get the token
    let token = req.headers.authorization.split('Bearer ')[1]
    // Expect an array like, ['', '425432gdfsgg34t'] the 2nd item being a token.

    // if there is no token
    if (!token) {
        return res.status(401).end()
    }

    // verify that it is a token, then verify that it's a real user
    try {
        const payload = await verifyToken(token)
        const user = await User.findById(payload.id)
            .select('-password')
            .lean() // converts it to json
            .exec()
        req.user = user
        next() 
    } catch (e) {
        console.error(e)
        return res.status(401).end()
    }
}
```

## Adding to the Routes
```javascript
// server.js
app.post('/signin', signin)
app.pos('/signup', signup)

//lockdown the routes
app.use('/api', protect)

// if it succeeds, it will call 'next()' and go where it's supposed to go.
```
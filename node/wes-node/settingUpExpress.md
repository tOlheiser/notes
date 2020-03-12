# Express.js Setup

Example of some included modules:
```javascript
// app.js

const express = require('express'); // express.
const session = require('express-session'); // manage sessions
const mongoose = require('mongoose'); // mongoose to work with mongo db
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
```
# MongoDB

## Part 1: Setting up Mongo

### Option A: MongoDB Atlas
*For this I'll use MongoDB's Atlas*

1. Create a free account. 
2. While inside your dashboard, create a new project.
3. Create a new cluster
* Leave Global Cloud Config with its default parameters.
* Select 'Google Cloud Platform' under Cloud Provider & Region.
* Make sure you choose the region with the FREE TIER
4. In the Cluster Tier section, make sure that M0 Sandbox is selected.
5. Name the cluster anything you want.

*What is a cluster?*

### Option B: Local Server

1. [Download MongoDB](https://www.mongodb.com/download-center/community)

Once installed, you'll see that there are two executable files in the bin directory:
* mongod - Mongo Daemon; a background process to manage all MongoDB server tasks.
* mongo - Command line shell to interact with the client.

*C: -> Program Files -> MongoDB -> Server -> 4.0(version) -> bin*

2a. Open a command prompt inside your C drive.
2b. Create directories for MongoDB to store all the data by entering this command into your command prompt: *C:\> mkdir data/dbC:\> cd dataC:\> mkdir db*
3a. Open a command prompt inside the bin folder of your mongodb directory.
3b. Run this command: *mongod*

**The server is now running, but at the moment we can't work with it.**

4. Open a command prompt inside the bin folder and run the command: *mongo*
5. Return to the shell where you ran the mongod command. You should see a 'connection accepted' message at the end.

**That means your installation and configuration is successful.**

Now you can simply run 'db' in the mongo shell.

#### Set up Environment Variables

Use the following menus:
*Advanced System Settings -> Environment Variables -> Path(Under System Variables) -> Edit*

Copy the path of your bin folder and hit OK. It might look something like:
*C:\Program Files\MongoDB\Server\4.0\bin*


## Part 2: Database Access

To actually use the database, we need to create a user who has full admin access to the information.

**How to create users and give them priviledges:**
* Click on the 'Database Access' tab.
* 'Add New User'
* For the **User Priviledges**, select 'Read and Write to any database'
* Click 'Add the User'

## Part 3: Getting your Connection String

To connect to the database, you must use the MongoDB URI, which is the web address for connecting to the data. It looks something like this:

mongodb://<user>:<password>@<host>:<port>/<databasename>

**Where to get your URI**
To find your URI, click on the 'Clusters' tab of your project. On your main cluster, click **Connect**, then select **Connect Your Application**. On 'Choose your driver version', set the driver to Node.js and the version to the one you're using.

*How to form a URI string?*

## Part 4: Install Node.js Dependencies
* Express.js - Express is one of the most popular was of creating servers in Node.
* CORS (Cross-Origin Resource Sharing) - safety feature that we need to bypass to be able to access resources out of localhost

## Part 5: Instantiate Express and Add CRUD Logic

**App.js**

```javascript
// init project
const express = require('express'); // the library we will use to handle requests. import it here
const app = express(); // instantiate express
app.use(require("cors")()) // allow Cross-domain requests 
app.use(require('body-parser').json()) // When someone sends something to the server, we can recieve it in JSON format

// base route. Responds to GET requests to the root route ('/')
app.get("/", (req, res) => {
  res.send("Home sweet home 🏚") // always responds with the string "TODO"
});

// base route. Responds to POST requests to the root route
app.post("/", (req, res) => {
  res.send("Sending it through the post 📬") // always responds with the string "TODO"
});

// Responds to PUT requests to the root route
app.put("/", (req, res) => {
  res.send("Don't you dare put me up to this.") // always responds with the string "TODO"
});


// listen for requests on port 4567
const port = 4567;
var listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
```

## Part 6: Connect the MongoDB database to the Node & Express Server

*Must have the Mongo package for Node installed.*

```javascript
// init project
const express = require("express"); // the library we will use to handle requests
const mongodb = require("mongodb"); // load mongodb

const port = 4567; // port to listen on

const app = express(); // instantiate express
app.use(require("cors")()); // allow Cross-domain requests
app.use(require("body-parser").json()); // automatically parses request data to JSON

// make sure in the free tier of MongoDB atlas when connecting, to
// select version 2.2.* as the node.js driver instead of the default 3.0
// put your URI HERE ⬇
const uri = "mongodb+srv://<username>:<password>@<url>:<port>/<database>"; // put your URI HERE

// connect to your MongoDB database through your URI. 
// The connect() function takes a uri and callback function as arguments.
mongodb.MongoClient.connect(uri, (err, db) => {
  // connect to your specific collection (a.k.a database) that you specified at the end of your URI (/database)
  const collection = db.collection("users");

  // Responds to GET requests with the route parameter being the username.
  // Returns with the JSON data about the user (if there is a user with that username)
  // Example request: https://mynodeserver.com/myusername
  app.get("/:user", (req, res) => {
    // search the database (collection) for all users with the `user` field being the `user` route paramter
    collection.find({ user: req.params.user }).toArray((err, docs) => {
      if (err) {
        // if an error happens
        res.send("Error in GET req.");
      } else {
        // if all works
        res.send(docs); // send back all users found with the matching username
      }
    });
  });

  // Responds to POST requests with the route parameter being the username.
  // Creates a new user in the collection with the `user` parameter and the JSON sent with the req in the `body` property
  // Example request: https://mynodeserver.com/myNEWusername
  app.post("/:user", (req, res) => {
    // inserts a new document in the database (collection)
    collection.insertOne(
      { ...req.body, user: req.params.user }, // this is one object to insert. `requst.params` gets the url req parameters
      (err, r) => {
        if (err) {
          res.send("Error in POST req.");
        } else {
          res.send("Information inserted");
        }
      }
    );
  });

  // this doesn't create a new user but rather updates an existing one by the user name
  // a request looks like this: `https://nodeserver.com/username23` plus the associated JSON data sent in
  // the `body` property of the PUT request
  app.put("/:user", (req, res) => {
    collection.find({ user: req.params.user }).toArray((err, docs) => {
      if (err) {
        // if and error occurs in finding a user to update
        res.send("Error in PUT req.");
      } else {
        collection.updateOne(
          { user: req.params.user }, // if the username is the same, update the user
          { $set: { ...req.body, user: req.params.user } }, // update user data
          (err, r) => {
            if (err) {
              // if error occurs in actually updating the data in the database
              console.log("Error in updating database information");
            } else {
              // everything works! (hopefully)
              res.send("Updated successfully");
            }
          }
        );
      }
    });

    // if someone goes to base route, send back they are home.
    app.get("/", (req, res) => {
      res.send("You are home 🏚.");
    });
  });

  // listen for requests
  var listener = app.listen(port, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
});
```

## Part 6: Testing the Code
While app.js is running, paste this code into dev tools console and run it:

**Creating a new user**
```javascript
// The extra data will be sent in the `body` property of 
// the fetch request and stored with the user data in the database (collection)
const extraDataToStore =  { 
  eyeColor: 'blue', 
  hairColor: 'brown',
  pass: 'mypassword123'
};

fetch(postURL, {
        method: 'POST', // Using POST request to create a new resource in the database
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(extraDataToStore), // body data type must match "Content-Type" header
})
```
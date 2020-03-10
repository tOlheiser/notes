# Controllers & Working with Models

*Take a longer look at how everything is wired together within the resources, utils, and config of this [repo](https://github.com/FrontendMasters/api-design-node-v3/tree/master/src)*

Controllers are just middleware but with the intent on returning some data. They implement the logic that interacts with our DB models.

They handle what a Route + Verb (get/put/post/delete) combo can access from the DB. They are the final middleware in a stack for a request. There is no intent to proceed to another middleware function after the controller. 

You can generalize controllers to work for many models because we're going with a REST approach. *Saves you from having to write a controller for every single route and resource.*

## Using Models

*Mongoose models work very nicely with CRUD*. 

**C** - model.create(), new model() 


```javascript
const run = async () => {
    // connect to the database.
    await connect('mongodb://localhost:2701/api-test')
    const item = await Item.create({
        name: 'Clean up',
        createdBy: mongoose.Types.ObjectId(),
        list: mongoose.Types.ObjectId()
    })
}

run()
```

**R** - model.find(), model.findOne(), model.findById()

```javascript
console.log(await Item.findById(item._id).exec())
```

.exec() turns it into a promise, and is also a way of saying 'I'm done, I don't have anymore query params'

**U** - model.update(), model.findByIdAndUpdate(), model.findOneAndUpdate()

```javascript
const updated = await Item.findByIdAndUpdate(
    item._id,
    { name: 'eat' },
    { new: true } // return the new object that was updated. 
). exec()
```

**D** - model.remove(), model.findByIdAndUpdate(), model.findOneAndRemove()

```javascript
const removed = await Item.findByIdAndRemove(item._id).exec()
```

## Controller Design Overview
* GET '/' - Read many
* GET '/:id' - Read one
* POST '/' - Create one
* PUT '/:id' - Update one
* DELETE '/:id' - Delete one

## Hooking our Routes up to our Models

A look at the item router:
```javascript
// item.router.js

import { Router } from 'express'
import controllers from './item.controllers'

const router = Router()

router 
    .route('/')
    .get(controllers.getOne)
    .post(controllers.createOne)
```

### Read Documents

```javascript
// crud.js

export const getOne = model => async (req, res) => {
    const id = req.params.id // grab the ID from the request
    const userId = req.user._id // id of the user

    const doc = await model.findOne({ _id: id, createdBy: userId })

    if (!doc) {
        return res.status(404).end()
    }

    res.status(200).json({ data: doc })
}

```

### Read Many Documents
```javascript
// crud.js

export const getMany = model => async (req, res) => {
    // await for this async functionality to query the database and store the result in docs. 
    const docs = await model.find({ createdBy: req.user._id }).exec()

    res.status(200).json({ data: docs }) // send back an object
}

```

### Create a Document
```javascript
// crud.js

export const createOne = model => async (req, res) => {
    const doc = await model.create({...req.body, createdBy: req.user._id})
    // ...req.body - creates with an object body
    // override the 'createdBy' field to be whatever the authenticated user is.
    res.status(201).json({ data: doc }) // status 201 for POST
}

```

### Update a Document

```javascript
// crud.js

export const updateOne = model => async (req, res) => {
    const doc = await model.findOneAndUpdate({
        _id: req.params.id,
        createdBy: req.user._id
    }, 
    req.body, // whatever they posted to the body.
    { new: true }
)

if (!doc) {
    return res.status(400).end()
}

res.status(200).json({ data: doc })
}

```

### Remove a Document

```javascript
// crud.js

export const removeOne = model => async (req, res) => {
    const doc = await model.findOneAndRemove({
        _id: req.params.id,
        createdBy: req.user.id
    }).exec()

    if (!doc) {
        return res.status(400).end()
    }

    res.status(200).json({data: doc})
}

```

## Wiring up Item Controllers

```javascript
// item.controllers.js

import { crudControllers } from '../../utils/crud'
import { Item } from './Item.model'

export default crudControllers(Item)
```
# Data Modeling with MongoDB

MongoDB is a Schemaless document store, but you should always use a Scheme for your models. Mongoose makes this easy. MongoDB has added support for creating schemas, but Mongoose is still preferred. 

Create the models for each REST resource, and then expose it to the API.

## Example of a Schema

This schema describes what fields this user resource is going to have on it. 

```javascript
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },
    settings: {
      theme: {
        type: String,
        required: true,
        default: 'dark'
      },
      notifications: {
        type: Boolean,
        required: true,
        default: true
      },
      compactMode: {
        type: Boolean,
        required: true,
        default: false
      }
    }
  },
  { timestamps: true }
)
```

We then use the above schema to create a model. A model is a JavaScript representation of that database resource we're going to use. 

* Create a schema
* That schema is used to create a model
* Have your controllers use the models to query and perform CRUD operations on the models
* Resources activate the controllers

In short, Schemas are the instructions for the models, such as validations, names, indexes, and hooks.

```javascript
export const User = mongoose.model('user', userSchema)
```

For every resource you wish to expose to your API, we need to create a schema and a model for them.
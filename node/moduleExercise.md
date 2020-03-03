## Modules Exercise

The instructor has a few files that are all meant to be inter-linked, to practice using Node's module system.

### Api.js

**Old**
```javascript
window.App = window.App || {}

window.App.getUserById = (id, cb) => {
  // simulate API call
  window.setTimeout(() => {
    const user = window.App.users.find(user => user.id === id)
    cb(user)
  }, 150)
}

window.App.getPostsForUser = (userId, cb) => {
  // simulate API call
  window.setTimeout(() => {
    const posts = window.App.posts.filter(post => post.createdBy === userId)
    cb(posts)
  }, 150)
}
```

**Solution**

I remove all the attempts to add methods to the Window object, and I export the two functions. In the functions below we can see the 'users' and 'posts' data being referenced. That's how I know what to name my imports.

```javascript
const {users, posts} = require('./data')

const getUserById = (id, cb) => {
  // simulate API call
  setTimeout(() => {
    const user = users.find(user => user.id === id)
    cb(user)
  }, 150)
}

const getPostsForUser = (userId, cb) => {
  // simulate API call
  setTimeout(() => {
    // had to rename it to _posts because posts was being used.
    const _posts = posts.filter(post => post.createdBy === userId)
    cb(posts)
  }, 150)
}

module.exports = {
    getUserById,
    getPostsForUser
}
```

### App.js

**Broken Code**
```javascript
window.App = window.App || {}

window.App.showPostsForCurrentUser = (userId, cb) => {
  window.App.getPostsForUser(userId, posts => {
    const postTemplates = posts.map(post => {
      return `
      <div class="post">
        ${post.title}
        ${post.body}
        ${post.createdBy}
      </div>`
    })
    cb(postTemplates)
  })
}

window.App.showUserProfile = (userId, cb) => {
  window.App.getUserById(userId, user => {
    const profile = `
      <div>
        ${user.name}
      </div>
    `
    cb(user)
  })
}
```

**Solution**
```javascript
const {getPostsForUser, getUserById} = require('./api')

const showPostsForCurrentUser = (userId, cb) => {
  getPostsForUser(userId, posts => {
    const postTemplates = posts.map(post => {
      return `
      <div class="post">
        ${post.title}
        ${post.body}
        ${post.createdBy}
      </div>`
    })
    cb(postTemplates)
  })
}

const showUserProfile = (userId, cb) => {
  getUserById(userId, user => {
    const profile = `
      <div>
        ${user.name}
      </div>
    `
    cb(user)
  })
}

module.exports = {
    showPostsForCurrentUser,
    showUserProfile
}
```

### Data.js

**Broken Code**
```javascript
window.App = {
  users: [
    {id: 1, name: 'Weezy'}
  ],
  posts: [
    {title: 'yo', body: 'I ate today', createdBy: 1},
    {title: 'Me', body: 'Look at my selfie', createdBy: 1},
    {title: 'My doggy', body: 'my dog is better than yours', createdBy: 1}
  ]
}
```

**Solution**
```javascript
module.exports = {
  users: [
    {id: 1, name: 'Weezy'}
  ],
  posts: [
    {title: 'yo', body: 'I ate today', createdBy: 1},
    {title: 'Me', body: 'Look at my selfie', createdBy: 1},
    {title: 'My doggy', body: 'my dog is better than yours', createdBy: 1}
  ]
}
```
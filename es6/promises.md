# Promises

"The new Promise() constructor should only be used for legacy async tasks, like usage of setTimeout or XMLHttpRequest." - (David Walsh)[https://davidwalsh.name/promises]


## Using 'then()' 
The **first *then* method callback receives the result given to it by the resolve() call.** *then* will only run when the data comes back / when the promise has been fulfilled. **Each then receives the result of the previous then's return value.**

```javascript
const postsPromise = fetch('http://wesbos.com/wp-json/wp/v2/posts');

postsPromise.then((data) => {
    return data.json();
}) 

// a feature of arrow functions is that we can implicitly return this data.
postsPromise.then(data => data.json())

// .then() returns a promise. Because of this, we can keep chaining 'then()'
postsPromise.then(data => data.json()).then(data => { console.log(data) })

// For better readability, we can spread this out over multiple lines.
postsPromise
    .then(data => data.json())
    .then(data => { console.log(data) })

// We can use .catch() to handle errors.
postsPromise 
    .then(data => data.json())
    .then(data => { console.log(data) })
    .catch(err => {
        console.log(err);
    })

// A common pattern is to send an Error to the catch.
reject(Error('Data could not be found'));
```

## Creating your own promises

It seems to me that *.then* operates on whatever data has been returned from resolve.

```javascript
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Tanner is cool');
    }, 1000); 
});

p.then(data => {
    console.log(data); // returns 'Tanner is cool'
})
```

## Chaining Promises

**Dummy Data**
```javascript
const posts = [
    { title: 'I love JavaScript', author: 'Wes Bos', id: 1 },
    { title: 'CSS!', author: 'Chris Coyier', id: 2 },
    { title: 'Dev tools tricks', author: 'Addy Osmani', id: 3 },
];

const authors = [
    { name: 'Wes Bos', twitter: '@wesbos', bio: 'Canadian Developer' },
    { name: 'Chris Coyier', twitter: '@chriscoyier', bio: 'CSS Tricks and CodePen' },
    { name: 'Addy Osmani', twitter: '@addyosmani', bio: 'Googler' },
];
```

```javascript
function getPostById(id) {
    // create a new promise
    return new Promise((resolve, reject) => {
        // get the post we want.
        const post = posts.find(post => post.id === id); 
        if (post) {
            resolve(post); // send post back
        } else {
            reject(Error('No Post was Found!'));
        }
    });
}

getPostById(2)
    .then(post => {
        console.log(post);
    })
```

### 'Hydrating'
Replacing the author string with the corresponding author object.

```javascript
function hydrateAuthor(post) {
    // create a new promise
    return new Promise((resolve, reject) => {
        // find the author
        const authorDetails = authors.find(person => person.name === post.author);
        if (authorDetails) {
            // "hydrate" the post object with the author object.
            post.author = authorDetails;
            resolve(post); // send the post data back.
        } else {
            reject(Error('Can not find the author'));
        }
    });
}

getPostById(2)
    .then(post => {
        console.log(post);
        return hydrateAuthor(post); // returns a promise
    })
    // since the parent .then returned a promise, you can chain .then to it. 
    .then(post => {
        console.log(post);
    })
    .catch(err => {
        console.error(err);
    })
```

## Working with Multiple Promises

```javascript
const weather = new Promise((resolve) => {
    setTimeout(() => {
        resolve({ temp: 29, conditions: 'Sunny with Clouds' });
    }, 2000); // resolves in 2 seconds.
});

const tweets = new Promise((resolve) => {
    setTimeout(() => {
        resolve(['I like cake', 'BBQ is good too!']);
    }, 500); // resolves in half a second.
});
```

We need the data from both these promises ASAP. Since the data isn't dependent on each other, we don't necessarily need to chain .then() statements.

```javascript
// When invoking Promise.all(), you pass it an array of promises and fire one callback once they are all resolved.
Promise
    .all([weather, tweets])
    .then(responses => {
        console.log(responses);
    })
```

It will take 2 seconds to receive the data, because every promise needs to be resolved. It is only as fast as its weakest link.

**Grabbing the weather and tweet responses**
```javascript
Promise
    .all([weather, tweets])
    .then(responses => {
        // not good practice to name these the same name as the promises.
        const [weatherInfo, tweetInfo] = responses; 
    })
```

### Multiple fetch requests
```javascript
const postsPromise = fetch('blog.com/posts');
const streetCarsPromise = fetch('data.ratp.fr/datasets/search/paris');

//listening to when these promises are both resolved. 
Promise
    .all([postsPromise, streetCarsPromise])
    .then(responses => {
        // taking the responses and converting that data into json.
        return Promise.all(responses.map(res => res.json()));
    })
    .then(responses => {
        // gives you the responses in JSON format.
        console.log(responses);
    })
```




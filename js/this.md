# Understanding 'this'
*Primary source: [Tyler McGinnis](https://tylermcginnis.com/this-keyword-call-apply-bind-javascript/)* 

The purpose of 'this' is to allow you to reuse functions in different contexts. The key to determining the value of *this* is all about **where the function is being invoked**. This is the **only** way you can tell what the *this* keyword is referencing. 

**Guidelines to follow**:
1. Implicit Binding
2. Explicit Binding
3. new Binding
4. Lexical Binding
5. window Binding

## Implicit Binding
```javascript
const user = {
    name: 'Tyler',
    age: 27,
    greet() {
        alert(`Hello, my name is ${this.name}`)
    }
}
```
If you were to invoke the *greet* method on the *user* object, you'd do so by using dot notation.
```javascript
user.greet();
```

**First rule**: *If there is a dot*, look to the left of the dot when the function is invoked. This will reveal the object that the *this* keyword is referencing. 

In the example above, **user** is to the left of the dot. This means the *this* keyword is referencing the user object.

## Explicit Binding

Instead of the greet function being a method on the user object, what is greet was it's own standalone function?
```javascript
function greet() {
    alert(`Hello, my name is ${this.name}`)
}

const user = {
    name: 'Tyler',
    age: 27
}
```

**call** - A method on every function that allows you to invoke the function specifying in what context the function will be invoked. We use this to invoke greet **with the *this* keyword referencing the user object.**
```javascript
greet.call(user);
```
The first argument you pass to *call* will be the context/focal object in which the function is invoked. In other words, the first argument you pass to call will be what the *this* keyword inside that function is referencing.

### Passing Arguments with .apply
To pass arguments to a function being invoked with .call, you pass them one by one after specifying the first argument - the context.

```javascript
function greet (l1, l2, l3) {
  alert(
    `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`
  )
}

const user = {
  name: 'Tyler',
  age: 27,
}

const languages = ['JavaScript', 'Ruby', 'Python']

greet.call(user, languages[0], languages[1], languages[2])
```

Passing in each member of the languages array is annoying and it makes the code look ugly. There's a fix for that, called *.apply*. Is essentially the same thing as .call, except you can pass the whole array as the second argument, **allowing Javascript to spread each element in the array out for you as arguments to the function.**

```javascript
const languages = ['JavaScript', 'Ruby', 'Python'];

greet.apply(user, languages);
//Same as greet.call(user, languages[0], languages[1], languages[2]);
```

### Binding this

.call and .apply allow you to invoke a function, specifying what *this* keyword is going to be referencing inside of that function. 

.bind is the same as .call, but instead of immediately invoking the function, it will **return a new function that you can invoke at a later time**.

**.bind in action**:
```javascript
function greet (l1, l2, l3) {
  alert(
    `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`
  )
}

const user = {
  name: 'Tyler',
  age: 27,
}

const languages = ['JavaScript', 'Ruby', 'Python']

const newFn = greet.bind(user, languages[0], languages[1], languages[2])
newFn() // alerts "Hello, my name is Tyler and I know JavaScript, Ruby, and Python"
```

## new Binding

Whenever you invoke a function with the *new* keyword, the JavaScript interpretor will create a brand new object for you and call it *this*. If a function was created with new, the *this* keyword is referencing the brand new object the interpretor created.

```javascript
function User (name, age) {
  /*
    Under the hood, JavaScript creates a new object called `this`
    which delegates to the User's prototype on failed lookups. If a
    function is called with the new keyword, then it's this new object
    that interpretor created that the this keyword is referencing.
  */

  this.name = name
  this.age = age
}

const me = new User('Tyler', 27)
```

## Lexical Binding

Essentially, arrow functions don't have their own *this*, so the JavaScript interpretor will look to the enclosing (parent) scope to determine what *this* is referencing. 

```javascript
const user = {
  name: 'Tyler',
  age: 27,
  languages: ['JavaScript', 'Ruby', 'Python'],
  greet() {
    const hello = `Hello, my name is ${this.name} and I know`

    const langs = this.languages.reduce((str, lang, i) => {
    // since the arrow function doesn't have this, the parent scope 
    // is the user object.
      if (i === this.languages.length - 1) {
        return `${str} and ${lang}.`
      }

      return `${str} ${lang},`
    }, "")

    alert(hello + langs)
  }
}
```

## window Binding

If none of the above rules are met, then JavaScript will default the *this* keyword to reference the window object - **unless strict mode is enabled**.

```javascript
window.age = 27;

function sayAge () {
  // Since this.age is undefined, 'this' defaults the the window object.
  console.log(`My age is ${this.age}`) // and thus, sayAge() returns 27.
}

const user = {
  name: 'Tyler',
  age: 27
}

sayAge();
```

**Explore further**:
* Lexical scope
* Variable lookups
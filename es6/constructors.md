## Constructors

The main purpose of contructors is to create a new, fresh object and make the *this* variable point to the newly created object. It then executes the constructor function using the newly created object whenever *this* is mentioned. It makes creating new, reusable objects quick and easy. 

**Rules**
* Must use a capital letter.
* Must only be executed with the "*new*" operator.

## Constructor Function In Action
```javascript
function User(name) {
    this.name = name; // name: "Jack"
    this.isAdmin = false;
}

/* Creating an object called user, using the 'User' constructor as a template. We pass in the string "Jack" as an argument to populate values of the object. */
let user = new User("Jack");

console.log(user.name); // Jack
console.log(user.isAdmin); //false
```

## What happened with "new User("Jack")?
1. A new empty object is created and assigned to *this*.
2. The function body executes. *Creates the name property in this object and assigns the value "Jack" using the parameter that was passed in*.
3. The value of *this* is returned.

**Note**: *this* in a function is the object that called the function. Adding *new* to a function call creates an object, and *this* within a function points to the new object you just created - instead of the object which called the function.

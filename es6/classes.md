# Classes

Classes are essentially 'special functions'. Just as you can define function expressions and function declarations, you can define class expressions and class declarations.

## Class Declaration
```javascript
class User {
    //class methods
    constructor(name) {
        this.name = name;
    }
    
    sayHi() {
        alert(this.name);
    }
}

//new User() creates a new object with all the listed methods.
let user = new User("John");
user.sayHi();
```

**Difference between function declarations & class declarations**: Function declarations are hoisted, class declarations are not. The class must be created before you can access it. 

```javascript
const colleague = new User(); //ReferenceError

class User {}
```

### Understanding the constructor() method

The *constructor()* method is called automatically by *new*, so we can initialize the object there. 

When *new User("John");* is called:
* A new object is created.
* The constructor runs with the given argument ("John"), and assigns *this.name* to it.
*There can only be one constructor() method per class.*

## Class Expression

Class expressions allow you to redefine/re-declare classes and don't throw any type errors like class declaration. *You can't redefine/re-declare class declarations.*

```javascript
// unnamed
let Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle"

// named
let Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle2"
```

**Quick & Easy Syntax Rules**
* No commas between class methods. 
* Class names begin with a capital letter.

## Sub classing with extends

The *extends* keyword is used to create a class as a child of another class in both class declarations & class expressions.

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name); /* call the super class constructor and pass in the name parameter */
    }

    speak() {
        console.log(`${this.name} barks.`);
    }
}

let d = new Dog('Mitzie');
d.speak(); //Mitzie barks.
```

## Super class calls with super

The *super* keyword is used to call corresponding methods of the super class. ["This is one advantage over prototype-based inheritance"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Super_class_calls_with_super) -> *what does that mean?*

```javascript
class Cat {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Lion extends Cat {
    speak() {
        super.speak();
        console.log(`${this.name} roars.`);
    }
}
```

Since *Lion* is the child class of *Cat*, *Cat* would be considered the **super class**. 

```javascript
let l = new Lion('Fuzzy');
l.speak();
// Fuzzy makes a noise.
// Fuzzy roars.
```

**When l.speak() is called:**
* The *speak()* method of the super class is called with *super.speak()*. This prints out "Fuzzy makes a noise." in the console.
* "Fuzzy roars." is then printed into the console after the super method is resolved.

### Self-assigned Further Reading:
1. super calls vs prototype-based inheritance.

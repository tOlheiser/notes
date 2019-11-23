# Destructuring

Destructuring gives us the ability to unpack or 'de-structure' objects and arrays into a bunch of variables. 

## Destructuring Arrays

Lets take a simple array, containing my full name.
```javascript 
let fullName = ['Tanner', 'Olheiser'];

//destructuring assignment
let [firstName, lastName] = fullName;

console.log(firstName); // Tanner
console.log(lastName); //Olheiser

//It's essentially a more concise way of writing...
let firstName = fullName[0];
```

The order here matters, since arrays are index-based. Since 'lastName' was mentioned 2nd, it will grab the array value at the 2nd position, index 1. 

I like to read this as, "create two variables which grab values from the 'fullName' array. 

### Destructuring Strings

Using the above logic, you can destructure strings using the 'split' method, which **returns an array of strings**. 

```javascript
let [firstName, lastName] = "Tanner Olheiser".split(" ");

console.log(firstName); //Tanner
console.log(lastName); //Olheiser
```

The string is split into two strings through use of the 'split' method. You pass in an argument for how you want the strings to be split, in this case an empty space. This creates two separate strings of 'Tanner' and 'Olheiser'.

### Ignore elements using commas

If you want to skip a value, you need to use a comma.

```javascript
let team = ["McDavid", "Draisaitl", "Nurse", "Klefbomb", "Kassian"];

let [captain, , defensemen] = team;
```

The comma I'm using before defensemen skips the second element. Therefore, defensemen is set to 'Nurse'. 

## Destructuring Objects

```javascript
let car = {
    make: "Pontiac",
    model: "G6",
    year: 2008,
    colour: "black"
}

let {make, model, year} = car;

console.log(make); //Pontiac
console.log(year); //2008
```

The properties are assigned to the corresponding variables. I read this as, "grab the property values of make, model, and year from the car object and store them into variables."

Since the colour was not mentioned in the destructuring assignment, that property value won't be stored in a variable.

**Note**: *The order does not matter when destructuring objects. You could have just as easily wrote 'let {year, model, make}..." and still get the same result.*

### Assigning a property to a variable of a different name

Using the same car object.

```javascript 
let {make, model, year, colour: c} = car;

console.log(c); //black
```

### Setting default values

You can declare default values for properties that might be missing directly in the destructuring assignment. Default values can also be expressions or function calls.

```javascript
let {make, model, year = 2006} = car;

console.log(year); //2008
```

If the year value was missing, the value would then become 2006. 

### Nested Destructuring

Lets suppose I have a bigger object containing personal details, and I only need bits of nested information.

```javascript
let myself = {
    firstName: "Tanner",
    lastName: "Olheiser",
    address: "Canada",
    links: {
        social: {
            twitter:  "twitter.com",
            facebook: "facebook.com"
        }
    }
}

let {twitter, facebook} = myself.links.social;
```

You target the nested level object with the property values you want to acquire.

## Value Swapping

You can also swap values!

```javascript
let inRing = "Hulk Hogan";
let sideRing = "The Rock";

[inRing, sideRing] = [sideRing, inRing];

console.log(inRing); //The Rock

```

## Rest with Destructuring

### Destructuring arrays with rest

```javascript
let team = ["McDavid", "Draisaitl", "Nurse", "Klefbomb", "Kassian"];

let [captain, assistant, ...players] = team;

console.log(captain); //McDavid
console.log(assistant); //Draisaitl
console.log(players); //["Nurse", "Klefbomb", "Kassian"]
```

The 'rest' of the values are stored in an array called 'players'. 

### Destructuring objects with rest

```javascript
let car = {
    make: "Pontiac",
    model: "G6",
    year: 2008,
    colour: "black"
}

let {make, ...carInfo} = car;

console.log(carInfo.model); //G6
```

carInfo becomes an object containing the rest of the properties.

## Further reading

**Make notes on using destructuring in conjunction with functions and looping with Object.entries(obj)**
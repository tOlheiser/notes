# The for..of Loop & Iterables

This loop is used to loop over any type of data that is an iterable. An iterable is anything that can be looped over, such as an array, string, map, and generator. It cannot be used with objects.

```javascript
let players = ["McDavid", "Draisaitl", "Nurse", "Klefbomb", "Kassian"];

for (let player of players) {
    console.log(player);
}
```

## Weaknesses of other loops
* The standard for loop isn't as readable and more verbose than for..of.
* In a forEach loop, you cannot skip an iteration.
* Problems will arise in a for..in loop if you try to loop over an iterable where the prototype has been modified.

## Looping over Array-like elements
In this example, I'm looping over the arguments, because I'm unsure how many arguments there will be. This arguments variable is array-like, in that it has a collection of values and a length, but isn't actually an array.

*If you actually go in and run 'arguments' into console.log(), click the arrow to expand the properties and you'll find that it's not an array by looking at '__proto__'*

```javascript 
function addUpNumbers() {
    let total = 0;
    for (num of arguments) {
        total += num;
    }
    console.log(arguments);
    return total; 
}

addUpNumbers(10,12,16,18,22,24,28);
```

Another use case is looping over a Node list, which is array-like.

```html
<p>Hi I'm p 01</p>
<p>Hi I'm p 02</p>
<p>Hi I'm p 03</p>
<p>Hi I'm p 04</p>
<p>Hi I'm p 05</p>
```

```javascript
const ps = document.querySelectorAll('p');

for (const paragraph of ps) {
    paragraph.addEventListener('click' function() {
        console.log(this.textContent);
    })
}

//Remember, he did not use an arrow function in this demonstration because of 'this'. 
```

## Looping over strings

```javascript
const name = "Tanner Olheiser";
for (const char of name) {
    console.log(char); //T a n n e r  O l h e i s e r
}
```
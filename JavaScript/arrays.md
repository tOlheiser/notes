# Arrays

Contents
[Array Looping](#array-looping)

## Array Looping
The three main choices are:
- Sequential for loop
- Array.prototype.forEach
- ES6 for-of statement

Assuming we're using the array 'namesArray'
```js
const namesArray = ["matthew", "mark", "luke", "john"];
```

**Sequential for loop**
This works in every environment while also providing you with flow control statements like *break* and *continue*.
```js
for (let i = 0; i < namesArray.length; i++) {
  console.log(namesArray[i]);
}
```

**Array.prototype.forEach**
This has been around 10 years (since the ES5 specification), and has full-support except for IE11. 
```js
namesArray.forEach(name => console.log(name));
```

You can't use break/continue statements with a forEach loop, but you *can* filter the array before looping over it. **Note:** If you are iterating over an array to build another array, use the **map** higher order array method instead.
```js
array.filter(item => item.condition < 10)
     .forEach(item => console.log(item))
```

**ES6 for-of Statement**
This statement iterates over iterable objects. It allows you to use normal flow control statements break & continue.
```js
for (const name of namesArray) {
  console.log(name);
}
```

[Source](https://stackoverflow.com/questions/3010840/loop-through-an-array-in-javascript)





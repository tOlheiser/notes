# Array Improvements

## Array .from()
```html
<div class="teams">
    <p>Oilers</p>
    <p>Flames</p>
    <p>Canucks</p>
</div>
```

```javascript
const teams = document.querySelectorAll('.teams p');
console.log(teams); //This is a NodeList, not an array. 
```

Since a NodeList is array-like, we'll convert it into an array.

```javascript
const teamArray = Array.from(teams); //It has now been converted to an array.

const organizations = teamArray.map(team => team.textContent);
```

A more concise way of writing this would be...

```javascript
const teams = document.querySelectorAll('.teams p');
const teamsArray = Array.from(teams, team => {
    console.log(team); //<p>team name</p>;
    return team.textContent;
});

//The second argument in Array.from is a map function.
```

### Converting the arguments object into an array

```javascript
function sumAll() {
    const nums = Array.from(arguments);
    return nums.reduce((prev,next) => prev + next, 0);
}

sumAll(3,789,9,989,801,62);
```

## Array .of()
Pass in any number of arguments into Array.of and it will create an array of those arguments for you.

```javascript
const ages = Array.of(19,81,4,16,42);
```

## .some()

Use .some() to check if some of the data in your array meet the conditions you're looking for.

```javascript
const ages = Array.of(19,81,4,16,42);
```

```javascript
This loops over the elements of the array and checks each of them against the >= 18 condition. It will return true if the condition is met, or false if none of them meet the condition.

const adultPresent = ages.some(age => age >= 18); //true
```

## .every()
Does **every** element of the array meet the condition?

```javascript
const noMinors = ages.every(age => age >= 18); //false
```

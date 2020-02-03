# Optional Chaining

Taken from Robin Wieruch [Post](https://www.robinwieruch.de/javascript-variable-question-mark)

```javascript
const person = {
  name: 'Robin Wieruch',
  pet: {
    name: 'Trixi',
  },
};
const petName = person.pet?.name;
console.log(petName);
// "Trixi"
```

"If the person has no pet, the output would be undefined without throwing a JavaScript exception." - Robin
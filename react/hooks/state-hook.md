# Digging into the State Hook

## Quick Tips:
* The function which lets you update state doesn't merge the old and new state together. 
* The state doesn't need to be an object.

## Initial State
The argument passed to useState is the initial state. In this case, the initial state of count is '0'. 
```javascript
const [count, setCount] = useState(0);
```

## Multiple State Variables
```javascript
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```

**Note**: State variables can hold objects & arrays, so multiple state variables isn't always necessary. 

## Updating State
In a class component, this.setState *merges* the data. In a hook, updating a state variable *replaces* the data. Whatever value is returned from the updater function is applied to its corresponding variable's state. 

## What does calling useState do?
Calling useState declares a 'state variable', which allows us to 'preserve' some values between function calls. Variables normally disappear when the function exits but **state variables are preserved by React**.

## What does useState return?
A pair of values: The current state and a function that updates it.

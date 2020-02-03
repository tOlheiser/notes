# Introducing Hooks

**Definition**: Hooks are functions that let you “hook into” React state and lifecycle features from function components. *You would use this when you need to add state to your component.*

## Benefit of Hooks in React
Hooks allow you to reuse stateful logic without changing your component hierarchy.
* Hooks let you use more of React's features without classes.
* They allow you to track state within function components.
* Hooks don't require you to learn complex functional or reactive programming techniques.
* Code reusability and testing is much easier.

## Rules
* Only call Hooks at the top level. Don't call Hooks inside loops, conditions, or nested functions. 
* Only call Hooks from React function components - unless it is your own custom Hooks.

**Note**: There is a linter plugin to enforce these rules automatically. [linter](https://reactjs.org/docs/hooks-rules.html#eslint-plugin)

## Implementing Hooks:

1. Import useState
```javascript
import React, { useState } from 'react';
```

2. Declare state variable and an updater method
```javascript
const [count, setCount] = useState(0);
```

**Note:** Whatever is inside the brackets of useState is the **default value** of state. In this example, the default value is 0.

3. Read the state
```javascript
<p>You clicked {count} times</p>
```

As opposed to class components, where you'd refer to count as *this.state.count*.

4. Attach the update method to an event handler
```javascript
<button onClick={() => setCount(count + 1)}>
    Click me
</button>
```

### Full Example

```javascript
// Must import the 'useState' hook
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable named count, and a method for updating state.
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* Call the update method with an event handler */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

The function can be declared as a statement or an expression:
```javascript
function Example() { ... }
```

```javascript
function Example = () => { ... }
```

## Problems posed by class components
* Classes can be a barrier to learning React. Understanding *this*, binding event handlers, and code being very verbose. 
* Classes don't minify well and make hot reloading flaky and unreliable.
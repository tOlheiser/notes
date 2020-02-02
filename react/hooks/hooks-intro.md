# Introducing Hooks

## Benefit of Hooks in React
Hooks allow you to reuse stateful logic without changing your component hierarchy.
* Hooks let you use more of React's features without classes.
* They allow you to track state within function components.
* Hooks don't require you to learn complex functional or reactive programming techniques.
* Code reusability and testing is much easier.

## Implementing Hooks:

1. Import useState
```javascript
import React, { useState } from 'react';
```

2. Declare state and the updater method
```javascript
const [count, setCount] = useState(0);
```

**Note:** Whatever is inside the brackets of useState is the **default value** of state. In this example, the default value is 0.

3. Attach the update method to an event handler
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

## Problems posed by class components
* Classes can be a barrier to learning React. Understanding *this*, binding event handlers, and code being very verbose. 
* Classes don't minify well and make hot reloading flaky and unreliable.
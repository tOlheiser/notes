# Introducing Hooks

## Benefit of Hooks in React
They allow you to track state within function components.

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
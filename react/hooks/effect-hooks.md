# Effect Hooks

The effect hook takes the place of lifecylce methods in classes by unifying the componentDidMount, componentDidUpdate, and componentWillUnmount into a single API. You'd typically use effect hooks when doing data fetching for example.

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## What does useEffect do?
**By default**, useEffect runs both after the first render and after every update. In this example, useEffect updates the title of the document after the first render and after every update. 

```javascript
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```
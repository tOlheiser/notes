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

## Effects with Cleanup
In this example, this effect sets up a subscription to some external data source. We'd like to cleanup that data when the component unmounts. 

```javascript
  useEffect(() => {
    // This function is used by both the sub and unsub functions.
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    // This method is called when the component mounts and after every update.
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

**Note**: The cleanup() function doesn't have to be named cleanup, it also doesn't have to be a name. It could just be an arrow function.

## Using Multiple Effects
The benefit of using multiple effects is that you can separate unrelated logic. 

```javascript
// This component combines the counter + friend status
function FriendStatusWithCounter(props) {
  // Counter Logic
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  // Friend Status Logic
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

## Optimize Performance by Skipping Effects
Performing a clean up or applying an effect after every render could cause issues. With class components, componentDidUpdate allowed you to compare previous props or state to the current value.

```javascript
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

To achieve a similar effect with Effect Hooks, we pass an array as the second argument to useEffect. This array contains one or more values that you want to trigger a render if their values have changed. The array includes **all values from the component scope (such as props and state) that change over time and that are used by the effect**.

In other words, every value referenced inside the effect function should also appear in the dependencies array. 

```javascript
useEffect(() => {
    document.title = `You clicked ${count} times`;
}, [count]); // only run if the value of 'count' has changed. 
```

It also works for effects that have a cleanup phase:
```javascript
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Only re-subscribe if props.friend.id changes
```

### When you want to run an effect only once (on mount and unmount)
Pass an empty array '[]' as the second argument. This tells React that your effect doesn't depend on any values from props or state, so it never needs to re-run. 
# Custom Hooks
Hooks serve as a nice alternative to share stateful logic instead of using complex patterns like render props and higher-order components. 

**When to build Custom Hooks?** 
You build custom hooks when you have have two or more components that have shared logic. Custom Hooks allow you to extract said logic into a separate component.

## Extracting a Custom Hook

Situation: We have two components, FriendStatus and FriendListItem that both use the 'subscribeToFriendStatus' functionality. 

### Step 1: Extract a Custom Hook
When we want to share logic between two components, we extract that logic into a third component. 

**A custom Hook is a JavaScript function whose name begins with "use" and that may call other Hooks.**

useFriendStatus is a custom hook.
```javascript
// takes in friendID as an argument, and allows us to subscribe to that friend's status.
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    //friendID is passed into subscribeToFriendStatus
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  // returns the online status of friendID
  return isOnline;
}
```

### Step 2: Using a Custom Hook

The useFriendStatus Hook gets passed in a friendID, subscribes to their status, and returns their online status.

**FriendStatus Component**

```javascript
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

**FriendList Component**

```javascript
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

**Nothing is different.** The logic was literally copied and pasted into a custom component.

## Passing Information Between Hooks

When a different friend is selected, that triggers 'setRecipientID' which updates the state of recipientID. isRecipientOnline runs useFriendStatus with the newly selected friend. 

```javascript
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
```

Worded differently, from the docs: *If we pick a different friend and update the recipientID state variable, our useFriendStatus Hook will unsubscribe from the previously selected friend, and subscribe to the status of the newly selected one.*
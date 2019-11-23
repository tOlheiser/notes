# Lists and Keys

## Rending Multiple Components

You can build collections of elements and include them in JSX by using the curly braces. 

```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => 
    <li>{number}</li> // listItems will contain an array of list items.
);
```

To render the listItems array to the DOM, we nest them inside a *ul* element.

```javascript
ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
);
```

## Basic List Component

Usually you would render lists inside of a component. We'll edit the previous example into a component that accepts an array of numbers and outputs a list of elements.

```javascript
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => 
        <li>{number}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers}/>,
    document.getElementById('root')
);
```

When you run this code there will be a warning that a key should be provided for list items. A “key” is a special string attribute you need to include when creating lists of elements.

### Fixing the previous example:

```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}> 
      {number}
    </li> //Note the key in the opening tag of the list item.
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

## Keys

Keys are used by React to help identify which elements have been added, changed, and deleted. 

**Rules about Keys**:
* Keys must be strings
* They must uniquely identify the list item *think IDs from data tables*
* Rule of thumb: Elements inside the map() call need keys
* To emphasize, keys must only be unique among siblings; **they don't need to be globally unique**
* Keys don't get passed to your components; they are merely used as a reference for React. 


Example:
```javascript
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

## Extracting Components with Keys

Keys only make sense in the context of the surrounding array. If you were to **extract** a ListItem component, you should keep the key on the '<ListItem />' elements in the array **rather than on the *li* element in the ListItem itself.**

Example of correct key usage: 

```javascript
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**Refresher:** Order of Events
1. ReactDOM.render() is called, rendering the 'NumberList' element to the HTML element with the ID of 'root'.
2. The 'NumberList' component is called, and transforming the 'numbers' list.
3. On every iteration of the map() call, the 'ListItem' element calls its component to return an list item. 
4. When the map() call is complete, the new list (stored inside the listItems array) and passed into the final return statement, nested inside the unordered list. 

If you need the same value of the key in your component, pass it explicitly as a prop with a different name:

```javascript
const content = posts.map((post) =>
    <Post
        key={post.id} // Post component can't read props.key
        id={post.id} // but it can read props.id
        title={post.title}
    />
);
```
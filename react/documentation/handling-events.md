# Handling Events

## Events with React elements vs Events on DOM elements
* React events are named using camelCase, rather than lowercase.
* With JSX you pass a **function as the event handler**, rather than a string.

Regular HTML:
```html
<button onclick="activateLasers()">Activate Lasers</button>
```

React:
```javascript
<button onClick={activateLasers}>Activate Lasers</button>
```

### preventDefault MUST be used instead of returning false

Preventing the default link behavior of opening a new page in HTML:
```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
Click me
</a>
```

The alternative using React:
```javascript
/* ActionLink is a function component. It returns a react element which is a link with the click event of 'handleClick'. */
function ActionLink() {
    function handleClick(e) { // 'e' is a synthetic event.
        e.preventDefault();
        console.log('The link was clicked.');
    }

    return (
        <a href="#" onClick={handleClick}>
            Click me
        </a>
    );
}
```

## Handling Events in Class Components
A common pattern is for the event handler to be a method on the class.
```javascript
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
    }

    // Without this binding, 'this' will not work in the callback.
    this.handleClick = this.handleClick.bind(this); 
    // !It may be better to bind this in the constructor. 

    handleClick() {
        this.setState(prevState => ({
            /* Accessing the isToggleOn property, and 'toggling' the state to be the opposite to its previous state. */
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}> 
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('root');
)
```

### Binding methods
In JavaScript, **class methods are not bound by default**. If you forget to bind *this.handleClick* and pass it to onClick, ***this* will be undefined when the function is called.** 

**Alternative: Arrow Function in the callback**
```javascript
class LoggingButton extends React.Component {
    handleClick() {
        console.log('this is:', this);
    }

    render() {
        // This syntax ensures 'this' is bound within handleClick
        return (
            <button onClick={(e) => this.handleClick(e)}>
                Click me
            </button>
        )
    }
}
```
**Drawback**: A different callback is created each time the LoggingButton renders, impacting performance. Worse if the callback is passed as a prop to lower components (as they may do an extra-rerendering).

## Passing Arguments to Event Handlers
Inside a loop it is common to want to pass an extra parameter to an event handler. In this example, 'id' is the row ID.

```javascript
// Using an arrow function
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button> 

// Using Function.prototype.bind
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

// Both refer to the 'deleteRow' function, which takes in two arguments. 
```

## Best Practices:
* Provide a listener **when the element is initially rendered** rather than calling 'addEventListener' to add listeners to a DOM element after it is created.
* If you refer to a method without '()' after it, you should bind that method.
* Bind 'this' rather than use arrow functions due to decrease in performance.
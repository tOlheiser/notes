# Rendering Elements

Elements are what components are made of. They describe what you want to see on the page.

```javascript
const element = <h1>Hello, world</h1>;
// This, like all React elements, is a plain object. 
```

## Rendering an Element into the DOM

This empty element is known as a 'root' DOM node because everything inside of it will be managed by React DOM. 

```javascript
<div id="root"></div>
```

To render the above 'Hello, world' element into a root DOM node, pass both into ReactDOM.render()

```javascript
ReactDOM.render(element, document.getElementById('root'));
```

## Updating the Rendered Element

React elements cannot be changed, because an element represents the UI at a certain point in time. To update the UI, you have to pass a new element into ReactDOM.render().

### Ticking Clock Example
[codepen](https://codepen.io/tolheiser/pen/dxJYeL?editors=1010)

```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

/* setInterval calls the tick() function in intervals of 1 second. Each time the function 
is called, the time is updated by ReactDOM.render passing in a new element. */ 
setInterval(tick, 1000);
```

**Important**: React compares the element and its children to the previous one, and **only the node whose contents have changed gets updated** by React DOM. *From the previous example, only the {new Date()} expression inside the curly braces is changed.*

### Learning Moment: Referencing a function

Take this function call:
```javascript
setInterval(tick, 1000);
```

**Question**: When referencing the tick function, why do you not include the parenthesis?

**Solution**: When you include the '()', you are invoking/calling the function immediately. By not including the '()', you are passing the function as a reference and it will be called after a delay of time. *Note: tick is the function. The '()' is the operator that executes the function. The setInterval function only needs a reference to the function, which gets called at every interval.* [Source](https://stackoverflow.com/questions/43437152/settimeout-and-setinterval-the-first-parameter-plus-no-parentheses-plus-no-doub)

Less common way:
```javascript
setTimeout('numCount()',1000);
```
The string argument will be evaluated as a function call at the end of the timer delay. 
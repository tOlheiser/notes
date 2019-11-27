# Higher Order Components

## (Our) Higher-Order Function
* Is a function
* Takes in a callback function as an argument
* Returns a new function
* The function it returns can invoke the original callback function that was passed in

```javascript
function higherOrderFunction (callback) {
  return function () {
    return callback()
  }
}
```
## (Our) Higher-Order Component
* Is a component
* Takes in a component as an argument
* Returns a new component
* The component it returns can render the original component that was passed in

```javascript
function higherOrderComponent (Component) {
  return class extends React.Component {
    render() {
      return <Component />
    }
  }
}
```

**Render Props seems to be a neater, more approchable alternative. Revisit later.**




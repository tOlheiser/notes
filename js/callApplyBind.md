# Call, Apply, and Bind

## Bind

The **bind()** method creates a new function that, when called, has its *this* keyword set to the provided value. **Rule of thumb**: If you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method - [src](https://reactjs.org/docs/handling-events.html).

**First exposure in React**
```javascript
// class methods are not bound by default, requiring us to bind this method
// for the JSX callback.
this.handleClick = this.handleClick.bind(this);
```

### Example: Creating a bound function
```javascript
this.x = 9; // 'this' refers to the global "window" object.
var module = {
    x: 81,
    getX: function() { 
            return this.x; 
          }
};

module.getX(); //81

var retrieveX = module.getX;
retrieveX(); // 9, because the function is invoked at the global scope.

// Create a new function with 'this' bound to module
var boundGetX = retrieveX.bind(module);
boundGetX(); //81
    
```
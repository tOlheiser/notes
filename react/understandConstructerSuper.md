# Understanding constructor() & super() in Class Components

**Context**: My quest to learn React began when I had little understanding of ES6. I was familiar with *let* & *const*, arrow functions, template strings, and destructuring. So why did I jump into React so early? I was anxious to get started, and have no regrets. It felt like new concepts were sticking because I could see how they were applied in the React ecosystem.

## What does constructor() do?

The constructor for a React component is called before it is mounted. It serves two key purposes:
* Initializing **local state** by assigning an object to *this.state*. 
* Binding event handler methods to an instance.

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props); // call the super class constructor and pass in the props.
    this.state = {date: new Date()}; 
  }
}
```

### Initializing State

**Never** call setState() in the constructor. Instead, assign the initial state to this.state directly. *Constructors are the **only** place where you'd assign this.state directly.*

```javascript
constructor(props) {
  super(props);
  // Don't call this.setState() here!
  this.state = { counter: 0 }; //Assigning state directly.
  this.handleClick = this.handleClick.bind(this);
}
```

### You DON'T need a constructor if:
* You don't initialize state AND
* You don't bind methods

### Binding Methods
"It's actually better to bind methods in the constructor since they will only be created once. Otherwise if you call bind or use arrow functions to bind methods anywhere outside the constructor (like in the render method), it will actually end up creating a new instance of the function on every render" - [more info here](https://medium.com/@rjun07a/binding-callbacks-in-react-components-9133c0b396c6)

## What does super() do?
"If there is a constructor present in the subclass, it needs to first call super() before using *this*" - [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends). Otherwise, *this.props* will be undefined in the constructor. *this* is not initialized until super() is called.

### On calling super with props -> super(props)

There is only one reason when one needs to pass *props* to *super()*: **When you want to access *this.props* in constructor** - [src](https://stackoverflow.com/questions/30571875/whats-the-difference-between-super-and-superprops-in-react-when-using-e/34995257#34995257). If you don't, this.props is undefined in the constructor. *this.props would still be accessible anywhere else in the class outside the constructor.* As a general rule, **class components should always call the base constructor with props**.

An example of not passing props to super():
```javascript
class MyComponent extends React.Component {    
    constructor(props) {
        super()

        console.log(this.props)
        // -> undefined

        // Props parameter is still available
        console.log(props)
        // -> { icon: 'home', … }
    }

    render() {
        // No difference outside constructor
        console.log(this.props)
        // -> { icon: 'home', … }
    }
}
```

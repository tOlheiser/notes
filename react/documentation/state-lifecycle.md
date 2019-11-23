# State and Lifecycle

State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating the rule of React components behaving like pure functions. "The state is user-defined, and it **should be a plain JavaScript object.**" - [docs](https://reactjs.org/docs/react-component.html#state).

A component needs state when some data associated with it changes over time. A good example is a checkbox, where you need isChecked in its state. 

## state vs props

* props are passed to a component; state is managed within the component itself.
* A component cannot change its props, but it can change its state. 

## Adding 'state' to the Clock component

**First, we need to Convert a Function to a Class**
1. Create an ES6 class, with the same name of the function, that extends *React.Component*.
1. Add a single empty method called *render()*.
1. Move the body of the function into the *render()* method.
1. Replace *props* with *this.props* in the *render()* body. 

[Result:](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)
```javascript
class Clock extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.[props.date.toLocaleTimeString()]}.</h2>
            </div>
        );
    }
}
```

The *render* method will be called each time an update happens, but as long as we render *Clock* into the same DOM node, only a single instance of the *Clock* class will be used. This allows us to use additional features such as local state and lifecycle methods. 

## Adding Local State to a Class

**To do this, we need to move the date from props to state**
1. Replace *this.props.date* with *this.state.date* 
```javascript
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```
2. Add a *class constructor* that assigns the initial *this.state*
```javascript
class Clock extends React.Component {
    constructor(props) {
        super(props); //props being passed to the base constructor.
        this.state = {date: new Date()};
    }

    render() {...}
} // class components should ALWAYS call the base constructor with props.
```
3. Remove the *date* prop from the *<Clock />* element:
```javascript
ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);
```

[Current result](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

## Adding Lifecycle Methods to a Class

We can declare special methods on the component class to run some code when a component mounds and unmounts. We do this to free up resources taken up by the components when they are destroyed. 

**mounting**: *setting up a timer* when we're rendering our component into the DOM for the first time. 

**unmounting**: *clearing the timer* whenever the DOM produced by the component is removed. 

Mounting and unmounting methods are known as **lifecycle methods**.

The *componentDidMount()* method runs after the component output has been rendered correctly. 
```javascript
componentDidMount() { // saved the timerID directly on 'this'
    this.timerID = setInterval(
        //calling the tick() method so that the Clock component runs every second. 
        () => this.tick(), 
        1000 
    );
}
```

Tearing down the timer using the 'componentWillUnmount()' method.
```javascript
componentWillUnmount() {
    clearInterval(this.timerID);
}
```

Creating the aforementioned *tick()* method which the *Clock* component runs every second:
```javascript
tick() {
    this.setState({
        date: new Date()
    });
}
```

### Reviewing the Result
[Result](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

**Recap**:
1. When <Clock> is passed to *ReactDOM.render()*, **React calls the constructor of the *Clock* component**. Since Click needs to display the current time, it initialized *this.state* with an object including the current time.
1. **React then calls the Clock component's render() method**, which gives React instructions for what should be displayed on the screen.
1. **When the Clock output is inserted into the DOM, React then calls the *componentDidMount()* lifecycle method**. This gives the browser instructions to set up a timer which calls the *tick()* method once a second.
1. Every second the browser calls the tick() method. **React knows the state has changed due to the setState() call, and calls the render() method again to update the DOM**. 
1. If the Clock component is removed from the DOM, React calls the *componentWillUnmount()* lifecycle method so the timer is stopped.

## Using state Correctly

**Do Not Modify State Directly**
```javascript
this.state.comment = 'Hello'; // incorrect

this.setState({comment: 'Hello'}); //correct
```

The only place you can assign *this.state* is the constructor.

**State Updates May Be Asynchronous**

React may batch multiple setState() calls into a single update for performance. Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state. 

```javascript
this.setState({
  counter: this.state.counter + this.props.increment, 
  //wrong, because you rely on calulating their values for the next state. 
});
```

**Correct**: This function receives the previous state as the first argument, and the **props at the time the update is applied** as the second argument.
```javascript
this.setState((state,props) => ({ //pass in a function, not an object.
    counter: state.counter + props.increment 
})); // Arrow function is used, but you could also use a regular function.
```

**State Updates Are Merged**
When you call setState(), React merges the object you provide into the current state. 

```javascript
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Updating state:
```javascript
 componentDidMount() {
    //Separate functions to update the comments and posts. 

    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
        /* The posts property in state is updated, leaving the comments property intact. */
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
        // comments are now updated, the posts property isn't touched.
      });
    });
  }
```

**Avoid copying props into state**
```javascript
constructor(props) {
    super(props);
    this.state = {color: props.color}; //wrong.
}
```

This is wrong because:
* It's unnecessary (you can use this.props.color directly instead)
* It creates bugs; updates to the color prop won't be reflected in the state
*You would only do this if you intentionally want to ignore prop updates.*

## Data Flows Down

State is not accessible to any component other than the one that owns and sets it. The component that owns it may choose to pass its state down as props to child components.

```javascript
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>

/*This component would receive the date in its props and wouldn't know whether it came from the Clock's state, the Clock's props, or if it was typed by hand.*/
<FormattedDate date={this.state.date} />

function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>
}
```

This is known as **unidirectional data flow**. Any state is always owned by some specific component, and any data or UI derived from that state can **only affect components “below” them in the tree**. You can use stateless components inside stateful components, and vice versa. The fact whether a component is stateful or stateless is an implementation detail of the component that may change over time.

## Stateful and Stateless Components

Essentially, one has state and one doesn't. Stateful components keep track of changing data, while stateless components print out what is given to them via props, or they always render the same thing.

[Via Mosh Hamedani](https://programmingwithmosh.com/javascript/stateful-stateless-components-react/): Aim to have a parent component keep all the information, and pass it down to its children stateless components.

```javascript
class Parent extends Component { //parent component
  constructor() {
    super()
    this.state = {
      // keeps track of books and favourite authors in its state.
      books: [], 
      favoriteAuthors: []
    }
  }
  render() {
    return (
      <div>
        {//Passes down the books and authors data into stateless components}
        <Books books={this.state.books} />
        <FavoriteAuthors favoriteAuthors={this.state.favoriteAuthors} />
      </div>
    )
  }
}
```

This is also good for debugging regarding state management, because we can go directly to the parent component to find the source of the problem.

## Good Overview of Lifecycle Methods
*Credit to Tyler McGinnis*

```javascript
class App extends React.Component {
  constructor(props) {
    // Good for establishing the initial state of a component
    super(props)
    this.state = {}
  }
  componentDidMount(){
    // Invoked once the component is mounted to the DOM.
    // Good for making AJAX requests.
  }
  componentDidUpdate(){
    // Invoked immediately after updating occurs.
    // Good for AJAX requests based on changing props or DOM operations.
  }
  componentWillUnmount(){
    // Called right before a component is unmounted.
    // Good for cleaning up listeners.
  }
  render() {
    return ...
  }
}
```
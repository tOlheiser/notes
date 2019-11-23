# Components and Props

Components are like JavaScript functions which accept arbitrary inputs called 'props' and return React elements describing what should appear on the screen. They are uni-directional in that a component can only receive props from its parent.

## Two Ways of Definining Components: Function and Class Components

**Function Components**

This is the simplest way of defining a component. 
* Accept a single 'props' (stands for 'properties') object argument with data
* Return a React element.
* The first letter of the component name **MUST** be capitalized.

```javascript
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```

**ES6 Class Components**
```javascript
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

Classes have additional features, that weren't covered in this section. *It would be a good idea to understand ES6 classes before digging too much further.*

## Rendering a Component

React elements can also represent user-defined components.
```javascript
const element = <Welcome name="Sara" />;
```

React sees that 'Welcome' is uppercase, and therefore recognizes it as a component and knows to reference the 'Welcome' component which was defined earlier. *If 'Welcome' was lowercase, React would recognize it as a DOM tag.* React calls the Welcome component with {name: 'Sara'} as the props. 

## Composing Components

**Reminder**: 'props' consist of object properties that are passed in as parameters to the component.

Components can refer to other components. Take this *App* component that renders *Welcome* many times:

```javascript
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function App() {
    return (
        <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </div> // Each of these elements invoke the 'Welcome' component.
    ); // Remember the paranthesis when splitting JSX over multiple lines.
}

ReactDOM.render(
    <App />,
    document.getElementById('root');
)
```

## Splitting Components into Smaller Components

For this example we'll use this Comment component:
```javascript 
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Extracting the Avatar:
```javascript
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />

  );
}
```

Extracting UserInfo:
```javascript
// When called, the props of UserInfo will be user: {name, avatarUrl}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      {/*We read the current props from the UserInfo object, pull the user 
      object, and assign it to 'user'.*/}
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

Simplifying Comment:
```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} /> 
      {// user will contain the author object and be passed into the props.}
      <div className="Comment-text">
        {props.text} 
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

### Reasoning through the Codepen
Follow along with the [Codepen](https://reactjs.org/redirect-to-codepen/components-and-props/extracting-components-continued)
1. ReactDOM.render() takes the Comment component and 'root' ID to begin displaying content on the page.
1. The UserInfo component is referenced. The *user* property is created, and author object/*props.author* is assigned as the value.
1. Avatar component is referenced. The *user* property is created, and the original author object (now props.user), is assigned as the value.

## Props are Read-Only

**Important Rule**: A component must **never** modify its own props. Doing so would make the function impure, and in React we only do pure functions. *Pure functions are ones that do not attempt to change their inputs.*

Example of a function changing its input:
```javascript
function withdraw(account, amount) {
  account.total -= amount;
}
```

## props.children

props.children contains the content between the opening and closing tags of a component. Example:

```javascript
<Welcome>Hello world!</Welcome>

function Welcome(props) {
    // the string 'Hello world' is available in props.children. 
    return <p>{props.children}</p>;
}

// Component defined as a class
class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```


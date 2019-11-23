# JSX

## Embedding Expressions in JSX

Within a JSX statement, you can embed functions, object values, variables, and expressions. They must be within curly braces. 

```javascript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!  
  </h1> // Use curly braces within JSX to embed data. 
);

// const element = <h1>Hello, {name}</h1>; | Another example.

ReactDOM.render(
  element,
  document.getElementById('root')
); // 'root' is a <div> with the ID of 'root'
```

In the examples above, the JSX is spread across multiple lines for better readability. When you do this, it's good practice to wrap your JSX in paranthesis. _This prevents automatic semicolon insertion (ASI)._

## JSX is an Expression

JSX expressions become regular JavaScript function calls and evaluate to JS objects. They can be placed inside of _if_ statements, _for_ loops, passed in as arguments, returned from functions, etc.

```javascript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  } // example of a JSX expression being returned from a function.
  return <h1>Hello, Stranger.</h1>;
}
```

## Specifying Attributes with JSX

Use quotes to specify string literals as attributes. 

```javascript 
const element = <div tabIndex="0"></div>

//Alternatively, you can use curly braces to evaluate an expression as your attribute. 
const element = <img src={user.avatarUrl}></img>; //Quotes are not necessary if an expression is used. 
```

**Note**: JSX uses camelCase for attribute names. An example of this is _tabIndex_ as seen above. _className_ is also used instead of _class_.

## Specifying Children with JSX

Nothing complicated about this.
```javascript
    const element = (
    <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
    </div>
    ); //Just remember to wrap everything in parenthesis. 
```

**A Note on Security**: JSX prevents injections attacks because React DOM escapes any values embedded in JSX before rendering them. 

## JSX Represents Objects

```javascript
const element = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);
```

Babel compiles the above JSX down to React.createElement() calls which creates an object like this:

```javascript
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

This object is known as a React element and is used to construct the DOM. 
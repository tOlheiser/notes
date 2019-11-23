# Conditional Rendering

We'll render one of these components based on a condition.
```javascript
function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}
```

This Greeting component will display one of these components depending on the user's logged in status.
```javascript
function Greeting(props) {
    // grabbing in the logged in status
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) { 
        //if logged in, return the userGreeting
        return <UserGreeting/>;
    } 
    return <GuestGreeting/>;
}

ReactDOM.render(
    <Greeting isLoggedIn={false}/>,
    document.getElementById('root')
);
```

## Element Variables

You can store elements in variables, allowing you to conditionally render **parts of the component**, while the rest of the output doesn't change.

```javascript
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

This stateful component, LoginControl, will render either LoginButton or LogoutButton depending on its current state.

```javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    //binding the click events
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    //initializing state
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    // storing the element in a variable depending on state.
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        {//returning the greeting and button.}
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

### Inline If with Logical && Operator

You can embed any expressions in JSX by wrapping them in curly braces. 

```javascript
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {/* true && expression ALWAYS results in expression. 
      False && always evaluates to false. */}
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

If the first condition is true, it will return the expression.

### Inline If-Else with Conditional Operator

You can also use ternary operators.
```javascript
render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
        <div>
            The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
        </div>
    ); /* If isLoggedIn is true, write 'currently logged in', if false, 'not logged in'. */
}
```

Returning entire elements:
```javascript
render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
        <div>
            {isLoggedIn ? (
                // if logged in, render the logout button.
                <LogoutButton onClick={this.handleLogoutClick}/>
            ) : (
                //if logged out, render the login button.
                <LoginButton onClick={this.handleLoginClick}/>
            )}
        </div>
    );
}
```

## Preventing a Component from Rendering
In the event that you want a component to hide itself even if it was rendered by another component, return null instead of its render output.

```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```


# Terminology

**Knowledge Gaps**
* In video 11, Wes used 'refs' to reference the value inside an input element.
* I have only a surface level grasp of what context is and how to use it.

**Component** - Reusable pieces of code.  

There are multiple ways of declaring stateless functional components:

```javascript
const Header = (props) => {
    return (
        // ...
    )
}

// or

function Header(props) {
    return (
        // ...
    )
}

// or 

let Header = function(props) {
    return (
        // ...
    )
}
```

## Implementing React Router

**Step 1: Import React Router**

```javascript
import { BrowserRouter, Match, Miss } from 'react-router';
```

**Step 2: Nest your routes under the router**

```javascript
<BrowserRouter>
    <Match exactly pattern="/" component={StorePicker} />
    <Miss component={NotFound}/>
</BrowserRouter>
```

### Match
You can use Match on every page level. So if I only want to display a sidebar widget on specific pages, Match is a good tool for that. 

### Miss
Miss is essentially your fallback if none of the Match components rendered.

### Redirect
You would use Redirect to redirect to a page if a condition is true. 

```javascript
<Match pattern="/" exactly render={() => (
    loggedIn ? (
        <Redirect to="/dashboard"/>
    ) : (
        <PublicHomePage>
    )
)}>
```

## Understanding Class Methods a Little Better

The render() method is automatically bound to this class component, but the goToStore() method is not. We need to bind it.

```javascript
class StorePicker extends React.Component {
    goToStore() {
        // ...
    }

    render() {
        // ...
    }
}
```

Binding the method:

```javascript
constructor(props) {
    super(props);

    this.goToStore = goToStore.bind(this);
}
```

## Getting Started with Refs

When the user submits a form to create a fish, we want to trigger the 'createFish' event handler. This function will create a fish object and populate it with the values of the form inputs. **To capture the values of the form inputs, we use refs.** 

```javascript
// Inventory component
createFish(event) {
    const fish = {
        name,
        price,
        status,
        desc,
        image
    }
}
```

Form for creating a new fishj

```javascript
<form onSubmit={(e) => this.createFish(e)}>
    <input ref={(input) => this.name = input} type="text" placeholder="fish name"/>
    <input ref={(input) => this.price = input} type="text" placeholder="fish price"/>
    <select ref={(input) => this.status = input}>

    </select>
    <textarea ref={(input) => this.desc = input}>
    </textarea>
    <input ref={(input) => this.image = input} type="text" placeholder="fish image"/>
    <button type="submit">+ Add Item</button>
</form>

//Each element within the form, sans button, contains a ref.
ref={(input) => this.name = input}
```

How does is know what 'this.name' refers to? 

```javascript
const fish = {
    name: this.name.value,
    price: this.price.value,
    status: this.status.value,
    desc: this.desc.value,
    image: this.image.value,
}
```

## Reset a form on submit

Wesbos had a cool thing where, when the form was submitted, it captured the data and used it to update state, but also reset the form.

```javascript
//constructor
this.fishForm.reset();

//render()
<form ref={(input) => this.fishForm = input} onSubmit={(e) => this.createFish(e)}>
```

## Working with Firebase
Firebase is a real-time database that you can use to track changes to your data.  

Firebase is essentially one big object.
State in React is one big object. 

You can sync your state with firebase so that if one of them changes, they automatically change together. 

**Getting Started:**
Head over to the Firebase website, sign up for an account, and create a project. 

Click on the 'Database' link in the side panel. Update the RULES:

```javascript
{
    "rules": {
        ".read": true,
        ".write": true
    }
}
```

**Syncing State with Firebase**
* Grab the 'apiKey', 'authDomain', and 'dataBaseURL' from your Firebase project.
* Download the 'Rebase' package.
* Create a file inside your src folder named 'base.js'.

```javascript
import Rebase from 're-base';

// 
const base = Rebase.createClass({
    // Store the following data inside your rebase class:
    apiKey: "",
    authDomain: "",
    databaseURL: ""
});

export default base;
```

To use rebase in any of your files, import it:
```javascript
import base from '../base';
```

**Use componentWillMount() to sync data with Firebase**
This is invoked once both on the client immediately before initial rendering occurs.

```javascript
componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
        context: this,
        state: 'fishes'
    });
}

// What if we need to go to another store?
componentWillUnmount() {
    base.removeBinding(this.ref);
}

```

## Syncing State with LocalStorage
LocalStorage is a nice way to preserve form data. We'll use componentWillUpdate, because it triggers this lifecycle event whenever props or state changes. 

LocalStorage can be found in your network tab within the console. It consists of key value pairs, like objects. The only way it differs from objects is that you can't nest objects.

**Setting an item in LocalStorage:**
```javascript
localStorage.setItem('wes', 'is really cool');
```

**Retrieving an item from LocalStorage:**
```javascript
localStorage.getItem('wes'); //is really cool
```

Seeing this in action:
```javascript
componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
}
```

Using componentWillMount() to check if there is any order in localStorage
```javascript
// this runs right before App is rendered.
this.ref = base.syncState(`${this.props.params.storeId}`, {
    context: this,
    state: 'fishes'
});

//check if there is any order in localStorage
const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

if (localStorageRef) {
    this.setState({
        order: JSON.parse(localStorageRef) 
    });
}
```

## Quick Tip: Deleting From State

```javascript
removeFromOrder(key) {
    // duplicate the state object
    const order = {...this.state.order};

    //delete what you wanted to
    delete order[key];

    //setState
    this.setState({ order });
}
```
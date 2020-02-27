# Terminology

**Knowledge Gaps**
* In video 11, Wes used 'refs' to reference the value inside an input element.

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


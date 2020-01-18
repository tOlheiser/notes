# React Router

Steps to implementing React Router:

**1. Install React Router into your application using NPM** 
*npm install*react-router-dom*

**2. Import React Router into your index.js file**
```javascript
import { BrowserRouter as Router, Route } from 'react-router-dom';
```

**3. Wrap your entire application inside of the Router component**
```javascript
render() {
    return (
        <Router>
            <ThemeProvider value={this.state}>
                <div className={this.state.theme}>
                    <div className='container'>
                        <Nav />
                        <Popular />
                    </div>
                </div>
            </ThemeProvider>
        </Router>
    )
}
```

**4. Declare your routes**
*Reads as: when the user is on the index page, display the 'Popular' component.*

```javascript
render() {
    return (
        <Router>
            <ThemeProvider value={this.state}>
                <div className={this.state.theme}>
                    <div className='container'>
                        <Nav />

                        <Route exact path='/' component={Popular} />
                        <Route path='/battle' component={Battle} />
                    </div>
                </div>
            </ThemeProvider>
        </Router>
    )
}
```

*For Development:* Configure Webpack
```javascript
// webpack.config.js
module.exports = {
    output: {
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true
    }
}
```

**5. Update the Nav component**

```javascript
import {Link} from 'react-router-dom';

// Nav Component
return (
    <ThemeConsumer>
        {({ theme, toggleTheme }) => (
            <nav className="row space-between">
               <ul className='row nav'>
                <li>
                    <Link to='/' className='nav-link'>Popular</Link>
                </li>
                <li>
                    <Link to='/battle' className='nav-link'>Battle</Link>
                </li>
               </ul>
        
                <button
                    style={{fontSize: 30}}
                    className='btn=clear'
                    onClick={toggleTheme} 
                >
                    {theme === 'light' ? 'flashlight' : 'lightbulb'}
                </button>
            </nav>
        )}
    </ThemeConsumer>
)
```

**5b. Need to style the active link? Upgrade to NavLink**
```javascript
//Define the active styles
const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

//swap <Link to='/' className='nav-link'>Popular</Link> out for...
<NavLink
    to='/'
    exact
    activeStyle={activeStyle}
    className='nav-link'
>
    Popular
</NavLink>

// You'd apply the same activeStyle variable onto each activeStyle prop, so that when you're on the current path, it defers to activeStyle.
```

## Obtaining values from the query string

Assuming the URL looks something like *'https://analytics.twitter.com/user/tylermcginnis/tweets?filter=top&origin=im'*, we're looking to pull the values from filter & origin.

Components rendered by React Router get passed a 'location' object, which has a 'search' property on it.

```javascript
componentDidMount() {
  console.log(this.props.location.search) // "?filter=top&origin=im"
}
```

Parsing the query string:
1. Install the 'query-string' library on NPM - *npm install query-string*
2. import queryString
3. Call queryString.parse, passing in location.search

```javascript
import queryString from 'query-string'

...

componentDidMount() {
  const values = queryString.parse(this.props.location.search)
  console.log(values.filter) // "top"
  console.log(values.origin) // "im"
}
```

### Updating the Battle Component

1. Gett rid of the conditional logic
```javascript
// Remove all of this logic
render() {
    const {playerOne, playerTwo, battle} = this.state; 

    if (battle === true) {
        return (
            <Results 
                playerOne={playerOne}
                playerTwo={playerTwo}
                onReset={() => this.setState({
                    playerOne: null,
                    playerTwo: null,
                    battle: false
                })}
            />
        )
    }
}
```

2. Remove Battle from the component state
```javascript
this.state = {
    playerOne: null,
    playerTwo: null,
}
```

3. Import 'Link'
```javascript
import { Link } from 'react-router-dom';
```

4. Replace the Button with a Link

Instead of toggling state, we go to a new URL, passing along information about two players.
```javascript
{playerOne && playerTwo && (
    <Link
        className='btn dark-btn btn-space'
        to={{
            pathname: '/battle/results',
            search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
        }}
    >
    </Link>
)}
```

5. Update your Routes
*Ensure that the Results component is imported into index.js*.

```javascript
//index.js
<Route exact path='/' component={Popular} />
<Route exact path='/battle' component={Battle} />
<Route path='/battle/results' component={Results} />
```

6. Get data from the query string
*ensure query-string is installed & imported*

```javascript
componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(this.props.location.search);
}
```

*Bonus:* Updating the Reset button
Instead of using a function that clears the users, we can just link back to the battle page and not provide it with a search parameter, ultimately stripping the data.

```javascript
<Link
    to='/battle'
    className='btn dark-btn btn-space'
>
    Reset
</Link>
```

## Rendering a 404 page

**Create a catch-all component**
This renders if no other route's match.

```javascript
const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)
```

Render a Route without specifying a path prop. **Doing this alone causes an issue.** Since this route has no path, it will always be rendered. Instead, we can wrap our Routes inside of **Switch**, which **only renders the first Route that matches**.

```javascript
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

...

<Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/will-match" component={WillMatch}/>
    <Route component={NoMatch} />
</Switch>
```
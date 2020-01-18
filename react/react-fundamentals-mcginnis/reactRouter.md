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

**6. Obtaining values from the query string**

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

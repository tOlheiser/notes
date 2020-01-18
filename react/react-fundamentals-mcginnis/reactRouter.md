# React Router

Steps to implementing React Router:

1. Install React Router into your application using NPM: *npm install react-router-dom*

2. Import React Router into your index.js file
```javascript
import { BrowserRouter as Router, Route } from 'react-router-dom';
```

3. Wrap your entire application inside of the Router component
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

4. Declare your routes
*Reads as: when the user is on the index page, display the 'Popular' component.*
```javascript
render() {
    return (
        <Router>
            <ThemeProvider value={this.state}>
                <div className={this.state.theme}>
                    <div className='container'>
                        <Nav />

                        <Route path='/' component={Popular} />
                        <Route path='/battle' component={Battle} />
                    </div>
                </div>
            </ThemeProvider>
        </Router>
    )
}
```
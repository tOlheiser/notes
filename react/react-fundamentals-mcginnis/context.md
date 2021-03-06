# React Context

Context provides a way to pass data through the component tree **without having to pass props down manually at every level**. 

Generally, you would create a new Context for each unique piece of data that needs to be available throughout your component tree. 

```javascript
const LocaleContext = React.createContext()

// This variable has two properties on it, both are components:
LocalContext.Provider
LocalContext.Consumer
```

.Provider
Declare the data that you want available throughout the component tree.

.Consumer
Allows any component in the component tree that needs that data to be able to subscribe to it. 

## Provider

Here we use MyContext like any other component. The data that you want made available would be passed into the 'value' prop. 

```javascript
<MyContext.Provider value={data}>
    <App />
<MyContext.Provider />
```

Example

```javascript
// LocaleContext.js
import React from "react"

const LocaleContext = React.createContext()

export default LocaleContext
```

LocaleContext obtains the value for 'locale' from the 'App' component's state, and subsequently passes that data as props onto its children. Whenever the App's state changes, so too does all the children nested inside LocaleContext. 

```javascript
import React from 'react'
import LocaleContext from './LocaleContext'

class App extends React.Component { 
  constructor(props) {
    super(props)

    this.state = {
      locale: 'en'
    }
  }
  render() {
    return (
      <LocaleContext.Provider value={this.state.locale}>
        <Home />
      </LocaleContext.Provider>
    )
  }
}

export default App
```

## Consumer

The whole point of the consumer component is that it allows you to get access to the data that was passed as a value prop to the Context's Provider component. To get access, Consumer uses a render prop.

```javascript
<MyContext.Consumer>
  {(data) => {
    return (
      <h1>
        The "value" prop passed to "Provider" was {data}
      </h1>
    )
  }}
</MyContext.Consumer>
```

Since this.state.locale was passed as a prop to LocaleContext.Provider, you can get access to it by passing LocaleContext.Consumer a render prop.

```javascript
// Blog.js
import React from 'react'
import LocaleContext from './LocaleContext'

export default function Blog () {
  return (
    <LocaleContext.Consumer>
      {(locale) => <Posts locale={locale} />}
    </LocaleContext.Consumer>
  )
}
```

## Updating Context State

In the example above, the whole app was wrapped in 'LocaleContext.Provider', and any component in the application tree could get access to locale by using LocaleContext's consumer. Instead of just getting access to 'locale', we'd also like to toggle (from en -> es and back) from anywhere inside of the component tree. 

Solution? Pass a reference to the state object. 

```javascript
class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            locale: 'en',
            toggleLocale: () => {
                this.setState(({locale}) => ({
                    locale: locale === "en" ? "es" : "en"
                }));
            }
        }
    }
    render() {
        return (
            <LocaleContext.Provider value={this.state}>
                <Home />
            </LocaleContext.Provider>
        )
    }
}
```

Now, anywhere inside of our component tree, we can get access to the locale value or the ability to change it via toggleLocale.

```javascript
// Blog.js
import React from 'react'
import LocaleContext from './LocaleContext'

export default function Blog() {
    return(
        <LocaleContext.Consumer>
            {({ locale, toggleLocale }) => (
                <React.Fragment>
                    <Nav toggleLocale={toggleLocale} />
                    <Posts locale={locale} />
                </React.Fragment>
            )}
        </LocaleContext.Consumer>
    )
}
```

## Default Value

Firstly, define the context with a value.
```javascript
const MyContext = React.createContext('balloons');
```

**Rendering without the default value**
```javascript
<MyContext.Provider value="zits">
    <MyContext.Consumer>
        <p>Adam likes to pop {word}</p> 
    </MyContext.Consumer>
</MyContext.Provider> // Adam likes to pop zits
```

Since this 2nd example is not wrapped in a provider, it takes MyContext.Provider's default value.

**Rendering with a default value**
```javascript
<React.Fragment>
    <MyContext.Consumer>
        <p>Adam likes to pop {word}</p> 
    </MyContext.Consumer>
</React.Fragment>// Adam likes to pop balloons
```

## Notable Pattern from Tyler McGinnis

Within his contexts folder:
```javascript
// theme.js

import React from 'react'

// creates a context and immediate destructures it into two variables.
const { Consumer, Provider } = React.createContext();

// exports said variables as recognizable names
export const ThemeConsumer = Consumer
export const ThemeProvider = Provider
```

index.js file
```javascript
import { ThemeProvider } from './contexts/theme'

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            theme: 'light',
            toggleTheme: () => {
                this.setState(( {theme} ) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }
        }
    }
    
    render() {
        return (
            <ThemeProvider value={this.state}>
                <div className='container'>
                    <Battle />
                </div>
            </ThemeProvider>
        )
    }
}

```

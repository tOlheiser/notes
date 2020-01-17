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


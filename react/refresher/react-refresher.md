# React Refresher

**Tip** - Generally, if you use a component in multiple places on a site, it should be in its own module file in the components directory. If it's used only in one file, create it inline.

## Using Props
```javascript
// header.js - purpose of this is just to export an H1 element.
import React from 'react'

export default function Header(props) {
    return <h1>{props.headerText}</h1>
}

/* Since this file strictly exports a component, you must use the 'export' keyword. Since this file is only exporting a single component, we include the 'export default' keywords.

- We declare where the headerText will be when the component is invoked.
- The component name 'Header' must be capitalized.*/


// about.js - this is for the about page in my site.
import React from 'react'
import Header from '../components/header'

export default function About() {
    return (
        <div style={{ color: `teal` }}>
            <Header headerText="About Gatsby" /> 
            <p>Such wow. Very React.</p>
        </div>
    )
}

// Must import the Header to use it.
// When 'Header' is called, I pass in the "About Gatsby" value into the headerText props. 
```

## Import vs Require
```javascript
import "./src/styles/global.css"

// or:
require('./src/styles/global.css')
```

*require* is a CommonJS feature and *import* is an ES Module. Import is a good defeault. However, when working with files that are only run in a Node environment (like gatsby-node.js) *require* must be used.


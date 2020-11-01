# Styled Components

## Install & Setup

### If working inside a gatsby site:
1. **Install npm package**
*npm install gatsby-plugin-styled-components styled-components babel-plugin-styled-components*

2. **Update the config file**
```js
// gatsby-config.js
module.exports = {
    plugins: [`gatsby-plugin-styled-components`],
}
```

3. **Within the index page component, Import the *styled-components* package**
```js
// src/pages/index.js
import styled from "styled-components"
```

You're now free to create style blocks of each element type.

## Creating Global Styles

You can create styled components that override global styles. It is only advisable to do this within the Layout component. These styles are exposed to the whole app. 

```js
// src/components/layout.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        color: ${props => (props.theme === "purple" ? "purple" : "white")};
    }
`

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <GlobalStyle theme="purple" />
    </React.Fragment>
  )
}
```

## Enabling user stylesheets with a stable classname

The user can create a stylesheet that applies styles to the 'container' class.

```js
const Section = styled.section`
  margin: 3rem auto;
  max-width: 600px;
`
export default function Container({ children }) {
  return <Section className={`container`}>{children}</Section>
}
```

## Media Queries in Styled Components
```js
const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`
```

## Adapting Content Based on Props

Since it's a tagged template literal, we can place an expression directly into the CSS. Here we can pass props in. 

```js
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

render(
  <div>
    <Button>Normal</Button>
    {/* Prop */}
    <Button primary>Primary</Button>
  </div>
);
```

## Theme

You can create a theme file that holds all our variables. Create a theme.js file:

```javascript
export const theme = {
  primaryDark: '#0D0C1D',
  primaryLight: '#EFFFFA',
  primaryHover: '#343078',
  mobile: '576px',
}
```
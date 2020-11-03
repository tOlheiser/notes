# Concise Code when using Divs

## Original Code

Originally, my code began like this: 
```js
// layout.js

<div className={style.landingPageContainer}>
  <Header siteTitle={"Tanner Olheiser"} /> 
    <Sidebar position="left">
      <Email/>
    </Sidebar>
    <Sidebar position="left">
      <Social/>
    </Sidebar>
</div>
```

The Sidebar is meant to position the Email and Social components on either side of the page. 

### Sidebar component

```js
const StyledSideElement = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: ${props => (props.position === 'left' ? '40px' : 'auto')};
  right: ${props => (props.position === 'right' ? '40px' : 'auto')};
  z-index: 10;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = ({children, position}) => (
  <StyledSideElement position={position}>
    {children}
  </StyledSideElement>
)
```

## Making my code more concise

However, since the Sidebar is only meant to return a div with Sidebar's children nested in it, I can just move the code around so it looks more concise:

```js
// layout.js

<div className={style.landingPageContainer}>
  <Header siteTitle={"Tanner Olheiser"} /> 
    <Email/>
    <Social/>  
</div>
```

```js
// email.js

const Email = () => (
  <Sidebar position="right">
    <StyledEmailDiv>
      <a href={'mailto:tanner.olheiser@gmail.com'}>tanner.olheiser@gmail.com</a>
    </StyledEmailDiv>
  </Sidebar>
)
```
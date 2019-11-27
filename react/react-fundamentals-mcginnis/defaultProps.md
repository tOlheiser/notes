# Default Props

## Class component

If you’re using a class component, you’ll add a static property of defaultProps to your class. defaultProps is an object whose keys represent the props being passed to the component and whose values are the default values for those props.

```javascript
class StarRating extends React.Component {
  ...
}

StarRating.defaultProps = {
  color: '#ECB244'
}
```

If someone consumes the StarRating component without passing in a color prop, props.color will default to #ECB244.

## Function Component 

Because function components are just functions, we can use Default Parameters (along with destructuring) to set a default value for any props that are passed to our function component.

```javascript
function StarRating ({ color = '#ECB244' }) {
  ...
}
```















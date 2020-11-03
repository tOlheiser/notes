# Easy Vertical & Horizontal Lines

This creates a line directly following the div.

## Vertical Line

```js
const StyledSocialList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  /* Vertical Line */
  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: ${props => props.theme.primaryLight};
  }
  ```

## Horizontal Line

```js
const StyledSocialList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;
  /* Horizontal Line */
  &:after {
    content: '';
    display: block;
    width: 99px;
    height: 1px;
    margin: 0 auto;
    background-color: ${props => props.theme.primaryLight};
  }
```
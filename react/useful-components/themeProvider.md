# Theme Provider

## Step 1: Create a theme file
theme is an object with properties that define different styles. 
**Required:** Styled Components

```javascript
// theme.js
export const theme = {
    primaryDark: '#0D0C1D',
    primaryLight: '#EFFFFA',
    primaryHover: '#343078',
    mobile: '576px',
}
```

## Step 2: Implement Theme in your App
```javascript
// App.js
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme'; 

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <h1>Hello. This is burger menu tutorial</h1>
                <img src="https://image.flaticon.com/icons/svg/2016/2016012.svg" alt="burger icon" />
                <small>Icon made by Freepik from www.flaticon.com</small>
            </div>
        </ThemeProvider>
    );
}
export default App;
```

## How it works
ThemeProvider is imported, which is a wrapped component that uses the Context API to make the 'theme' variables available to the whole component tree. 
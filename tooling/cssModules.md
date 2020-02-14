# CSS Modules

CSS Modules are supported out of the box with create-react-app.

## Using PostCSS Modules
This is a guide to using the PostCSS plugin to use CSS Modules everywhere.

Step 1: Install the plugin 
*npm install --save-dev postcss-modules*

Step 2: Require the plugin in the bundler config
```javascript
postcss([
  require("postcss-modules")
)]
```

## Implementing CSS Modules

Create a stylesheet for the Widget component.
```css
/* Widget.css */
.title {
  font-weight: bold;
  font-size: 16px;
}

.email {
  padding: .5rem;
}

.submitButton {
  padding: .5rem;
  margin-top: .5rem;
  border: 1px solid #2F79AD;
  border-radius: 4px;
  background-color: #6DB9EE;
}

.submitButton:hover {
  background-color: #2F79AD;
}
```

Import the styles
```javascript
import React from 'react';
import styles from './Widget.css';
```

Use the Styles
```javascript
<h2 className={styles.title}> Email Signup </h2>
```

## Using the classnames package
[Link to the repo](https://github.com/JedWatson/classnames)

Lets assume you have a button class, and a button.disabled class you need to apply to the same element. The classnames package will put a space in-between the two class names.

```javascript
import cx from 'classnames';

// ...

<button
    className={cx(
        styles.button,
        styles.disabled
    )}
```

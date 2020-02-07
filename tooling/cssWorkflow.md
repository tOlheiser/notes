# CSS Workflow

## Benefits of CSS Preprocessors
* CSS Variables
* Nested CSS

### Example of Nested CSS

**Before**
```css
.feature-box a {
    display: block;
}

.feature-box p {
    padding: 10px;
    line-height: 1.7;
}
```

**After**
```css
.feature-box {
    a {
        display: block;
        padding: 15px;
    }

    p {
        padding: 10px;
        line-height: 1.7;
    }
}
```

## PostCSS
It is the fastest to compile out of all pre/post-processors.

*npm install postcss-loader --save-dev*
*npm install postcss-simple-vars postcss-nested autoprefixer --save-dev*

```javascript
// webpack config
// declare this array near the top
const postCSSPlugins = [
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]
```

## Workflow
Import CSS:
```javascript
//App.js
import '../styles/styles.css';
```

Getting css importing/bundling to work with webpack:
*npm install css-loader style-loader --save-dev*
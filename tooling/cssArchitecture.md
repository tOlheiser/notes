# File Architecture

Instead of dumping all of our css into a single file, we can spread it out into CSS Modules. 

**Example File Architecture**
-styles
--modules
 -- _large-hero.css
--styles.css

*Beginning a file with an underscore indicates that it is a partial file.*

## Importing a CSS Module into the main CSS stylesheet
```css
/* styles.css */
@import 'modules/_large-hero';
```

**Note**: The import statement must be specified at the top of the file. 

**More on import**
Import is a native css feature. However we don't want our browser to download multiple css files. Instead, we'd like webpack and PostCSS to see the import statement, and replace it with the contents of its file. 

### Using PostCSS with Import

**Install a package with npm**
*npm install postcss-import --save-dev*

**Modify the webpack.config.js file**
```javascript
const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer'),
]
```

**Quick Tip:** Normalize is an alternative to css resets

## Further Organization

Have your styles.css file contain only import statements. We'll take the global css and split that into a different file, and also import normalize.

```css
@import "normalize.css";
@import "base/_global";
@import "modules/_large-hero";
```

Here, normalize will be recognized by node_modules (ensure it is in your dependencies). I created a 'base' directory to store the global styles in.
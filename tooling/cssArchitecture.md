# CSS Architecture

## File Structure
The instructor created a file called "_large-hero.css". The underscore isn't mandatory, but it could indicate to other devs that it is a partial file. He placed this in his "modules" folder.

-styles
--modules
--*styles.css*

### Importing Stylesheets to styles.css
'Import' is a native CSS feature.

```css
/* styles.css */

@import 'modules/_large-hero.css';
```

### Configuring PostCSS for Imports
We don't want the browser to download all the css files, we just want the css of those files to get inserted into our main styles.css file.
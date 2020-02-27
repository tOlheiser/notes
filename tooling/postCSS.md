# PostCSS

PostCSS is a tool for transforming CSS with JavaScript plugins. It provides features via its extensive plugin ecosystem to help improve your CSS writing experience.

**Why PostCSS over other Preprocessors?**
PostCSS can do the same work as preprocessors like Sass, Less, and Stylus, but PostCSS is modular and faster. It allows you to pick only the features you need, where as Sass and Less give you lots of features you may or may not use.

**Useful Packages:**
* CSS Modules - Locally scoped CSS class names.
* AutoPrefixer (Built into Parcel) - Adds vendor prefixes to CSS properties using values from Can I Use.
* PreCSS - Sass-like markup (variables, conditionals, iterators).

## Usage

Parcel comes with PostCSS support out of the box.

**Step 1: Install Plugins that you need**
*npm i -D postcss-modules postcss-uncss uncss*

**Step 2: Create a config in the project's root**
```javascript
// postcss.config.js

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-nested')
    ]
}

```
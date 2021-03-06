<<<<<<< HEAD
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
=======
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

## Further Organization

Have your styles.css file contain only import statements. We'll take the global css and split that into a different file, and also import normalize.

```css
@import "normalize.css";
@import "base/_global";
@import "modules/_large-hero";
```

Here, normalize will be recognized by node_modules (ensure it is in your dependencies). I created a 'base' directory to store the global styles in.

## BEM Methodology

* Block - Standalone entity that is meaningful on its own.
* Element - A part of a block that has no standalone meaning and is semantically tied to its block.
* Modifier - A flag on a block or element. Use them to change appearance or behavior. Examples include 'checked', 'disabled', 'highlighted', etc.

### General Overview
* CSS Selectors should target elements directly with classes, instead of relying on type selectors, descendent selectors, and the cascade. 
* Blocks can be nested inside other blocks.
* Identify patterns, and then create single-responsibility blocks.

In BEM, you would not write a selector like this to target a child element:
```css
.large-hero h1 {
    font-weight: 300;
}
```

You'd instead create a class for it:
```css
.large-hero__title {
    font-weight: 300;
}
```

**Naming Convention**
Block: 'large-hero'
Element: 'large-hero__subtitle'
Modifier: 'large-hero--modifier'

**'A more JavaScript-friendly BEM naming convention'**
* Blocks are written using PascalCase, like in VideoPlayer.
* Elements are written using camelCase, joined to the block name using a single underscore (_), like in VideoPlayer_buttonsContainer.
* Modifiers are written using camelCase, but we use three underscores (___) to join the modifier to the block or element name, like in VideoPlayer___isLoading.
[source](https://medium.com/trabe/a-more-javascript-friendly-bem-naming-convention-75c7f01ff736)

## PostCSS Nesting Integrated with BEM

**Current CSS**
```css
/* large-hero is considered a block */
.large-hero {
    position: relative;
}

/* These are considered elements that belong to the noted block */
.large-hero__text-content {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
    text-align: center;
}

.large-hero__title {
    font-weight: 300;
    color: #2f5572;
    font-size: 4.8rem;
}

.large-hero__subtitle {
    font-weight: 300;
    color: #2f5572;
    font-size: 2.9rem;
}
```

**Basic nesting:**
```css
.large-hero {
    position: relative;

    .large-hero__text-content {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 100%;
        text-align: center;
    }
}
```

The generated CSS:
```css
.large-hero .large-hero__text-content {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
    left: 0;
    width: 100%;
    text-align: center;
}
```

*.large-hero .large-hero__text-content* is a descendent selector, which goes against the BEM philosophy.

### Correct Nesting to align with BEM

```css
.large-hero {
    position: relative;

    & {
        ...
    }
}
```

The ampersand gets replaced with the root rules selector when the css is compiled. 

**Putting it all together**
```css
.large-hero {
    position: relative;

    &__text-content { /* Gets compiled into .large-hero__text-content */
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 100%;
        text-align: center;
    }
}
```

**Final Code**
```css
.large-hero {
    position: relative;

    &__text-content {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 100%;
        text-align: center;
    }

    &__title {
        font-weight: 300;
        color: #2f5572;
        font-size: 4.8rem;
    }

    &__subtitle {
        font-weight: 300;
        color: #2f5572;
        font-size: 2.9rem;
    }
}
```

**Same Effect Using Btn Styles**
```css
.btn {
    background-color: $mainBlue;
    color: #fff;
    text-decoration: none;
    padding: .75rem 1.2rem;
    display: inline-block;

    &--orange {
        background-color: $mainOrange;
    }

    &--large {
        font-size: 1.25rem;
        padding: 1.1rem 1.9rem;
    }
}
```

## CSS Quick Tips
* Use rem for font-size to adapt to the users' various font preferences. 
* Normalize is an alternative to css resets

### Centering an Element Vertically Without Flexbox or Grid

```css
.large-hero {
    position: relative;
}

.large-hero__text-content {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
    text-align: center;
}
```

### Using Variables In PostCSS

Firstly, you would keep a file in your style's base folder that keeps track of the variables. We'll name it _variables.css.

-styles
--base
  --_global.css
  --_variables.css
--modules
  --_btn.css
  --_large-hero.css
--styles.css

**_variables.css**
```css
$mainBlue: #2f5572;
```

You would then import that variables module into your main styles.css file so that you can use that variable in your module.

```css
.btn {
    background-color: $mainBlue;
}
```
>>>>>>> efd19317fb885f23df55eab4d24f8d8cebecb4aa

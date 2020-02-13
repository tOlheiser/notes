# Mobile First

There is more traffic from mobile devices than traditional desktops / laptops. We also don't want anyone to have to download extra data that they won't even use. Such as supplying an image you'd display for desktop, on a mobile device. 

**Original Code**
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

## Mobile First in Action

**Basics**
* Change the measurements so that they are optimized for mobile.
* Add a media query for larger screens. 

```css
    &__title {
        font-weight: 300;
        color: #2f5572;
        font-size: 1.1rem; /* Changed sizing for mobile | Was previously 4.8rem */
    
        /* Declared a media query for larger screens */
        @media (min-width: 530px) {
            font-size: 4.8rem;
        }
    }
```

## Using Mixins with PostCSS

**What is a Mixin?** A Mixin is a reusable bit of code.

Step 1: Install the mixins plugin
* *npm install postcss-mixins --save-dev*
Step 2: Modify the bundler config

```javascript
//webpack.config.js

const postCSSPlugins = [
    require('postcss-mixins'),
    ...
]
```

Step 3: Add a mixins folder to the base directory

-styles
--base
  --_global.css
  --_variables.css
  --**_mixins.css**
--modules
  --_btn.css
  --_large-hero.css
--styles.css

Step 4: Import your mixins to the main styles file
```css
@import "base/_mixins";
```

## Mixins in Action

### Defining a mixin
*@define-mixin mixin-name*

```css
/* _mixins.css */

@define-mixin atSmall {
    @media (min-width: 530px) {
        @mixin-content;
    }
}

@define-mixin atMedium {
    @media (min-width: 800px) {
        @mixin-content;
    }
}

@define-mixin atLarge {
    @media (min-width: 1200px) {
        @mixin-content;
    }
}
```

### Using the mixin
```css
/* _large-hero.css */
&__title {
    font-weight: 300;
    color: #mainBlue;
    margin: 0;
    font-size: 1.1rem; 
    
    @mixin atSmall {
        font-size: 2rem;
    }

    @mixin atMedium {
        font-size: 3.2rem;
    }

    @mixin atLarge {
        font-size: 4.8rem;
    }
}
```

## Responsive Images

Is a way of sending different image files to different screen sizes.

**Art direction & cropping situation**
*This is when you use different variations of an image (progressively crops more and more)*

```html
<picture>
    <!-- Large Img -->
    <source srcset="images/dog-crop-large.jpg" media="(min-width: 1200px)">

    <!-- Medium Img -->
    <source srcset="images/dog-crop-medium.jpg" media="(min-width: 760px)">

    <!-- Small Img -->
    <img src="images/dog-crop-small.jpg" alt="Puppy in the sand.">
</picture>
```

**Image Resolution & File Size Situation**

The web browser is able to detect which image is best suitable.
```html
<img srcset="images/dog-resolution-small.jpg 570w, images/dog-resolution-medium.jpg 1200w, images/dog-resolution-large.jpg 1920w" alt="puppy in the sand.">
```

The measurements, '1200w' is to aid the browser in choosing which file to download and display. 
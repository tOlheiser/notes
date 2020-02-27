# Parcel

Parcel is a very, very easy to use bundler. All you have to do is install it via npm, then add a script that points parcel to your index.html file.

Cool comparison of Parcel vs Webpack: "It’s sort of like the difference between driving a car with an automatic transmission versus a stick shift. Sometimes you need the additional control and sometimes you don’t." - [source](https://css-tricks.com/why-parcel-has-become-my-go-to-bundler-for-development/)

## Setting up Parcel

**Step 1: Install the dependencies for React & Parcel**
* *npm install --save react react-dom*
* *npm install --save-dev parcel-bundler*
* *npm install @babel/preset-env @babel/preset-react --save-dev*

**Step 2: Add a script to package.json**

```javascript
"scripts": {
    "dev": "parcel src/index.html",
}
```

Running *npm run dev* will create a .cache and dist folder for you, and runs a dev server. 

## Example of Dynamic Imports with Parcel

```javascript
// pages/about.js
export function render() {
  // Render the page
}

import('./pages/about').then(function(page) {
  // Render page
  page.render()
})
```

## Transpiling

Install preset-env to transform all the features of ES6.
*npm install @babel/core @babel/preset-env @babel/preset-react --save-dev*

**Update the Config**
```javascript
// .babelrc

{
  "presets": ["@babel/preset-react", "@babel/preset-env"],
  // Alternatively, ["env", "react"] may suffice.
  // Optional | "plugins": ["@babel/plugin-proposal-class-properties"]
}

```

## Building for production

Add a script inside your package.json file:
```javascript
// package.json

"scripts": {
    "start": "parcel src/index.html",
    "build": "parcel build src/index.html"
}
```

This builds all the assets to a *dist* folder, but it doesn't clean the folder out each time it's ran.

```javascript
// package.json
"scripts": {
	"start": "parcel src/index.html -p 3000 --open",
	"clean": "rm -rf dist/*",
	"build:parcel": "parcel build src/index.html",
	"build": "npm run clean && npm run build:parcel",
}
```

**Breakdown:**
* The 'clean' script removes everything in the dist folder.
* 'build' has been renamed to 'build:parcel'
* Now when you run build, it will clean the dist folder before building.

Credit to [Michelle Barker](https://css-irl.info/a-modern-front-end-workflow-part-2/)
# Webpack Essentials

On Webpack's landing page it says:
* Bundle your assets
* Bundle your scripts
* Bundle your images
* Bundle your styles

**Step 1: Instal Webpack**
*npm install webpack webpack-cli --save-dev*

**Step 2: Create a Config for Webpack**
Create a file called **webpack.config.js** at the root of your project folder.

**Step 3: Add an entry point in the config file**
This points webpack to your main app.js file you want it to use to bundle your project.

```javascript
module.exports = {
    entry: './app/assets/scripts/App.js',
}
```

**Step 4: Add Webpack to your scripts in package.json**
```javascript
"scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
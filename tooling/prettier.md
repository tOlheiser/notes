# Prettier.js

Prettier.js is used to format your code. It's best used when you have multiple people working on the same project, and forces everyone into the exact same formatting. "It's all slightly different than we would have chosen it, but we're all in the same format."

**Installing Prettier**
*npm install -D prettier*

## Creating a script to run Prettier

This script runs prettier on any file in any directory inside of the src directory that has a js or html extension.

```javascript
// package.json
"scripts": {
    "format": "prettier \"src/**/*.{js,html}\"",
}
```



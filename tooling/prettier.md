# Prettier.js

Prettier.js is used to format your code. It's best used when you have multiple people working on the same project, and forces everyone into the exact same formatting. "It's all slightly different than we would have chosen it, but we're all in the same format."

**Installing Prettier**
*npm install -D prettier*

## Good: Creating a script to run Prettier

This script runs prettier on any file in any directory inside of the src directory that has a js or html extension.

```javascript
// package.json
"scripts": {
    "format": "prettier \"src/**/*.{js,html}\" --write",
}
```

This is a script you want to run right before you commit.

## Better: Run Prettier every time you save a file

Step 1: Download the 'Prettier: Code Formatter' extension.
Step 2: Go into your settings
* Enable 'Format on Save'
* Enable 'Prettier: Require Config' - *You want Prettier to run, but only run on projects that Prettier is installed on.*
Step 3: Create a config file
* Create a new file in the root directory of your project. **Save as '.prettierrc'**
Step 4: Set up your config file

**Default Config**
```javascript
//.prettierrc

{} // Leaving it as an empty object gives you the default config.
```

**Example Rules**
```javascript
//.prettierrc

{
    "singleQuote": false,
}
```

# ESLint

ESLint is a code linter. It's concerned with what methods you're using, are you being accessibility friendly, do you have an unused variable, etc.

## Installing ESLint
*npm install -D eslint eslint-config-prettier*

**Configuring ESLint for React**
*npm install -D babel-eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react*

**Configuring ESLint for Hooks**
*npm i -D eslint-plugin-react-hooks*
  
The Prettier config is to resolve any conflicts between ESLint and Prettier. 

**Notable Plugins**
* Prettier - *npm install -D eslint-config-prettier*

## Setting up an ESLint Config
Step 1: Create a new file. **Save as *'.eslintrc.json'* in your root directory.**
Step 2: Configure the file.

```javascript
// .eslintrc.json

{
    // Extends are sets of rules.
    "extends": [
        "eslint:recommended", 
        // React Dependencies
        "plugin:import/errors",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",

        // Prettier must come at the end.
        "prettier", 
        "prettier/react"
    ],
    // where you can toggle different rules
    "rules": {
        "react/prop-types": 0,
        "no-console": 1,
        "react-hooks/rules-of-hooks": 2,
        "react-hooks/exhaustive-deps": 1 
    }
    // Plugings are new abilities for eslint
    "plugins": ["react", "import", "jsx-a11y", "react-hooks"],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}

```

Step 3: Modify your package.json file

```javascript
//package.json

"scripts": {
    "lint": "eslint \"src/**/*.{js.jsx}\" --quiet",
}

```
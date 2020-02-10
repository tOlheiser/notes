# ESLint

ESLint is a code linter. It's concerned with what methods you're using, are you being accessibility friendly, do you have an unused variable, etc.

**Installing ESLint**
*npm install -D eslint eslint-config-prettier*

The Prettier config is to resolve any conflicts between ESLint and Prettier. 

**Notable Plugins**
* Prettier - *npm install -D eslint-config-prettier*

## Setting up an ESLint Config
Step 1: Create a new file. **Save as *'.eslintrc.json'* in your root directory.**
Step 2: Configure the file.

```javascript
// .eslintrc.json

{
    "extends": ["eslint:recommended", "prettier", "prettier/react"],
    "plugins": [],
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
    }
}

```


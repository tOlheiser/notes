# Parcel

Parcel is a very, very easy to use bundler. All you have to do is install it via npm, then at a script that points parcel to your index.html file.

## Setting up Parcel
Step 1: Install Parcel - *npm install -D parcel-bundler*
Step 2: Modify your package.json file

```javascript
"scripts": {
    "dev": "parcel src/index.html",
}
```

Running *npm run dev* will create a .cache and dist folder for you, and runs a dev server. 
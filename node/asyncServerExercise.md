# Asynchronous Server Exercise

## Step One: Convert to Async

old code
```javascript
const findAsset = (name) => {
    const assetPath = path.join(__dirname, 'assets', name)
    return fs.readFileSync(assetPath, {encoding: 'utf-8'}).toString()
}
```

refactored code
```javascript
const findAsset = (name) => {
    const assetPath = path.join(__dirname, 'assets', name)
    return new Promise((resolve, reject) => {
        fs.readFile(assetPath, {encoding: 'utf-8'}, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        }
    })
}
```

## step Two: Update the Server

old code:
```javascript
const server = http.createServer((req, res) => {
    const method = req.method
    const route = url.parse(req.url).pathname

    if (route === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(findAsset('index.html'))
        logRequest(method, route, 200)
        res.end()
    } else {
        throw new Error('route not found')
        res.end()
    }
})
```

new code:

add async keyword
```javascript
const server = http.createServer(async (req, res) => { 
```

add await
```javascript
res.write(await findAsset('index.html'))
```

## Create a router 
This handles all different types of assets, and silently fails if they don't exist.

```javascript
const router = {
    '/ GET': {
        asset: 'index.html',
        //mime.getType depends on the 'mime' npm module.
        mime: mime.getType('html'), 
    },
    '/style.css GET': {
        asset: 'style.css',
        mime: mime.getType('css'),
    }
}
```
# Useful Tidbits from Tyler Mcginnis' React Fundamentals Course

## Reset State of the parent component via child component

Parent component: 'Battle.js'
Child Component: 'Results.js'

Within Battle.js:
```javascript
if (battle === true) {
    return (
        <Results
            playerOne={playerOne}
            playerTwo={playerTwo}
            /* Results component is passed a function. This function is used to reset the state when the reset button is clicked. Instead of passing a reference to another function, everything is handled here. */
            onReset={() => this.setState({
                playerOne: null,
                playerTwo: null,
                battle: false
            })}
        />
    )
}
```

## Instance Properties

Interestingly, you can access the interval variable from outside componentDidMount's scope.

```javascript
componentDidMount () {
    this.interval = window.setInterval(() => {
        ...
    })
}

componentWillUnmount () {
    window.clearInterval(this.interval)
}

```

## CSS in JS

```javascript
const styles = {
    content: {
        fontSize: '35px',
        position: 'absolute',
        marginTop: '20px'
        textAlign: 'center'
    }
}

render() {
    return (
        <p style={styles.content}>
            {this.state.content}
        </p>
    )
}
```
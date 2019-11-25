# Battle View
Something that I noticed is that he builds the views before connecting them together via React Router. 

```javascript
// Battle.js file
import React from 'react'

function Instructions () {
    return (
        <div>
            Instructions
        </div>
    )
}

// Battle view references the instructions component.
export default class Battle extends React.Component {
    render() {
        return (
            <React.Fragment>
            <Instructions/>

            <PlayerInput label="Label!" onSubmit={(value) => console.log('value', value)} />
            </React.Fragment>
        )
    }
}

// index.js file
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// You import the 'views' from the components folder.
import Popular from './components/Popular'
import Battle from './components/Battle'

```

## Player Inputs
```javascript
class PlayerInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.onSubmit(this.state.username)
    }

    handleChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <form className='column player' onSubmit={this.handleSubmit}>
                <label htmlFor='username' className='player-label'> 
                    {this.props.label}
                </label>
                <div className='row player-inputs'>
                    <input
                        type='text'
                        id='username'
                        className='input-light'
                        placeholder='github username'
                        autoComplete='off'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <button
                        className='btn btn-dark'
                        type='submit'
                        disabled={!this.state.username}
                    >
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}
```

**Styling something that's disabled:**
.dark-btn:disabled {
    background: #f2f2f2;
}

## Updating the Battle Component

```javascript
export default class Battle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // these update when you submit a player from the PlayerInput component.
            playerOne: null,
            playerTwo: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(id, player) {
            this.setState({
                [id]: player
            })
        }
    
    render() {
        const {playerOne, playerTwo} = this.state
        return (
            <React.Fragment>
            <Instructions/>

            <div className='players-container'>
                <h1 className='center-text header-lg'>Players</h1>

                <div className='row space-around'>
                    {/*Only render if a username hasn't been entered.*/}
                    {playerOne === null && (
                        <PlayerInput 
                            label='Player One'
                            onSubmit={(player) => this.handleSubmit()}
                        />
                    )}

                    {playerTwo === null && (
                        <PlayerInput 
                            label='Player Two'
                            onSubmit={(player) => this.handleSubmit()}
                        />
                    )}
                </div>
            </div>
            
            </React.Fragment>
        )
    }
}
```

### Taking a closer look when user clicks 'submit'

Inside the Battle component:

```javascript
<PlayerInput 
    label='Player One'
    onSubmit={(player) => this.handleSubmit('PlayerOne', player)}

    /* When onSubmit is clicked:
    1. invokes the arrow function passed in, which is passed whatever is in the input field (the username).
    2. handleSubmit is called. which is passed in the id (playerOne or playerTwo) and player (the username). */
/>

handleSubmit(id, player) {
    this.setState({
        [id]: player
    })
}

    /* The Battle component's state object holds two keys: playerOne and playerTwo.
    
    The first PlayerInput has the 'playerOne' Id tied to it. So whenever you click submit, that id is passed in to handleSubmit() and computed into the key that needs to update. 'player' holds the value of whatever value the user submitted.
```

## Conditionally Rendering PlayerPreview

We want to create a PlayerPreview component which will be displayed when a username has been submitted. 

```javascript
 <div className='row space-around'>
                    {playerOne === null 
                        ? <PlayerInput 
                            label='Player One'
                            onSubmit={(player) => this.handleSubmit()}
                        />
                        : <PlayerPreview
                            username={playerOne}
                            label='Player One'
                        /* onReset sets state of the respective player to 'null', which will display the PlayerInput component. */
                            onReset={() => this.handleReset('playerOne')}
                        />
                    )}
                </div>
```

## Conditionally Rendering the 'Battle' Button

If neither of playerOne or playerTwo is null, render the battle button. To display the Results component, we add the 'battle' key to state, with the default value of 'false'. If it's true, you display the battle component.

```javascript
{playerOne && playerTwo && (
    <button
        className='btn dark-btn btn-space'
        onClick={() => this.setState({battle: true})}
    >
        Battle
    </button>
)}
```

**Modifying the render method on the Battle component**
```javascript
render() {
    const {playerOne, playerTwo, battle} = this.state

    // if true, you'll return the result component, and won't return the instructions component.
    if (battle === true) {
        // returning the Results component and passing players as props.
        return <Results playerOne={playerOne} playerTwo={playerTwo}>
    }
}

```
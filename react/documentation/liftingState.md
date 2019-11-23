# Lifting State

Often times several components reflect the same changing data. It is recommended to lift the shared state up to their **closest common ancestor**. This will be demonstrated using a temperature calculator that calculates whether the water would boil at a given temperature. 

We'll begin with a component called 'BoilingVerdict'. 
* It accepts the celsius temperature as a prop.
* Prints whether it is enough to boil the water.

```javascript
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}
```

Next, we'll create a component called 'Calculator'. 
* It renders an *input* which lets you enter the temperature.
* It keeps its value in this.state.temperature.
* It renders the BoilingVerdict for the current input value.

```javascript
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
    }

    handleChange(e) {
        this.setState({temperature: e.target.value});
    }

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>Enter temperature in Celsius:</legend>
                <input
                    value={temperature}
                    onChange={this.handleChange} />
                
                <BoilingVerdict
                    celsius={parseFloat(temperature)} />
            </fieldset>
        )
    }
}
```

[Codepen](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

## Adding a Second Input

A Fahrenheit input will be added, and will be kept in sync with the Celsius input. The first step is to extract a 'TemperatureInput' component from Calculator. A new 'scale' prop will be added to it that can be either 'c' or 'f'. 

```javascript
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
    }

    handleChange(e) {
        this.setState({temperature: e.target.value});
    }

    render() {
        const temperature = this.state.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}
```

We can now change the Calculator to render two separate temperature inputs:

```javascript
class Calculator extends React.Component {
    render() {
        return (
            <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        )
    }
}
```

Next step: When we enter a temperature in one of them, we want the other to update.

[Codepen](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

## Writing Conversion Functions

We'll first create two functions. One that converts Celsius to Fahrenheit, and the reverse. 

```javascript
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
```

This next function will take the temperature & one of this converter functions as arguments and returns a string. It will be used to calculate the value of one input based on the other input.

```javascript

/* How it may run: User enters a temperature into the 'Fahrenheit' input. This function is automatically called to take that input and pass it into the toCelsius conversion function, and store the output as a string. */

function tryConvert(temperature, convert) {
    // storing the input inside a variable.
    const input = parseFloat(temperature);

    if (Number.isNaN(input)) {
        return ''; //returns an empty string if its an invalid input.
    }

    // Converting the temperature and storing the output in a variable.
    const output = convert(input); 
    
    const rounded = Math.round(output * 1000) / 1000; // rounding the output.
    return rounded.toString(); // returning the rounded output as a string.
}
```

## Lifting State Up

Currently, both TemperatureInput components independently keep their values in the local state. Instead, we want the two inputs to be in sync with each other. 

**Sharing state is accomplished by moving it up to the closest common ancestor of the components that need it**. This is called 'lifting state up'. Thus, the local state will be removed from TemperatureInput and will be moved into the Calculator instead. 

If the Calculator owns the shared state, it becomes the singular 'source of truth' for the current temperature in both inputs. Since the props of both TemperatureInput components are coming from the same parent Calculator component, the two inputs will always be in sync. 

---

### Step 1: Replace 'state' with 'props' in the child components.

The first step is to replace *this.state.temperature* with *this.props.temperature* in the TemperatureInput component.

```javascript
render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
}
```

### Step 2: Handling change 

Since props are read-only, the TemperatureInput can no longer call 'this.setState()' to change its temperature. This is solved by making a component 'controlled'. 

The custom TemperatureInput can accept both 'temperature' and 'onTemperatureChange' props from its parent Calculator. When the TemperatureInput wants to update its temperature, it calls this.props.onTemperatureChange, which is provided by the parent Calculator component.

```javascript
handleChange(e) {
    // before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
}
```

#### Recapping the Changes

```javascript
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    /* Using the local state of TemperatureInput is no longer an option. */
    this.props.onTemperatureChange(e.target.value); 
  }

  render() {
    // now using props instead of state.
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

### Step 3: Modifying the parent component

Only the **current input's** 'temperature' and 'scale' will be stored in the Calculator's local state. It is the only data we need to know in order to render both inputs.

If you enter '40' into the Celsius input, the state of the Calculator component will be: 

```javascript
{
    temperature: '37',
    scale: 'c'
}
```

Storing the value of both inputs is unnecessary because you only need the value of the most recently changed input, and the scale that it represents. You can infer the value of the other input based on the current temperature and scale alone.

The inputs are now in sync because their values are computed from the same state:

```javascript
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        /* If the current state of scale is in fahrenheit, call the tryConvert function. Otherwise, use the current temperature value in the local state. */
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                scale="c"
                temperature={celsius}
                /* this.props.onTemperatureChange references the 'this.handleCelsiusChange' function in this instance. */
                onTemperatureChange={this.handleCelsiusChange} />

                <TemperatureInput
                scale="f"
                temperature={fahrenheit}
                onTemperatureChange={this.handleFahrenheitChange} />

                <BoilingVerdict
                celsius={parseFloat(celsius)} />

            </div>
        );
    }
}
```

[Codepen](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

### Breaking it Down:

When one of the inputs gets the value as is, the user input is preserved - the other input value is always recalculated based on it. For example, the celsius input refers to the 'celsius' variable for its temperature value. That variable will hold a value based on the current state of scale. 

Since you can't directly change state in the child component, you can send the input value when you reference the relevant 'onChange' function in the parent component.

[Detailed Breakdown](https://reactjs.org/docs/lifting-state-up.html#lessons-learned)

## Lessons Learned

There should be a single “source of truth” for any data that changes in a React application. Usually, the state is first added to the component that needs it for rendering. Then, **if other components also need it, you can lift it up to their closest common ancestor**.

The benefit of this approach is a greater reduction to and control of bugs. 

If something can be derived from either props or state, it probably shouldn’t be in the state. For example, instead of storing both celsiusValue and fahrenheitValue, we store just the last edited temperature and its scale.
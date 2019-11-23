# Forms

HTML form elements work a little bit differently from other DOM elements in React, because form elements naturally keep some internal state.

```javascript
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

By default, this form will direct the browser to a new page when a user submits a form. Which is fine. But if you want more *control* over forms, such as what happens when the form is submitted or getting access to the user submitted data, you would use **controlled components**.

## Controlled Components

In HTML, form elements such as *input*, *textarea*, and *select* typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with setState().

We can combine the two by making the React state be the “single source of truth”. Refactoring the above example to log the name when it is submitted.

```javascript

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    //Initializing state & the event handlers in the constructor.
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Function to handle an input on change.
  handleChange(event) {
    // changes the state of 'value'
    this.setState({value: event.target.value});
  }

  // Function to handle the submission of the form.
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    // prevents the form from directing the browser to a new page.
    event.preventDefault();
  }

  // rendering the form.
  render() {
    return (
      <form onSubmit={this.handleSubmit}> 
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

With a controlled component, every state mutation will have an associated handler function. This makes it straightforward to modify or validate user input.

### The select Tag

This tag creates a drop down list. 

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

Note that the Coconut option is initially selected, because of the selected attribute. **In react, instead of using this selected attribute, uses a value attribute on the root select tag**. *This is more convenient in a controlled component because you only need to update it in one place.* 

```javascript
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
        {/* On the root select tag, it has a value attribute set to the current value of state. */}
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Overall, this makes it so that *"input type='text'"*, *"textarea"*, and *"select"* all work very similarly - they all accept a value attribute that you can use to implement a controlled component.

**Note** You can pass an array into the value attribute, allowing you to select multiple options in a select tag:

```javascript
<select multiple={true} value={['B', 'C']}>
```

## Handling Multiple Inputs

When you are handling multiple input elements, you can add a *name* attribute to each element and let the handler function choose what to do based on the value of **event.target.name**.

```javascript
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    // Binding the event handler and initializing it. 
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    /* If the event target was on the checkbox, check/uncheck it, otherwise set the value to the value of the current number of guests.*/
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value // computed property name.
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

**Computer Property Names**

If you refer to the above example, state was set to *'[name]: value'* when the input was changed. Essentially, anything within the brackets is an expression, and the result of the expression will be used as the property name. 

In this example, *[name]* refers to a variable of the same name which sets its value to event.target.name. 

## Uncontrolled Components

The alternative to controlled components is uncontrolled components, where the form data is handled by the DOM itself.

**Note:** to better understand working with uncontrolled components, learn the 'React.createRef()' API.

### The file input Tag

The *"input type='file'"* tag lets the user choose one or more files from their device to upload to a server. **Because its value is read-only, it is an uncontrolled component**.

```javascript
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${
        this.fileInput.current.files[0].name
      }`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(
  <FileInput />,
  document.getElementById('root')
);
```

**Breaking this down:**
1. A fileInput variable is initialized, setting the value to a new instance of React.createRef().
1. Note that within the input tag, there is a 'ref' attribute which holds the value of the 'fileInput' variable.
1. When the form is submitted, alert the name of the current file.

### Default Values
*I wonder if I can use this to set default values in controlled components, or if it is bad practice.*

In the React rendering lifecycle, the value attribute on form elements will override the value in the DOM. With an uncontrolled component, you often want React to specify the initial value, but leave subsequent updates uncontrolled. 

In this case, you can specify a defaultValue attribute instead of value.

```javascript
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

*<input type="checkbox"> and <input type="radio"> support defaultChecked, and <select> and <textarea> supports defaultValue.*

## Refresher: event.target

Note that event.target returns a DOM node *of the most deeply nested element that caused the event*, and you can do anything you want with it from there. Think of it like you would getElementById(). 

You can access that element's attributes, names, ID, children, siblings, value, etc. 
# Lecture - Introduction to Desktop App Development
Lecture Date: September 8, 2020

Project Type: Desktop
WPF App (.NET Framework)

Read: Chapter 2 - Desktop Applications

.xaml - flavor of xml (a markup language)

Solution Explorer
Code Page - .cs file
Window Page - Style + Layout of the window.

## Working within the Main Window Visual Editor
Properties panel bottom right - Attributes to customize your elements.
Toolbox - Elements you can drag onto the window (found on the left pane in vertical text)
Event Handlers: It's the little lightning icon beside the wrench in the properties panel.

```c#
public MainWindow() {

    // Entry point for the desktop app.

    // Initializes the window
    InitializeComponent();
}
```

## Window Editor
1. You can click the toolbox on the left to click and drag elements onto the window.
2. As you drag elements onto the window, nume them using the properties panel.


## Event Handlers

```c#
// *Make sure to give the element a name that corresponds to the name of the click event. Name: FancyButton Event: FancyButton_Click

// ClickMeButton_Click is the name of the event handler, and corresponds to the click event given to the button in the main window.
private void ClickMeButton_Click(object sender, RoutedEventArgs e) {
    MessageBox.Show("The first desktop app in the book.");
}

// Declare some variables
string PersonName; 
string Message;

// Get input from textbox, store in the variable
PersonName = NameTextbox.Text; // text property of textbox is assigned to the variable

// compose a message
Message = "Hello " + PersonName;

// Output message to user
MessageBox.Show(Message);

```
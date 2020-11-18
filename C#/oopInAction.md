## Creating Constructors

**Default Constructor**
```c#
public Account() {
  // default constructor (optional in some cases)
  // Code to initialize the object here. 
}
```

**Custom Constructor**
This 'overloads' the method when you enter different parameters in.
```c#
public Account(int AccountNo) {
  // This targets the setter property, which sets the field.
  AccountNumber = AccountNo;
}
```


## Creating an Array of Objects
```c#
int[] myIntArr = new int[] {3, 4, 5, 6 8}; // initialize with {array initializer}

// Create an array of objects
// Can contain an array of Account objects
Account[] AccountsArray = new Account[] { 
  new Account(1, "Bill", "Smith", 55.89M),
  new Account(54, "Bob", "Schaktel", 45.89M),
  new Account(43, "Wendy", "Spears", 35.89M),
};

Account[] AccountsArray = new Account[1];
```

```c#
public partial class MainWindow: Window {
  // set up array for data
  string[] FirstNames;
  int CurrentRecord;

  public MainWindow() {
    InitializeComponent();

    // when the window is first loaded...
    CurrentRecord = 0; // display the first record

    FirstNames = new string[] {"Bob", "Wendy", "Jack"};

    // display the record
    DisplayRecord(CurrentRecord);
  }

  void DisplayRecord(int RecordNumber) {
      FirstNameTextBox.Text = RecordNumber.ToString();
      RecordNumberTextBox.Text = CurrentRecord;
  }

  private void NextButton_Click(object sender, RoutedEventArgs e) {
    
    if (CurrentRecord < FirstNames.Length - 1) {
         CurrentRecord++; // increment record pointer only if not on the last record
    } else {
      CurrentRecord = 0;
    }

    DisplayRecord(CurrentRecord);
  }

  private void PreviousButton_Click(object sender, RoutedEventArgs e) {
    
    if (CurrentRecord > 0) {
         CurrentRecord--; // increment record pointer only if not on the last record
    } else {
      CurrentRecord = FirstNames.Length - 1;
    }

    DisplayRecord(CurrentRecord);
  }


}

```
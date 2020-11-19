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

**Because I don't intend to update the Record, I'll have read only/write fields.**

```c#
public partial class MainWindow: Window {
  // set up array for data
  string[] FirstNames;
  int CurrentRecord;
  bool IsNewRecord = false; // new record "flag" | true == new record

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
    // Save before paging
    if ( SaveRecord() == false ) return; // no save then exit
      
    
    

    if (CurrentRecord < FirstNames.Length - 1) {
         CurrentRecord++; // increment record pointer only if not on the last record
    } else {
      CurrentRecord = 0;
    }

    DisplayRecord(CurrentRecord);
  }

  private void PreviousButton_Click(object sender, RoutedEventArgs e) {
    // Save before paging
    if ( SaveRecord() == false ) return; // no save then exit

    if (CurrentRecord > 0) {
         CurrentRecord--; // increment record pointer only if not on the last record
    } else {
      CurrentRecord = FirstNames.Length - 1;
    }

    DisplayRecord(CurrentRecord);
  }

  private void SaveButton_Click(object sender, RoutedEventArgs e) {
    SaveRecord(); // We can just call the method and not catch the return value
  }

  bool SaveRecord() {

    // validate data before saving 
    if (FirstNameTextBox.Text == "") {
      // Invalid data, notify user
      MessageBox.Show("Must enter a First Name.");
      return false; // quit the save procedure
    } else if (IsNewRecord == false) {
      // is an existing record
      FirstNames[CurrentRecord] = FirstNameTextBox.Text;
      return true;
    } else {
      // a new record
      // make room for a new element at the end of the array
      // expand the array by 1 element
      Array.Resize(ref FirstNames, int FirstNames.Length + 1);

      // Set pointer to the new element
      CurrentRecord = FirstNames.Length - 1;
      FirstNames[CurrentRecord] = FirstNameTextBox.Text;
      
      // Call display to update the record textbox.
      DisplayRecord(CurrentRecord);

      // reset newrecord flag
      IsNewRecord = false;

      return true; // save ok
    }
  }

private void AddNewButton_Click(object sender, RoutedEventArgs e) {
    // Blank the form
    RecordNumberTextBox.Clear();
    FirstNameTextBox.Clear();

    // note that this is potentially a new record
    IsNewRecord = true;

    SaveRecord(); // We can just call the method and not catch the return value
  }


}

/* Add New Functionality

So if you have data in the records and hit add new, it saves it then blanks it out? 
ok.
*/
```
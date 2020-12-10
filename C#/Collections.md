# Collections

Collections are used to store groups of related objects. Collections provide efficient methods to organize, store, and retrieve your data **without** requiring knowledge of how the data is being stored. 

## Declaring a List Collection

```c#
List<int> intList;
List<string> stringList;
```

## Common Methods and Properties of class List<T>
* Add - Adds an element to the end of the List.
* AddRange - Adds the elements of its collection argument to the end of the List.
* Capacity - Property that *gets* or *sets* the number of elements a List can store without resizing.
* Clear - Removes all the elements from the List.
* Contains - Returns *true* if the List contains the specified element and *false* otherwise.
* Count - Property that returns the number of elements stored in the List.
* IndexOf - Returns the index of the first occurrence of the specified value in the List.
* Insert - Inserts an element at the specific index.
* Remove - Removes the first occurrence of the specified value.
* RemoveAt - Removes the element at the specified index.
* RemoveRange - Removes a specified number of elements starting at a specified index.
* Sort - Sorts the List.
* TrimExcess - Sets the Capacity of the List to the number of elements the List currently contains.

## Using Lists

```c#
using System;
using System.Collections.Generic;

class MyClass {
  static void Main() {
    // create a new List of strings
    var items = new List<string>();
    /* When Initiated:
      Count = 0, Capacity = 0. */

    items.Add("red"); // append an item to the List
    items.Insert(0, "yellow"); // insert the value at index 0

    /* After adding two elements:
      Count = 2, Capacity = 4 */

    // Display List's Count and Capacity after adding two elements
    Console.WriteLine("After adding two elements to items: " + $"Count = {items.Count}; Capacity = {items.Capacity}");

    // Displaying all the contents of the list
    for (var i = 0; i < items.Count; i++) {
      Console.Write($"{items[i]}");
    }

    // Display contents using foreach
    foreach (var item in items) {
      Console.Write($" {item} ");
    }

    items.Add("green"); // Add "green" to the end of the list
    items.Add("yellow"); // Add "yellow" to the end of the list

    /* After adding two more elements:
      Count = 4, Capacity = 4 */

    items.Remove("yellow"); // remove the first instance of "yellow"
    items.RemoveAt(1); // remove an item at index 1

    /* After removing two elements:
    Count = 2, Capacity = 4. */
  }
}
```

When the list grows to exceed the current capacity, that capacity's value doubles. It will continue to do so everytime the list exceeds the capacity.

**Difference between Add and Insert**
* Add - Appends the item to the end of the list
* Insert - Inserts the new element at the specified position.

You can use list.TrimExcess() to reduce a List's capacity to the current count. There is also the option of setting the Capacity directly.

# Tutorial

**Declaring a List with Predefined values**
```c#
var names = new List<string> { "Tanner", "Ana", "Felipe" };
var fibonacciNumbers = new List<int> {1, 1};
```

**Accessing Elements within the list**
```c#
names[1]; // reference the element at index 1 in names
```

**Creating a List of objects**
```c#
// creates a List called 'parts' that will be composed of Part objects.
List<Part> parts = new List<Part>();
```

**Adding Objects to your List**
```c#
  // Add parts to the list.
  parts.Add(new Part() {PartName="crank arm", PartId=1234});
  parts.Add(new Part() { PartName = "chain ring", PartId = 1334 });
```

## Searching Lists

**indexOf** - searches for an item and returns the index of that item; if the item isn't in the list, indexOf returns -1.


===============================================================
///////////////////////////////////////////////////////////////


# Notes from the Demo File
```c#
public partial class MainWindow : Window {
  // create a List collection of Contacts
  List<Contact> ContactList = new List<Contact>(); // () denotes a constructor

  // ContactList.Count = # of elements USED in the List
  // ContactList.Capacity = Total # of elements available in List
  // ContactList[1].FirstName -> Can access elements by index

  int CurrentSelectedIndex = -1; // tracks the current index item being displayed
  
  // track the ContactItem corresponding to the current index.
  Contact CurrentSelectedItem; // I THINK this initializes an item of type Contact to store the currently selected Contact Item

  public MainWindow() {
    InitializeComponent();
  }

  // Button to load the list
  private void LoadListButton_Click(object sender, RoutedEventArgs e) {
    // Clear the Listbox and the List<Contacts>
    ContactListBox.Items.Clear();
    ContactList.Clear(); 

    // Create some contact records in the List and display in the listbox
    // AddContactItem is a method to do such thing.
    AddContactItem("Bob", "Smith", "bob@company.com");
    AddContactItem("Wendy", "Jones", "wendy@jones.com");
    AddContactItem("Sarah", "Wendell", "sarah@email.com");
  } // end load method

  void AddContactItem(string FirstName, string LastName, string Email) {
    // Creating a new instance of the Contact and passing in data from method
    Contact ContactItem = new Contact(FirstName, LastName, Email);

    ContactList.Add(ContactItem); // Add the ContactItem to the ContactList
    ContactListBox.Items.Add(ContactItem); // Add the same item to the listbox
  } // end add method

  // Click event for when the selection is changed
  private void ContactListBox_SelectionChanged(object sender, SelectionChangedEventArgs e) {
    // Update the index to the Listbox SelectedIndex
    CurrentSelectedIndex = ContactListBox.SelectedIndex;

    // the item retrieved needs to be cast into a Contact type
    CurrentSelectedItem = (Contact)ContactListBox.SelectedItem; 

    // Protect against null object reference (if the user changes selection to something other than an item, like clicking away.)
    if (CurrentSelectedItem == null) {
      // if no object - Clear / blank out the display form
      FirstNameTextBox.Clear();
      // ... and so on
    // Otherwise, it must be a valid item. Update the text fields.
    } else {
      FirstNameTextBox.Text = CurrentSelectedItem.FirstName;
    }
  } // end selectionchanged event

  private void RemoveItem_Click(object sender, RoutedEventArgs e) {
    // Note index of the current Item... unsure why a copy is necessary
    int SelectedIndex = CurrentSelectedIndex; // something about this seems odd

    // Delete only if we have a valid item selected
    if (CurrentSelectedItem == null) {
      MessageBox.Show("No record selected to remove");
      return;
    }

    // Delete the item by specifing the item / object
    ContactList.Remove(CurrentSelectedItem);
    ContactListBox.Items.Remove(CurrentSelectedItem);

    // Check if we didn't remove the last item in the list
    if (SelectedIndex <= ContactListBox.Items.Count - 1) {
      // reset the selected index to the position of the selected index
      ContactListBox.SelectedIndex = SelectedIndex;
    // otherwise, we deleted the last item.
    } else {
      // Select the new last item
      ContactListBox.SelectedIndex = ContactListBox.Items.Count - 1;
    }

  }
}
```

## Contact Class

**Usage of the Arror Function in the getters and setters**
```c#
public string LastName {
  get => lastName;
  set => lastName = value;
}

public string Email { get => email; set => email = value; }
public string FullName { get => $"{FirstName} {LastName}";  } // no setter means read-only

// overriding ToString()
public override string ToString() => $"{FullName} {Email}";
```

## Database Query to Create Table
```sql
CREATE TABLE [dbo].[CustomerAccounts]
(
	[AccountNumber] INT NOT NULL PRIMARY KEY,
	[FirstName] NVARCHAR(50) NULL,
	[LastName] NVARCHAR(50) NULL,
	[Email] NVARCHAR(50) NULL,
	[Phone] NVARCHAR(24) NULL,
	[BalanceDate] DATETIME NULL,
	[Balance] DECIMAL (19, 4) NULL
)

```
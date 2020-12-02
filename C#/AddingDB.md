# Steps to Adding a Database
1) Right click on your project
2) Hover over Add -> New Item
3) Search for: "Service-based Database"
4) Give an appropriate name & click add

.mdf - single SQL server database
log.ldf - log file

Double click on the database icon to open the server explorer
- To find the server explorer, just click 'View' at the top to find it.

## Adding a Table
Right click on Tables -> Add new table
- This opens a design view at the top, and a code section at the bottom

## Executing SQL Scripts
Download SQL file
Drag into visual studio
Run/Execute

**Alternatively**
Add a new table
Paste SQL code it into the code section
Click update

**Remember to hit 'Refresh' in the Serve Explorer**

## Inserting Data into the Table
* Copy the scripts/insert statement
* Right click database
* Select 'New Query'
* Paste Insert queries
* Execute with the green play button
* Open table & Refresh it.

## Reusing the Database File
* Navigate to the old project folder
* Make sure the old project is closed
* Copy the .mdf file
* Paste the file into the new project structure
* Double click on the database to form the connection

Create a class to represent the contents of the table
* Need a property to represent each column in a record

## Creating a class to represent the data
```c#
public partial class MainWindow: Window {
  // Set up a data model: a Customer Object
  private List<Customer> CustomerList = new List<Customer>();
  private Customer CurrentCustomer; // stores the currently selected customer object
  private int CurrentSelectedIndex;
}

private void LoadCustomersButton_Click(object sender, RoutedEventArgs, e) {
  // LoadCustomers()
}

void LoadCustomers() {

}


public class Customer {

  public Customer() { }

  public Customer(int CustomerNumber, DateTime CustomerDate, 
                  string FirstName, string LastName,
                  string Email, string StreetAddress,
                  string City, string Province, string PostalCode) 
                  {
                    this.CustomerNumber = CustomerNumber;
                    this.CustomerDate = CustomerDate;
                    this.FirstName = FirstName;
                    this.LastName = LastName;
                    this.Email = Email;
                    this.StreetAddress = StreetAddress;
                    this.City = City;
                    this.Province = Province;
                    this.PostalCode = PostalCode;
                  }

  public int CustomerNumber { get; set; }
  public DataTime CustomerDate { get; set; } 
  public string FirstName { get; set }
  public string LastName { get; set }
  public string Email { get; set }
  public string StreetAddress { get; set }
  public string City { get; set }
  public string Province { get; set }
  public string PostalCode { get; set }

}
```

## using
```c#
using (declarations...) {

} // variables created within this scope are destroyed after this code block executes.
```
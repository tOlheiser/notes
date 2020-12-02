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
  LoadCustomers()
}

// must have: using System.Data.SqlClient; at the top

void LoadCustomers() {
  // declare a variable named connection that is an instance of the SqlConnection object
  using (SqlConnection connection = new SqlConnection() ) {
    connection.ConnectionString = ""; // set the connectionstring property
    // NOTE: Place an @"" in front of the string to suppress escape characters and special characters.

    // open the connection to make use of it
    connection.Open();

    // create a SQL command as a string, then place in a command object
    string sql = "SELECT * FROM Customers;";
    
    // requires the sql statement/query we want to run and the connection string
    SqlCommand SelectCommand = new SqlCommand(sql, connection);

    // execute the command and obtain a data reader with the result
    using(SqlDataReader Reader = SelectCommand.ExecuteReader() ) {
      // loop over the reader results row by row
      // when no rows/run out of rows .Read returns false
      
      Customer NewCustomer;
      
      while (Reader.Read()) {// reads one row from the reader. returns false of no rows left.
        // load the listbox and the List<Customer> the data from this row/record
        // create a new Customer object from the record (row)
        // first col value: Reader["CustomerNumber"] OR Reader[0]
        // note Reader[] returns an Object - so we must cast to use it

        // load the record into the NewCustomer object
        NewCustomer = new Customer((int)Reader["CustomerNumber"], 
                                  (DateTime)Reader["CustomerDate"],
                                  (string)Reader["FirstName"],
                                  (string)Reader["LastName"],
                                  (string)Reader["Email"],
                                  (string)Reader["StreetAddress"],
                                  (string)Reader["City"],
                                  (string)Reader["Province"],
                                  (string)Reader["PostalCode"]
                                  );
      
      // Add NewCustomer to List<> and the listbox
      CustomerList.Add(NewCustomer);
      CustomerListBox.Items.Add(NewCustomer);

      } 

    }
  }
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
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public string Email { get; set; }
  public string StreetAddress { get; set; }
  public string City { get; set; }
  public string Province { get; set; }
  public string PostalCode { get; set; }

  // must override the base ToString() class.
  public override string ToString() => $"{CustomerNumber,5} {CustomerDate,-25}";

}
```

## using
```c#
using (declarations...) {

} // variables created within this scope are destroyed after this code block executes.
```

## Finding the Connection String:
Within server explorer, click on the database
It will display propertyies
Within your properties, it will display a connection string.
Replace the absolute path to the database mdf file with a relative path: 
|DataDirectory|
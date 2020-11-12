# Introduction to Classes, Objects, Methods, and strings

Driver class - The class used to interact or 'drive' an object.

```c#
// AccountTest.cs

class AccountTest {
  static void Main() {
    // create an Account object, assign it to myAccount
    Account myAccount = new Account();

    // Display myAccount's initial name (there isn't one yet)
    Console.WriteLine($"Initial name is: {myAccount.GetName()}")

    // prompt for and read the name, then put the name in the object
    Console.Write("Enter the name: "); // prompt
    string theName = Console.ReadLine(); // read the name
    myAccount.SetName(theName); // put theName in the myAccount object

    //~~ name is stored in 'theName' which gets passed into the setter method 'SetName()' which actually stores the name. 

    // display the name stored in the myAccount object
    Console.WriteLine($"myAccount's name is: {myAccount.GetName()}");
  }
}

/* OUTPUT
Initial name is: 
Enter the name: Jane Green
myAccount's name is: Jane Green
*/
```

```c#
// Account.cs - simple Account class that contains a private instance
// variable name and public methods to Set and Get name's value.

// class declaration
class Account {
  private string name; // instance variable

  /* method that takes in a string (accountName) and sets the name to whatever value the string (accountName) contains */
  public void SetName(string accountName) {
    name = accountName; // store the account name into the private variable
  }

  // Method that retrieves the account name from the object
  public string GetName() {
    return name; // returns name's value to this method's caller
  }

}
```

You can't call a method of a class unless you create an object of that class.

**Creating an object of a class:** 
```c#
// creating a new object of the Account class named myAccount
Account myAccount = new Account(); 
```

**Abstraction** - The concept that we can create and manipulate an object without knowing its implementation details.

## Class Declarations
Each class declaration is typically stored in a file having the same name as the class.

**Naming Conventions**
Class, property, and method names use Pascal case.
Variable names use camel case.

**Instance variables** - Objects of the class carry the class instance variables with them throughout their lifetime. *Each object has its own copy of the class's instance variables.*

In the above example, the name variable can't be accessed from outside the class because it's private. However, the methods can be accessed, and used, to manipulate the variable. 

**Access Modifiers**
private - indicates the variable is accessible only to its class's methods & other members (like properties).
public - available outside of the class.

**Adding a new class in Visual Studio** - Right click the project name in the solution explorer and select 'add > class...'. Then you need to build it before you can run it 'Build > Build Solution".

## Getters and Setters
Set methods can be programmed to validate their arguments and reject any attempts to Set the data to bad values. 

Get methods can present the data in a different form, while the actual data representation remains hidden from the user. 
ex/ Grade class stores a 'grade' instance with a variable int between 0 and 100. GetGrade returns a letter grade as a string, such as "A" for grades between 90 and 100.

## Properties
Properties encapsulates a set accessor for storing a value and a get accessor for getting the value of a variable. 

```c#
class AccountTest {
  static void Main() {
    Account myAccount = new Account();

    Console.WriteLine($"Initial name is {myAccount.Name}");

    Console.Write("Please enter the name: ");
    string theName = Console.ReadLine();

    myAccount.Name = theName;

    Console.WriteLine($"myAccount's name is {myAccount.Name}");
  }
}
// same output
```

**Crucial** - When using myAccount.Name to access the property, **you're implicitly executing the properties get accessor, which returns the account's name.** Same is true when you store 'theName' inside of myAccount.Name where the set accessor is used. 

Taking a look at the accessor properties
```c#
class Account {
  private string name; 

  public string Name { // Name property declaration
    // property to get and set the name instance variable
    get { // get accessor
      return name; // returns the corresponding instance variable's value
    }

    // assigns a new value to the corresponding instance variable
    set { // set accessor
      name = value; // value is implicitly declared and initialized
      // value is a keyword that must be used.
    }
  }
}
```

By convention, a property's identifier is the capitalized identifier of the instance variable that it manipulates - Name is the property that represents instance variable name. 

set accessor is called when a value is assigned to myAccount.Name. ex/ myAccount.Name = theName.

### Auto Implemented Properties

For very trivial use cases, where get and set have no other logic in them beyond what they are designed to do, you can use auto implemented properties.

```c# 
public string Name { get; set; }

// The above line of code replaces this:
/*
public string Name { 
    get { 
      return name;
    }

    set { 
      name = value; 
    }
  }
*/
```

Final code: 
```c#
class Account {
  public string Name { get; set; } // auto-implemented property

  // constructor sets the Name property to parameter accountName's value
  public Account(string accountName) {
    Name = accountName;
  }
}
```

## Constructors

In the previous examples, an object of class Account is created, and its string instance variable name is initialized to null by default. What if you wanted to provide an actual name when you create an Account object. 

```c#
Account account1 = new Account("Jane Green");
Account account2 = new Account("John Blue");
```

In action:
```c#
class AccountTest {
  static void Main() {
    Account account1 = new Account("Jane Green");
    Account account2 = new Account("John Blue");

    // Display initial value of name for each account
    Console.WriteLine($"account1 name is: {account1.Name}"); // Jane Green
    Console.WriteLine($"account2 name is: {account2.Name}"); // John Blue
  }
}

```

**Constructor Declaration**
```c#
public Account(string accountName) {
  Name = accountName;
}
```

# Putting it all together
When an instance of Account is created, the Account constructor takes in two values. If the value passed in as 'initialBalance' fails Balance's set validation, balance will be set to the default value. 

```c#
// Account.cs

class Account {
  public string Name { get; set; } // auto-implemented property
  private decimal balance; // instance variable

  // Account constructor that receives two parameters
  public Account(string accountName, decimal initialBalance) {
    Name = accountName;
    Balance = initialBalance; // Balance's set accessor validates
  }

  public decimal Balance {
    get {
      return balance;
    }
    // can be used only within the class
    private set { 
      // validate that the balance is greater than 0.0
      if (value > 0.0m) { //m indicated that 0.0 is a decimal literal
        balance = value;
      } 
    }
  }

  /* class method to take in a decimal value. If it's valid, call the Balance setter method to assign a value into the instance variable. */
  public void Deposit(decimal depositAmount) {
    if (depositAmount > 0.0m) { // if the depositAmount is valid
      /*Balance and depositAmount are added - forming a temporary sum which is THEN assigned to the Balance property.*/
      Balance = Balance + depositAmount; // add it to the balance
    }
  }

}
```

Using the Account class in AccountTest.cs
```c#
class AccountTest { 
  static void Main() {
    Account account1 = new Account("Jane Green", 40.00m);
    Account account2 = new Account("John Blue", –7.53m);

    // prompt for then read input
    Console.Write("\nEnter deposit amount for account1: ");
    decimal depositAmount = decimal.Parse(Console.ReadLine());
    Console.WriteLine($"adding {depositAmount:C} to account1 balance\n");
    account1.Deposit(depositAmount); // add to account1's balance

    // display balances
    Console.WriteLine($"{account1.Name}'s balance: {account1.Balance:C}");
    Console.WriteLine($"{account2.Name}'s balance: {account2.Balance:C}");

    // --- account1.Balance:C - :C is a format specifier for currency.
  }
}
```
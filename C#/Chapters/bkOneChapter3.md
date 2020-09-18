# C# for Programmers, 6th Edition - Chapter 3

The structure is similar to that of Java:
```c#
    using System;
 
    class Welcome1
    {
       // Main method begins execution of C# app
       static void Main()
       {
         Console.WriteLine("Welcome to C# Programming!");
      } // end Main
   } // end class Welcome1
```


**Writing text to a screen**:
```C#
Console.Write("Hey there, "); // Think of it as an in-line block string.
// Console.Write positions the cursor next to the text.

Console.WriteLine("Welcome to C# Programming!"); // Writes a block of string on a line.
// Console.WriteLine positions the cursor on the next line.
```

**using Directive** - This **appears** to be similar to the way **import** works in other languages. Each using directive identifies a namespace containing classes that a C# app should be able to use. **For each .NET class you use, you must indicate the namespace where it's located.**

**.NET Documentation** - https://msdn.microsoft.com/namespace
*if you replace namespace above with 'system', you can read the system docs.*

**Every app consists of at least one class declaration that's defined by you.**

**Pascal Case** - camelCase, but where the first letter is also capitalized.

**File Name** - This is the same name as your class declaration followed by '.cs'. A class of 'Welcome1' file's name would be 'Welcome1.cs'.

**Entry point** - This is the 'Main()' method; where the app starts execution. For each app, one of the methods MUST be called main. **void** indicated that 'Main' will not return a value.
```c#
static void Main()
```

## Variable Naming
* Must start with a letter, underscore, or @ symbol.
* Can then contain letters, underscores, or numbers.
* Use camelCase for simple variables.

### Declaring Multiple Variables at Once

You can declare multiple variables of the same type at the same time by separating their names with commas after the type.
```c#
int xSize, ySize;
```

You can also assign values to variables as you declare them:
```c#
int age = 25;
```

Both techniques can go together:
```c#
int xSize = 4, ySize = 5;
```

Here, only ySize is assigned a value:
```c#
int xSize, ySize = 5;
```

## String Interpolation
```c#
static void Main() {
    string person = "Paul";

    Console.WriteLine($"Welcome to C# Programming, {person}!");
    // Welcome to C# Programming, Paul!
}
```

### Verbatim Strings
```c#
@"Verbatim string literal"; // placing an @ in front of the string includes EVERYTHING in the string, including the quotes.

@"A short list:
item 1
item 2"

// verbatim strings make this simple (no escaping)
@"C:\Temp\MyDir\MyFile.doc"
```


## Adding Integers
```c#
static void Main() {
    // initialize variables
    int number1;
    int number2;
    int sum;

    Console.Write("Enter the first integer: "); // prompt
    number1 = int.Parse(Console.ReadLine()); // Get int input

    Console.Write("Enter the first integer: "); // prompt
    number1 = int.Parse(Console.ReadLine()); // Get int input

    sum = number1 + number2;

    Console.WriteLine($"Sum is {sum}");
}
```

## Reading User Input
```c#
number1 = int.Parse(Console.ReadLine()); 
```

1) ReadLine returns the text the user entered.
2) The returned string is used as an argument to type *int's* **Parse** method, which converts this sequence of characters into data of type int.

### Performing Calculations in Output Statements
```c#
Console.WriteLine($"Sum is {number1 + number2}");
```

**note** - Boolean uses the **bool** type in C#.

Getting a string:
```c#
userName = Console.ReadLine();
```

Getting a number:
```c#
firstNumber = Convert.ToDouble(Console.ReadLine());
```

## Namespaces 

namespaces seem to act as containers.
```c#
namespace LevelOne
{
   // gives you access to code from LevelTwo.
   using LevelTwo;
 
   namespace LevelTwo
   {
      // name "NameTwo" defined
   }
}
```

*Learn more about type conversion.*
*Learn more about the significance of namespaces*
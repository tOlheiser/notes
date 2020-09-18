# Chapter 2 Notes

**Convention**: Begin every program with a comment that states the purpose of the program, the author, date, and time when the program was last modified.

## Declaring a Class 
Below is a sample of a class declaration. Every Java program consists of at least one class that you define. **By convention, class names begin with a capital letter.** You capitalize the letter of each word that follows in the class name.

A public class must be placed in a file that has the same name as the class + the .java extension. *public* class 'Welcome' must be placed in a file named 'Welcome.java'.

```java
public class Welcome1
```

## Declaring a Method

The main method begins execution of Java application; every application must have a 'main' method and be defined as shown below.

```java
public static void main( String[] args )
```

* **void** - Indicated that this method will not return any information. 

## Output with System.out.println

Method System.out.println displays (or prints) a line of text in the command window. The cursor within the command line is then placed on the next line in the command window.

```java
System.out.println("Welcome to Java programming!");
```

### Printing a line with multiple statements

The first statement displays a string, and the next println statement resumes displaying characters from where the last 'print' or 'println' statement stopped displaying characters. Unlike 'println', 'print' does not position the output cursor at the beginning of the next line in the command window. 

```java
System.out.print( "Welcome to " );
System.out.println( "Java Programming!" );
```

**Output:** - 'Welcome to Java Programming!'

**Note**: \n is the newline character. 

### Escape Sequences
* \n - Newline
* \t - Horizontal tab
* \r - Carriage return. Position the screen cursor at the beginning of the current line—do not advance to the next line. Any characters output after the carriage return overwrite the characters previously output on that line.
* \\ - Backslash
* \" - Double quote. - Example: System.out.println( "\"in quotes\"" );

## Import Declarations

All import declarations must appear before the first class declaration in the file. 

```java
import java.util.Scanner; 
```

### Declaring and Creating a Scanner to Obtain USer Input

All Java variables must be declared with a name and a type before they can be used.

```java
Scanner input = new Scanner( System.in );
```

This is a variable declaration statement that specifies the name (input) and the type (Scanner) of a variable. **A Scanner enables a program to read data for use in a program.** The data can come from many sources, such as keyboard input or file on a disk.

The **new** keyword generates a Scanner object, and the argument passed in **System.in** creates a standard input object that enables applications to read information typed by the user.

So, we can surmise that this Scanner object that we've created reads the input that we typed in the keyboard.

### Declare Variables to Store Integers

```java 
int number1; // first number to add
int number2; // second number to add
int sum; // sum of number1 and number2
```

## Prompting the User for Input

```java
System.out.print( "Enter first integer: " ); // prompt
```

This message is called a prompt because it directs the user to take a specific action. The method 'print' is good for this because the user's input appears on the same line as the prompt. 

**Note** - *System is a class. It's a part of the 'java.lang' package, which is imported into every java program automatically. That is why System doesn't require an import declaration.*

### Obtaining an int as Input from the User

```java
number1 = input.nextInt(); // read first number from user
```

'input' is a method on the Scanner object which uses the 'nextInt' method to obtain an integer from the user. It waits for the user to type the number and press Enter to submit the number.

## Displaying the Result of the Calculation

```java
System.out.printf( "Sum is %d\n", sum ); // display sum
```

**The System.out.printf method displays formatted data.** 

'%d' is a placeholder for an int value (in this case the value of sum). The letter d stands for 'decimal integer'. The remaining characters in this string are all fixed text. Method 'printf' displays this as 'Sum is ' followed by the value of sum (in the position of the '%d' format specifier) and a newline.

Calculations can also be performed inside printf statements. We could have combined the statements at lines 23 and 25 into the statement

```java
System.out.printf( "Sum is %d\n", ( number1 + number2 ) );
// parenthesis around number 1 & 2 are not required.
```

## Further Reading
*What is the difference between float and double?*
*Different between public/static classes. Read more in Chapter 8*
*How to handle errors in Chapter 11 (such that a user can't type an alphabetical character, terminating the program when it expects an integer).*
* Read a String from the keyboard.
* Declare a string, double, and char
* Convert int to a char
* Generate a random number in a range
* Math.Pi
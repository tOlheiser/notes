# Java Chapter 3 Notes - Class, Objects, Methods, and Strings
*Review section 3.7 in the chapter later.*

For this chapter: Declare two classes:
**GradeBook** (GradeBook.java) - This is used to display a message on the screen. Welcoming the instructor to the gradebook application.

**GradeBookTest** (GradeBookTest.java) - Application class where the main method will create and use an object of class 'Gradebook. 

**Public Classes** - Each class declaration that begins with keyword public must be stored in a file having the same name as the class and ending with the .java file-name extension.

**Classes GradeBook and GradeBookTest must be declared in separate files, because each class is declared public.**

## Class GradeBook

```java
public class GradeBook {
    // display a welcome msg
    public void displayMessage() {
        System.out.println("Welcome to the Grade Book!");
    } // end method displayMessage
} // end class GradeBook
```

Note that in the previous chapter, each class we worked with had a method called 'Main'. These methods are automatically executed by the JVM (Java Virtual Machine) on application start-up. Most methods (noteably GradeBook) do not get called automatically.

### Keywords
**public** - Indicates the method is available to the public; can be called from methods of other classes.
**void** - This is a **return type**, which specifies the type of data the method will return after performing a task. **A void method returns nothing after performing a tast.**
**method header** - Contains the keywords and method name before the opening braces.

## Class GradeBookTest

*GradeBook is not technically an application because it doesn't contain main.* GradeBookTest is considered a 'driver class' because that's where the application kicks off (it has a main method), and it utilizes methods from other classes.

```java
public class GradeBookTest {
    public static void main( String[] args ) {
        
        // Create a GradeBook object and assign it to myGradeBook.
        GradeBook myGradeBook = new GradeBook();

        // Call myGradeBook's displayMessage method.
        myGradeBook.displayMessage();
    }
}
```

**static** - This is a key part of enabling JVM to locate and call method main to begin app execution. A static method allows you to **call that method without first creating an object of the class in which the method is declared.**

**Generally, you cannot call a method of another class without first creating an object of that class first.**

1) Declare variable *myGradeBook*. The variable's type is GradeBook, the class declared previously.

**Each new class you create becomes a new type that can be used to declare variables and create objects.**

**new** - Creates a new object of the class specified to the right of the 'new' keyword. Parenthesis on that class are required. 

This represents a call to a **constructor**, which is similar to a method but is used only at the time an object is created to initialize the object’s data. Data can be placed in the parentheses to specify initial values for the object's data.

## Compiling an Application with Multiple Classes
First, change to the directory that contains the application’s source-code files. Next, type the command

```java
javac GradeBook.java GradeBookTest.java
```

UML Diagram - 3.2 end of chapter.

## Class Declaration with a Method 

```java
public class GradeBook {
    
    // We include the datatype (String) and give name to the parameter (courseName)
    // Data supplied as an argument is expected to be a string.
    public void displayMessage( String courseName) {

        // string interpolation where coursename is substituted inplace of '%s'
        System.out.printf("Welcome to the grade book for\n%s!\n", courseName );
    } // end method displayMessage
} // end class GradeBook
```

**Driver Class**
```java
import java.util.Scanner; // program uses a Scanner; takes user input.

public class GradeBookTest {
    public static void main( String[] args ) {
        
        // create Scanner to obtain input from command window
        Scanner input = new Scanner( System.in );

        // Create a GradeBook object and assign it to myGradeBook.
        GradeBook myGradeBook = new GradeBook();

        // prompt for and input course name
        System.out.println("Please enter the course name:");
        String nameOfCourse = input.nextLine(); // read a line of text
        // input refers to the previously created Scanner.
        System.out.println(); // outputs a blank line

        // Call myGradeBook's displayMessage method.
        // pass nameOfCourse as an argument.
        myGradeBook.displayMessage( nameOfCourse );
    }
}
```

**Note**: Classes in the same package/directory are implicitly imported into the source code files of other classes in the same package. 

## Instance Variable, set Method & get Method

```java
public class GradeBook {
    private String courseName; // course name for this GradeBook

    // Method to set the course name
    public void setCourseName( String name ) {
        courseName = name; // store the course name
    } // end method setcourseName
    
    // Method to get the course name
    public String getCourseName() {
        return courseName;
    } // end method getCourseName


    public void displayMessage( String courseName) {

        // Calls getCourseName to get the name of the course this gradebook represents.
        System.out.printf("Welcome to the grade book for\n%s!\n", getCourseName() );
    } // end method displayMessage
} // end class GradeBook
```

**instance variable** - Because courseName was declared in the class body but outside of the class methods, it is the declaration of an instance variable. Every instance of GradeBook will have their own instance of courseName. Benefit? All methods of the class can manipulate any instance variables that appear in the class. **The 'access modifier' private is used because we only want the courseName variable to be accessed by the methods of the class instance it belongs in.**

**Note**: Instance variables should be private and methods should be public.

**fields**: Variables declared within a class declaration outside of any methods.

### Demonstrating Changes with Class GradeBookTest
```java
import java.util.Scanner; // program uses a Scanner; takes user input.

public class GradeBookTest {
    public static void main( String[] args ) {
        
        Scanner input = new Scanner( System.in );

        GradeBook myGradeBook = new GradeBook();

        // Display initial value of courseName
        System.out.printf("Initial course name is: %s\n\n", 
        myGradeBook.getCourseName());

        // prompt for and input course name
        System.out.println("Please enter the course name:");
        String nameOfCourse = input.nextLine(); // read a line of text
        // input refers to the previously created Scanner.
        myGradeBook.setCourseName( theName ); // passes value of theName into the setter method.
        System.out.println(); // outputs a blank line

        // Call myGradeBook's displayMessage method.
        myGradeBook.displayMessage();
    }
}
```

**note**: A class's private fields can **only** be manipulated by that class' methods. 

## Working with Constructors

```java
GradeBook myGradeBook = new GradeBook("CS101 Introduction to Java Programming");
```

An instance of the class 'GradeBook' is created named 'myGradeBook'. It is initialized with the value "CS101 Introduction to Java Programming" being passed in as an argument. That string is applied to name, which passes it's value to the 'courseName' variable.

```java
public GradeBook( String name ) {
    courseName = name;
}
```

### A Constructor with multiple parameters

```java
public GradeBook( String courseName, String instructorName);

GradeBook gradeBook = new GradeBook("first string", "second string");

```

**note** float vs double - double is higher precision; more digits to the right of the decimal point.
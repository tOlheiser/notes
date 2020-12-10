# Java Cheat Sheet

**Useful Imports**
```java
import java.math.*;
import java.util.Scanner;
import java.util.Random;
import java.util.Arrays; 
```

## Scanners; Receiving Inputs

```java
// Import it
import java.util.Scanner;

// Initializing a scanner
Scanner input = new Scanner(System.in);

System.out.print("What was the speed of your vehicle? "); // Prompt for input
vehicleSpeed = input.nextInt(); // store the input
```

## Displaying Data
```java
System.out.print(); // inline
System.out.println(); // block
System.out.printf("The value is: %d", 5); // %f for decimals/doubles/floats
```

### Formatting Data
```java
// Format to one decimal place
System.out.printf("Average Grade: %.1f", 87.67);

// Special Characters
System.out.printf("Average Grade: \t%.1f\n", 87.67);

```

## Foreach Loop
```java
for (double stockPrice : stockPrices) {

}
```

## Validation

The while statement should have **criteria for unacceptable inputs.**

```java
do {
  System.out.print("Total Marks: ");
  totalMarks = input.nextInt();
  
  if (totalMarks < 0 || totalMarks > 100) {
      System.out.println("Your entered marks should fall between 0 and 100. Try again.");
  }
} while (totalMarks < 0 || totalMarks > 100);
```

## Using Methods
Make sure you declare methods in their own class file. **Assuming your methods are stored in a file called 'Methods.java':**

```java
int numberOfGrades = Methods.getValidInput();
```

Newly covered material: Arrays and Objects

## Creating Methods

```java
public static int CalculateSpeedingTicket(int overLimit);
```

## Arrays

**Declaring Arrays**
```java
// When you have values
String[] name = {"Robin", "Jo", "Kelly", "Jaimie"}; 

// When you don't have values but know the size
int[] finalGrade = new int[4];
```

**Getting the length property**
```java
newFinalGrade.length;
```

### Copying Array Data
```java
System.arraycopy(name, 0, newName, 0, 4); 

// name - source array
// 0 - starting position in the source array
// newName - destination array
// 0 - starting position in the destination array to paste data
// 4 - number of array elements to be copied

```
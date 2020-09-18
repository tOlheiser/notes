# Chapter 4

## Ternary Operator (?)

```java
System.out.println(studentGrade >= 60 ? "Passed" : "Failed" );
```

## while Repetition Statement

The action is performed repeatedly while the condition remains true. 

```java
int gradeCounter = 1;
int grade;
int average;
int total = 0;

// When you know the end of the loop in advance
while (gradeCounter <= 10) {
    System.out.print("Enter grade: "); // prompt
    grade = input.nextInt(); // input next grade
    total = total + grade; // add grade to total
    gradeCounter = gradeCounter + 1; // increment counter
}
```

**Giving the user a way out**
```java
// initialization
int total = 0;
int gradeCounter = 0;

// Loop until sentinel value is read from user
while (grade != -1) {
    total = total + grade; // add grade to total
    gradeCounter = gradeCounter + 1; // increment counter

    // prompt for input 
    System.out.print("Enter grade or -1 to quit: ");
    grade = input.nextInt();
}// if -1 is entered, loop exits.

// if user entered at least one grade
if (gradeCounter != 0) {
    //calculate average
    average = (double) total / gradeCounter;

    // Display total and average
    System.out.printf("Display results");
} else { // no grades were entered.
    System.out.println("no grades were entered");
}

```

## Increment and Decrement Operators

++a: Increment 'a' by 1, then use the new value of 'a' in the expression in which 'a' resides.

a++: Use the current value of 'a' in the expression in which 'a' resides, then increment 'a' by one.

```java
c = 5;
System.out.println(c); // prints 5
System.out.println(c++); // prints 5 then post increments
System.out.println(c); // prints 6
```

```java
c = 5;
System.out.println(c); // prints 5
System.out.println(++c); // preincrements then prints 6
System.out.println(c); // prints 6
```

## for Loops

```java
for (int counter = 1; counter <= 10; conter++) {
    System.out.printf("%d", counter);
}
```

## do while Loops

This is much like the while loop, except here the loop always executes once.

```java
int counter = 1; // initialize counter

do {
    System.out.printf("%d", counter);
    ++counter;
} while (counter <= 10); // end do while
```

## Switch Statement
```java
switch (grade / 10) {
    case 9: // 9 and 10 are inclusive, both produce same result.
    case 10:
        ++aCount;
        break;
    case 8:
        ++bCount;
        break;
    default:
        ++fCount;
        break;
}
```

**break Statement** - Immediately breaks out of the loop.
**continue Statement** - Skip remaining code in the loop, move to next iteration.

## Boolean Logical Exclusive OR (^)
This only evaluates to true if only ONE of it's operands is true and the other is false. It's not like an OR (||) where it evaluates to true if both conditions are true.


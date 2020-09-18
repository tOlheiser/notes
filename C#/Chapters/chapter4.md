# Beginning Visual C# Chapter 4: Flow Control

Reminder: The boolean type in c# is 'bool'.

**Declaring constant variables**
```c#
const int intTwo = 2; // must assign values at this time.
```

## Boolean Operators

```c#
// You can use comparison operators to store a boolean value.
bool isLessThan10;
int myVal = 5;
isLessThan10 = myVal < 10; // isLessThan10 = true

// isLessThan10 is assigned the bool value true or false depending on the expression.


// ! 
var1 = !var2; 
// var1 is assigned 'true' if the value of var2 is false.

// &
var1 = var2 && var3;
// var1 is assigned true if BOTH var2 AND var3 are true. var1 is assigned false otherwise.

// |
var1 = var2 || var3;
// var1 is assigned true if at least one of var2 or var3 are true

// ^
var1 = var2 ^ var3;
// var1 is assigned true if either var2 or var3, but not both, is true.
```

## Switch Statement

```c#
switch (<testVar>) {   
    case <comparisonVal1>:    
    case <comparisonVal2>:
        // Execute this code if either of the above cases match      
        <code to execute if <testVar> == <comparisonVal2> >     
        break;   ...   
    case <comparisonValN>:      
        <code to execute if <testVar> == <comparisonValN> >      
        break;   
    default:      
        <code to execute if <testVar> != comparisonVals>     
        break;}
```



# Functions

Defining Functions
```c#
static void Write() { // defined outside of Main method, within parent class.
    Console.WriteLine("Text output from function");
}
```

Your functions should use the 'static' keyword.
'void' indicates that your function doesn't return a value.

## A Note about functions that return values
**If your function DOES return a value, instead of writing 'void', write the data type of the value you expect to return.**

## Using Parameteres

```c#
static double Product(double param1, double param2) {
    ...
}
```

## Using references
You do this why you want the function to change the variable being passed as a parameter.

```c#
static void ShowDouble(ref int val) {
    val *= 2;
}
```

### Out Parameters
These work exactly like 'ref' in the example above, except you can use an unassigned variable as an out parameter, and an out parameter must be treated as an unassigned value by the function that uses it.
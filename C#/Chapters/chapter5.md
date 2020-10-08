# Chapter 5 - Variables in Depth
*This chapter deals with Structs, Enumeration*

**Enumerations** - Variable types that have a user-defined set of possible values that can be used in a human-readable way.
**Structs** - Composite variable types made up of a user-defined set of other variable types.
**Arrays** - Types that hold multiple variables of one type.

## Implicit Conversions

Refer to "implicit conversions.png"

## Explicit Conversions

Method One: Cast one type into another
```c#
byte destinationVar;
short sourceVar = 7;
destinationVar = (byte)sourceVar;
```

Method Two: String -> Numbers
```c#
Convert.ToDouble();
Convert.ToBoolean(val)	    val converted to bool
Convert.ToByte(val)	        val converted to byte
Convert.ToChar(val)	        val converted to char
Convert.ToDecimal(val)	    val converted to decimal
Convert.ToDouble(val)	    val converted to double
Convert.ToInt16(val)	    val converted to short
Convert.ToInt32(val)	    val converted to int
Convert.ToInt64(val)	    val converted to long
Convert.ToSByte(val)	    val converted to sbyte
Convert.ToSingle(val)	    val converted to float
Convert.ToString(val)	    val converted to string
Convert.ToUInt16(val)	    val converted to ushort
Convert.ToUInt32(val)	    val converted to uint
Convert.ToUInt64(val)	    val converted to ulong
```

Method Three: Sometimes the conversions happen implicitly in expressions
```c#
doubleResult = floatVal + (shortVal * floatVal);
```

# Complex Variable Types 

## Enumerations

This is a variable that takes a fixed set of results. Imagine having an 'orientation' type where the only acceptable values are 'north', 'south', 'east', or 'west'.

**Defining Enumerations**

```c#
enum <typeName> : <underlyingType> { // underlying type is int by default
    value1,
    value2,
    value3,
    ...
    valueN
}
```

**Example**
```c#
enum orientation : byte {
    north = 1,
    south = 2,
    east = 3,
    west = 4
}

orientation myDirection = orientation.north;
Console.WriteLine("myDirection = {0}", myDirection); // myDirection = north
```

Enumerations can have underlying types of byte, sbyte, short, ushort, int, uint, long, and ulong.

String equivalent
```c#
byte directionByte;
string directionString;
orientation myDirection = orientation.north;
Console.WriteLine("myDirection = {0}", myDirection);
directionByte = (byte)myDirection;
directionString = Convert.ToString(myDirection);
Console.WriteLine("byte equivalent = {0}", directionByte);
Console.WriteLine("string equivalent = {0}", directionString);
Console.ReadKey();

// Output:
myDirection = north
byte equivalent = 1
string equivalent = north
```

## Structs

Lets say we have to store, in pairs, your direction and your distance from another location. The boring, casual way is by defining two variables.
```c#
orientation myDirection;
double      myDistance;
```

### Defining Structs

Structs are defined using the 'struct' keyword.
```c#
struct <typeName> {
    <memberDeclarations>
}
```

The memberDeclarations contains declarations of variables, also known as 'data members' of the struct. 

**How to do member declarations**
<accessibility> <type> <name>;

For accessibility, you'd use the keyword *public* to enable code that calls the struct to access its data members.
```c#
struct route {
    public orientation direction;
    public double distance;
}
```

After you've defined a struct, you can use it by defining varables of the new type.

```c#
route myRoute;

// Accessing data members
myRoute.direction = orientation.north;
myRoute.distance = 2.5;
```

**Structs, like enumerations, are declared outside of the main body of the code. You declare your route struct just inside the namespace declaration, along with the orientation enumeration that it uses:**

```c#
enum orientation: byte {
    north = 1,
    south = 2,
    east = 3,
    west = 4
}

struct route {
    public orientation direction;
    public double distance;
}
```

You could just as easily take an input value directly into a struct value
```c#
myRoute.distance = Convert.ToDouble(Console.ReadLine());
```

## Arrays

Looping over an array
```c#
int i;
for (i = 0; i < 3; i++){   
    Console.WriteLine("Name with index of {0}: {1}", i, friendNames[i]);
}
```

**Arrays have a base type; all individual entries in an array are all of the same type.**

Declaring Arrays
```c#
int[] myIntArray; // must declare the base type.
```

You either have to 
a) Specify the complete contents of the array in a literal form
b) Specify the size of the array and use the 'new' keyword to initialize all array elements.

Example of A
```c#
int[] myIntArray = { 5, 9, 10, 2, 99 };
```

Example of B
```c#
int[] myIntArray = new int[5];
```

### foreach loop
```c#
foreach (string friendName in friendNames)
   {
      Console.WriteLine(friendName);
   }
```

For loops only give you read access to the array contents; you can't change the value of any of these elements.
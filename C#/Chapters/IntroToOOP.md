# Introduction to Object-Oriented Programming

OOP is a modular method of programming that gives you much more versatility and provides much more opportunity for code reuse. 

Class - blueprint of an object.
Object - An instance of that template.
State - The various pieces of data that make up the object.

You generally do not want to create public instance variables.

**Visual studio tool**
View -> Object Browser
This gives you an overview of the objects for your program.

**namespace** - Essentially a naming scheme composed of various classes. When you import a namespace, you get access to all the classes/objects defined in that namespace.

**Bad Practices:**
* Creating public instance variables.


## Accessibility

**public** - Available to all code
**private** - Available only to code within the class

## Methods

This is the functionality of the object that makes use of that object's state. The can be public or private, and also have access to its object's private properties/methods.

## Life Cycle of an Object

**Construction** - Initializes the object with a constructor function.
**Destruction** - Performs clean-up taks when an object is destroyed. This is the job of a destructor function. *The .NET framework automatically handles this, **though you could provide specific instructions if anything important needs to be done before the object instance is deleted.***

**Constructor Example:**
```c#
CupOfCoffee myCup = new CupOfCoffee();
CupOfCoffee hisCup = new CupOfCoffee("Blue Mountain");
```

Constructors can be public or private; code external to a class can't instantiate an object using a private constructor.

## Static Members

**Static members are shared between instances of a class, so they can be thought of as global for objects of a given class.** Static properties and fields enable you to access data that is independent of any object instances, and static methods enable you to execute commands related to the class type but not specific to object instances.

When using static members, in fact, you don’t even need to instantiate an object. 

**Example:** The Console.WriteLine() and Console.ToString() methods are static. You don't need to instiate a Console object to use them.

An example use case is when you want to use a static property to keep track of how many instances of a class have been created. 

**Look for more use cases.**

### Static Constructors

When using static members in a class, you should initialize them beforehand. You can supply a static member with an initial value as part of its declaration. Other times you may want to:
* Perform a more complex initialization
* Perform some operations before assigning values or allowing static methods to execute. 

Static constructors can be used to do this.

**Rules of Static Constructors:**
* A class can have a single static constructor
* It must have no access modifiers --> *public/private*
* Cannot have any parameters
* It can never be called directly.

It can only be called when:
* An instance of the class containing the static constructor is created.
* A static member of the class containing the static constructor is accessed.
**In both cases, the static constructor is called first**, before the class is instantiated or static members are accessed. 

No matter how many instances of a class are created, its static constructor will be called only once. To differentiate between static constructors and the constructors all nonstatic constructors are also known as instance constructors.

### Static Classes

In cases where you want to use classes that contain only static members and cannot be used to instantiate objects (like Console), you can use Static Classes.

A static class can only contain static members and can't have instance constructors, since by implication it can never be instantiated. Static classes can have static constructors though.
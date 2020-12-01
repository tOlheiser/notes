# Collections

Collections are used to store groups of related objects. Collections provide efficient methods to organize, store, and retrieve your data **without** requiring knowledge of how the data is being stored. 

## Declaring a List Collection

```c#
List<int> intList;
List<string> stringList;
```

## Common Methods and Properties of class List<T>
* Add - Adds an element to the end of the List.
* AddRange - Adds the elements of its collection argument to the end of the List.
* Capacity - Property that *gets* or *sets* the number of elements a List can store without resizing.
* Clear - Removes all the elements from the List.
* Contains - Returns *true* if the List contains the specified element and *false* otherwise.
* Count - Property that returns the number of elements stored in the List.
* IndexOf - Returns the index of the first occurrence of the specified value in the List.
* Insert - Inserts an element at the specific index.
* Remove - Removes the first occurrence of the specified value.
* RemoveAt - Removes the element at the specified index.
* RemoveRange - Removes a specified number of elements starting at a specified index.
* Sort - Sorts the List.
* TrimExcess - Sets the Capacity of the List to the number of elements the List currently contains.

## Using Lists

```c#
using System;
using System.Collections.Generic;

class MyClass {
  static void Main() {
    // create a new List of strings
    var items = new List<string>();
    /* When Initiated:
      Count = 0, Capacity = 0. */

    items.Add("red"); // append an item to the List
    items.Insert(0, "yellow"); // insert the value at index 0

    /* After adding two elements:
      Count = 2, Capacity = 4 */

    // Display List's Count and Capacity after adding two elements
    Console.WriteLine("After adding two elements to items: " + $"Count = {items.Count}; Capacity = {items.Capacity}");

    // Displaying all the contents of the list
    for (var i = 0; i < items.Count; i++) {
      Console.Write($"{items[i]}");
    }

    // Display contents using foreach
    foreach (var item in items) {
      Console.Write($" {item} ");
    }

    items.Add("green"); // Add "green" to the end of the list
    items.Add("yellow"); // Add "yellow" to the end of the list

    /* After adding two more elements:
      Count = 4, Capacity = 4 */

    items.Remove("yellow"); // remove the first instance of "yellow"
    items.RemoveAt(1); // remove an item at index 1

    /* After removing two elements:
    Count = 2, Capacity = 4. */
  }
}
```

When the list grows to exceed the current capacity, that capacity's value doubles. It will continue to do so everytime the list exceeds the capacity.

**Difference between Add and Insert**
* Add - Appends the item to the end of the list
* Insert - Inserts the new element at the specified position.

You can use list.TrimExcess() to reduce a List's capacity to the current count. There is also the option of setting the Capacity directly.

# Tutorial

**Declaring a List with Predefined values**
```c#
var names = new List<string> { "Tanner", "Ana", "Felipe" };
var fibonacciNumbers = new List<int> {1, 1};
```

**Accessing Elements within the list**
```c#
names[1]; // reference the element at index 1 in names
```

**Creating a List of objects**
```c#
// creates a List called 'parts' that will be composed of Part objects.
List<Part> parts = new List<Part>();
```

**Adding Objects to your List**
```c#
  // Add parts to the list.
  parts.Add(new Part() {PartName="crank arm", PartId=1234});
  parts.Add(new Part() { PartName = "chain ring", PartId = 1334 });
```

## Searching Lists

**indexOf** - searches for an item and returns the index of that item; if the item isn't in the list, indexOf returns -1.

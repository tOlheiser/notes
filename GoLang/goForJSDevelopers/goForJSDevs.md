# Go for JavaScript Developers

## Setup
*Dig more into setting up the bash profile.*

## Exercise: Answer the Following Questions using Effective Go

1. Read about `for loops` in the _Effective Go_ document.
- What kind of loop doesn't exist in Go? **do-while**

2. Read about the `fmt` _package_
- What does `fmt.Println()` return? Number of bytes & error.

3. Find a _blog post_ about the recent release of Go 1.13
- What are some of the new features?

## Where Go differs from JavaScript
* **Typing** - Go is Strongly typed (String, Float, Int, Byte, Struct, etc)
* **Structures** - Structs, Pointers, Methods, Interfaces. _as opposed to ES6 classes._
* **Error Handling** - Explicit, whereas it's built into JavaScript.
* **Multi-tasking** - Go is Multi-Threaded, using Concurrency, Goroutines, and Sync.
* **Opinionated** - Strong opinions. Conventions that must be followed, built in tooling and linters.

## Introduction: Printing

### Print
Prints output to the console, returns number of bytes and an error.
```go
fmt.Print()
fmt.Println()
fmt.Printf()
```

### Fprint
Prints the output to an external source (file, browser). Also returns bytes & errors.
```go
fmt.Fprint()
fmt.Fprintln()
fmt.Fprintf()
```

### Sprint
Stores output on a character buffer, and returns the string you want to print.
```go
fmt.Sprint()
fmt.Sprintln()
fmt.Sprintf()
```

## Basic Syntax: Types

**Declaring Variables**: [{var} {variableName} {type} = {value}]
Example: var age int = 21

Integar - int, int8, int16, int32, int64, uint, uint8...
Float - float32, float64
String - string (must be double quotes, not single.)
Boolean - bool ( && || ! < <= >= == != ) - true or false
*Example: var canDrink bool = age > 21*

```go
func main() {
    var x = 4
    // Here we can use the type 'float64' as a function to convert 'x' into a float.
    fmt.Println(reflect.TypeOf(float64(x) * 5.5))
}
```

### Defining Variables

```go
var name string = "Beyonce" // Standard way of declaring variables.
var name = "Beyonce" // Go will infer that it's a string based on the string value.
var name string // initialize a variable without a value.
var name, name2 = "Beyonce", "Lizzo" // Create two variables at once.

// You can print them both out at once like so:
fmt.Println(name, name2)

func main() {
    name := "Beyonce" // shorthand. Don't need var, type will be inferred. 
}
```


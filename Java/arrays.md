# Arrays

## Declaring an Array:
```java
int[] numbers = new int[10];
```

Alternatively, you can use an **initializer**
```java
int[] numbers = {3, 5, 6, 3, 4, 12, 1, 34, 89, 2};
```

## Populating the array
Using the above example,

```java
for ( int i = 0; i < numbers.length; i++) {
    System.out.print("Enter a number: ");
    numbers[i] = input.nextInt();
}
```

## Operating on an Array

### Summing the numbers in an array
```java
int sum = 0;

foreach(number in numbers) {
    sum += number;
}
```

### Find the largest number
```java
int largest = numbers[0];

foreach(number in numbers) {
    if (number > largest) {
        largest = number;
    }
}

```

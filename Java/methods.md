# Methods

Void Method - A method that does NOT return anything.

```java
public class MethodExamples {

    public static void main(String[] args) {
        int number1 = 123;
        int number2 = 456;

        int largestNum = maxOfTwo(number1, number2);
        bestTeacher();

    } // new methods declared within the class, after the main method.

    public static int maxOfTwo(int a, int b) {
        int max = a;

        if (b > a) {
            max = b;
        } 

        return max;
    }

    public static void bestTeacher() {
        System.out.println("Nick is the best teacher!!!");
    }
}
```

Right click project
-> Properties
--> Libraries
---> Click on '+' next to 'classPath'. Add project, then add your methods java file.

Within your project file, "import myMethods.methods;"
When calling on your method: "int largestNum = methods.maxOfTwo(number1,number2);

save methods file, right click "clean and build"

Clean and build?

--------------------------------------

Cliff Notes Version
I gather 1) create a 'MyMethods' class. This is where we write all our methods. 
2) For future assignments we create a new 'assignmentClass'
3) Inside the assignment file we import methods from our 'MyMethods' class.

** Right click on the file you're importing your methods to, go to properties>library, and add your methods project as a class dependency or whatever.

Am I on the right line of thinking here?



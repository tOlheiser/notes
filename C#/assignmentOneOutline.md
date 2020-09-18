# COMP-255 Lab 1 Assignment - Due Sept 11

## Part A) Input and display User Contact Data

Use appropriate data types and meaningful names for your variables to accept the following input values:
* Name
* Student Number
* Email Address

Please enter the following data: *// prompt*
Name: Wendy Smith
Student Number: 000123456 

**Notes**
* Prompt occupies a single line. *Console.WriteLine*
* Name, Student Number, and Email would use *Console.Write*

**Display all the data after email has been entered:**
Your contact data is:
Name: $"{name}"
Student Number: $"{studentNumber}"
Email: $"{email}"
*Is string interpolation necessary if I'm just listing the variable and not building a string??*

*Note* - Initialize variables first.
int studentNumber;
string name, email;

## Part B) Simple Calculator

1) Accepts 3 floating point numbers from the user.
*float num1, num2, num3, total, product;*
*Prompt the user for the first number, then the second, and the third.*

2) Calculate the sum of the 3 numbers and store the result in a variable named total.
*total = num1 + num2 + num3;*

3) Calculate the product of the three numbers, store in a variable called Product.
*product = num1 * num2 * num3*

4) Output the results in a format similar to this output:
Input the first number: 12.9
Input the second number: 25.6
Input the third number: 8.25

The results are: 
12.9 + 25.6 + 8.25 = 46.75
12.9 x 25.6 x 8.25 = 2724.48
# WPF Notes

## Obtaining Values

State of Checkbox: *CheckboxName*.isChecked
State of Radio Button: *RadioButtonName*.isChecked
Content of Text Box: *TextBoxName*.Text

## Error Handlings

*Outside the click event when program is initialized*
```c#
ErrorMessageLabel.Content = "";
```

```c#
// If nothing is entered
if (GradePercentTextBox.Text == "") {
    ErrorMessageLabel.Content = "Please enter a grade percent.";
    return; // end and jump out of the click event.
}

// TryParse returns true/false if it was a successful/nonsuccessful conversion.
else if (Double.TryParse(GradePercentTextBox.Text, out StudentGradePercent) == false) {
    // no conversion - output an error to the user
    ErrorMessageLabel.Content = "Please enter a numeric value";
    return; // end and jump out of the click event.
} else if (StudentGradePercent < 0) {
    ErrorMessageLabel.Content = "Enter a positive numeric value";
    return; // end and jump out of the click event.
}
```
```c#
    //Get Input
    Double.TryParse(InputNumberTexBox.Text, out Number);

    // unformatted output
    OutputTextBox.Text = Convert.ToString(Number);

    // -----------------------------------------------------
    // Format as fixed decimal place number (to 3 decimals)
    // -----------------------------------------------------
    // using composite formatting:
    OutputTextBox.Text = String.Format("{0:N3}", Number);

    // Alternative syntax using string interpolation
    OutputTextBox.Text = $"{Number:N3}";

    // -----------------------------------------------------
    //Format as Currency
    // -----------------------------------------------------
    OutputTextBox.Text = String.Format("{0:C}", Number);

    // Alternative syntax using string interpolation
    OutputTextBox.Text = $"{Number:C}";
    ```
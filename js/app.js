// Allow for the following conversions:

// Length: km -> miles
// Fuel Economy: Kilometer per liter -> Miles per gallon
// Digital Storage: Byte -> Kilobyte

// 1 kilometer = 0.621371 miles
// 1 kilometer per liter = 2.352145833 miles per gallon
// 1 byte = 0.0009765625 kilobytes

// 1. Create a function that will convert from one unit of measure to another.
// 2. Create a second function that will determine which conversion function to call based on the user's selection.
// 3. Create a third function that will capture the user's input and display the results of the conversion.

// 1. Create a function that will convert from one unit of measure to another.
function convertLength() {
  var km = document.getElementById("input").value;
  var miles = km * 0.621371;
  document.getElementById("output").innerHTML = miles;
}

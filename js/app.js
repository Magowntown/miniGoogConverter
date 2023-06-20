let measurementOptions = document.querySelector("#measurementOptions");
let length = document.querySelector("#length");
let fuel = document.querySelector("#fuel");
let storage = document.querySelector("#storage");

let input = document.querySelector("#input");
let result = document.createElement("#result");

let inputType = document.createElement("#inputType");
let resultType = document.createElement("#resultType");

let clear = document.querySelector("#clear");

// Event Listeners

function createOptions(measurementOption) {
  // Clear the existing options from the inputType and resultType select elements
  document.getElementById("inputType").innerHTML = "";
  document.getElementById("resultType").innerHTML = "";

  // Add the appropriate options to the inputType and resultType select elements depending on the measurementOption
  switch (measurementOption) {
    case "length":
      document.getElementById("inputType").innerHTML += `
        <option value="km">km</option>
        <option value="miles">miles</option>
      `;
      document.getElementById("resultType").innerHTML += `
        <option value="km">km</option>
        <option value="miles">miles</option>
      `;
      break;
    case "fuel economy":
      document.getElementById("inputType").innerHTML += `
        <option value="kpl">kpl</option>
        <option value="mpg">mpg</option>
      `;
      document.getElementById("resultType").innerHTML += `
        <option value="kpl">kpl</option>
        <option value="mpg">mpg</option>
      `;
      break;
    case "digital storage":
      document.getElementById("inputType").innerHTML += `
        <option value="bytes">bytes</option>
        <option value="kilobytes">KB</option>
      `;
      document.getElementById("resultType").innerHTML += `
        <option value="bytes">bytes</option>
        <option value="kilobytes">KB</option>
      `;
      break;
  }
}

// When the measurementOption select element changes, call the createOptions() function
document
  .getElementById("measurementOptions")
  .addEventListener("change", createOptions);

// Allow for the following conversions:

// Length: km -> miles
// Fuel Economy: Kilometer per liter -> Miles per gallon
// Digital Storage: Byte -> Kilobyte
// Use functions to “group” your formulas

// 1. Length Conversion
function kmToMiles(km) {
  return km * 0.621371;
}

function milesToKm(miles) {
  return miles * 1.60934;
}

// 2. Fuel Economy Conversion
function kilToKm(kil) {
  return kil * 2.35215;
}

function kmToKil(km) {
  return km * 0.425144;
}

// 3. Digital Storage Conversion
function byteToKb(byte) {
  return byte * 0.000976563;
}

function kilToByte(kil) {
  return kil * 1024;
}

// Fetch the necessary elements from the DOM
const measurementOptions = document.querySelector("#measurementOptions");
const inputType = document.querySelector("#inputType");
const resultType = document.querySelector("#resultType");
const input = document.querySelector("#input");
const result = document.querySelector("#result");
const clearButton = document.querySelector("#clear");

// Define conversion rates for the measurement options
const conversionRates = {
  length: {
    base: "meter",
    values: {
      meter: {
        toBase: (val) => val,
        fromBase: (val) => val,
      },
      kilometer: {
        toBase: (val) => val * 1000,
        fromBase: (val) => val / 1000,
      },
      centimeter: {
        toBase: (val) => val / 100,
        fromBase: (val) => val * 100,
      },
      millimeter: {
        toBase: (val) => val / 1000,
        fromBase: (val) => val * 1000,
      },
      micrometer: {
        toBase: (val) => val / 1e6,
        fromBase: (val) => val * 1e6,
      },
      nanometer: {
        toBase: (val) => val / 1e9,
        fromBase: (val) => val * 1e9,
      },
      mile: {
        toBase: (val) => val / 0.000621371,
        fromBase: (val) => val * 0.000621371,
      },
      yard: {
        toBase: (val) => val / 1.09361,
        fromBase: (val) => val * 1.09361,
      },
      foot: {
        toBase: (val) => val / 3.28084,
        fromBase: (val) => val * 3.28084,
      },
      inch: {
        toBase: (val) => val / 39.3701,
        fromBase: (val) => val * 39.3701,
      },
      lightyear: {
        toBase: (val) => val / 1.057e-16,
        fromBase: (val) => val * 1.057e-16,
      },
    },
  },

  fuel: {
    base: "mpg",
    values: {
      mpg: {
        toBase: (val) => val,
        fromBase: (val) => val,
      },
      "km/l": {
        toBase: (val) => val / 0.425144,
        fromBase: (val) => val * 0.425144,
      },
      "l/100km": {
        toBase: (val) => 235.215 / val,
        fromBase: (val) => 235.215 / val,
      },
    },
  },

  storage: {
    base: "byte",
    values: {
      byte: {
        toBase: (val) => val,
        fromBase: (val) => val,
      },
      kilobyte: {
        toBase: (val) => val * 1024,
        fromBase: (val) => val / 1024,
      },
      megabyte: {
        toBase: (val) => val * Math.pow(1024, 2),
        fromBase: (val) => val / Math.pow(1024, 2),
      },
      gigabyte: {
        toBase: (val) => val * Math.pow(1024, 3),
        fromBase: (val) => val / Math.pow(1024, 3),
      },
      terabyte: {
        toBase: (val) => val * Math.pow(1024, 4),
        fromBase: (val) => val / Math.pow(1024, 4),
      },
    },
  },

  temperature: {
    base: "celsius",
    values: {
      celsius: {
        toBase: (val) => val,
        fromBase: (val) => val,
      },
      fahrenheit: {
        toBase: (val) => ((val - 32) * 5) / 9,
        fromBase: (val) => (val * 9) / 5 + 32,
      },
      kelvin: {
        toBase: (val) => val - 273.15,
        fromBase: (val) => val + 273.15,
      },
    },
  },

  mass: {
    base: "kilogram",
    values: {
      kilogram: {
        toBase: (val) => val,
        fromBase: (val) => val,
      },
      gram: {
        toBase: (val) => val / 1000,
        fromBase: (val) => val * 1000,
      },
      milligram: {
        toBase: (val) => val / 1e6,
        fromBase: (val) => val * 1e6,
      },
      metricton: {
        toBase: (val) => val * 1000,
        fromBase: (val) => val / 1000,
      },
      longton: {
        toBase: (val) => val * 1016.05,
        fromBase: (val) => val / 1016.05,
      },
      shortton: {
        toBase: (val) => val * 907.185,
        fromBase: (val) => val / 907.185,
      },
      pound: {
        toBase: (val) => val * 0.453592,
        fromBase: (val) => val / 0.453592,
      },
      ounce: {
        toBase: (val) => val * 0.0283495,
        fromBase: (val) => val / 0.0283495,
      },
    },
  },

  speed: {
    base: "m/s",
    values: {
      "m/s": {
        toBase: (val) => val,
        fromBase: (val) => val,
      },
      "km/h": {
        toBase: (val) => val / 3.6,
        fromBase: (val) => val * 3.6,
      },
      "mile/h": {
        toBase: (val) => val / 2.237,
        fromBase: (val) => val * 2.237,
      },
      knot: {
        toBase: (val) => val / 1.944,
        fromBase: (val) => val * 1.944,
      },
    },
  },

  area: {
    base: "m²",
    values: {
      "m²": {
        toBase: (val) => val,
        fromBase: (val) => val,
      },
      "km²": {
        toBase: (val) => val * 1e6,
        fromBase: (val) => val / 1e6,
      },
      hectare: {
        toBase: (val) => val * 1e4,
        fromBase: (val) => val / 1e4,
      },
      acre: {
        toBase: (val) => val * 4046.86,
        fromBase: (val) => val / 4046.86,
      },
    },
  },

  volume: {
    base: "litre",
    values: {
      litre: {
        toBase: (val) => val,
        fromBase: (val) => val,
      },
      ml: {
        toBase: (val) => val / 1000,
        fromBase: (val) => val * 1000,
      },
      gallon: {
        toBase: (val) => val / 3.78541,
        fromBase: (val) => val * 3.78541,
      },
      quart: {
        toBase: (val) => val / 0.946353,
        fromBase: (val) => val * 0.946353,
      },
      pint: {
        toBase: (val) => val / 0.473176,
        fromBase: (val) => val * 0.473176,
      },
      cup: {
        toBase: (val) => val / 0.236588,
        fromBase: (val) => val * 0.236588,
      },
      fluidounce: {
        toBase: (val) => val / 0.0295735,
        fromBase: (val) => val * 0.0295735,
      },
    },
  },

  pressure: {
    base: "pa",
    values: {
      pa: {
        toBase: (val) => val,
        fromBase: (val) => val,
      },
      kpa: {
        toBase: (val) => val * 1000,
        fromBase: (val) => val / 1000,
      },
      mpa: {
        toBase: (val) => val * 1e6,
        fromBase: (val) => val / 1e6,
      },
      bar: {
        toBase: (val) => val * 1e5,
        fromBase: (val) => val / 1e5,
      },
      torr: {
        toBase: (val) => val * 133.322,
        fromBase: (val) => val / 133.322,
      },
      psi: {
        toBase: (val) => val * 6894.76,
        fromBase: (val) => val / 6894.76,
      },
    },
  },

  energy: {
    base: "joule",
    values: {
      joule: {
        toBase: (val) => val,
        fromBase: (val) => val,
      },
      kj: {
        toBase: (val) => val * 1000,
        fromBase: (val) => val / 1000,
      },
      calorie: {
        toBase: (val) => val * 4.184,
        fromBase: (val) => val / 4.184,
      },
      kcal: {
        toBase: (val) => val * 4184,
        fromBase: (val) => val / 4184,
      },
      btu: {
        toBase: (val) => val * 1055.06,
        fromBase: (val) => val / 1055.06,
      },
    },
  },

  density: {
    base: "kg/m³",
    values: {
      "kg/m³": {
        toBase: (val) => val,
        fromBase: (val) => val,
      },
      "g/cm³": {
        toBase: (val) => val * 1000,
        fromBase: (val) => val / 1000,
      },
      "g/ml": {
        toBase: (val) => val * 1000,
        fromBase: (val) => val / 1000,
      },
      "lb/ft³": {
        toBase: (val) => val * 16.0185,
        fromBase: (val) => val / 16.0185,
      },
    },
  },
};

// Conversion function when inputType changes
function convertInputToResult() {
  const inputValue = parseFloat(input.value);
  const inputUnit = inputType.value;
  const resultUnit = resultType.value;
  const conversion = conversionRates[measurementOptions.value];

  if (
    conversion &&
    conversion.values[inputUnit] &&
    conversion.values[resultUnit]
  ) {
    const convertedValue = conversion.values[resultUnit].fromBase(
      conversion.values[inputUnit].toBase(inputValue)
    );
    result.value = convertedValue.toFixed(2);
  } else {
    result.value = "";
  }
}

// Conversion function when resultType changes
function convertResultToInput() {
  const inputValue = parseFloat(result.value);
  const inputUnit = resultType.value;
  const resultUnit = inputType.value;
  const conversion = conversionRates[measurementOptions.value];

  if (
    conversion &&
    conversion.values[inputUnit] &&
    conversion.values[resultUnit]
  ) {
    const convertedValue = conversion.values[resultUnit].fromBase(
      conversion.values[inputUnit].toBase(inputValue)
    );
    input.value = convertedValue.toFixed(2);
  } else {
    input.value = "";
  }
}

// Update the input and result type options based on the selected measurement
measurementOptions.addEventListener("change", (event) => {
  const selectedMeasurement = event.target.value;
  const conversion = conversionRates[selectedMeasurement];

  if (conversion) {
    inputType.innerHTML = "";
    resultType.innerHTML = "";

    for (const unit in conversion.values) {
      inputType.innerHTML += `<option value="${unit}">${unit}</option>`;
      resultType.innerHTML += `<option value="${unit}">${unit}</option>`;
    }
  }
});

// Convert the input value to the result value based on the selected types
input.addEventListener("input", convertInputToResult);

// Convert the result value to the input value based on the selected types
result.addEventListener("input", convertResultToInput);

// Update conversion when unit types change
inputType.addEventListener("change", convertInputToResult);
resultType.addEventListener("change", convertResultToInput);

// Clear the input and result values
clearButton.addEventListener("click", () => {
  input.value = "";
  result.value = "";
});

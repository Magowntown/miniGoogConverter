// Fetch the necessary elements from the DOM
const elements = [
  "measurementOptions",
  "inputType",
  "resultType",
  "input",
  "result",
  "clear",
].reduce((acc, id) => ({ ...acc, [id]: document.querySelector(`#${id}`) }), {});

// Define conversion rates for the measurement options
const conversionRates = {
    length: {
      base: "meter",
      values: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        micrometer: 1e6,
        nanometer: 1e9,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701,
        lightyear: 1.057e-16,
      },
    },
  
    fuel: {
      base: "mpg",
      values: {
        mpg: 1,
        "km/l": 0.425144,
        "l/100km": 235.215,
        // add more as needed
      },
    },
  
    storage: {
      base: "byte",
      values: {
        byte: 1,
        kilobyte: 1024,
        megabyte: Math.pow(1024, 2),
        gigabyte: Math.pow(1024, 3),
        terabyte: Math.pow(1024, 4),
        // add more as needed
      },
    },
  
    temperature: {
      base: "celsius",
      values: {
        celsius: 1,
        fahrenheit: 33.8,
        kelvin: 274.15,
        // add more as needed
      },
    },
  
    mass: {
      base: "kilogram",
      values: {
        kilogram: 1,
        gram: 1000,
        milligram: 1e6,
        metricton: 0.001,
        longton: 0.000984207,
        shortton: 0.00110231,
        pound: 2.20462,
        ounce: 35.274,
        // add more as needed
      },
    },
  
    speed: {
      base: "m/s",
      values: {
        "m/s": 1,
        "km/h": 3.6,
        "mile/h": 2.23694,
        knot: 1.94384,
        // add more as needed
      },
    },
  
    area: {
      base: "m²",
      values: {
        "m²": 1,
        "km²": 0.000001,
        hectare: 0.0001,
        acre: 0.000247105,
        // add more as needed
      },
    },
  
    volume: {
      base: "litre",
      values: {
        litre: 1,
        ml: 1000,
        gallon: 0.264172,
        quart: 1.05669,
        pint: 2.11338,
        cup: 4.22675,
        fluidounce: 33.814,
        // add more as needed
      },
    },
  
    pressure: {
      base: "pa",
      values: {
        pa: 1,
        kpa: 0.001,
        mpa: 0.000001,
        bar: 0.00001,
        torr: 0.00750062,
        psi: 0.000145038,
        // add more as needed
      },
    },
  
    energy: {
      base: "joule",
      values: {
        joule: 1,
        kj: 0.001,
        calorie: 0.238846,
        kcal: 0.000238846,
        btu: 0.000947817,
        // add more as needed
      },
    },
  
    density: {
      base: "kg/m³",
      values: {
        "kg/m³": 1,
        "g/cm³": 0.001,
        "g/ml": 0.001,
        "lb/ft³": 0.06242796,
        // add more as needed
      },
    },
  };

function updateConversionOptions(event) {
  const selectedMeasurement = event.target.value;
  const conversion = conversionRates[selectedMeasurement];

  if (conversion) {
    elements.inputType.innerHTML = "";
    elements.resultType.innerHTML = "";

    for (const unit in conversion.values) {
      elements.inputType.innerHTML += `<option value="${unit}">${unit}</option>`;
      elements.resultType.innerHTML += `<option value="${unit}">${unit}</option>`;
    }

    triggerConversion();
  }
}

function convertValues(
  sourceElement,
  sourceTypeElement,
  targetTypeElement,
  targetElement
) {
  const inputValue = sourceElement.value;
  const inputUnit = sourceTypeElement.value;
  const resultUnit = targetTypeElement.value;

  const conversion = conversionRates[elements.measurementOptions.value];

  if (
    conversion &&
    conversion.values[inputUnit] &&
    conversion.values[resultUnit]
  ) {
    const convertedValue =
      (inputValue / conversion.values[inputUnit]) *
      conversion.values[resultUnit];
    targetElement.value = convertedValue.toFixed(2);
  } else {
    targetElement.value = "";
  }
}

function triggerConversion() {
  convertValues(
    elements.input,
    elements.inputType,
    elements.resultType,
    elements.result
  );
  convertValues(
    elements.result,
    elements.resultType,
    elements.inputType,
    elements.input
  );
}

// Update the input and result type options based on the selected measurement
elements.measurementOptions.addEventListener("change", updateConversionOptions);

// Convert the input value to the result value based on the selected types
elements.input.addEventListener("input", () =>
  convertValues(
    elements.input,
    elements.inputType,
    elements.resultType,
    elements.result
  )
);

// Convert the result value to the input value based on the selected types
elements.result.addEventListener("input", () =>
  convertValues(
    elements.result,
    elements.resultType,
    elements.inputType,
    elements.input
  )
);

// Update conversion when unit types change
elements.inputType.addEventListener("change", triggerConversion);
elements.resultType.addEventListener("change", triggerConversion);

// Clear the input and result values
elements.clear.addEventListener("click", () => {
  elements.input.value = "";
  elements.result.value = "";
});

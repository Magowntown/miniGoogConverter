window.onload = function () {
  document.getElementById("clear").addEventListener("click", clearValues);
  document
    .getElementById("measurement")
    .addEventListener("change", updateSelectOptions);
  document.getElementById("inputBox").addEventListener("input", convertValue);
  updateSelectOptions();
};

function updateSelectOptions() {
  const measurement = document.getElementById("measurement").value.trim();
  let selectElementId = "";
  let options = [];

  switch (measurement) {
    case "length":
      selectElementId = "distanceUnit";
      options = [
        { value: "km", text: "Kilometer" },
        { value: "miles", text: "Miles" },
      ];
      break;
    case "fuel":
      selectElementId = "gasUnit";
      options = [
        { value: "kmpl", text: "Kilometer per liter" },
        { value: "mpg", text: "Miles per gallon" },
      ];
      break;
    case "storage":
      selectElementId = "storageUnit";
      options = [
        { value: "byte", text: "Byte" },
        { value: "kb", text: "Kilobyte" },
      ];
      break;
  }

  let selectElement = document.getElementById(selectElementId);
  selectElement.innerHTML = "";
  options.forEach((option) => {
    let optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.text = option.text;
    selectElement.appendChild(optionElement);
  });
  selectElement.addEventListener("change", convertValue);
}

function convertValue() {
  let inputValue = document.getElementById("inputBox").value;
  let measurement = document.getElementById("measurement").value.trim();
  let unitElementId =
    measurement === "length"
      ? "distanceUnit"
      : measurement === "fuel"
      ? "gasUnit"
      : "storageUnit";
  let unit = document.getElementById(unitElementId).value;
  let convertedValue = 0;

  if (measurement === "length") {
    if (unit === "km") {
      convertedValue = inputValue / 1.60934;
    } else {
      convertedValue = inputValue * 1.60934;
    }
  } else if (measurement === "fuel") {
    if (unit === "kmpl") {
      convertedValue = inputValue * 2.35214;
    } else {
      convertedValue = inputValue / 2.35214;
    }
  } else {
    if (unit === "byte") {
      convertedValue = inputValue / 1024;
    } else {
      convertedValue = inputValue * 1024;
    }
  }

  document.getElementById("output").value = convertedValue;
}

function clearValues() {
  document.getElementById("inputBox").value = "";
  document.getElementById("output").value = "";
}

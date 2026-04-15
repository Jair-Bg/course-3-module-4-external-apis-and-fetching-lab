// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const button = document.getElementById("fetch-alerts");
const input = document.getElementById("state-input");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

//Create a function that takes in a state abbreviation and fetches the weather alerts.

async function fetchAlerts(stateAbbr) {
  const response = await fetch(`${weatherApi}${stateAbbr}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch alerts: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
//Create a function that takes in the data from the API and displays the alerts on the page.

function displayAlerts(data) {
  alertsDisplay.innerHTML = "";
// Clear any previous error messages

  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
// Display the number of alerts and their headlines

  const summary = document.createElement("p");
  summary.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.append(summary);
// Create a list of alert headlines

  const list = document.createElement("ul");
  data.features.forEach((feature) => {
    const item = document.createElement("li");
    item.textContent = feature.properties.headline;
    list.append(item);
  });
  alertsDisplay.append(list);
}
// Create a function that takes in an error message and displays it on the page.

function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}
// Add an event listener to the button that triggers the fetch and display functions when clicked.

button.addEventListener("click", () => {
  const stateAbbr = input.value.trim();
  input.value = "";
// Validate the input and fetch alerts if valid

  fetchAlerts(stateAbbr)
    .then(displayAlerts)
    .catch((error) => displayError(error.message));
});
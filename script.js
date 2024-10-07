// Replace with your WeatherAPI API key
const apiKey = 'eb0d2aabdefd49a188b45834240710';

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const toggleUnitBtn = document.getElementById('toggle-unit');

let isCelsius = true;

searchBtn.addEventListener('click', fetchWeather);

toggleUnitBtn.addEventListener('click', toggleTemperatureUnit);

function fetchWeather() {
  const city = cityInput.value;
  if (!city) return;

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(() => {
      errorMessage.classList.remove('hidden');
      weatherInfo.classList.add('hidden');
    });
}

function displayWeather(data) {
  errorMessage.classList.add('hidden');
  weatherInfo.classList.remove('hidden');

  const tempCelsius = data.current.temp_c;
  const weatherDesc = data.current.condition.text;
  const iconUrl = data.current.condition.icon;

  cityName.textContent = data.location.name;
  temperature.textContent = `Temperature: ${tempCelsius.toFixed(1)} °C`;
  description.textContent = `Weather: ${weatherDesc}`;
  weatherIcon.src = iconUrl;

  isCelsius = true;
  toggleUnitBtn.textContent = 'Switch to °F';
}

function toggleTemperatureUnit() {
  const tempText = temperature.textContent;
  const currentTemp = parseFloat(tempText.split(' ')[1]);

  if (isCelsius) {
    const tempFahrenheit = (currentTemp * 9/5) + 32;
    temperature.textContent = `Temperature: ${tempFahrenheit.toFixed(1)} °F`;
    toggleUnitBtn.textContent = 'Switch to °C';
  } else {
    const tempCelsius = (currentTemp - 32) * 5/9;
    temperature.textContent = `Temperature: ${tempCelsius.toFixed(1)} °C`;
    toggleUnitBtn.textContent = 'Switch to °F';
  }

  isCelsius = !isCelsius;
}

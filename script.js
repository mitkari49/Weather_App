document.getElementById('fetch-data-btn').addEventListener('click', fetchGeolocation);

function fetchGeolocation() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        showError({ code: 0, message: "Geolocation is not supported by this browser." });
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;


    document.getElementById('latitude').textContent = latitude.toFixed(2);
    document.getElementById('longitude').textContent = longitude.toFixed(2);

    document.getElementById('landing-section').style.display = 'none';
    document.getElementById('weather-section').style.display = 'block';
    fetchWeatherData(latitude, longitude);
}

function fetchWeatherData(latitude, longitude) {
    const apiKey = '331fed11213982f0a340f6512a8f7009'; // Replace with your actual OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            showError({ code: 0, message: 'Error fetching weather data.' });
        });
}

function displayWeatherData(data) {
    document.getElementById('weather-data').style.display = 'block';

    document.getElementById('temperature').textContent = data.main.temp;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;
}

function showError(error) {
    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'block';
    document.getElementById('loading').style.display = 'none';

    switch(error.code) {
        case 1:
            errorDiv.textContent = "User denied the request for Geolocation.";
            break;
        case 2:
            errorDiv.textContent = "Location information is unavailable.";
            break;
        case 3:
            errorDiv.textContent = "The request to get user location timed out.";
            break;
        default:
            errorDiv.textContent = error.message;
            break;
    }
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    document.getElementById('weather-data').style.display = 'none';
}

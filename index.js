const apiKey = '5717bd65a240df95236c9074f5d570a9';

function getWeatherReport(city, country) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      throw new Error('Unable to fetch weather data.');
    });
}

const formElement = document.querySelector('form');
const weatherReportElement = document.querySelector('#weather-report');

formElement.addEventListener('submit', event => {
  event.preventDefault();

  const city = document.querySelector('#city').value;
  const country = document.querySelector('#country').value;

  getWeatherReport(city, country)
    .then(data => {
      console.log(data);

      const temperature = Math.round(data.main.temp - 273.15);
      const feelsLike = Math.round(data.main.feels_like - 273.15);
      const humidity = data.main.humidity;
      const pressure = data.main.pressure;
      const windSpeed = data.wind.speed;
      const windDirection = data.wind.deg;
      const cloudiness = data.clouds.all + '%';
      const sunrise = new Date(data.sys.sunrise * 1000);
      const sunset = new Date(data.sys.sunset * 1000);
      const uvIndex = data?.current?.uvi || 'N/A'; // optional chaining (?.) used to handle undefined values
      const visibility = data.visibility;
      const precipitationLastHour = data?.rain?.['1h'] || data?.snow?.['1h'] || 'none'; // optional chaining and dynamic property access used to handle undefined values
      
      const report = `Current weather in ${city}, ${country}:
      -----------------------------------------------------------------------------------------
      Temperature: ${temperature} °C
      Feels like: ${feelsLike} °C
      Humidity: ${humidity}%
      Pressure: ${pressure} hPa
      Wind speed: ${windSpeed} m/s
      Wind direction: ${windDirection} degrees
      Cloudiness: ${cloudiness}
      Sunrise: ${sunrise.toLocaleTimeString()}
      Sunset: ${sunset.toLocaleTimeString()}
      UV index: ${uvIndex}
      Visibility: ${visibility / 1000} km
      Precipitation (last hour): ${precipitationLastHour}`;
      
      weatherReportElement.innerText = report;
    })
    .catch(error => {
      console.error(error);
      weatherReportElement.innerText = 'Unable to fetch weather data.';
    });

});

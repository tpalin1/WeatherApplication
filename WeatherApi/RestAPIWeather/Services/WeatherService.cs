using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Json;
using Newtonsoft.Json;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.DataProtection.KeyManagement;

namespace RestAPIWeather.Services
{
    public class WeatherService
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;

        public WeatherService(IConfiguration config, HttpClient httpClient)
        {
            _httpClient = httpClient;
            _config = config;
        }

        // Get API Key from Configuration
        public string GetApiKey()
        {
            var key = _config["WeatherApi:Key"];
            return key;
        }

        
        // Call to OpenWeatherMap Weather API to get current weather for a city
        public async Task<WeatherResponse> GetWeatherAsync(string city)
        {
            // Construct the URL to call the OpenWeather API
            string url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={GetApiKey()}&units=metric";

            // Make the API call
            var response = await _httpClient.GetStringAsync(url);

            // Deserialize the response to a WeatherResponse object
            var weatherData = JsonConvert.DeserializeObject<WeatherResponse>(response);

            return weatherData;
        }

        public void DisplayWeatherForecast(WeatherForecastResponse weatherForecast)
        {
            foreach (var forecast in weatherForecast.List)
            {
                // Convert Unix timestamp to DateTime
                DateTime forecastTime = DateTimeOffset.FromUnixTimeSeconds(forecast.Dt).DateTime;
                float tempCelsius = forecast.Main.Temp - 273.15f; // Convert from Kelvin to Celsius

                // Display forecast data for each 3-hour interval
                Console.WriteLine($"Date/Time: {forecastTime:yyyy-MM-dd HH:mm:ss}");
                Console.WriteLine($"Temperature: {tempCelsius:F1} °C");
                Console.WriteLine($"Humidity: {forecast.Main.Humidity}%");
                Console.WriteLine($"Weather: {forecast.Weather[0].Description}");
                Console.WriteLine($"Wind Speed: {forecast.Wind.Speed} m/s");
                Console.WriteLine($"Cloud Coverage: {forecast.Clouds.All}%");
                Console.WriteLine($"Precipitation Probability: {forecast.Pop * 100}%");
                Console.WriteLine(new string('-', 30));
            }
        }
        public async Task<WeatherForecastResponse> GetWeatherForecastAsync(string cityName)
        {
            var url = $"https://api.openweathermap.org/data/2.5/forecast?q={cityName}&appid={GetApiKey()}";

            // Send a GET request to OpenWeatherMap API
            var response = await _httpClient.GetStringAsync(url);



            // Deserialize the JSON into the WeatherForecastResponse object
            var weatherForecast = JsonConvert.DeserializeObject<WeatherForecastResponse>(response);



            return weatherForecast;
        }
    }

}

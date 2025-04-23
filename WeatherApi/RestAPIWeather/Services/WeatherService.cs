using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Json;
using Newtonsoft.Json;
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


        public string GetApiKey()
        {
            var key = _config["WeatherApi:Key"];
            Console.WriteLine("Loaded API key: " + key); // test output
            return key;
        }


        public async Task<WeatherResponse> GetWeatherAsync(string city)
        {

            Console.WriteLine("API Key: " + GetApiKey());
            // Construct the URL to call the OpenWeather API
            string url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={GetApiKey()}&units=metric";

            // Make the API call
            var response = await _httpClient.GetStringAsync(url);

            // Deserialize the response to a WeatherResponse object
            var weatherData = JsonConvert.DeserializeObject<WeatherResponse>(response);

            return weatherData;
        }
    }

}

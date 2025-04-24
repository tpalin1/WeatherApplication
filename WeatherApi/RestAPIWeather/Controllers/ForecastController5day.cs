using Microsoft.AspNetCore.Mvc;
using RestAPIWeather.Services;
using System.Threading.Tasks;

[Route("[controller]")]
[ApiController]
public class ForecastController5day : ControllerBase
{
    private readonly WeatherService _weatherService;

    public ForecastController5day(WeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    [HttpGet("forecast")]
    public async Task<IActionResult> GetWeatherForecast(string cityName)
    {
        if (string.IsNullOrEmpty(cityName))
        {
            return BadRequest("City name and country code are required.");
        }

        var forecast = await _weatherService.GetWeatherForecastAsync(cityName);

        _weatherService.DisplayWeatherForecast(forecast);

        if (forecast == null)
        {
            return NotFound("Weather data not found for the specified city.");
        }

        return Ok(forecast); // Return the JSON data from OpenWeatherMap API
    }
}

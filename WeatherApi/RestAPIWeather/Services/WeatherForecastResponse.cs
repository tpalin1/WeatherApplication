namespace RestAPIWeather.Services
{
    public class WeatherForecastResponse
    {
        public List<WeatherForecastList> List { get; set; }
    }

    public class WeatherForecastList
    {
        public long Dt { get; set; } // Unix timestamp for the forecast time
        public MainWeather Main { get; set; }
        public WeatherMain[] Weather { get; set; }
        public Clouds Clouds { get; set; }
        public Wind Wind { get; set; }
        public int Visibility { get; set; }
        public float Pop { get; set; } // Probability of precipitation (0 to 1 scale)
        public string DtTxt { get; set; } // Date and time as a string (formatted)
    }

    public class MainWeather
    {
        public float Temp { get; set; } // Temperature in Kelvin
        public int Pressure { get; set; }
        public int Humidity { get; set; }
        public float TempMin { get; set; }
        public float TempMax { get; set; }
    }

    public class WeatherMain
    {
        public int Id { get; set; }
        public string Main { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
    }

    // Represents cloudiness in percentage (0-100%)
    public class Clouds
    {
        public int All { get; set; }
    }

    // Represents wind information (speed, direction, gust)
    public class Wind
    {
        public float Speed { get; set; }
        public int Deg { get; set; } // Wind direction in degrees (meteorological)
        public float Gust { get; set; }
    }
}

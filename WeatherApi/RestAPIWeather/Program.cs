using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RestAPIWeather.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddUserSecrets<Program>();

// Register HttpClient to DI container
builder.Services.AddHttpClient();

// Register your WeatherService (it depends on HttpClient)
builder.Services.AddScoped<WeatherService>();

builder.Services.AddControllers();  // Add controllers (REST API)

builder.Services.AddEndpointsApiExplorer();  // For Swagger
builder.Services.AddSwaggerGen();  // For Swagger

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
Console.WriteLine("API Key from config: " + builder.Configuration["WeatherApi:Key"]);

app.Run();  // Start the web application

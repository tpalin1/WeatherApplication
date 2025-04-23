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
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // React dev server
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseCors("AllowReactApp");
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();  // Start the web application

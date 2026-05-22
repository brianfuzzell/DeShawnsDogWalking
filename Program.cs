using DeShawnsDogWalking.Models;
using DeShawnsDogWalking.Models.DTOs;

List<City> cities = new List<City>
{
    new City { Id = 1, Name = "Nashville" },
    new City { Id = 2, Name = "Memphis" },
    new City { Id = 3, Name = "Knoxville" },
};

List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 1, Name = "DeShawn" },
    new Walker { Id = 2, Name = "Maria" },
    new Walker { Id = 3, Name = "James" },
};

List<Dog> dogs = new List<Dog>
{
    new Dog { Id = 1, Name = "Biscuit", CityId = 1, WalkerId = 1 },
    new Dog { Id = 2, Name = "Luna",    CityId = 1, WalkerId = 2 },
    new Dog { Id = 3, Name = "Max",     CityId = 2, WalkerId = null },
    new Dog { Id = 4, Name = "Bella",   CityId = 3, WalkerId = 2 },
    new Dog { Id = 5, Name = "Rocky",   CityId = 2, WalkerId = 3 },
};

List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity { Id = 1, WalkerId = 1, CityId = 1 },
    new WalkerCity { Id = 2, WalkerId = 1, CityId = 2 },
    new WalkerCity { Id = 3, WalkerId = 2, CityId = 1 },
    new WalkerCity { Id = 4, WalkerId = 2, CityId = 3 },
    new WalkerCity { Id = 5, WalkerId = 3, CityId = 2 },
};

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(options =>
    {
        options.AllowAnyOrigin();
        options.AllowAnyMethod();
        options.AllowAnyHeader();
    });
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/cities", () =>
{
    return cities.Select(city => new CityDTO
    {
        Id = city.Id,
        Name = city.Name
    });
});

app.MapPost("/api/cities", (City city) =>
{
    if (cities.Count == 0)
    {
        city.Id = 1;
    }
    else
    {
        city.Id = cities.Max(c => c.Id) + 1;
    }

    cities.Add(city);

    return Results.Created($"/api/cities/{city.Id}", new CityDTO
    {
        Id = city.Id,
        Name = city.Name
    });
});

app.Run();

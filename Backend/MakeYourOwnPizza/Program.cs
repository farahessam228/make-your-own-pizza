using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using MakeYourOwnPizza.Data;
using MakeYourOwnPizza.Repositories;
using MakeYourOwnPizza.Services;
using MakeYourOwnPizza.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString=builder.Configuration.GetConnectionString("DefaultConnection");
Console.WriteLine($"Connection String {connectionString}");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString,ServerVersion.AutoDetect(connectionString)));
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IPasswordHasher<User>,PasswordHasher<User>>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

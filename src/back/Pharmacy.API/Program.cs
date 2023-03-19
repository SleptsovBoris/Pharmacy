using Microsoft.EntityFrameworkCore;
using Pharmacy.Domain.data;

const string DisableCorsForLocalhost = "disable cors for localhost";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string connection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<PharmacyContext>(options => options.UseSqlServer(connection));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: DisableCorsForLocalhost,
        policy  =>
        {
            policy.WithOrigins("https://localhost:3000/", "http://localhost:3000/")
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(DisableCorsForLocalhost);
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

using Microsoft.EntityFrameworkCore;
using Mission11.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BookDbContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("BookConnection")));

builder.Services.AddCors(options =>
    options.AddPolicy("AllowReactAppBlah",
    policy => {
        policy.WithOrigins("http://localhost:3000", "https://yellow-pond-0e0e0561e.6.azurestaticapps.net/")
            .AllowAnyMethod()
            .AllowAnyHeader();
    }));
        

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReachAppBlah")
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

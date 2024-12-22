
using DotNetAPITask.Interfaces;
using DotNetAPITask.Repository;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSingleton<DataProvider>(provider =>
{
    string filePath = "./Files/data.json"; 
    return new DataProvider(filePath);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policy =>
    policy.WithOrigins("http://localhost:4200")
          .AllowAnyHeader()
          .AllowAnyMethod()
);

app.UseHttpsRedirection();
app.MapControllers();
app.UseRouting();   
app.Run();

    
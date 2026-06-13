using BlogApi.Data;
using BlogApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseInMemoryDatabase("BlogDb"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Posts.AddRange(
        new Post { Title = "Welcome to the Blog", Content = "This is the first post.", Author = "Admin", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
        new Post { Title = "Getting Started with .NET", Content = "A guide to building APIs with ASP.NET Core.", Author = "Admin", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
        new Post { Title = "Angular and .NET Together", Content = "How to connect an Angular frontend to a .NET backend.", Author = "Admin", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
    );
    db.SaveChanges();
}

app.Run();

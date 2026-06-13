using BlogApi.Data;
using BlogApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly AppDbContext _db;

    public PostsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.Posts.ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var post = await _db.Posts.FindAsync(id);
        return post is null ? NotFound() : Ok(post);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Post post)
    {
        _db.Posts.Add(post);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var post = await _db.Posts.FindAsync(id);
        if (post is null) return NotFound();
        _db.Posts.Remove(post);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

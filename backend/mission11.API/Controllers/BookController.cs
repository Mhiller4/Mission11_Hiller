using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;


namespace Mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class BookController : ControllerBase
    {
        private BookDbContext _context;
        
        
        public BookController(BookDbContext temp) => _context = temp;
        
     
        [HttpGet]
        public IActionResult GetBooks(int page = 1, [FromQuery] List<string>? bookTypes = null)
        {
            var query = _context.Books.AsQueryable();


            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }
            int totalBooks = query.Count();
            
            int pageSize = 5;
           
            int totalPages = (int)Math.Ceiling((double)totalBooks / pageSize);

            var books = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new { books, totalPages });
        }
        // Second route to get Categories that are distinct for my checkbox options
        [HttpGet("GetBooksTypes")]
        public IActionResult GetBookTypes()
        {

            var bookTypes = _context.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }

        
    }
}


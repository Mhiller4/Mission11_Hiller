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
        public IActionResult GetBooks(int page = 1)
        {
            int pageSize = 5;
            int totalBooks = _context.Books.Count();
            int totalPages = (int)Math.Ceiling((double)totalBooks / pageSize);

            var books = _context.Books
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new { books, totalPages });
        }
        // Second route to get stuff Catgegories
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


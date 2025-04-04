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

// Adds a new Book
        [HttpPost("Add")]
        public IActionResult addBook([FromBody] Book newBook){


            _context.Books.Add(newBook);
            _context.SaveChanges();

            return Ok(newBook);
        }
// Updates a current book 
        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook){

            var existingBook = _context.Books.Find(bookID); 
             if (existingBook == null)
            {
                return NotFound($"Book with ID {bookID} was not found.");
            }

            existingBook.Title = updatedBook.Title; 
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

    // Save changes to the database
            _context.Books.Update(existingBook);
            _context.SaveChanges();
            
            return Ok(existingBook);
        }

//Delete Book 
        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID){
            var book = _context.Books.Find(bookID);

            if (book == null){

                return NotFound(new {message = "book not found"});
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();

        }

        
    }
}


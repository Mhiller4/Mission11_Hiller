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
        public IEnumerable <Project> GetProjects()
        {
            return _context.Books.ToList(); 
        }

        // [HttpGet("GetBook/{id}")]
        // public IEnumerable<Project> GetProjects(Guid id)
        // {
        //     var bookSpecific = _context.Books.Where(p => p.ProjectFunctionalityStatus =="Functional").ToList();
        //     return bookSpecific;
        // }
    }
}


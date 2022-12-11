using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using myrate_backend.Data;
using myrate_backend.Models;

namespace myrate_backend.Controllers
{
    [EnableCors("AllowAllOrigins")]
    [Route("api/[controller]/[action]/")]
    public class MediaController : Controller
    {
        private MyRateDbContext _context;
        public MediaController(MyRateDbContext context)
        {
            _context = context;
        }

        
        [HttpPost]
        public async Task<ActionResult> SaveBook([FromBody] string title, string author, string desc, string publisher, string ISBN10, string ISBN13)
        {
            // first check if the book is already in db
            foreach (Book b in _context.Books)
            {
                if(b.Title == title && b.Author == author)
                {
                    return Ok(new { success = true });
                }
            }
            // otherwise add book to db
            Book newBook = Activator.CreateInstance<Book>(); ;
            newBook.Title = title;
            newBook.Author = author;
            newBook.Summary = desc;
            newBook.Publisher = publisher;
            newBook.ISBN_10 = ISBN10;
            newBook.ISBN_13 = ISBN13;
            newBook.ReleaseDate = "";
            _context.Add(newBook);
            await _context.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // add saves for other media

        public IActionResult Index()
        {
            return View();
        }
    }
}

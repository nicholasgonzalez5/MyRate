using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using myrate_backend.Data;
using myrate_backend.Models;
using System.Text.Json.Serialization;

namespace myrate_backend.Controllers
{
    public class BookDetails
    {
        [JsonPropertyName("title")]
        public string title { get; set; }

        [JsonPropertyName("author")]
        public string author { get; set; }

        [JsonPropertyName("desc")]
        public string desc { get; set; }

        [JsonPropertyName("publisher")]
        public string publisher { get; set; }

        [JsonPropertyName("ISBN10")]
        public string ISBN10 { get; set; }

        [JsonPropertyName("ISBN13")]
        public string ISBN13 { get; set; }
    }

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
        public async Task<ActionResult> SaveBook([FromBody] BookDetails details)
        {
            // first check if the book is already in db
            foreach (Book b in _context.Books)
            {
                if (b.Title.Equals(details.title) && (String.IsNullOrEmpty(b.Author) || b.Author.Equals(details.author)))
                {
                    return Ok(new { success = true });
                }
            }
            // otherwise add book to db
            Book newBook = Activator.CreateInstance<Book>(); ;
            newBook.Title = details.title;
            newBook.Author = details.author;
            newBook.Summary = details.desc;
            newBook.Publisher = details.publisher;
            newBook.ISBN_10 = details.ISBN10;
            newBook.ISBN_13 = details.ISBN13;
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

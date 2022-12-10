using Microsoft.AspNetCore.Mvc;
using myrate_backend.Data;
using myrate_backend.Models;

namespace myrate_backend.Controllers
{
    public class MediaController : Controller
    {
        private MyRateDbContext _context;
        public MediaController(MyRateDbContext context)
        {
            _context = context;
        }

        [Route("/Media/SaveBook")]
        [HttpPost, ActionName("SaveBook")]
        public string SaveBook([FromBody] string title, string author, string desc, string publisher, string ISBN10, string ISBN13)
        {
            // first check if the book is already in db
            foreach (Book b in _context.Books)
            {
                if(b.Title == title && b.Author == author)
                {
                    return "Already in DB";
                }
            }
            // otherwise add book to db
            Book newBook = new Book();
            newBook.Title = title;
            newBook.Author = author;
            newBook.Summary = desc;
            newBook.Publisher = publisher;
            newBook.ISBN_10 = ISBN10;
            newBook.ISBN_13 = ISBN13;
            return "Added book " + title + " by " + author + " to db.";
        }

        // add saves for other media

        public IActionResult Index()
        {
            return View();
        }
    }
}

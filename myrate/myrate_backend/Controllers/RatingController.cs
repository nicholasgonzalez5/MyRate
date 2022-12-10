using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using myrate_backend.Data;
using myrate_backend.Models;

namespace myrate_backend.Controllers
{
    public class RatingController : Controller
    {
        private MyRateDbContext _context;
        public RatingController(MyRateDbContext context)
        {
            _context = context;
        }

        /*
         * Returns an array of ratings for the provided media
         * 
         * */
        public Rating[] GetRatings(Media media)
        {
            List<Rating> ratings = new List<Rating>();
            if (media is Book)
            {
                foreach (Book book in _context.Books)
                {
                    if (book.Id == ((Book)media).Id)
                    {
                        foreach ( Rating rating in book.Ratings)
                        {
                            ratings.Add(rating);
                        }
                    }
                }
            }
            else if (media is Movie)
            {
                // todo later
            }
            else if (media is TVShow)
            {
                // todo later
            }
            else if (media is Music)
            {
                // todo later
            }
            return ratings.ToArray();
        }       
    }
}

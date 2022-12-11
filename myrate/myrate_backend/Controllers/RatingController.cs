using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using myrate_backend.Data;
using myrate_backend.Models;
using System.Text.Json.Serialization;

namespace myrate_backend.Controllers
{

    public class ReviewDetails
    {
        [JsonPropertyName("stars")]
        public int stars { get; set; }

        [JsonPropertyName("review")]
        public string review { get; set; }
    }

    [EnableCors("AllowAllOrigins")]
    [Route("api/[controller]/[action]/")]
    public class RatingController : Controller
    {
        private MyRateDbContext _context;
        public RatingController(MyRateDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> SaveReview([FromBody] ReviewDetails details)
        {
            //TODO: check for existing reviews of this user and update
            //var existingReview = _context.Ratings.SingleOrDefault

            // otherwise add review to db
            Rating newRating = Activator.CreateInstance<Rating>(); ;
            newRating.Stars = details.stars;
            newRating.Review = details.review;

            var user = _context.Users.First();
            newRating.User = user;
            _context.Add(newRating);
            await _context.SaveChangesAsync();

            return Ok(new { success = true });
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

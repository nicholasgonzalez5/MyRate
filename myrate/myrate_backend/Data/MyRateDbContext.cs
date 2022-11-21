using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using myrate_backend.Areas.Data;
using myrate_backend.Models;

namespace myrate_backend.Data
{
    public class MyRateDbContext : DbContext
    {
        public IHttpContextAccessor _httpContextAccessor;
        public MyRateDbContext(DbContextOptions<MyRateDbContext> options, IHttpContextAccessor http)
            : base(options)
        {
            _httpContextAccessor = http;
        }

        public DbSet<MyRateUser> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<TVShow> TvShows { get; set; }
        public DbSet<Music> Musics { get; set; }

        public async Task SeedData()
        {
            // Check if already done
            if (Users.Any())
            {
                return;
            }
            // migrate
            Database.Migrate();
            
            // Build Users
            var u1 = CreateUser();
            var u2 = CreateUser();
            var u3 = CreateUser();
            var u4 = CreateUser();
            var u5 = CreateUser();

            u1.Email = "admin@utah.edu";
            u2.Email = "professor@utah.edu";
            u3.Email = "u0000000@utah.edu";
            u4.Email = "u0000001@utah.edu";
            u5.Email = "u0000002@utah.edu";

            u1.UserName = u1.Email;
            u2.UserName = u2.Email;
            u3.UserName = u3.Email;
            u4.UserName = u4.Email;
            u5.UserName = u5.Email;
            
            u1.EmailConfirmed = true;
            u2.EmailConfirmed = true;
            u3.EmailConfirmed = true;
            u4.EmailConfirmed = true;
            u5.EmailConfirmed = true;

            u1.Name = "Monkey D. Luffy";
            u2.Name = "Jim";
            u3.Name = "Shavly Lumirk";
            u4.Name = "Nicholas";
            u5.Name = "Alyse";

            await Users.AddAsync(u1);
            await Users.AddAsync(u2);
            await Users.AddAsync(u3);
            await Users.AddAsync(u4);
            await Users.AddAsync(u5);

            // Build Movies
            var u1 = CreateUser();
            var u2 = CreateUser();
            var u3 = CreateUser();
            var u4 = CreateUser();
            var u5 = CreateUser();

            u1.Email = "admin@utah.edu";
            u2.Email = "professor@utah.edu";
            u3.Email = "u0000000@utah.edu";
            u4.Email = "u0000001@utah.edu";
            u5.Email = "u0000002@utah.edu";

            u1.UserName = u1.Email;
            u2.UserName = u2.Email;
            u3.UserName = u3.Email;
            u4.UserName = u4.Email;
            u5.UserName = u5.Email;

            u1.EmailConfirmed = true;
            u2.EmailConfirmed = true;
            u3.EmailConfirmed = true;
            u4.EmailConfirmed = true;
            u5.EmailConfirmed = true;

            u1.Name = "Monkey D. Luffy";
            u2.Name = "Jim";
            u3.Name = "Shavly Lumirk";
            u4.Name = "Nicholas";
            u5.Name = "Alyse";

            await Users.AddAsync(u1);
            await Users.AddAsync(u2);
            await Users.AddAsync(u3);
            await Users.AddAsync(u4);
            await Users.AddAsync(u5);

            // Build TvShows
            var u1 = CreateUser();
            var u2 = CreateUser();
            var u3 = CreateUser();
            var u4 = CreateUser();
            var u5 = CreateUser();

            u1.Email = "admin@utah.edu";
            u2.Email = "professor@utah.edu";
            u3.Email = "u0000000@utah.edu";
            u4.Email = "u0000001@utah.edu";
            u5.Email = "u0000002@utah.edu";

            u1.UserName = u1.Email;
            u2.UserName = u2.Email;
            u3.UserName = u3.Email;
            u4.UserName = u4.Email;
            u5.UserName = u5.Email;

            u1.EmailConfirmed = true;
            u2.EmailConfirmed = true;
            u3.EmailConfirmed = true;
            u4.EmailConfirmed = true;
            u5.EmailConfirmed = true;

            u1.Name = "Monkey D. Luffy";
            u2.Name = "Jim";
            u3.Name = "Shavly Lumirk";
            u4.Name = "Nicholas";
            u5.Name = "Alyse";

            await Users.AddAsync(u1);
            await Users.AddAsync(u2);
            await Users.AddAsync(u3);
            await Users.AddAsync(u4);
            await Users.AddAsync(u5);

            // Build Music
            var u1 = CreateUser();
            var u2 = CreateUser();
            var u3 = CreateUser();
            var u4 = CreateUser();
            var u5 = CreateUser();

            u1.Email = "admin@utah.edu";
            u2.Email = "professor@utah.edu";
            u3.Email = "u0000000@utah.edu";
            u4.Email = "u0000001@utah.edu";
            u5.Email = "u0000002@utah.edu";

            u1.UserName = u1.Email;
            u2.UserName = u2.Email;
            u3.UserName = u3.Email;
            u4.UserName = u4.Email;
            u5.UserName = u5.Email;

            u1.EmailConfirmed = true;
            u2.EmailConfirmed = true;
            u3.EmailConfirmed = true;
            u4.EmailConfirmed = true;
            u5.EmailConfirmed = true;

            u1.Name = "Monkey D. Luffy";
            u2.Name = "Jim";
            u3.Name = "Shavly Lumirk";
            u4.Name = "Nicholas";
            u5.Name = "Alyse";

            await Users.AddAsync(u1);
            await Users.AddAsync(u2);
            await Users.AddAsync(u3);
            await Users.AddAsync(u4);
            await Users.AddAsync(u5);

            // Build Books
            var u1 = CreateUser();
            var u2 = CreateUser();
            var u3 = CreateUser();
            var u4 = CreateUser();
            var u5 = CreateUser();

            u1.Email = "admin@utah.edu";
            u2.Email = "professor@utah.edu";
            u3.Email = "u0000000@utah.edu";
            u4.Email = "u0000001@utah.edu";
            u5.Email = "u0000002@utah.edu";

            u1.UserName = u1.Email;
            u2.UserName = u2.Email;
            u3.UserName = u3.Email;
            u4.UserName = u4.Email;
            u5.UserName = u5.Email;

            u1.EmailConfirmed = true;
            u2.EmailConfirmed = true;
            u3.EmailConfirmed = true;
            u4.EmailConfirmed = true;
            u5.EmailConfirmed = true;

            u1.Name = "Monkey D. Luffy";
            u2.Name = "Jim";
            u3.Name = "Shavly Lumirk";
            u4.Name = "Nicholas";
            u5.Name = "Alyse";

            await Users.AddAsync(u1);
            await Users.AddAsync(u2);
            await Users.AddAsync(u3);
            await Users.AddAsync(u4);
            await Users.AddAsync(u5);

            await SaveChangesAsync();
        }

        public MyRateUser CreateUser()
        {
            try
            {
                return Activator.CreateInstance<MyRateUser>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(MyRateUser)}'. " +
                    $"Ensure that '{nameof(MyRateUser)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }

        // Movies
        public Movie CreateMovie()
        {
            try
            {
                return Activator.CreateInstance<Movie>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(Movie)}'. " +
                    $"Ensure that '{nameof(Movie)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }

        //TV Shows
        public TVShow CreateTvShow()
        {
            try
            {
                return Activator.CreateInstance<TVShow>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(TVShow)}'. " +
                    $"Ensure that '{nameof(TVShow)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }

        //Books
        public Book CreateBook()
        {
            try
            {
                return Activator.CreateInstance<Book>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(Book)}'. " +
                    $"Ensure that '{nameof(Book)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }

        //Music
        public Music CreateMusic()
        {
            try
            {
                return Activator.CreateInstance<Music>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(Music)}'. " +
                    $"Ensure that '{nameof(Music)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }
    }
}

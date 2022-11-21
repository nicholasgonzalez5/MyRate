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
    }
}

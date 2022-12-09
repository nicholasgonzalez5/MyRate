using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace myrate_backend.Migrations
{
    public partial class NewDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MediaCollectionId",
                table: "TvShows",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MediaCollectionId",
                table: "Musics",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MediaCollectionId",
                table: "Movies",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ISBN_10",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ISBN_13",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MediaCollectionId",
                table: "Books",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Publisher",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MediaCollection",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MyRateUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaCollection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MediaCollection_Users_MyRateUserId",
                        column: x => x.MyRateUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Rating",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Stars = table.Column<float>(type: "real", nullable: true),
                    Review = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BookId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rating_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Rating_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TvShows_MediaCollectionId",
                table: "TvShows",
                column: "MediaCollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Musics_MediaCollectionId",
                table: "Musics",
                column: "MediaCollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Movies_MediaCollectionId",
                table: "Movies",
                column: "MediaCollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Books_MediaCollectionId",
                table: "Books",
                column: "MediaCollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_MediaCollection_MyRateUserId",
                table: "MediaCollection",
                column: "MyRateUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Rating_BookId",
                table: "Rating",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_Rating_UserId",
                table: "Rating",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_MediaCollection_MediaCollectionId",
                table: "Books",
                column: "MediaCollectionId",
                principalTable: "MediaCollection",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_MediaCollection_MediaCollectionId",
                table: "Movies",
                column: "MediaCollectionId",
                principalTable: "MediaCollection",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Musics_MediaCollection_MediaCollectionId",
                table: "Musics",
                column: "MediaCollectionId",
                principalTable: "MediaCollection",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TvShows_MediaCollection_MediaCollectionId",
                table: "TvShows",
                column: "MediaCollectionId",
                principalTable: "MediaCollection",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_MediaCollection_MediaCollectionId",
                table: "Books");

            migrationBuilder.DropForeignKey(
                name: "FK_Movies_MediaCollection_MediaCollectionId",
                table: "Movies");

            migrationBuilder.DropForeignKey(
                name: "FK_Musics_MediaCollection_MediaCollectionId",
                table: "Musics");

            migrationBuilder.DropForeignKey(
                name: "FK_TvShows_MediaCollection_MediaCollectionId",
                table: "TvShows");

            migrationBuilder.DropTable(
                name: "MediaCollection");

            migrationBuilder.DropTable(
                name: "Rating");

            migrationBuilder.DropIndex(
                name: "IX_TvShows_MediaCollectionId",
                table: "TvShows");

            migrationBuilder.DropIndex(
                name: "IX_Musics_MediaCollectionId",
                table: "Musics");

            migrationBuilder.DropIndex(
                name: "IX_Movies_MediaCollectionId",
                table: "Movies");

            migrationBuilder.DropIndex(
                name: "IX_Books_MediaCollectionId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "MediaCollectionId",
                table: "TvShows");

            migrationBuilder.DropColumn(
                name: "MediaCollectionId",
                table: "Musics");

            migrationBuilder.DropColumn(
                name: "MediaCollectionId",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "ISBN_10",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "ISBN_13",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "MediaCollectionId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Publisher",
                table: "Books");
        }
    }
}

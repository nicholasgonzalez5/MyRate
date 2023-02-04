const { MongoClient } = require("mongodb");
const faker = require("faker");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("media");
        console.log("Successfully connected to MongoDB.");

        // seed ratings for media
        var savedBooks = _db.collection("books").find().forEach(i => SeedReviews(i, "books"));
        var savedMovies = _db.collection("movies").find().forEach(i => SeedReviews(i, "movies"));
        var savedTVShows = _db.collection("tvshows").find().forEach(i => SeedReviews(i, "tvshows"));
        console.log("Seeded ratings");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};

function SeedReviews(media, type) {
  const ratingscollection = client.db("media").collection("ratings");
  let ratingData = [];
  if (ratingscollection.findOne({ "media_id": media._id }).media == type) {
    console.log("returned");
    return;
  }
  for (let i = 0; i < 5; i++) {
    let newRating = {
      stars: faker.datatype.number({
        'min': 1,
        'max': 5
      }),
      review: faker.lorem.paragraph(),
      media_type: type,
      media_id: media._id
    };

    ratingData.push(newRating);
  }
  ratingscollection.insertMany(ratingData);

}
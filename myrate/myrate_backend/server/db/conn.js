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
      
      const collection = client.db("media").collection("users");
      
      if(collection.countDocuments() == 0)
      {

        // The drop() command destroys all data from a collection.
          // Make sure you run it against proper database and collection.
          try {
            collection.drop();
  
          }
          catch (err)
          {
  
          }
  
          // make a bunch of time series data
          let userData = [];
  
          for (let i = 0; i < 5000; i++) {
              const firstName = faker.name.firstName();
              const lastName = faker.name.lastName();
              let newUser = {
                  firstName,
                  lastName,
                  day_joined: faker.date.past(),
                  email: faker.internet.email(firstName, lastName),
                  username: faker.name.firstName() + faker.random.word() + faker.random.alphaNumeric(),
                  password: faker.internet.password(),
              };
  
              userData.push(newUser);
          }
          collection.insertMany(userData);
  
          console.log("User are already in database seeded");
      }
      else
      {
        console.log("Users already in database. Did not seed.")
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
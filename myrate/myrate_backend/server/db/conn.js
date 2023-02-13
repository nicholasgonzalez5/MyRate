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
      if (db)
      {
        _db = db.db("media");
        console.log("Successfully connected to MongoDB."); 
      }
      
      const collection = client.db("media").collection("users");
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

        console.log("User Database seeded");


      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};
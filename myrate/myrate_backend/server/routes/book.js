const express = require("express");
 
// bookRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /book.
const bookRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the books.
bookRoutes.route("/book").get(function (req, res) {
 let db_connect = dbo.getDb("media");
 db_connect
   .collection("books")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single book by id
bookRoutes.route("/book/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("books")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you get a single book by id
bookRoutes.route("/book/findbook/:bookTitle").get(async function (req, res) {
  let db_connect = dbo.getDb();
  let books = db_connect.collection("books");
  const query = {bookTitle: 'THE INHERITANCE GAMES'};
  const book = await books.findOne();
  console.log(book);
  res = book;
  /*
  let myquery = { bookTitle: req.params.bookTitle };
  constdb_connect
    .collection("books")
    .find({bookTitle: req.params.bookTitle})
    .toArray(function (err, result) {
      if (err) 
      {
        console.log(err);
        throw err;
      }
      console.log(JSON.stringify(result));
      res.json(result);
    });
    */
 });

 
// This section will help you create a new book.
bookRoutes.route("/book/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   image: req.body.image,
   bookTitle: req.body.bookTitle,
   bookAuthor: req.body.bookAuthor,
   publisher: req.body.publisher,
   isbn_10: req.body.isbn_10,
   isbn_13: req.body.isbn_13,
   description: req.body.description,
   purchaseLinks: req.body.purchaseLinks,
 };
 db_connect.collection("books").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a book by id.
bookRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    image: req.body.image,
    bookTitle: req.body.bookTitle,
    bookAuthor: req.body.bookAuthor,
    publisher: req.body.publisher,
    isbn_10: req.body.isbn_10,
    isbn_13: req.body.isbn_13,
    description: req.body.description,
    purchaseLinks: req.body.purchaseLinks,
   },
 };
 db_connect
   .collection("books")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a book
bookRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("books").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = bookRoutes;
const express = require("express");
 
// movieRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /movie.
const movieRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the movies.
movieRoutes.route("/movie").get(function (req, res) {
 let db_connect = dbo.getDb("media");
 db_connect
   .collection("movies")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single movie by id
movieRoutes.route("/movie/getmoviebyid:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { id: ObjectId(req.params.id) };
 db_connect
   .collection("movies")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you get a single movie by title and release date
movieRoutes.route("/movie/findmovie").get(function (req, res) {
  let db_connect = dbo.getDb();
  let _title = req.query.title;
  let release = req.query.release_date;
  const query = {title: _title, release_date: release};
  const book = db_connect.collection("movies").findOne(query, function (err, result) {
    if (err) {
      console.log("error in get movie by title and release date: " + err);
      throw err;
    }
    res.json(result);
  });
 });
 
// This section will help you create a new movie.
movieRoutes.route("/movie/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   title: req.body.title,
   overview: req.body.overview,
   poster_path: req.body.poster_path,
   release_date: req.body.release_date,
   api_id: req.body.api_id,
 };
 db_connect.collection("movies").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a movie by id.
movieRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    release_date: req.body.release_date,
    api_id: req.body.api_id,
   },
 };
 db_connect
   .collection("movies")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a movie
movieRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { id: ObjectId(req.params.id) };
 db_connect.collection("movies").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = movieRoutes;
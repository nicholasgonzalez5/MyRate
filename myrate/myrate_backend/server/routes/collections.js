const express = require("express");

const collectionRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// Get a list of all collections
collectionRoutes.route("/collection").get(function(req, res) {
    let db_connect = dbo.getDb("media");
    db_connect
        .collection("collections")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// Create new collection

// Update collection

// Delete collection
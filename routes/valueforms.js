const express = require("express");
const router = express.Router();
const { initDB } = require("../models/mongoInit");
require("dotenv").config();
const ValuesController = require("../controllers/ValuesController");

// const PetsController = require("../controllers/PetsController");
// const { AuthMiddleware } = require("../middlewares/AuthMiddleware");

initDB();

// router.route("/submit").post((req, res) => {
//   console.log(req.body);
//   return res.status(200).json("hello fit");
// });

router.route("/submit").post(ValuesController.addNewValues);
router.route("/myvalues").get(ValuesController.getAllUserValues);

// router.route("/mine").get(AuthMiddleware, PetsController.MyPets);

module.exports = router;

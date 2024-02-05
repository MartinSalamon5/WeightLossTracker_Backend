const express = require("express");
const router = express.Router();
require("dotenv").config();
const PetsController = require("../controllers/PetsController");
const UsersController = require("../controllers/UsersController");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");

router.route("/allusers").get(AuthMiddleware, UsersController.allUsers);

// router.route("/addnewpet").post(AuthMiddleware, PetsController.addNewPet);

// router.route("setadmin").post(AuthMiddleware, UsersController.addAdmin);

module.exports = router;

const {
  SignupValidation,
  LoginValidation,
  EditUserValidation,
} = require("../validations/usersVal");
const UsersDAO = require("../models/UsersDAO");
const sha256 = require("js-sha256");
const jwt = require("jsonwebtoken");

module.exports = class UsersController {
  static async Login(req, res) {
    try {
      const validRequest = LoginValidation(req.body);

      if (!validRequest) {
        return res.status(400).json({
          success: false,
          message:
            "Please make sure the email you entered has the right format.",
        });
      }

      const user = await UsersDAO.getUserByEmail(req.body.email);
      if (!user || user.password != sha256(req.body.password)) {
        return res.status(400).json({
          success: false,
          message: "Wrong username or password.",
        });
      }

      const userID = user._id;
      const userEmail = user.email;

      const token = jwt.sign(
        {
          userID: userID,
          email: userEmail,
        },
        process.env.JWT_SECRET
      );

      return res.json({
        success: true,
        token: token,
        userData: user,
      });
    } catch (e) {
      console.log(`Error in UsersController.Login ${e}`);
      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async Signup(req, res) {
    try {
      const validRequest = SignupValidation(req.body);

      if (!validRequest) {
        return res.status(400).json({
          success: false,
          message: "Signup was unsuccessful.",
        });
      }

      const userObject = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        admin: false,
        lovedPetsIDs: [],
      };

      const existingUser = await UsersDAO.getUserByEmail(userObject.email);

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message:
            "The email you entered is already in use. Please use another email address or log in instead.",
        });
      }

      userObject.password = sha256(userObject.password);

      await UsersDAO.createUser(userObject);
      const user = await UsersDAO.getUserByEmail(userObject.email);

      const token = jwt.sign(
        {
          userID: user._id,
          email: user.email,
          admin: user.admin,
        },
        process.env.JWT_SECRET
      );

      return res.json({
        success: true,
        user: user,
        token: token,
        message: "User signed up and logged in.",
      });
    } catch (e) {
      console.log(`Error in UsersController.Signup ${e}`);
      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async findUser(req, res) {
    try {
      return res.json(req.query.currentUser[0]);
    } catch (e) {
      console.log(`Error in UsersController.UpdateUser ${e}`);
      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async UpdateUser(req, res) {
    try {
      const validRequest = EditUserValidation(req.body);

      if (!validRequest) {
        return res.status(400).json({
          success: false,
          message: "Request not valid",
        });
      }

      const updatedUser = await UsersDAO.updateUser(
        req.body.userID,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phone
      );

      if (updatedUser) {
        return res.status(400).json({
          success: false,
          message: "User was updated",
        });
      }

      return res.json({
        success: true,
        message: "User details changed successfully.",
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Could not save user details at this time. Try again later",
      });
    }
  }

  static async allUsers(req, res) {
    try {
      const adminStatus = req.query.currentUser[0].admin;
      if (adminStatus === true) {
        const allUsers = await UsersDAO.getAllUsers();
        return res.json({
          success: true,
          allUsers: allUsers,
        });
      } else {
        return res.json({
          success: false,
          message: "You have no permissions to access this information.",
        });
      }
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Could not save user details at this time. Try again later",
      });
    }
  }
};

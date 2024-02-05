const { ValuesValidator } = require("../validations/valuesValidator");
const FitValuesFormsDAO = require("../models/FitValuesFormsDAO");
// const UsersDAO = require("../models/UsersDAO");
// const AdoptRequestsDAO = require("../models/AdoptRequestsDAO");

module.exports = class ValuesController {
  static async addNewValues(req, res) {
    try {
      console.log(req.body);
      const validRequest = ValuesValidator(req.body);

      if (!validRequest) {
        return res.status(400).json({
          success: false,
          message: "Please fill in all the necessary field correctly!",
        });
      }

      await FitValuesFormsDAO.addNewValues(req.body);

      return res
        .status(200)
        .json({ success: true, message: "Values saved successfully!" });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "An error occured. Your values were not saved.",
      });
    }
  }

  static async getAllUserValues(req, res) {
    try {
      const searchTerms = req.query;
      const searchResults = [];

      const petResults = await PetsDAO.getAllPets();

      petResults.map((item) => {
        let petStatus = item.petStatus.toLowerCase();
        let petName = item.petName.toLowerCase();
        let petType = item.animalType.toLowerCase();
        let petWeight = item.weight;

        if (
          petType.includes(searchTerms.type.toLowerCase()) &&
          petStatus.includes(searchTerms.status.toLowerCase()) &&
          petName.includes(searchTerms.name.toLowerCase()) &&
          (petWeight <= searchTerms.weight || searchTerms.weight == "")
        ) {
          searchResults.push(item);
        }
      });

      if (searchResults.length < 1) {
        return res.status(200).json({ message: "No results were found..." });
      }

      const userData = await UsersDAO.getUser(req.query.currentUser[0]._id);

      const userLovedPetsArray = userData[0].lovedPetsIDs;
      searchResults.map((result) => {
        const resultPetID = result._id.toString();
        if (userLovedPetsArray.includes(resultPetID)) {
          result.loved = true;
        } else {
          result.loved = false;
        }
      });
      res.status(200).json(searchResults);
    } catch (err) {
      console.log(err);
    }
  }

  // static async MyPets(req, res) {
  //   try {
  //     const validRequest = MyPetsValidation(req.query);

  //     if (!validRequest) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Request parameters are not correct!",
  //       });
  //     }

  //     const reqType = req.query.reqType.toString().toLowerCase();
  //     const userID = req.query.userID;

  //     if (reqType === "lovedpets") {
  //       const lovedPets = [];

  //       const userData = await UsersDAO.getUser(req.query.currentUser[0]._id);
  //       const petResults = await PetsDAO.getAllPets();

  //       const userLovedPetsArray = userData[0].lovedPetsIDs;

  //       petResults.map((pet) => {
  //         if (userLovedPetsArray.includes(pet._id.toString())) {
  //           pet.loved = true;
  //           lovedPets.push(pet);
  //         }
  //       });

  //       if (lovedPets.length < 1) {
  //         return res.status(200).json({ message: "No loved pets yet..." });
  //       }

  //       return res.status(200).json(lovedPets);
  //     }

  //     if (reqType === "mypets") {
  //       const myPets = [];

  //       const petResults = await PetsDAO.getAllPets();

  //       const userLovedPetsArray = req.query.currentUser[0].lovedPetsIDs;

  //       petResults.map((pet) => {
  //         let responsibleID = pet.responsibleUserID;

  //         if (responsibleID === req.query.currentUser[0]._id.toString()) {
  //           if (userLovedPetsArray.includes(pet._id.toString())) {
  //             pet.loved = true;
  //           } else {
  //             pet.loved = false;
  //           }
  //           myPets.push(pet);
  //         }
  //       });

  //       if (myPets.length < 1) {
  //         return res
  //           .status(200)
  //           .json({ message: "You're not taking care any pets right now..." });
  //       }

  //       return res.status(200).json(myPets);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // static async SavePet(req, res) {
  //   try {
  //     const adminStatus = req.query.currentUser[0].admin;

  //     if (adminStatus === false) {
  //       return res.json({
  //         success: false,
  //         message: "You have no permissions to access this information.",
  //       });
  //     }

  //     const validRequest = SavePetValidation(req.body);

  //     if (!validRequest) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Request parameters are not correct!",
  //       });
  //     }

  //     await UsersDAO.addLovedPet(req.body.userID, req.body.petID);

  //     return res.status(200).json({ success: true, message: "pet saved" });
  //   } catch (err) {
  //     return res
  //       .status(200)
  //       .json({ success: false, message: "Could not save pet" });
  //   }
  // }

  // static async removeSavedPet(req, res) {
  //   try {
  //     const validRequest = SavePetValidation(req.body);

  //     if (!validRequest) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Request parameters are not correct!",
  //       });
  //     }

  //     await UsersDAO.removeLovedPet(req.body.userID, req.body.petID);

  //     return res
  //       .status(200)
  //       .json({ success: true, message: "pet was unsaved" });
  //   } catch (err) {
  //     return res
  //       .status(200)
  //       .json({ success: false, message: "Could not unsave pet" });
  //   }
  // }

  // static async AdoptRequest(req, res) {
  //   try {
  //     const validRequest = AdoptPetValidation(req.body);

  //     if (!validRequest) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Request parameters are not correct!",
  //       });
  //     }

  //     const userID = req.query.currentUser[0]._id.toString();
  //     const petID = req.body.petID;
  //     const adoptionData = { userID, petID };

  //     await AdoptRequestsDAO.sendAdoptReq(adoptionData);

  //     return res.status(200).json({ success: true, message: "" });
  //   } catch (err) {
  //     return res
  //       .status(200)
  //       .json({ success: false, message: "Could not save pet" });
  //   }
  // }

  // static async allAdoptRequests(req, res) {
  //   try {
  //     const adminStatus = req.query.currentUser[0].admin;

  //     if (adminStatus === false) {
  //       return res.json({
  //         success: false,
  //         message: "You have no permissions to access this information.",
  //       });
  //     }

  //     const adoptRequests = await AdoptRequestsDAO.allAdoptReq();

  //     return res.status(200).json({ success: true, adoptRequests });
  //   } catch (err) {
  //     return res
  //       .status(200)
  //       .json({ success: false, message: "Could not find adoption requests" });
  //   }
  // }
};

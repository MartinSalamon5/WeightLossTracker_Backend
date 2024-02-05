// const { ObjectId } = require("mongodb");

let valuesCollection;

module.exports = class FitValuesFormsDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      valuesCollection = await connection.collection("FitValuesForms");
      if (valuesCollection) {
        console.log("Connection to Fitness collection established");
      }
    } catch (e) {
      console.log(`Could not establish connection to Fitness collection ${e}`);
    }
  }

  static async addNewValues(fitnessValues) {
    // petData.petStatus = "Available";
    // petData.responsibleUserID = "";
    fitnessValues.dateAdded = new Date();
    await valuesCollection.insertOne({ ...fitnessValues });
  }

  // static async getAllPets() {
  //   return await petsCollection.find({}).toArray();
  // }
};

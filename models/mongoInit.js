const { MongoClient } = require("mongodb");
const FitValuesFormsDAO = require("./FitValuesFormsDAO");
// const UsersDAO = require("./UsersDAO");
// const AdoptRequestsDAO = require("./AdoptRequestsDAO");

module.exports.initDB = async function initDB() {
  MongoClient.connect(process.env.MONGODB_ENV)
    .then(async (connection) => {
      const db = connection.db(process.env.DB);
      await FitValuesFormsDAO.injectDB(db);
      // await UsersDAO.injectDB(db);
      // await AdoptRequestsDAO.injectDB(db);
      console.log("Connection to DB established");
      return;
    })
    .catch((error) => {
      console.log(error);
      console.log(`DB connection failed ${error}`);
      process.exit(1);
    });
};

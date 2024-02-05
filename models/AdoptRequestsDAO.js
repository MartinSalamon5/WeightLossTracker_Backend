let AdoptRequestsCollection;

module.exports = class AdoptRequestsDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      AdoptRequestsCollection = await connection.collection("AdoptionRequests");
      if (AdoptRequestsCollection) {
        console.log("Connection to Adopt Requests collection established");
      }
    } catch (e) {
      console.log(`Could not establish connection to Pets collection ${e}`);
    }
  }

  static async sendAdoptReq(adoptionData) {
    adoptionData.created_at = new Date();
    adoptionData.requestStatus = "New Request";
    await AdoptRequestsCollection.insertOne({ ...adoptionData });
  }

  static async allAdoptReq() {
    return await AdoptRequestsCollection.find({}).toArray();
  }
};

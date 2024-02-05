const Ajv = require("ajv");
const ajv = new Ajv();

module.exports.ValuesValidator = ajv.compile({
  type: "object",
  properties: {
    weight: { type: "string" },
    bodyFatPerc: { type: "string" },
    bodyWaterPerc: { type: "string" },
    muscleMass: { type: "string" },
    physiqueRating: { type: "string" },
    boneMass: { type: "string" },
    metabolicAge: { type: "string" },
    visceralFat: { type: "string" },
  },
  required: ["weight"],
  additionalProperties: false,
});

// module.exports.AddNewPetValidation = ajv.compile({
//   type: "object",
//   properties: {
//     petName: { type: "string", minLength: 2 },
//     animalType: { type: "string", minLength: 2 },
//     breed: { type: "string", minLength: 2 },
//     petDescription: { type: "string", minLength: 5 },
//     age: { type: "integer" },
//     weight: { type: "integer", minimum: 1 },
//     petImg: { type: "string" },
//     hypoallergenic: { type: "boolean" },
//     dietaryRestrictions: { type: "boolean" },
//   },
//   required: [
//     "petName",
//     "animalType",
//     "breed",
//     "petDescription",
//     "age",
//     "weight",
//   ],
//   additionalProperties: false,
// });

// module.exports.MyPetsValidation = ajv.compile({
//   type: "object",
//   properties: {
//     reqType: { type: "string" },
//     currentUser: { type: "array" },
//   },
//   required: ["reqType", "currentUser"],
//   additionalProperties: false,
// });

// module.exports.SavePetValidation = ajv.compile({
//   type: "object",
//   properties: {
//     petID: { type: "string" },
//     userID: { type: "string" },
//   },
//   required: ["petID", "userID"],
//   additionalProperties: false,
// });

// module.exports.AdoptPetValidation = ajv.compile({
//   type: "object",
//   properties: {
//     petID: { type: "string" },
//   },
//   required: ["petID"],
//   additionalProperties: false,
// });

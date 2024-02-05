const crypto = require("crypto");

const generateJWTSecret = () => {
  const secret = crypto.randomBytes(32).toString("hex");
  return secret;
};

console.log(generateJWTSecret());

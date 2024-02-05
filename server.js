const express = require("express");
const server = express();
server.use(express.json());

const cors = require("cors");
server.use(cors());

// const accountsRoutes = require("./routes/accounts");
const valuesRoutes = require("./routes/valueforms");
// const adminRoutes = require("./routes/admin");

// server.use("/accounts", accountsRoutes);
server.use("/values", valuesRoutes);
// server.use("/admin", adminRoutes);

server.listen(4000);

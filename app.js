const express = require("express");
const auth = require("./routes/auth");
const cors = require("cors");
const user = require("./routes/user");
const app = express();

app.use(cors());
app.use("/api", auth);
app.use("/api", user);
module.exports = app;

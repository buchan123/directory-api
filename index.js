const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const uri = process.env.URI;
const host = "0.0.0.0";
const port = process.env.PORT || "3000";
const username = process.env.USER;
const password = process.env.PASS;

mongoose.connect(uri, {
  user: username,
  pass: password,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Connection established");
  })
  .on("connectionError", (err) => {
    console.log(err);
  });

app.listen(port, host, () => console.log(`App listening on port ${port}!`));

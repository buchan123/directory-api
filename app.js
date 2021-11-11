const express = require("express");
const auth = require("./routes/auth");
const cors = require("cors");
const user = require("./routes/user");
const app = express();

app.use(cors({origin:*}));
app.use("/api", auth);
app.use("/api", user);
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});
module.exports = app;

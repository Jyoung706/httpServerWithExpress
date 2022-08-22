const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

require("dotenv").config();
const router = require("./routers");
app.use(cors(), morgan("combined"), express.json(), router);

app.get("/ping", (req, res, next) => {
  res.json({ message: "pong" });
});

app.listen(4000, () => {
  console.log("server is listening on PORT 4000");
});

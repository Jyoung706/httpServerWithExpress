const dotenv = require("dotenv");
dotenv.config();
const { createApp } = require("./app");

const app = createApp();

app.get("/ping", (req, res, next) => {
  res.json({ message: "pong" });
});

app.listen(4000, () => {
  console.log("server is listening on PORT 4000");
});

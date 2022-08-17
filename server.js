const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");
const app = express();
app.use(cors(), morgan("combned"), express.json());
require("dotenv").config();

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

app.get("/ping", (req, res, next) => {
  res.json({ message: "pong" });
});

app.post("/signup", (req, res) => {
  const { email, nickname, password, profile_image } = req.body;

  myDataSource.query(
    `INSERT INTO users(
      email,
      nickname,
      password,
      profile_image
      ) VALUES (?,?,?,?);
      `,
    [email, nickname, password, profile_image]
  );
  res.json({ message: "user-created" });
  res.status(200).json();
});
// app.post("/post", (req,res) => {});
// app.get("/posts-list", (req,res) => {});
// app.patch("/modify-post", (req,res) => {});
// app.delete("/post-delete", (req,res) => {});
// app.get("/user_posting", (req,res) => {});

app.listen(4000, () => {
  console.log("server is listening on PORT 4000");
});

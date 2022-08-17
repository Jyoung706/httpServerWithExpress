const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");
const app = express();
app.use(cors(), morgan("combined"), express.json());
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
  res.status(200).json({ message: "userCreated" });
});
app.post("/post", (req, res) => {
  const { user_id, contents } = req.body;

  myDataSource.query(
    `INSERT INTO postings(
       user_id,
       contents
    ) VALUES (?, ?);
    `,
    [user_id, contents]
  );
  res.status(200).json({ message: "postCreated" });
});
app.get("/posts-list", (req, res) => {
  myDataSource
    .query(
      `select 
        users.id as userId, 
        users.profile_image as userProfileImage, 
        postings.id as postingId, 
        posting_images.image_url as postingImageUrl, 
        postings.contents as postingContent 
        FROM users 
        INNER JOIN postings ON postings.user_id = users.id 
        INNER JOIN posting_images ON posting_images.posting_id = postings.id;`
    )
    .then((value) => {
      res.status(200).json({ data: value });
    })
    .catch((err) => res.status(500).json({ message: "server error" }));
});
// app.patch("/modify-post", (req,res) => {});
// app.delete("/post-delete", (req,res) => {});
// app.get("/user_posting", (req,res) => {});

app.listen(4000, () => {
  console.log("server is listening on PORT 4000");
});

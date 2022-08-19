const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  const salt = bcrypt.genSaltSync(10);
  let { email, nickname, password, profile_image } = req.body;
  password = bcrypt.hashSync(password, salt);
  myDataSource
    .query(
      `INSERT INTO users(
       email,
       nickname,
       password,
       profile_image
      ) VALUES (?,?,?,?);
      `,
      [email, nickname, password, profile_image]
    )
    .then((value) => {
      res.status(200).json({ message: "userCreated" });
    })
    .catch((err) => {
      res.status(400).json({ message: "error" });
    });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  myDataSource
    .query(
      `SELECT
          users.email,
          users.password
          FROM users WHERE email = ?;`,
      email
    )
    .then((value) => {
      const userEmail = value[0]["email"];
      const userPW = value[0]["password"];
      const comparePW = bcrypt.compareSync(password, userPW);

      if (email == userEmail && comparePW == true) {
        res.status(200).json({ message: "logIn_complete" });
      } else {
        throw new Error();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json({ message: "Wrong Id or PW" });
    });
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

app.patch("/modify-post", (req, res) => {
  const { id, user_id, contents } = req.body;

  myDataSource
    .query(
      ` UPDATE postings SET contents = ? WHERE id = ? AND user_id = ?
  `,
      [contents, user_id, id]
    )
    .then(() => {
      myDataSource
        .query(
          `SELECT 
            users.id as userId, users.nickname as userName, 
            postings.id as postingId, postings.contents as postingContents 
            FROM users
            INNER JOIN postings ON postings.user_id = users.id AND postings.id = ? WHERE users.id = ?`,
          [id, user_id]
        )
        .then((value) => {
          res.status(200).json({ value });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: error });
    });
});

// app.delete("/post-delete", (req,res) => {});

app.listen(4000, () => {
  console.log("server is listening on PORT 4000");
});

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
app.use(cors(), morgan("combined"), express.json());
require("dotenv").config();

const userControl = require("./controllers/userControl");

app.get("/ping", (req, res, next) => {
  res.json({ message: "pong" });
});

app.post("/signup", userControl.createUser);

app.post("/signin", userControl.userSignin);

app.post("/post", async (req, res) => {
  const { user_id, contents } = req.body;

  await myDataSource.query(
    `INSERT INTO postings(
       user_id,
       contents
    ) VALUES (?, ?);
    `,
    [user_id, contents]
  );
  res.status(201).json({ message: "postCreated" });
});

app.get("/posts-list", async (req, res) => {
  const postingList = await myDataSource.query(
    `select 
        users.id as userId, 
        users.profile_image as userProfileImage, 
        postings.id as postingId, 
        posting_images.image_url as postingImageUrl, 
        postings.contents as postingContent 
        FROM users 
        INNER JOIN postings ON postings.user_id = users.id 
        INNER JOIN posting_images ON posting_images.posting_id = postings.id;`
  );

  res.status(200).json({ data: postingList });
});

app.get("/posts_list2", async (req, res) => {
  const { id } = req.body;
  const postingList = await myDataSource.query(
    `
      SELECT 
        user_id as userId,
        users.profile_image as userProfileImage, 
        JSON_ARRAYAGG( 
          JSON_OBJECT(
            'postingId',postings.id, 
            'postingImageUrl',posting_images.image_url, 
            'postingContent',postings.contents
          )
        ) as postings 
      FROM postings 
      JOIN users ON postings.user_id = users.id 
      JOIN posting_images ON posting_images.posting_id = postings.id 
      WHERE users.id = ? 
      GROUP BY users.id;
  `,
    [id]
  );
  console.log(postingList);
  res.status(200).json({ data: postingList });
});

app.patch("/modify-post", async (req, res) => {
  const { id, user_id, contents } = req.body;

  await myDataSource.query(
    ` UPDATE postings 
          SET contents = ? 
          WHERE id = ? 
  `,
    [contents, user_id, id]
  );
  const modifyData = await myDataSource.query(
    `SELECT 
            postings.user_id as userId, 
            users.nickname as userName, 
            postings.id as postingId, 
            postings.contents as postingContents 
            FROM postings
            JOIN users ON postings.user_id = users.id 
            WHERE postings.id = ? 
            `,
    [id]
  );
  res.status(200).json({ data: modifyData });
});

app.delete("/post-delete", async (req, res) => {
  const { id } = req.query;

  await myDataSource.query(`DELETE FROM postings WHERE postings.id =?`, [id]);
  res.status(204).json({ message: "deleted" });
});

app.listen(4000, () => {
  console.log("server is listening on PORT 4000");
});

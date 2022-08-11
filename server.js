const http = require("http");
const express = require("express");

const {
  createUser,
  postingDelete,
  createPost,
  viewingListofPosts,
  modifyPost,
  UserPosting,
} = require("./app");

const app = express();
app.use(express.json());

app.post("/signup", createUser);
app.post("/post", createPost);
app.get("/posts-list", viewingListofPosts);
app.patch("/modify-post", modifyPost);
app.delete("/post-delete", postingDelete);
app.get("/user_posting", UserPosting);

const server = http.createServer(app);

server.listen(4000, () => {
  console.log("server is listening on PORT 4000");
});

const http = require("http");
const express = require("express");
const { createUser } = require("./app");
const { createPost } = require("./app");
const { viewingListofPosts } = require("./app");

const app = express();
app.use(express.json());

app.post("/signup", createUser);
app.post("/post", createPost);
app.get("/posts-list", viewingListofPosts);
const server = http.createServer(app);

server.listen(4000, () => {
  console.log("server is listening on PORT 4000");
});

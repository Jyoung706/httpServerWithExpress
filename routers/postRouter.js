const express = require("express");
const postControl = require("../controllers/postControl");

const router = express.Router();

router.post("/post", postControl.posting);

router.get("/posts-list", postControl.postList);

router.get("/posts_list2", postControl.userPostList);

router.patch("/modify-post", postControl.postModify);

router.delete("/post-delete", postControl.deletePost);

module.exports = router;

const postService = require("../services/postService");

const posting = async (req, res) => {
  const { user_id, contents } = req.body;

  await postService.posting(user_id, contents);

  res.status(201).json({ message: "postCreated" });
};

const postList = async (req, res) => {
  const postingData = await postService.postList();
  res.status(200).json({ data: postingData });
};

const userPostList = async (req, res) => {
  const { id } = req.query;
  const userPostList = await postService.userPostList(id);
  res.status(200).json({ data: userPostList });
};

const postModify = async (req, res) => {
  const { id, contents } = req.body;
  const modifyData = await postService.modifyData(id, contents);
  res.status(200).json({ data: modifyData });
};

const deletePost = async (req, res) => {
  const { id } = req.query;
  await postService.deletePost(id);
  res.status(204).json({ message: "delete success" });
};
module.exports = { posting, postList, userPostList, postModify, deletePost };

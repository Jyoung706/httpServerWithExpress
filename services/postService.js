const postDao = require("../models/postDao");

const posting = async (user_id, contents) => {
  await postDao.posting(user_id, contents);
};

const postList = async () => {
  return postDao.postList();
};

const userPostList = async (id) => {
  return postDao.userPostList(id);
};

const modifyData = async (id, contents) => {
  await postDao.modifyData(id, contents);
  return postDao.getPostByUserId(id);
};

const deletePost = async (id) => {
  await postDao.deletePost(id);
};
module.exports = { posting, postList, userPostList, modifyData, deletePost };

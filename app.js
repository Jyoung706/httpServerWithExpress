const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

const createUser = (req, res) => {
  const user = req.body.inform;
  const lastUser = users[users.length - 1];
  if (lastUser) {
    users.push({
      id: lastUser.id + 1,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } else {
    users.push({
      id: 1,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
  res.json({ message: "user-created" });
};

const createPost = (req, res) => {
  const postData = req.body.inform;
  const lastPost = posts[posts.length - 1];
  if (lastPost) {
    posts.push({
      id: lastPost.id + 1,
      title: postData.title,
      content: postData.content,
      userId: postData.userId,
    });
  } else {
    posts.push({
      id: 1,
      title: postData.title,
      content: postData.content,
      userId: postData.userId,
    });
  }
  res.json({ message: "post-created" });
};
module.exports = { createUser, createPost };

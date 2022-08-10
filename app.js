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
  { id: 3, name: "Jun", email: "Jun23@gmail.com", password: "13334423" },
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
    userId: 3,
  },
  {
    id: 3,
    title: "특성",
    content: "1234567!!",
    userId: 1,
  },
  {
    id: 4,
    title: "게임",
    content: "게임은 좋아~~!!",
    userId: 2,
  },
];

const createUser = (req, res) => {
  const user = req.body.inform;

  users.push({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  });

  res.json({ message: "user-created" });
  res.status(200).json();
};

const createPost = (req, res) => {
  const postData = req.body.inform;
  posts.push({
    id: postData.id,
    title: postData.title,
    content: postData.content,
    userId: postData.userId,
  });

  res.json({ message: "post-created" });
  res.status(200).json();
};

const viewingListofPosts = (req, res) => {
  let newPosts = posts.map((post) => {
    const userN = users.find((user) => post.userId === user.id);
    console.log(userN);
    return {
      userID: post.userId,
      userName: userN.name,
      postingId: post.id,
      postingTitle: post.title,
      postingContent: post.content,
    };
  });

  res.json({ data: [newPosts] });
  res.status(200).json();
};

module.exports = { createUser, createPost, viewingListofPosts };

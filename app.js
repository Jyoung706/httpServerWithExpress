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
  res.status(200).json();
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
  res.status(200).json();
};

const viewingListofPosts = (req, res) => {
  let newPosts = posts.map((post) => {
    const userN = users.find((user) => post.userId === user.id);

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

const modifyPost = (req, res) => {
  const { postingId, postingContent } = req.body.data;

  const post = posts.find((post) => post.id === postingId);
  const userN = users.find((user) => post.userId === user.id);

  const modifiedPost = {
    userId: post.userId,
    userName: userN.name,
    postingId: postingId,
    postingTitle: post.title,
    postingContent: postingContent,
  };

  post.content = modifiedPost.postingContent;

  res.json({ data: modifiedPost });
};

const postingDelete = (req, res) => {
  const { id, userId } = req.body.data;

  if (posts[id - 1].userId === userId) {
    posts.splice(id - 1, 1);
    res.status(200).json({ message: "delete complete" });
  } else {
    res.status(403).json({ message: "delete failed" });
  }
};

module.exports = {
  createUser,
  createPost,
  viewingListofPosts,
  modifyPost,
  postingDelete,
};

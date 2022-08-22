const userService = require("../services/userService");

const createUser = async (req, res) => {
  let { email, nickname, password, profile_image } = req.body;

  if (!(email && nickname && password)) {
    return res.status(400).json({ message: "input ERROR" });
  }

  await userService.createUser(email, nickname, password, profile_image);

  res.status(201).json({ message: "userCreated" });
};

const userSignin = async (req, res) => {
  const { email, password } = req.body;

  const userData = await userService.userSignin(email, password);

  if (!(userData.user.email && userData.user.password)) {
    res.status(400).json({ message: "NO_USER" });
  } else if (!userData.comparePW) {
    res.status(400).json({ message: "Wrong PW" });
  }
  res.status(200).json({ message: "success", token: userData.token });
};

module.exports = { createUser, userSignin };

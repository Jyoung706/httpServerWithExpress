const userService = require("../services/userService");

const createUser = async (req, res) => {
  let { email, nickname, password, profile_image } = req.body;

  if (!(email && nickname && password)) {
    return res.status(400).json({ message: "input ERROR" });
  }

  await userService.createUser(email, nickname, password, profile_image);

  res.status(201).json({ message: "userCreated" });
};

module.exports = { createUser };

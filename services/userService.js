const userDao = require("../models/userDao");

const bcrypt = require("bcryptjs");

const createUser = async (email, nickname, password, profile_image) => {
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);
  const user = await userDao.createUser(
    email,
    nickname,
    password,
    profile_image
  );
  return user;
};

module.exports = { createUser };

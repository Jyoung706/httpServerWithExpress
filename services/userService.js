const userDao = require("../models/userDao");
const jwt = require("jsonwebtoken");
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

const userSignin = async (email, password) => {
  const [user] = await userDao.userSignin(email);
  //없는 유저 패스워드 에러남 수정요함!
  const comparePW = bcrypt.compareSync(password, user.password);
  const token = jwt.sign({ userId: user.id }, "secretKey");
  const userData = { user: user, comparePW: comparePW, token: token };
  return userData;
};
module.exports = { createUser, userSignin };

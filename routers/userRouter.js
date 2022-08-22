const express = require("express");
const userControl = require("../controllers/userControl");

const router = express.Router();

router.post("/signup", userControl.createUser);
router.post("/signin", userControl.userSignin);

module.exports = router;

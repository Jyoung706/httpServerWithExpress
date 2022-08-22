const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postingRouter = require("./postRouter");

router.use("/users", userRouter);
router.use("/posting", postingRouter);

module.exports = router;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routers");

const createApp = () => {
  const app = express();
  app.use(cors(), morgan("combined"), express.json(), router);

  return app;
};

module.exports = { createApp };

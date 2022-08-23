const request = require("supertest");
const { createApp } = require("../app");
const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

describe("User sign up test", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
  });

  afterAll(async () => {
    await myDataSource.query(
      `DELETE FROM users WHERE email = "test2@gmail.com"`
    );
    await myDataSource.destroy();
  });

  test("SUCCESS : created user", async () => {
    await request(app)
      .post("/users/signup")
      .send({
        email: "test2@gmail.com",
        nickname: "test22",
        password: "test2222",
      })
      .expect(201);
  });
});

describe("User sign in test", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
  });

  afterAll(async () => {
    await myDataSource.destroy();
  });

  test("SUCCESS : signIn user", async () => {
    await request(app)
      .post("/users/signin")
      .send({
        email: "signup_test@gmail.com",
        password: "signup1234",
      })
      .expect(200);
  });
});

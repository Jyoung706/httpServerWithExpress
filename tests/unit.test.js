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
      `DELETE FROM users WHERE email = "test1@gmail.com"`
    );
    await myDataSource.destroy();
  });

  test("SUCCESS : created user", async () => {
    await request(app)
      .post("/users/signup")
      .send({
        email: "test1@gmail.com",
        nickname: "test_User",
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
        email: "test_User@gmail.com",
        password: "test2222",
      })
      .expect(200);
  });
});

describe("post create test", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
  });

  afterAll(async () => {
    await myDataSource.query(
      `DELETE FROM postings WHERE contents = "this is test"`
    );
    await myDataSource.destroy();
  });

  test("SUCCESS : created postings", async () => {
    await request(app)
      .post("/posting/post")
      .send({ user_id: 1, contents: "this is test" })
      .expect(201);
  });
});

describe("viewing all posts test", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
  });

  afterAll(async () => {
    await myDataSource.destroy();
  });

  test("SUCCESS : get all posts", async () => {
    await request(app).get("/posting/posts-list").send().expect(200);
  });
});

describe("viewing some user's posts test", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
  });

  afterAll(async () => {
    await myDataSource.destroy();
  });

  test("SUCCESS : get some posts", async () => {
    await request(app).get("/posting/posts_list2").query({ id: 1 }).expect(200);
  });
});

describe("modify post test", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
  });

  afterAll(async () => {
    await myDataSource.destroy();
  });

  test("SUCCESS : modify post", async () => {
    await request(app)
      .patch("/posting/modify-post")
      .send({ id: 1, contents: "this is test2" })
      .expect(200);
  });
});

describe("delete post test", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
  });

  afterAll(async () => {
    await myDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await myDataSource.query(`TRUNCATE postings;`);
    await myDataSource.query(`INSERT INTO postings (user_id,contents)
                              VALUES (1,"test");`);
    await myDataSource.query(`INSERT INTO posting_images (posting_id,image_url)
                              VALUES (1,"http://test1.png"),(1,"http://test2.png");`);
    await myDataSource.query(`INSERT INTO comments (comment,posting_id,user_id)
                              VALUES ("test",1,1);`);
    await myDataSource.destroy();
  });

  test("SUCCESS : delete post", async () => {
    await request(app)
      .delete("/posting/post-delete")
      .query({ id: 1 })
      .expect(204);
  });
});

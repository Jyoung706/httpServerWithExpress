const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database initiate fail");
  });

const posting = async (user_id, contents) => {
  postData = await myDataSource.query(
    `INSERT INTO postings(
       user_id,
       contents
    ) VALUES (?, ?);
    `,
    [user_id, contents]
  );
};

const postList = async () => {
  return await myDataSource.query(
    `select 
        users.id as userId, 
        users.profile_image as userProfileImage, 
        postings.id as postingId, 
        posting_images.image_url as postingImageUrl, 
        postings.contents as postingContent 
        FROM postings
        INNER JOIN users ON postings.user_id = users.id 
        INNER JOIN posting_images ON posting_images.posting_id = postings.id;`
  );
};

const userPostList = async (id) => {
  const postingList = await myDataSource.query(
    `
      SELECT 
        user_id as userId,
        users.profile_image as userProfileImage, 
        JSON_ARRAYAGG( 
          JSON_OBJECT(
            'postingId',postings.id, 
            'postingImageUrl',posting_images.image_url, 
            'postingContent',postings.contents
          )
        ) as postings
      FROM postings 
      JOIN users ON postings.user_id = users.id 
      JOIN posting_images ON posting_images.posting_id = postings.id 
      WHERE users.id = ? 
      GROUP BY users.id;
  `,
    [id]
  );

  // console.log(postingList);
  return postingList;
};

const modifyData = async (id, contents) => {
  await myDataSource.query(
    ` UPDATE postings 
          SET contents = ? 
          WHERE id = ? 
  `,
    [contents, id]
  );
};

const getPostByUserId = async (id) => {
  const getPostByUserId = await myDataSource.query(
    `SELECT 
            postings.user_id as userId, 
            users.nickname as userName, 
            postings.id as postingId, 
            postings.contents as postingContents 
            FROM postings
            JOIN users ON postings.user_id = users.id 
            WHERE postings.id = ? 
            `,
    [id]
  );

  return getPostByUserId;
};

const deletePost = async (id) => {
  await myDataSource.query(
    `DELETE FROM postings 
     WHERE postings.id =?`,
    [id]
  );
};

module.exports = {
  posting,
  postList,
  userPostList,
  modifyData,
  getPostByUserId,
  deletePost,
};

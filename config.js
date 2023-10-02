require('dotenv').config('.env');
module.exports = {
  port: process.env.PORT,
  databaseUrl:  process.env.MONGODB_URL,
  emailHost:  process.env.EMAIL_SMTP_HOST,
  tokenkey : process.env.JWT_SECRET,

  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.AWS_BUCKET
};
require('dotenv').config('.env');
module.exports = {
  port: process.env.PORT,
  databaseUrl:  process.env.MONGODB_URL,
  emailHost:  process.env.EMAIL_SMTP_HOST,
  tokenkey : process.env.JWT_SECRET
};
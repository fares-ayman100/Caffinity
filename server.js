const dotenv = require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTIOIN💥');
  console.log(err);
  process.exit(1);
});

DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log('Connection Successful');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀Server running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTIONC💥');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

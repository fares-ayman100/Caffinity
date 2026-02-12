const dotenv = require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
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

//Unhandled Rejection
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection !💥Shutdown...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// SIGTERM Signals
process.on('SIGTERM',()=>{
  console.log('👋 SIGTERM RECIVES. Shutting down gracefully'),
  server.close(()=>{
    console.log('💥 Process terminated')
  })
})

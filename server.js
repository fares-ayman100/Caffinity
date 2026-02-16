const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

/* Unhandled Rejection */
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! 💥 Shutdown...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

/* SIGTERM */
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated');
  });
});

const express = require('express');
const helmet = require('helmet');
const { logger } = require('./middleware/logger.js');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '8080';

// create our server
const server = express();

server.use(helmet());
server.use(express.json());

// logging middleware
server.use(logger());

// endpoints
// projects

// actions

// verify that our server is running!
server.get('/', (req, res) => {
  res.json({
    message: 'webapi-challenge API is running!',
    host,
    port,
  });
});

server.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
});

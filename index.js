const express = require('express');
const helmet = require('helmet');
const { logger } = require('./middleware/logger.js');
const projectsRouter = require('./routers/projects.js');
const actionsRouter = require('./routers/actions.js');

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
server.use('/projects', projectsRouter);

// actions
server.use('/actions', actionsRouter);

// allow us to verify that our server is running!
server.get('/', (req, res) => {
  res.json({
    message: 'webapi-challenge API is running!',
    host,
    port,
  });
});

// catch-all for any undefined routes
server.use((req, res) => {
  res.status(404).json({ message: `Route ${req.path} not defined!` });
});

server.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
});

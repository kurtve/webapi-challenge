// logging middleware

const logger = () => (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] ${req.ip} ${req.method} ${req.url}`
  );

  const queries = Object.entries(req.query);
  if (queries.length > 0) console.log('  Query values:');
  for (const [key, value] of queries) {
    console.log(`    ${key}: ${value}`);
  }

  const bodyParts = Object.entries(req.body);
  if (bodyParts.length > 0) console.log('  Body values:');
  for (const [key, value] of bodyParts) {
    console.log(`    ${key}: ${value}`);
  }

  next();
};

module.exports = { logger };

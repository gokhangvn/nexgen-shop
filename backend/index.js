const express = require('express');
const cors = require('cors');
const redis = require('redis');

const app = express();
app.use(cors());
app.use(express.json());

// simple redis client setup (adjust for modern redis versions)
const client = redis.createClient();
client.on('error', (err) => console.error('Redis error', err));

app.get('/', (req, res) => {
  res.send('NexGen E-Ticaret backend is running');
});

// inventory route placeholder
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// handle port in use and other startup errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.\n` +
      'Either stop the process using that port or set the PORT environment variable to an unused port.');
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});

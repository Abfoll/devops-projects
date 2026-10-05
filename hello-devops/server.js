const express = require('express');
const { Pool } = require('pg');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Postgres connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'devops',
  password: process.env.DB_PASSWORD || 'devops_secret',
  database: process.env.DB_NAME || 'devopsdb',
});

app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 Hello from inside a Docker container!</h1>
    <p>Running on Node ${process.version}</p>
    <p>Hostname: ${os.hostname()}</p>
    <p>Container time: ${new Date().toISOString()}</p>
    <p><a href="/db-time">Check database connection →</a></p>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/db-time', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as now');
    res.json({
      status: 'connected',
      dbTime: result.rows[0].now,
      message: '🎉 Your app is talking to PostgreSQL!'
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

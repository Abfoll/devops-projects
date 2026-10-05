const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 Hello from inside a Docker container!</h1>
    <p>Running on Node ${process.version}</p>
    <p>Hostname: ${require('os').hostname()}</p>
    <p>Container time: ${new Date().toISOString()}</p>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

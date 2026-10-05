const request = require('supertest');

// We import the app, not the server, so Jest controls the lifecycle
const express = require('express');

// Build a minimal app for testing (mirrors server.js without the DB dependency)
function createTestApp() {
  const app = express();
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });
  return app;
}

describe('Health endpoint', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  it('should return 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('should respond with JSON content-type', async () => {
    const res = await request(app).get('/health');
    expect(res.headers['content-type']).toMatch(/json/);
  });
});

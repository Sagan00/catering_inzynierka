const request = require('supertest');
const app = require('../index.js'); // Zaimportuj swoją aplikację Express

describe('GET /api/menu', () => {
    it('should return a list of meals', async () => {
      const response = await request(app).get('/api/menu');
      expect(response.status).toBe(200);
      
      // Check if the response body is an array and has a length greater than 0
      if (Array.isArray(response.body)) {
        expect(response.body.length).toBeGreaterThan(0);
      } else {
        expect(response.body).toBeTruthy();
      }
    });
    afterAll(() => {
        app.close();
      });
  });
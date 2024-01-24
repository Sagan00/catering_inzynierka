const request = require('supertest');
const app = require('../index.js');

describe('DELETE /api/order/:orderId', () => {
  test('should delete an order and return 200 OK', async () => {

    // Perform the DELETE request
    const response = await request(app).delete(`/api/order/${37}`);

    // Check if the response status is 200 OK
    expect(response.status).toBe(200);

    // Check if the response body contains the expected message
    expect(response.body.message).toBe('Order deleted successfully');
  });

  test('should return 404 Not Found if order does not exist', async () => {
    // Perform the DELETE request for a non-existing order ID
    const response = await request(app).delete(`/api/order/${1}`);

    // Check if the response status is 404 Not Found
    expect(response.status).toBe(404);

    // Check if the response body contains the expected message
    expect(response.body.message).toBe('Order not found');
  });
});

// test.server.js

const request = require('supertest'); // Install supertest: npm install supertest
const app = require('./app');

// Add your test cases here
describe('API Tests', () => {
    it('should return a 200 status for GET /', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    // 
});

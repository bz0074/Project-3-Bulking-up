// test.app.js

const request = require('supertest'); // Install supertest: npm install supertest
const app = require('./app');

// Add your test cases here
describe('App Tests', () => {
    it('should return a 200 status for GET /', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Hello, welcome to the JWKS server!');
    });

    // Add more test cases specific to app.js as needed
});

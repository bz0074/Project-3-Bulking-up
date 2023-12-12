// test.server.js

// tests/test.server.js
const expect = require('chai').expect;

const request = require('supertest');
const app = require('../src/app'); // Adjust the path based on the project structure


// Add  test cases here
describe('API Tests', () => {
    it('should return a 200 status for GET /', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).to.equal(200);
        expect(response.body).toHaveProperty('message', 'Hello, welcome to the JWKS server!');
    });

    it('should handle POST /register with valid data', async () => {
        const response = await request(app)
            .post('/register')
            .send({ username: 'testuser', email: 'test@example.com' });

        expect(response.statusCode).to.equal(201);
        expect(response.body).toHaveProperty('password');
    });

    it('should handle POST /auth with valid data', async () => {
        // Mock authentication logic and database setup as needed
        const response = await request(app)
            .post('/auth')
            .send({ username: 'testuser', password: 'testpassword' });

        expect(response.statusCode).to.equal(200);
        expect(response.text).to.equal('Authentication successful');
    });

    //more test cases as needed
});


const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../src/app');  // Adjust the path based on your project structure

describe('API Tests', () => {
  it('should return a 200 status for GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(200);
  });

  it('should handle POST /register with valid data', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
      });

    expect(response.status).to.equal(201);
  });

  it('should handle POST /auth with valid data', async () => {
    // Assume that you have registered a user with the username 'testuser' before testing authentication
    // You may want to handle user registration in a separate test or manually in your application
    const registrationResponse = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
      });

    // Assuming registration was successful, proceed with authentication
    const authenticationResponse = await request(app)
      .post('/auth')
      .send({
        username: 'testuser',
        //
      });

    expect(authenticationResponse.status).to.equal(200);
    expect(authenticationResponse.text).to.equal('Authentication successful');
  });
});



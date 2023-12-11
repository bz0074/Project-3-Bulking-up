import json
import pytest
from src.app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_register_user(client):
    data = {'username': 'test_user', 'email': 'test@example.com'}
    response = client.post('/register', json=data)
    assert response.status_code in [200, 201]

def test_authenticate_user_successful(client):
    # Assuming you have registered a user first
    data = {'username': 'test_user', 'password': 'test_password'}
    response = client.post('/auth', json=data)
    assert response.status_code == 200
    assert 'Authentication successful' in response.get_json()['message']

def test_authenticate_user_failed(client):
    data = {'username': 'nonexistent_user', 'password': 'wrong_password'}
    response = client.post('/auth', json=data)
    assert response.status_code == 401
    assert 'Authentication failed' in response.get_json()['message']

def test_rate_limiting(client):
    # Assuming you have set the rate limiter to 1 request per second
    data = {'username': 'test_user', 'password': 'test_password'}
    response_1 = client.post('/auth', json=data)
    response_2 = client.post('/auth', json=data)
    assert response_1.status_code == 200
    assert response_2.status_code == 429

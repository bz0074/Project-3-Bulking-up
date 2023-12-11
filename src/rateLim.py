from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)

# Rate Limiter Configuration
limiter = Limiter(app, key_func=get_remote_address, storage_uri="memory://")

# Authentication Endpoint
@app.route('/auth', methods=['POST'])
@limiter.limit("10 per second")
def authenticate_user():
    #o
    # ...

    return jsonify({"message": "Authentication successful"}), 200

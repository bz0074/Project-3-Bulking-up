from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
import os

key = os.environ.get("NOT_MY_KEY").encode()

def encrypt(data):
    cipher = Cipher(algorithms.AES(key), modes.CFB, backend=default_backend())
    encryptor = cipher.encryptor()
    return encryptor.update(data.encode()) + encryptor.finalize()

def decrypt(data):
    cipher = Cipher(algorithms.AES(key), modes.CFB, backend=default_backend())
    decryptor = cipher.decryptor()
    return decryptor.update(data) + decryptor.finalize()

const crypto = require('crypto');

// Load the encryption key from the environment variable
const encryptionKey = process.env.NOT_MY_KEY;

// Function to encrypt private keys
function encryptPrivateKey(privateKey) {
    const cipher = crypto.createCipher('aes-256-ctr', encryptionKey);
    let encryptedKey = cipher.update(privateKey, 'utf-8', 'hex');
    encryptedKey += cipher.final('hex');
    return encryptedKey;
}

// Function to decrypt private keys
function decryptPrivateKey(encryptedKey) {
    const decipher = crypto.createDecipher('aes-256-ctr', encryptionKey);
    let decryptedKey = decipher.update(encryptedKey, 'hex', 'utf-8');
    decryptedKey += decipher.final('utf-8');
    return decryptedKey;
}

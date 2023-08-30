const express = require('express');
const app = express();
const request = require('requests');

function encryptUrl(key, imageUrl) {
    // Fetch the image from the URL
    (async () => {
        const response = await request.get(imageUrl);
        const image = response.content;

        // converting image into byte array to
        // perform encryption easily on numeric data
        const imageBytes = new Uint8Array(image);

        // performing XOR operation on each value of bytearray
        for (let i = 0; i < imageBytes.length; i++) {
            imageBytes[i] = imageBytes[i] ^ key;
        }

        console.log('Encryption Done...');
        return imageBytes;
    })();
}

function decryptUrl(key, imageUrl) {
    // Fetch the image from the URL
    (async () => {
        const response = await request.get(imageUrl);
        const image = response.content;

        // converting image into byte array to perform decryption easily on numeric data
        const imageBytes = new Uint8Array(image);

        // performing XOR operation on each value of bytearray
        for (let i = 0; i < imageBytes.length; i++) {
            imageBytes[i] = imageBytes[i] ^ key;
        }

        console.log('Decryption Done...');
        return imageBytes;
    })();
}

app.get('/decrypt_image', (req, res) => {
    try {
        const key = parseInt(req.query.key);
        const imageUrl = req.query.image_url;

        const decryptedImage = decryptUrl(key, imageUrl);

        res.contentType = 'image/webp';
        res.send(decryptedImage);
    } catch (error) {
        res.status(500).send(`An error occurred: ${error}`);
    }
});

app.get('/encrypt_image', (req, res) => {
    try {
        const key = parseInt(req.query.key);
        const imageUrl = req.query.image_url;

        const encryptedImage = encryptUrl(key, imageUrl);

        res.contentType = 'image/webp';
        res.send(encryptedImage);
    } catch (error) {
        res.status(500).send(`An error occurred: ${error}`);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
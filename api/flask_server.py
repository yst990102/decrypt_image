from flask import Flask, Response, request
import requests

app = Flask(__name__)

def encrypt_url(key, image_url):
    # Fetch the image from the URL
    response = requests.get(image_url)
    image = response.content
    
    # converting image into byte array to
    # perform encryption easily on numeric data
    image = bytearray(image)

    # performing XOR operation on each value of bytearray
    for index, values in enumerate(image):
        image[index] = values ^ key

    print('Encryption Done...')
    return bytes(image)

def decrypt_url(key, image_url):
    # Fetch the image from the URL
    response = requests.get(image_url)
    image = response.content

    # converting image into byte array to perform decryption easily on numeric data
    image = bytearray(image)

    # performing XOR operation on each value of bytearray
    for index, values in enumerate(image):
        image[index] = values ^ key

    print('Decryption Done...')
    return bytes(image)

@app.route('/decrypt_image', methods=['GET'])
def decrypt_image_route():
    try:
        key = int(request.args.get('key'))
        image_url = request.args.get('image_url')

        decrypted_image = decrypt_url(key, image_url)

        return Response(decrypted_image, content_type='image/webp')
    except Exception as e:
        return f"An error occurred: {e}"

@app.route('/encrypt_image', methods=['GET'])
def encrypt_image_route():
    try:
        key = int(request.args.get('key'))
        image_url = request.args.get('image_url')

        encrypted_image = encrypt_url(key, image_url)

        return Response(encrypted_image, content_type='image/webp')
    except Exception as e:
        return f"An error occurred: {e}"

if __name__ == '__main__':
    app.run()
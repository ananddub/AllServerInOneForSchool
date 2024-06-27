
from flask import Flask, request, jsonify
import cv2

app = Flask(__name__)

# Load the pre-trained Haar Cascade face detector model
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# API endpoint to detect faces in an uploaded image
@app.route('/detect_faces', methods=['POST'])
def detect_faces():
    try:
        # Get the image file from the request
        file = request.files['image']
        
        # Save the image to a temporary file
        image_path = '/tmp/uploaded_image.jpg'
        file.save(image_path)
        
        # Process the image to detect faces
        image = cv2.imread(image_path)
        if image is None:
            return jsonify({'error': 'Unable to load image.'}), 400
        
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert image to grayscale
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5, minSize=(30, 30))
        
        if len(faces) > 0:
            result = {'faces_detected': True, 'message': 'Faces detected.'}
        else:
            result = {'faces_detected': False, 'message': 'No faces detected.'}
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run("0.0.0.0",5000,debug=True)

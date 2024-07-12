
import os
from flask import Flask, request, jsonify
from FaceMatch import IsSame

app = Flask(__name__)


@app.route('/detect_faces', methods=['POST'])
def detect_faces():
    try:
        facematch= IsSame()
        file = request.files['image']
        empid = request.form.get('empid')
        empimgpath = f'..//uploads//emp//{empid}.jpg'

        if not os.path.isfile(empimgpath):
            result = {'faces_detected': False, 'message': 'photography not completed'}
            return jsonify(result) 
        
        image_path = os.path.join('/tmp',f'{facematch.randomName()}.jpg')
        file.save(image_path)

        try:
            result = facematch.check(empimgpath,image_path)
            return jsonify(result)
        except Exception as e:
            print("error in detect_face :",e)
            return jsonify({'faces_detected': False, 'message': 'No faces detected.'})
        finally:
            os.remove(image_path)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run("0.0.0.0",5000,debug=True) 

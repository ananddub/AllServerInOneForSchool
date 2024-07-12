import cv2
import face_recognition
from PIL import Image
import os
import random
import string
class IsSame():
    def convert8bit(self,image_path,tempname):
        img = Image.open(image_path)
        img =img.convert("L")
        img.save(tempname)
    
    def find_face_encodings(self,image_path,tempname):
        self.convert8bit(image_path,tempname)
        img = cv2.imread(tempname,0)
        gray_image = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) 
        face_enc = face_recognition.face_encodings(gray_image)
        return face_enc[0]

    def randomName(self):
        return ''.join(random.choices(string.ascii_uppercase +string.digits, k=20)).replace(" ","")

    def check(self,img1,img2):
        rimg1 =os.path.join('/tmp',f'{self.randomName()}.jpg') 
        rimg2 =os.path.join('/tmp',f'{self.randomName()}.jpg')
        try:
            image_1 = self.find_face_encodings(img1,rimg1)
            image_2  = self.find_face_encodings(img2,rimg2)
            is_same = face_recognition.compare_faces([image_1], image_2)[0]
            print(f"Is Same: {is_same}")
            if is_same:
                distance = face_recognition.face_distance([image_1], image_2)
                distance = round(distance[0] * 100)
                accuracy = 100 - round(distance)
                print(f"Accuracy Level: {accuracy}%")
                if(accuracy>=60):
                    print("The images are same")
                    return {'faces_detected': True, 'message': 'Face Matched'}
                else :

                    return {'faces_detected': False, 'message': 'Face Does Not Mached'}
            else:
                return {'faces_detected': False, 'message': 'Face Does Not Mached'}
        except Exception as e:
            print("error in face matching :",e)
            return {'faces_detected': True, 'message': 'Face Not detected.'}
        finally:
            os.remove(rimg1)
            os.remove(rimg2)


 


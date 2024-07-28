import os
from FaceMatch import IsSame
def detect_faces(empid):
    try:
        facematch= IsSame()
        empimgpath = f'..//uploads//emp//{empid}.jpg'

        image_path = os.path.join('/tmp',f'{empid}.jpg')

        try:
            result = facematch.check(empimgpath,image_path)
            print("result :",result)
        except Exception as e:
            print("error in detect_face :",e)
        finally:
            pass
    
    except Exception as e:
        print("error in detect_face:",e)

# detect_faces("ESIS222300029")
empid = "ESIS222300029"
empimgpath = f'..//uploads//emp//{empid}.jpg'
from PIL import Image

img = Image.open(empimgpath)
img = img.resize((300,300))
img.show()

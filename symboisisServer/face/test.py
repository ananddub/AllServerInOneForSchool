
from PIL import Image
def convert8bit(image_path,tempname):
    img = Image.open(image_path)
    img = img.convert("L")
    img.save(tempname)


# Load the image
# image_path = "t1.jpg"
# img = Image.open(image_path)
# img = img.convert("L")
# convert8bit("t1.jpg","t12.jpg")
# img.save("t11.jpg")
# Get image mode (e.g., RGB, L, etc.)
img = Image.open("t1.jpg")
mode = img.mode

# Get image info
info = img.info

# Get image size
size = img.size

print(f"Image Mode: {mode}")
print(f"Image Info: {info}")
print(f"Image Size: {size}")

# Check bit depth
if mode == "1":
    bit_depth = 1
elif mode == "L":
    bit_depth = 8
elif mode == "P":
    bit_depth = 8
elif mode == "RGB":
    bit_depth = 8 * 3
elif mode == "RGBA":
    bit_depth = 8 * 4
elif mode == "CMYK":
    bit_depth = 8 * 4
elif mode == "I":
    bit_depth = 32
elif mode == "F":
    bit_depth = 32
else:
    bit_depth = "Unknown"

print(f"Bit Depth: {bit_depth}")

from PIL import Image
import os

def remove_background(path):
    print(f"Processing {path}...")
    try:
        if not os.path.exists(path):
            print(f"File not found: {path}")
            return
            
        img = Image.open(path)
        img = img.convert("RGBA")
        datas = img.getdata()

        # Get background color from top-left pixel
        bg_color = datas[0]
        print(f"Background color detected: {bg_color}")
        
        newData = []
        tolerance = 20
        
        for item in datas:
            # Check if pixel matches background color within tolerance
            if (abs(item[0] - bg_color[0]) < tolerance and
                abs(item[1] - bg_color[1]) < tolerance and
                abs(item[2] - bg_color[2]) < tolerance):
                newData.append((255, 255, 255, 0)) # Transparent
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(path, "PNG")
        print(f"Saved processed {path}")

    except Exception as e:
        print(f"Error processing {path}: {e}")

remove_background('assets/img/char/player.png')
remove_background('assets/img/char/crush.png')

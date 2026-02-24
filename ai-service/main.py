import os
import cv2
import torch
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from gfpgan import GFPGANer
from realesrgan import RealESRGANer
from basicsr.archs.rrdbnet_arch import RRDBNet

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'input'
OUTPUT_FOLDER = 'output'
MODEL_PATH = 'models'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)
os.makedirs(MODEL_PATH, exist_ok=True)

# Initialize Models (Lazy initialization)
gfpganer = None
upsampler = None

def init_models():
    global gfpganer, upsampler
    print("Loading models...")
    
    # Real-ESRGAN setup
    model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=4)
    upsampler = RealESRGANer(
        scale=4,
        model_path=os.path.join(MODEL_PATH, 'RealESRGAN_x4plus.pth'),
        model=model,
        tile=0,
        tile_pad=10,
        pre_pad=0,
        half=True if torch.cuda.is_available() else False
    )
    
    # GFPGAN setup
    gfpganer = GFPGANer(
        model_path=os.path.join(MODEL_PATH, 'GFPGANv1.3.pth'),
        upscale=2,
        arch='clean',
        channel_multiplier=2,
        bg_upsampler=upsampler
    )
    print("Models loaded successfully.")

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "Odisha Cloud AI"})

@app.route('/enhance', methods=['POST'])
def enhance():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    file = request.files['image']
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_filename = f"enhanced_{file.filename}"
    output_path = os.path.join(OUTPUT_FOLDER, output_filename)
    
    file.save(input_path)
    
    # Run Inference
    try:
        img = cv2.imread(input_path)
        if img is None:
            return jsonify({"error": "Invalid image format"}), 400
            
        # If models aren't loaded, load them
        if gfpganer is None:
            # For stub/demo purposes, we might just copy the file if models aren't present
            if not os.path.exists(os.path.join(MODEL_PATH, 'GFPGANv1.3.pth')):
                print("Model files not found, running in MOCK mode.")
                cv2.imwrite(output_path, img) 
            else:
                init_models()
                _, _, restored_img = gfpganer.enhance(img, has_aligned=False, only_center_face=False, paste_back=True)
                cv2.imwrite(output_path, restored_img)
        else:
            _, _, restored_img = gfpganer.enhance(img, has_aligned=False, only_center_face=False, paste_back=True)
            cv2.imwrite(output_path, restored_img)
            
        return jsonify({
            "status": "success",
            "output_url": f"/output/{output_filename}"
        })
        
    except Exception as e:
        print(f"Error during enhancement: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/output/<filename>')
def get_output(filename):
    return send_from_directory(OUTPUT_FOLDER, filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)

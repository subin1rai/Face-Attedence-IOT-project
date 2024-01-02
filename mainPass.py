from flask import Flask, render_template,request, jsonify, send_file
from flask_wtf import FlaskForm
from  flask_cors import CORS
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
import os


app = Flask (__name__)
CORS(app)

@app.route('/uploadimage',methods=['POST'])
def uploadImage():
    if(request.method == 'POST'):
        file = request.files['image']
        if file:
            file.save('static/files/' + file.filename)
        
        print('upload image called')
    return "From upload image"

@app.route('/attendence', methods=['GET'])
def  get_csv_data():

    with open('Attendance.csv', 'r') as file:
        csv_data = file.read()
    return jsonify({'csvData': csv_data})

# @app.route('/image/<filename>', methods=['GET'])
# def get_image(filename):
#    
#         return send_file(f'imagesBasic/{filename}', mimetype='image/jpeg') 
#     except FileNotFoundError:
#         return jsonify({'error': 'Image not found'}), 404

# @app.route('/record', methods=['GET'])
# def get_image_data():
#     try:
#       
#         with open('imagesBasic', 'r') as file:
#             csv_data = file.read()
#         return jsonify({'csvData': csv_data})
#     except FileNotFoundError:
#         return jsonify({'error': 'File not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)


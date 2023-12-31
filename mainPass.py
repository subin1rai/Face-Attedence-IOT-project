from flask import Flask, render_template,request, jsonify
from flask_wtf import FlaskForm
from  flask_cors import CORS
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
import os


app = Flask (__name__)
CORS(app)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['UPLOAD_FOLDER'] = 'static/files'

class UploadFileForm(FlaskForm):
    file = FileField("File")
    submit = SubmitField("Upload File")

@app.route('/',methods=(['GET','POST']))
# @app.route('/home', methods=(['GET','POST']))
# def home():
#     form = UploadFileForm()
#     if form.validate_on_submit():
#         file = form.file.data #first grap the file 
#         file.save(os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename))) #save the file
#         return "file has been uploaded"
#     return render_template('Register.jsx', form=form)

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
    # Read CSV data or generate it here
    # Example: reading data from a CSV file
    with open('Attendance.csv', 'r') as file:
        csv_data = file.read()
    return jsonify({'csvData': csv_data})


if __name__ == '__main__':
    app.run(debug=True)


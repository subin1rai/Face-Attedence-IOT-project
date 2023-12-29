import cv2
import numpy as np
import face_recognition
from datetime import datetime
import requests
import pandas as pd
from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
import os

# ESP32-CAM IP address
esp32cam_url = 'http://192.168.43.230/640x480.jpg'


app = Flask (__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['UPLOAD_FOLDER'] = 'static/files'

class UploadFileForm(FlaskForm):
    file = FileField("File")
    submit = SubmitField("Upload File")

@app.route('/',methods=(['GET','POST']))
@app.route('/home', methods=(['GET','POST']))
def home():
    form = UploadFileForm()
    if form.validate_on_submit():
        file = form.file.data #first grap the file 
        file.save(os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename))) #save the file
        return "file has been uploaded"
    return render_template('index.html', form=form)


if __name__ == '__main__':
    app.run(debug=True)


# Function to fetch images from ESP32-CAM asfsadjflkasdflkasjdflksjdflkdjflkasjdkl bla bla bla
def get_esp32cam_image():
    try:
        response = requests.get(esp32cam_url, timeout=10)
        if response.status_code == 200:
            img_array = np.array(bytearray(response.content), dtype=np.uint8)
            img = cv2.imdecode(img_array, -1)
            return img
    except Exception as e:
        print(f"Error fetching image from ESP32-CAM: {str(e)}")
    return None

path = 'ImagesBasic'
images = []
classNames = []
mylist = os.listdir(path)
print(mylist)
for cl in mylist:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])
print(classNames)

def find_encodings(images):
    encodeList = []
    i = 0
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
        print(f'Encoding {i}/{len(mylist)} done!')
        i = i + 1
    return encodeList

def create_attendance_file(file_path, student_names, num_periods=4):
    headers = ['Name', 'Date'] + [f'Period{i}Status' for i in range(1, num_periods + 1)] + [f'Period{i}PresentTime' for i in range(1, num_periods + 1)]
    data = []
    for name in student_names:
        student_data = {'Name': name, 'Date': ''}
        for i in range(1, num_periods + 1):
            period_status_key = f'Period{i}Status'
            period_present_time_key = f'Period{i}PresentTime'
            student_data[period_status_key] = 'Absent'
            student_data[period_present_time_key] = ''
        data.append(student_data)
    df = pd.DataFrame(data, columns=headers)
    df['Date'] = pd.to_datetime(df['Date'], errors='coerce').dt.strftime('%Y-%m-%d')  # Format 'Date' column to only include the date
    df.to_csv(file_path, index=False)

def mark_attendance(name, file_path, status='Present', num_periods=4):
    df = pd.read_csv(file_path)

    # Convert both the detected name and names in the DataFrame to uppercase
    name = name.upper()
    df['Name'] = df['Name'].str.upper()

    # Check if the student is in the attendance file
    if name in df['Name'].values:
        # Check if the student has already been marked present
        if df.loc[df['Name'] == name, 'Period1Status'].iloc[0] != 'Present':
            # Update the status for the detected student
            now = datetime.now()
            date_today = now.strftime('%Y-%m-%d')
            time_now = now.strftime('%H:%M:%S')

            for i in range(1, num_periods + 1):
                period_status_key = f'Period{i}Status'
                period_present_time_key = f'Period{i}PresentTime'

                # Check if the student has already been marked present in the current period
                if df.loc[df['Name'] == name, period_status_key].iloc[0] != 'Present':
                    # Adjust the period start and end times based on the period number
                    # You can customize these based on your schedule
                    if i == 1:
                        time_start_period = '10:43:00'
                        time_end_period = '09:44:00'
                    elif i == 2:
                        time_start_period = '10:45:00'
                        time_end_period = '10:46:00'

                
                    # Add more conditions for other periods as needed

                    if time_start_period <= time_now <= time_end_period:
                        # Update the attendance for the correct period
                        # Update the attendance for the correct period
                        df.loc[df['Name'] == name, 'Date'] = pd.to_datetime(date_today, errors='coerce').strftime('%Y-%m-%d').astype(str)
                        df.loc[df['Name'] == name, period_present_time_key] = now.strftime('%H:%M:%S').astype(str)
                        df.to_csv(file_path, index=False)  # Save the changes to the same file
                        print(f"{name} marked {status} at {now.strftime('%H:%M:%S')} on {date_today} ({period_status_key})")
                        break
                    else:
                        print(f"{name} can only be marked present between {time_start_period} and {time_end_period} for {period_status_key}.")
            else:
                print(f"{name} has already been marked present in all time slots today.")
        else:
            print(f"{name} has already been marked present.")
    else:
        print(f"Error: {name} not found in the attendance file.")

# Define CSV file path and student names
file_path = 'Attendance.csv'
student_names = classNames
num_periods = 2  # Change the number of periods as needed

# Create the attendance file with student names
create_attendance_file(file_path, student_names, num_periods)

encodelistknown = find_encodings(images)
print('Encoding Complete!')

while True:
    # Capture an image from ESP32-CAM
    img = get_esp32cam_image()

    if img is not None:
        imgS = cv2.resize(img, (0, 0), None, 0.25, 0.25)
        imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

        faceCurFrame = face_recognition.face_locations(imgS)
        encodesCurFrame = face_recognition.face_encodings(imgS, faceCurFrame)

        for encodeFace, faceLoc in zip(encodesCurFrame, faceCurFrame):
            matches = face_recognition.compare_faces(encodelistknown, encodeFace)
            faceDis = face_recognition.face_distance(encodelistknown, encodeFace)
            print(faceDis)
            matchIndex = np.argmin(faceDis)

            if matches[matchIndex]:
                name = classNames[matchIndex].upper()
                print(name)
                y1, x2, y2, x1 = faceLoc
                y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
                cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
                mark_attendance(name, file_path, num_periods=num_periods)

        cv2.imshow('ESP32-CAM', img)
        cv2.waitKey(1)


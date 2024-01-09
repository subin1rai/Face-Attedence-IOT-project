import cv2
import numpy as np
import face_recognition
from datetime import datetime
import requests
import pandas as pd
import os

# ESP32-CAM IP address
esp32cam_url = 'http://192.168.46.227/640x480.jpg'

# Function to fetch images from ESP32-CAM
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
print(mylist, "this is myList")
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

    print(f"Checking attendance for {name}")

    # Check if the student is in the attendance file
    if name in df['Name'].values:
        print(f"{name} found in the attendance file.")
        # Check if the student has already been marked present
        if df.loc[df['Name'] == name, 'Period1Status'].iloc[0] != 'Present':
            print(f"{name} has not been marked present yet.")

            # Update the status for the detected student
            now = datetime.now()
            date_today = now.strftime('%Y-%m-%d')
            time_now = now.strftime('%H:%M:%S')
            print(f"Current time: {time_now}")

            for i in range(1, num_periods + 1):
                period_status_key = f'Period{i}Status'
                period_present_time_key = f'Period{i}PresentTime'

                # Check if the student has already been marked present in the current period
                if df.loc[df['Name'] == name, period_status_key].iloc[0] != 'Present':
                    print(f"Checking attendance for {name} in period {i}")
                    # Adjust the period start and end times based on the period number
                    # You can customize these based on your schedule

                    match i:
                        case 2: #softwarw
                            time_start_period = '15:21:00'
                            time_end_period = '15:22:00'
                        
                        case 1:  #cloud
                            time_start_period = '15:22:01'
                            time_end_period = '15:23:00'
                        

                    # if i == 2:
                    #     time_start_period = '14:22:00'
                    #     time_end_period = '14:24:00'
                    # elif i == 1:
                    #     time_start_period = '14:24:01'
                    #     time_end_period = '14:26:00'
                    # Add more conditions for other periods as needed

                    print(f"Checking time condition for {name} in period {i}")
                    if time_start_period <= time_now <= time_end_period:
                        print(f"{name} can be marked present between {time_start_period} and {time_end_period} for period {i}.")
                        # Update the attendance for the correct period
                        df.loc[df['Name'] == name, 'Date'] = pd.to_datetime(date_today, errors='coerce').strftime('%Y-%m-%d')
                        df.loc[df['Name'] == name, period_status_key] = status
                        df.loc[df['Name'] == name, period_present_time_key] = now.strftime('%H:%M:%S')

                        print(f"{name} marked {status} at {now.strftime('%H:%M:%S')} on {date_today} ({period_status_key})")

                        # If student is detected in the second time slot, also mark present for the second period
                        if i == 2 and time_start_period <= time_now <= time_end_period:
                            print(f"{name} detected in second time slot. Marking present for period 2.")
                            df.loc[df['Name'] == name, 'Period2Status'] = status
                            df.loc[df['Name'] == name, 'Period2PresentTime'] = now.strftime('%H:%M:%S')

                        df.to_csv(file_path, index=False)  # Save the changes to the same file
                    else:
                        print(f"{name} can only be marked present between {time_start_period} and {time_end_period} for period {i}.")
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
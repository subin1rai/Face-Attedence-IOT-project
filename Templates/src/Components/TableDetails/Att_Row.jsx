import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Att_Row = (props) => {
  return (
    <div className="flex justify-around pt-6">
      <h1>{props.sn}</h1>
      <h1>{props.name}</h1>
      <h1>{props.date.currTime}</h1>
      <h1>{props.time.currentDate}</h1>
      <h1>{props.status}</h1>
    </div>
  );
};

const CsvComponent = () => {
  const [csvData, setCsvData] = useState('');

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/attendence');
        setCsvData(response.data.csvData);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    fetchCsvData();
  }, []);

  const renderRows = () => {
    if (!csvData) return null;

    const rows = csvData.split('\n')
    const rows_non_header = rows.slice(1) 
    return rows_non_header.map((row, index) => {
      const columns = row.split(',');
      if(columns.length == 1){
        return null
      }
      return (
        <Att_Row
          key={index}
          sn={index + 1}
          name={columns[0]}
          date={{ currTime: columns[1] }}
          time={{ currentDate: columns[2] }}
          status={columns[3]}
        />
      );
    });
  
  };

  return (
    <div>
      {/* <h1>Attendance Data:</h1> */}
      {renderRows()}
    </div>
  );
};

export default CsvComponent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from Flask API
        axios.get('http://127.0.0.1:5000/attendence')
            .then(response => {
                // Set the retrieved data to state
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Data from Flask</h1>
            <ul>
                {/* Iterate through the data and display */}
                {data.map((item, index) => (
                    <li key={index}>
                        Name: {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

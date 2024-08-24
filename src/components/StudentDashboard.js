import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const StudentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
    const [selectedEndTime, setSelectedEndTime] = useState('');
    const [studentId, setStudentId] = useState('');
    const handleMentorChange = (e) => {
        setSelectedMentor(e.target.value);
    };
    
    // Handle start time selection
    const handleStartTimeChange = (e) => {
        setSelectedStartTime(e.target.value);
    };
    
    // Handle end time selection
    const handleEndTimeChange = (e) => {
        setSelectedEndTime(e.target.value);
    };

  useEffect(() => {

    const fetchAppointments = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/api/student/appointments', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const fetchMentors = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/api/mentor/list', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setMentors(response.data);
        } catch (error) {
            console.error('Error fetching mentors:', error);
        }
    };
    
   fetchAppointments();
    fetchMentors();
  }, []);

  


 /*const scheduleAppointment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
        const response = await axios.post('http://localhost:5000/api/student/schedule', {
            studentId: selectedStudent,
            mentorId: selectedMentor,
            startTime,
            endTime,
            
        },
         {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Appointment scheduled successfully:', response.data);
    } catch (error) {
        console.error('Error scheduling appointment:', error);
        console.log('Error Response:', error.response); // Add this to log the exact error
    }
}; */

const scheduleAppointment = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        setStudentId(decodedToken.id); 
        console.log(decodedToken.id)// Assuming the studentId is stored in the 'id' field of the token
    }
   // const studentId = localStorage.getItem('studentId'); // Assuming you store studentId in local storage
   
    const requestData = {
        studentId,
       mentorId: selectedMentor,
       startTime: selectedStartTime,
        endTime:selectedEndTime,
    };

    try {
        const response = await axios.post('http://localhost:5000/api/student/schedule', requestData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        console.log('Appointment scheduled successfully:', response.data);
    } catch (error) {
        console.error('Error scheduling appointment:', error);
    }
};



  return (
    <div className="student-dashboard">
      <h2>Your Appointments</h2>
      <ul>
        {appointments.map(appt => (
          <li key={appt.id}>
            {new Date(appt.startTime).toLocaleString()} - {new Date(appt.endTime).toLocaleString()} with Mentor ID: {appt.mentorId}
          </li>
        ))}
      </ul>

      <div>
            <h1>Schedule an Appointment</h1>

            <div>
                <label>Select Mentor:</label>
                <select value={selectedMentor} onChange={handleMentorChange}>
                    <option value="">Select a mentor</option>
                    {mentors.map((mentor) => (
                        <option key={mentor.id} value={mentor.id}>
                            {mentor.User.username} - {mentor.areaOfInterest}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Select Start Time:</label>
                <input
                    type="datetime-local"
                    value={selectedStartTime}
                    onChange={handleStartTimeChange}
                />
            </div>

            <div>
                <label>Select End Time:</label>
                <input
                    type="datetime-local"
                    value={selectedEndTime}
                    onChange={handleEndTimeChange}
                />
            </div>

            <button onClick={scheduleAppointment}>Schedule Appointment</button>
        </div>
        </div>
    );
};

export default StudentDashboard ;

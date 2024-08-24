import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MentorDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/mentor/appointments', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div>
            <h1>Mentor Dashboard</h1>
            <h2>Your Appointments</h2>
            {appointments.length > 0 ? (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>
                            <p>Student: {appointment.Student.User.username} ({appointment.Student.User.email})</p>
                            <p>Start Time: {new Date(appointment.startTime).toLocaleString()}</p>
                            <p>End Time: {new Date(appointment.endTime).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No appointments scheduled.</p>
            )}
        </div>
    );
};

export default MentorDashboard;

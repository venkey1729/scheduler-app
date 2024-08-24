import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ isLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [availability, setAvailability] = useState({
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: "",
        Sunday: ""
    });

    const navigate = useNavigate();

    const handleAvailabilityChange = (day, value) => {
        setAvailability(prevAvailability => ({
            ...prevAvailability,
            [day]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = { username, email, password, role };

            if (role === 'mentor') {
                payload.areaOfInterest = areaOfInterest;
                payload.availability = JSON.stringify(availability);
                console.log("Payload being sent to backend:", payload); // Save as JSON string
            }

            if (isLogin) {
                const response = await axios.post('http://localhost:5000/api/auth/login', payload);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.user.role);
                navigate(response.data.user.role === 'mentor' ? '/mentor' : '/student');
            } else {
                await axios.post('http://localhost:5000/api/auth/register', payload);
                alert('Registration successful! Please log in.');
                navigate('/login');
            }
        } catch (error) {
            alert('Error: ' + error.response.data.error);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="student">Student</option>
                            <option value="mentor">Mentor</option>
                        </select>

                        {role === 'mentor' && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Area of Interest"
                                    value={areaOfInterest}
                                    onChange={(e) => setAreaOfInterest(e.target.value)}
                                    required
                                />
                                <div className="availability-section">
                                    <label>Availability:</label>
                                    {Object.keys(availability).map(day => (
                                        <div key={day} className="availability-day">
                                            <label>{day}:</label>
                                            <select
                                                value={availability[day]}
                                                onChange={(e) => handleAvailabilityChange(day, e.target.value)}
                                            >
                                                <option value="">Select Time</option>
                                                <option value="09:00-10:00">09:00-10:00</option>
                                                <option value="10:00-11:00">10:00-11:00</option>
                                                <option value="11:00-12:00">11:00-12:00</option>
                                                <option value="14:00-15:00">14:00-15:00</option>
                                                <option value="15:00-16:00">15:00-16:00</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
        </div>
    );
};

export default Auth;

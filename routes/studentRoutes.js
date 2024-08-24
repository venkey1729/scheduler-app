/*const express = require('express');
const studentController = require('../controllers/studentController');
const { authenticateToken,authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/schedule', authenticateToken, studentController.scheduleAppointment);
router.get('/appointments', authenticateToken,authorizeRole('student'),  studentController.getStudentAppointments);

module.exports = router;

*/

const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const { Appointment } = require('../models');
const moment = require('moment');


const router = express.Router();

// Route to schedule an appointment
router.post('/schedule', authenticateToken, authorizeRole('student'), async (req, res) => {
    console.log("Request received to schedule an appointment");

    const { studentId, mentorId, startTime, endTime } = req.body;
    console.log("Data received:", { studentId, mentorId, startTime, endTime });

    try {
        // Validate and format the startTime and endTime using moment.js
        const formattedStartTime = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
        const formattedEndTime = moment(endTime).format('YYYY-MM-DD HH:mm:ss');

        if (!moment(formattedStartTime, 'YYYY-MM-DD HH:mm:ss', true).isValid() || !moment(formattedEndTime, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const appointment = await Appointment.create({ studentId, mentorId, startTime: formattedStartTime, endTime: formattedEndTime });
        console.log("Appointment scheduled successfully:", appointment);
        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error scheduling appointment:', error);
        res.status(500).json({ error: 'Failed to schedule appointment' });
    }
});


// Route to fetch student appointments
router.get('/appointments', authenticateToken, authorizeRole('student'), async (req, res) => {
    console.log("Request received to fetch student appointments");

    const studentId = req.user.id;
    console.log("Student ID received:", studentId);

    try {
        const appointments = await Appointment.findAll({ where: { studentId } });
        console.log("Appointments fetched:", appointments);
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

module.exports = router;

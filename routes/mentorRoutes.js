/*const express = require('express');
const mentorController = require('../controllers/mentorController'); // Ensure this path is correct
const { authenticateToken,authorizeRole } = require('../middleware/authMiddleware');
//const { Appointment, Mentor, User } = require('../models');

const router = express.Router();



router.get('/list', authenticateToken,authorizeRole('mentor'), mentorController.getMentorsList);

router.get('/appointments', authenticateToken,authorizeRole('mentor'), mentorController.getMentorAppointments);

module.exports = router;
*/

const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { Mentor,Student, User,Appointment } = require('../models'); // Ensure these are imported

const router = express.Router();

router.get('/list', authenticateToken, async (req, res) => {
    console.log("Received request to fetch mentor list");

    try {
        const mentors = await Mentor.findAll({
            include: [{
                model: User,
                attributes: ['username', 'email'],
            }]
        });

        console.log("Mentors fetched successfully:", mentors); // Log the fetched mentors

        res.json(mentors);
    } catch (error) {
        console.error('Error while fetching mentors:', error); // Log the exact error
        res.status(500).json({ error: 'Failed to fetch mentors' });
    }
});




/*

router.get('/list', authenticateToken, async (req, res) => {
    console.log("Request received to fetch mentor list");
    try {
        const mentors = await Mentor.findAll({
            include: [{
                model: User,
                attributes: ['username', 'email'],
            }]
        });

        console.log("Mentors fetched:", mentors);
        res.json(mentors);
    } catch (error) {
        console.error('Error while fetching mentors:', error);
        res.status(500).json({ error: 'Failed to fetch mentors' });
    }
});
*/
/*
router.get('/appointments', authenticateToken , async (req, res) => {
    try {
        const studentId = req.user.id; 
        const appointments = await Appointment.findAll({ where: { studentId } });
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

*/
router.get('/appointments', authenticateToken, async (req, res) => {
    const mentorId = req.user.id;
    console.log("Mentor ID received:", mentorId);

    try {
        const appointments = await Appointment.findAll({
            where: { mentorId },
            include: [
                {
                    model: Student,
                    include: [{ model: User, attributes: ['username', 'email'] }],
                }
            ]
        });

        console.log("Appointments fetched:", appointments);
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

module.exports = router;
const { Appointment, Mentor, User } = require('../models');



exports.getMentorsList = async (req, res) => {
    try {
        const mentors = await Mentor.findAll({
            include: [{
                model: User,
                attributes: ['username', 'email'],
            }]
        });
        res.json(mentors);
    } catch (error) {
        console.error('Error while fetching mentors:', error);
        res.status(500).json({ error: 'Failed to fetch mentors' });
    }
};

exports.getMentorAppointments = async (req, res) => {
    const { mentorId } = req.query;

    try {
        const appointments = await Appointment.findAll({ where: { mentorId } });
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
};

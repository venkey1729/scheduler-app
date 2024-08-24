const { Appointment } = require('../models');
//const { Student } = require('../models');

exports.scheduleAppointment = async (req, res) => {
  console.log("Request received to schedule an appointment");

  const { studentId, mentorId, startTime, endTime } = req.body;
  console.log("Data received:", { studentId, mentorId, startTime, endTime });

  try {
      const appointment = await Appointment.create({ studentId, mentorId, startTime, endTime });
      console.log("Appointment scheduled successfully:", appointment);
      res.status(201).json(appointment);
  } catch (error) {
      console.error('Error scheduling appointment:', error); // Log the error stack
      res.status(500).json({ error: 'Failed to schedule appointment' });
  }
};

exports.getStudentAppointments = async (req, res) => {
  console.log("Request received to fetch student appointments");
    
  const  studentId  = req.user.id;
  console.log("Student ID received:", studentId);
  try {
    const appointments = await Appointment.findAll({ where: { studentId } });
    console.log("Appointments fetched:", appointments);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

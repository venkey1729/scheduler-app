const Sequelize = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = require('./userModel')(sequelize, Sequelize);
const Mentor = require('./mentorModel')(sequelize, Sequelize);
const Student = require('./studentModel')(sequelize, Sequelize);
const Appointment = require('./appointmentModel')(sequelize, Sequelize);

User.hasOne(Mentor, { foreignKey: 'userId' });
User.hasOne(Student, { foreignKey: 'userId' });

Mentor.belongsTo(User, { foreignKey: 'userId' });
Student.belongsTo(User, { foreignKey: 'userId' });

Appointment.belongsTo(Mentor, { foreignKey: 'mentorId' });
Appointment.belongsTo(Student, { foreignKey: 'studentId' });

module.exports = {
  sequelize,
  User,
  Mentor,
  Student,
  Appointment,
};

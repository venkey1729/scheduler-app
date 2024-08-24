module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mentorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
    Appointment.associate = function(models) {
      Appointment.belongsTo(models.Mentor, { foreignKey: 'mentorId' });
      Appointment.belongsTo(models.Student, { foreignKey: 'studentId' });
  };
    return Appointment;
  };
  
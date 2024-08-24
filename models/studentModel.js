module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      preferredMentor: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      areaOfInterest: {
        type: DataTypes.STRING,
      },
    });
  
    return Student;
  };
  
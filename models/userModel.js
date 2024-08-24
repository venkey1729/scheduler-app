module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
       // unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('mentor', 'student'),
        allowNull: false,
      },
    });
    User.associate = function(models) {
      User.hasOne(models.Mentor, { foreignKey: 'userId' });
      User.hasOne(models.Student, { foreignKey: 'userId' });
  };

    return User;
  };
  
module.exports = (sequelize, DataTypes) => {
  const Mentor = sequelize.define('Mentor', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      areaOfInterest: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      availability: {
          type: DataTypes.JSON,  
          allowNull: true,
      },
  });
  Mentor.associate = function(models) {
    Mentor.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
};

  return Mentor;
};

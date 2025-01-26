module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define('Professor', {
    professorId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    labName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    labRoomNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: true,
    freezeTableName: true,
  });

  // Add associations if required in the future
  return Professor;
};

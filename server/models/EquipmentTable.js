module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define('Equipment', {
    equipmentId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    equipmentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipmentModel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guidelines: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    maxSamples: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxBookingsPerTwoWeeks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operatorName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    operatorEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    operatorPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true,
      },
    },
    workingStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    timestamps: true,
    freezeTableName: true,
  });

  Equipment.associate = models => {
    Equipment.hasMany(models.Booking, { foreignKey: 'equipmentId', onDelete: 'CASCADE' });
  };

  return Equipment;
};

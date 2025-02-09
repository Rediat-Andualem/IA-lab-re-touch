module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    resultId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    bookingId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    operatorStatusConfirmation: {
      type: DataTypes.ENUM(
        'completed',
        'in progress',
        'student was absent on slot time',
        'sample issue',
        'technical issue',
        'booking reserved'
      ),
      allowNull: true,
      defaultValue: 'booking reserved',
    },
    studentConfirmation: {
      type: DataTypes.ENUM('Results not collected', 'Results collected', ),
      allowNull: true,
      defaultValue: 'Results not collected',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: true,
  });

  // Result.associate = models => {
  //   Result.belongsTo(models.Booking, { foreignKey: 'bookingId', onDelete: 'CASCADE' });
  // };

  return Result;
};

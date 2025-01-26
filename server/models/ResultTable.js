module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    resultId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    // bookingId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: 'Booking', // Should match the actual table name
    //     key: 'bookingId',
    //   },
      
    // },
    
    operatorStatusConfirmation: {
      type: DataTypes.ENUM(
        'completed',
        'in progress',
        'student was absent on slot time',
        'sample issue',
        'technical issue'
      ),
      allowNull: true,
    },
    studentConfirmation: {
      type: DataTypes.ENUM('All Results not collected', 'All Results collected'),
      allowNull: true,
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

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "hours",
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
          },
        day: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
          }, 
        morning_hours: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        afternoom_hours: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    },
    { timestamps: false }
  );
};
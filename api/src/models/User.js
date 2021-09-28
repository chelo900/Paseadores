const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birth_day: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ubication: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // calendar: {
      //   type: DataTypes.DATE,
      //   allowNull: false
      // }
      reputation: {
        type: DataTypes.ENUM("0", "1", "2", "3", "4", "5"),
        defaultValue: "0",
        allowNull: false,
      },
      service: {
        type: DataTypes.ENUM("Walker", "Carer", "Walker & Carer"),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};

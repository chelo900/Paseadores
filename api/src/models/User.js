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
        type: DataTypes.TEXT,
        allowNull: false,
      },
      front_dni: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      back_dni: {
        type: DataTypes.TEXT,
        allowNull: true,
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
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ubication: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reputation: {
        type: DataTypes.ENUM("0", "1", "2", "3", "4", "5"),
        defaultValue: "0",
        allowNull: false,
      },
      service: {
        type: DataTypes.ENUM("Walker", "Carer", "Walker and Carer"),
        allowNull: false,
        defaultValue: "Walker",
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      description: {
        type: DataTypes.TEXT,
      },
      // morning: {
      //   type: DataTypes.ENUM("active", "inactive"),
      // },
      // afternoon: {
      //   type: DataTypes.ENUM("active", "inactive"),
      // },
    },
    { timestamps: false }
  );
};

import { DataTypes } from "sequelize";

export default (sequelize) => {
  const User = sequelize.define("User", {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });

  return User;
};
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Todo = sequelize.define(
    "Todo",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },

      description: {
        type: DataTypes.STRING,
        allowNull: true
      },

      is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      timestamps: false
    }
  );

  Todo.prototype.toJSON = function () {
    const values = { ...this.get() };
    return values;
  };

  return Todo;
};
module.exports = (sequelize, DataTypes) => {
  const DoorLogs = sequelize.define(
    "DoorLogs",
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      activity: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      doorKey: {
        type: DataTypes.STRING(200),
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "door_logs",
    }
  );

  return DoorLogs;
};

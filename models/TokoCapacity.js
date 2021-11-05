module.exports = (sequelize, DataTypes) => {
  const TokoCapacity = sequelize.define(
    "TokoCapacity",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
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
      tableName: "toko_capacity",
    }
  );

  return TokoCapacity;
};

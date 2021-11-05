module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "Orders",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
      },
      orderCode: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      transactionAmount: {
        type: DataTypes.INTEGER,
      },
      customerId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
    },
    {
      tableName: "orders",
    }
  );

  return Orders;
};

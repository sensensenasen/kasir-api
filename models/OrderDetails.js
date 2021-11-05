module.exports = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define(
    "OrderDetails",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER,
        references: { model: "orders", key: "id" },
      },
      productId: {
        type: DataTypes.INTEGER,
        references: { model: "products", key: "id" },
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      priceEach: {
        type: DataTypes.INTEGER,
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
      tableName: "order_details",
    }
  );

  return OrderDetails;
};

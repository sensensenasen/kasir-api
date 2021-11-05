module.exports = (sequelize, DataTypes) => {
  const TransactionHistory = sequelize.define(
    "TransactionHistory",
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
      amount: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING(45),
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
      tableName: "transaction_history",
    }
  );

  return TransactionHistory;
};

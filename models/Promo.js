module.exports = (sequelize, DataTypes) => {
  const Promo = sequelize.define(
    "Promo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      promoName: {
        type: DataTypes.STRING(100),
      },
      valuePercentage: {
        type: DataTypes.INTEGER,
      },
      valuePrice: {
        type: DataTypes.INTEGER,
      },
      promoDescription: {
        type: DataTypes.STRING(200),
      },
      startDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
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
      tableName: "promo",
    }
  );

  return Promo;
};

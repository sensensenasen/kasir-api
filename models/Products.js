module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      productName: {
        type: DataTypes.STRING(100),
      },
      productVendor: {
        type: DataTypes.STRING(100),
      },
      productCode: {
        type: DataTypes.STRING(200),
      },
      productDescription: {
        type: DataTypes.STRING(400),
      },
      productImage: {
        type: DataTypes.STRING(200),
      },
      quantityInStock: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      promoId: {
        type: DataTypes.INTEGER,
        references: { model: "promo", key: "id" },
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
      tableName: "products",
    }
  );

  return Products;
};

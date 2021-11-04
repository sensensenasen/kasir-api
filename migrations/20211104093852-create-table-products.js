"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("promo", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      promoName: {
        type: Sequelize.STRING(100),
      },
      valuePercentage: {
        type: Sequelize.INTEGER,
      },
      valuePrice: {
        type: Sequelize.INTEGER,
      },
      promoDescription: {
        type: Sequelize.STRING(200),
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING(100),
      },
      productVendor: {
        type: Sequelize.STRING(100),
      },
      productCode: {
        type: Sequelize.STRING(200),
      },
      productDescription: {
        type: Sequelize.STRING(400),
      },
      productImage: {
        type: Sequelize.STRING(200),
      },
      quantityInStock: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      promoId: {
        type: Sequelize.INTEGER,
        references: { model: "promo", key: "id" },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("products");
    await queryInterface.dropTable("promo");
  },
};

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    //======CREATE TABLE USER
    await queryInterface
      .createTable("users", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userName: {
          type: Sequelize.STRING(45),
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
        },
        email: {
          type: Sequelize.STRING(80),
          unique: true,
        },
        userRole: {
          type: Sequelize.STRING(20),
        },
        doorKey: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4, // Or DataTypes.UUIDV1
        },
        fullName: {
          type: Sequelize.STRING(100),
        },
        phone: {
          type: Sequelize.STRING(45),
        },
        gender: {
          type: Sequelize.STRING(20),
        },
        profileImage: {
          type: Sequelize.STRING(200),
        },
        bio: {
          type: Sequelize.STRING(200),
        },
        saldo: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      })
      .then(function () {
        queryInterface.createTable("door_logs", {
          userId: {
            type: Sequelize.INTEGER,
            references: { model: "users", key: "id" },
          },
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          activity: {
            type: Sequelize.STRING(10),
            allowNull: false,
          },
          doorKey: {
            type: Sequelize.STRING(200),
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
        });
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("door_logs");
    await queryInterface.dropTable("users");
  },
};

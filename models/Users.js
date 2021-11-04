module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(45),
        unique: true,
      },
      email: {
        type: DataTypes.STRING(80),
        unique: true,
      },
      userRole: {
        type: DataTypes.STRING(20),
      },
      doorKey: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      },
      fullName: {
        type: DataTypes.STRING(100),
      },
      phone: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: DataTypes.STRING(20),
      },
      profileImage: {
        type: DataTypes.STRING(200),
      },
      bio: {
        type: DataTypes.STRING(200),
      },
      saldo: {
        type: DataTypes.INTEGER,
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
      tableName: "users",
    }
  );

  return User;
};

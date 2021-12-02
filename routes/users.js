var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const { User } = require("../models");

/* GET USER LIST */
/* http://localhost:3001/users/ */
router.get("/", async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to get all users'
  const user = await User.findAll();
  res.status(200).json(user);
});

/* GET USER LIST */
/* http://localhost:3001/token/ */
router.get("/token/:doorKey", async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to get a specific user by token doorKey.'
  const { doorKey } = req.params;
  const user = await User.findOne({
    where: {
      doorKey: doorKey,
    },
  });
  res.status(200).json(user);
});

/* REGISTERING NEW USER */
/* http://localhost:3001/users/register */
router.post("/register", async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to regiser user'
  const schema = {
    userName: "string",
    password: "string",
    email: "string",
    userRole: "string",
    // doorKey: "string", -- AUTO GENERATED
    fullName: "string",
    phone: "string",
    gender: "string",
    profileImage: "string|optional",
    bio: "string|optional",
    saldo: "number|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const checkUser = await User.findAll({
    where: {
      userName: req.body.userName,
    },
  });
  if (checkUser.length) {
    return res.status(400).json({ message: "USER ALREADY REGISTERED" });
  }

  //encrypting password before inserting to database
  req.body.password = await bcrypt.hash(req.body.password, 10);

  const user = await User.create(req.body);
  res.status(200).json(user);
});

/* LOGIN WITH USERNAME OR EMAIL */
/* http://localhost:3001/users/register */
router.post("/login", async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to Login'
  const { userName, password, email } = req.body;

  const schema = {
    userName: "string|optional",
    password: "string",
    email: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const user = await User.findOne({
    where: {
      [Op.or]: [
        {
          userName: userName ? userName : "",
        },
        {
          email: email ? email : "",
        },
      ],
    },
  });

  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      res.status(200).json({
        isAuth: true,
        token: user.doorKey,
      });
    } else {
      res.status(400).json("Wrong password!");
    }
  } else {
    res.status(404).json("User not found!");
  }
});

/* UPDATE USER BY ID */
/* http://localhost:3001/users/id/2 */
router.put("/id/:id", async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to update user'
  const id = req.params.id;
  let user = await User.findByPk(id);
  if (!user) {
    return res.status(400).json({ message: "id user not found" });
  }

  const updUser = await user.update(req.body);
  res.status(200).json(updUser);
});

/* DELETE USER BY ID */
/* http://localhost:3001/users/id/3 */
router.delete("/id/:id", async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to delete user'
  const id = req.params.id;
  let user = await User.findByPk(id);
  if (!user) {
    return res.status(400).json({ message: "id user not found" });
  }

  await user.destroy();
  res.status(200).json({ message: "user deleted" });
});

module.exports = router;

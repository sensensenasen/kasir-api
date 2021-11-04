var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();

const { User } = require("../models");

/* GET users listing. */
/* http://159.89.205.119/users */
router.get("/", async (req, res) => {
  const user = await User.findAll();
  res.status(200).json(user);
});

/* GET users listing by id. */
/* http://159.89.205.119/users/e0040100019d0ca2 */
router.get("/:uid_card", async (req, res) => {
  const id = req.params.uid_card;
  const user = await User.findOne({
    where: {
      uid_card: id,
    },
  });
  res.status(200).json(user);
});

/* POST users listing. */
/* http://159.89.205.119/users */
router.post("/", async (req, res) => {
  const schema = {
    userName: "string",
    email: "string",
    userRole: "string",
    // doorKey: "string", -- AUTO GENERATED
    fullName: "string",
    phone: "number",
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

  const user = await User.create(req.body);
  res.status(200).json(user);
});

/* PUT users by id */
/* http://159.89.205.119/users/2 */
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let user = await User.findByPk(id);
  if (!user) {
    return res.status(400).json({ message: "id user not found" });
  }

  const updUser = await user.update(req.body);
  res.status(200).json(updUser);
});

/* DELETE users by id */
/* http://159.89.205.119/users/3 */
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let user = await User.findByPk(id);
  if (!user) {
    return res.status(400).json({ message: "id user not found" });
  }

  await user.destroy();
  res.status(200).json({ message: "user deleted" });
});

module.exports = router;

var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");

const { User } = require("../models");

/* http://159.89.205.119/reset */
router.get("/", async (req, res) => {
  let users = await User.findAll({
    where: {
      [Op.and]: [
        {
          counter: { [Op.gte]: 3 },
        },
        { role: "penerima" },
      ],
    },
  });
  if (users.length < 1) {
    return res.status(200).json({ error: "Jatah masih ada" });
  }

  for (let user of users) {
    user.update({ counter: 0 });
  }

  res.status(200).json({ message: "Reset success" });
});

module.exports = router;

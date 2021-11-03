var express = require("express");
var router = express.Router();

const { Logs } = require("../models");

/* GET log data listing. */
/* http://159.89.205.119/logs */
router.get("/", async (req, res) => {
  const logs = await Logs.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json(logs);
});

/* GET log data by id. */
/* http://159.89.205.119/logs/e0040100019d0ca1 */
router.get("/:uid_card", async (req, res) => {
  const card = req.params.uid_card;
  const logs = await Logs.findAll({
    where: {
      uid_card: card,
    },
  });
  res.status(200).json(logs);
});

module.exports = router;

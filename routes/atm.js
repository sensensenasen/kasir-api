var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();

const { Logs, User } = require("../models");

/* POT users listing. */
/* http://159.89.205.119/atm */
router.get("/:uid_card", async (req, res) => {
  const uid_card = req.params.uid_card;

  //Cek kartu terdaftar
  let users = await User.findOne({
    where: {
      uid_card: uid_card,
    },
  });

  //Jika kartu tidak terdaftar
  if (!users) {
    return res.status(400).send("CARD_NOT_REGISTERED");
  }

  //tiap kali tap kartu, counter akan bertambah
  let ncounter = users.counter + 1;
  await users.update({ counter: ncounter });

  if (users.role == "penyumbang") {
    let logObject = {
      uid_card: users.uid_card,
      nik: users.nik,
      username: users.username,
      counter: ncounter,
      berat_beras: 1,
      log_type: users.role,
    };

    await Logs.create(logObject);

    return res.status(200).send("SUMBANG_BERAS");
  } else if ((users.role = "penerima")) {
    //cek counter di kartu
    if (users.counter > 3) {
      return res.status(200).send("NOT_ALLOWED");
    }

    let logObject = {
      uid_card: users.uid_card,
      nik: users.nik,
      username: users.username,
      counter: ncounter,
      berat_beras: 1,
      log_type: users.role,
    };

    await Logs.create(logObject);

    return res.status(200).send("AMBIL_BERAS");
  }
});

module.exports = router;

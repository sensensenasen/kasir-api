var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");

const { DoorLogs, GeneratedDoorKey, User, TokoCapacity } = require("../models");

/* GET DOOR LOG LIST */
/* http://localhost:3001/gate/logs */
router.get("/logs", async (req, res) => {
  const logs = await DoorLogs.findAll();
  res.status(200).json(logs);
});

/* GATE IN USER */
/* http://localhost:3001/gate/in/:barcodeuser */
router.get("/in/:doorKey", async (req, res) => {
  try {
    const { doorKey } = req.params;
    const user = await User.findOne({
      where: {
        doorKey: doorKey,
      },
    });

    if (!user) {
      return res.status(400).json({
        code: "refused",
        status: "Access Refused!",
        message: "Barcode tidak terverifikasi.",
      });
    }

    //CEK KAPASITAS
    const { count, rows } = await TokoCapacity.findAndCountAll();
    if (count >= 10) {
      return res.status(400).json({
        code: "full",
        status: "Kapasitas Penuh!",
        message: "Tunggu beberapa saat karena toko sudah mencapai kapasitas maksimum.",
      });
    }

    //ADD DOOR LOGS
    var logsObject = {
      userId: user.id,
      activity: "IN",
      doorKey: user.doorKey.toString(),
    };
    await DoorLogs.create(logsObject);

    //RECORD => KAPASITAS TOKO
    var tokoObject = {
      userId: user.id,
    };
    await TokoCapacity.create(tokoObject);

    res.status(200).json({
      code: "success",
      status: "Access Granted!",
      message: "Silakan masuk toko.",
    });
  } catch (error) {
    console.log(error);
  }
});

/* GENERATE DOOR KEY */
/* http://localhost:3001/gate/generate */
router.post("/generate", async (req, res) => {
  const { userId } = req.body;

  var minutesToAdd = 10;
  var currentDate = new Date();
  var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);

  const key = await GeneratedDoorKey.create({ userId: userId, validUntil: futureDate });
  res.status(200).json(key);
});

/* GATE OUT USER */
/* http://localhost:3001/gate/out/:barcodeuser */
router.get("/out/:doorKey", async (req, res) => {
  try {
    const { doorKey } = req.params;
    const generated = await GeneratedDoorKey.findOne({
      where: {
        [Op.and]: [
          {
            doorKey: doorKey,
          },
          {
            validUntil: {
              [Op.gte]: Date.now(),
            },
          },
        ],
      },
    });

    if (!generated) {
      return res.status(400).json({
        code: "refused",
        status: "Access Refused!",
        message: "Barcode tidak terverifikasi/tidak valid",
      });
    }

    //ADD DOOR LOGS
    var logsObject = {
      userId: generated.userId,
      activity: "OUT",
      doorKey: generated.doorKey.toString(),
    };
    await DoorLogs.create(logsObject);

    //HAPUS RECORD KAPASITAS TOKO
    let toko = await TokoCapacity.findOne({
      where: {
        userId: generated.userId,
      },
    });

    await toko.destroy();
    res.status(200).json({
      code: "success",
      status: "Access Granted!",
      message: "Selamat jalan! Terima kasih telah berbelanja di toko kami.",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

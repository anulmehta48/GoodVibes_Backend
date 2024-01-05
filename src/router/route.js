const express = require("express");
const { BookAppointment } = require("../controllers/appointController");
const { checkAvailability } = require("../middleware/auth");
const { GetAllDailyEntry, SingupAdmin, LoginAdmin } = require("../controllers/adminController");
const { CreateEntry } = require("../controllers/dailyEntry");

const router = express.Router();

router.get("/test-me", (req, res) => {
  res.status(200).send("My Api is Runnging Fine");
});

router.post("/appointment", checkAvailability, BookAppointment);
router.get("/getclient", GetAllDailyEntry);
router.post("/entry",CreateEntry)
router.post("/signup",SingupAdmin)
router.post("/login",LoginAdmin)


router.all("/*", (req, res) => {
  res.status(400).send({ status: false, message: "Make Sure Your Endpoint is Correct!" });
});

module.exports = router;



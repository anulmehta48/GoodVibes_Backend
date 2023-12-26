const AppointModel = require("../models/appointModel");

const GetAllDailyEntry = async (req, res, next) => {
  try {
    const clients = await AppointModel.find({});
    return res.status(200).send({ status: true, data: clients });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};
module.exports.GetAllDailyEntry = GetAllDailyEntry;

const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    barberName: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    haircutType: {
      type: String,
      required: true,
    },
    haircutPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClientEntry", clientSchema);

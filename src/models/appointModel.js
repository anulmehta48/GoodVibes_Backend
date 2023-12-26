const mongoose = require("mongoose");
const appointSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    services: {
      type: String,
      required: true,
    },
    appointDate: {
      type: Date,
      required: true,
    },
    appointTime: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointSchema);

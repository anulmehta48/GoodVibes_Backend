const AppointModel = require("../models/appointModel");

const BookAppointment = async (req,res) => {
  try {
    const appointUser=req.body
    
    const {fullName,email,mobile,services,appointDate,appointTime,notes}=appointUser

    if(Object.keys(appointUser).length === 0){
      return res.status(400).send({status:false,message:"Please provide inputs"})
    }
    const booked=await AppointModel.create({fullName,email,mobile,services,appointDate,appointTime,notes})
    res.status(201).send({status:true,data:booked})
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.BookAppointment = BookAppointment;


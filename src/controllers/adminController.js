const AdminModel=require('../models/adminModel')
const AppointModel = require("../models/appointModel");
const bcrypt=require('bcrypt')

const SingupAdmin=async (req,res)=>{
  const { fullName, email, mobile, password } = req.body;
  try {
    if (!fullName || !email || !mobile || !password) {
      return res.status(400).json({ status:false,msg: 'All fields are required' });
    }
    const existingAdmin = await AdminModel.findOne({ $or: [{ email }, { mobile }] });
    if (existingAdmin) {
      return res.status(409).json({ error: 'Email or mobile already registered' });
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const Admin=await AdminModel.create({fullName,email,mobile,password:hashedPassword})
    res.status(201).send({status:true,Admin:Admin})
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
}
const LoginAdmin=async (req,res)=>{
  const { email, password } = req.body;
  try {
    if ( !email|| !password) {
      return res.status(400).json({ status:false,msg: 'All fields are required' });
    }
    const existingAdmin = await AdminModel.findOne({email:email });
    if (!existingAdmin) {
      return res.status(409).json({ error: 'Invaild email and password' });
    }
    const isPasswordValid =await bcrypt.compare(password,existingAdmin.password)
    if (isPasswordValid) {
      return res.status(200).json({status:true, msg: 'Login successful', });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
}



const GetAllDailyEntry = async (req, res) => {
  try {
    const clients = await AppointModel.find();
    return res.status(200).send({ status: true, data: clients });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};
module.exports.GetAllDailyEntry = GetAllDailyEntry;
module.exports.SingupAdmin = SingupAdmin;
module.exports.LoginAdmin = LoginAdmin;

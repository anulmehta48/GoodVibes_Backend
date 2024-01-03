const DailyModel = require("../models/clientModel");

const CreateEntry = async (req, res) => {
try {
    const client=req.body;
    const {date,time,barberName,clientName,haircutType,haircutPrice}=client
    if(Object.keys(client).length === 0){
        return res.status(400).send({status:false,message:"Please provide inputs"})
    }
    const complete=await DailyModel.create({date,time,barberName,clientName,haircutType,haircutPrice})
    res.status(201).send({status:true,data:complete})
} catch (error) {
    res.status(500).send({ status: false, msg: error.message });
}

};
module.exports.CreateEntry = CreateEntry;


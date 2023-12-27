const dotenv = require("dotenv");
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const SendOTP = async (clientName, foruser) => {
  console.log(clientName, foruser);
  try {
    const message = await client.messages.create({
      body: `Hello ${clientName} from GoodVibes`,
      to: `${foruser}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Make sure to set this environment variable
    });
    console.log("Message sent successfully:", message.sid);
  } catch (error) {
    console.error("Error sending message:", error.message);
  }
};

SendOTP("anulMehta", "+918279241848");

module.exports.SendOTP = SendOTP;


// working fine
// const accountSid = "AC1c91206453b5cd99b340fa40fdc146b5";
// const authToken = "744cc53e12e1c56000d387eccd04e0db";
// const client = require("twilio")(accountSid, authToken);
// const SENDOTP = async () => {
//   const messsage = await client.messages.create({
//     body: "I am from rajatshan",
//     from: "+17736722812",
//     to: "+918279241848",
//   });
//   console.log(messsage);
// };

// console.log(SENDOTP());

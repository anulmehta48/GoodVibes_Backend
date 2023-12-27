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


const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
};

const sendOTP = (mobile, otp) => {
  // Implement sending the OTP to the mobile number (e.g., using an SMS service)
  console.log(`OTP sent to ${mobile}: ${otp}`);
};

module.exports = {
  generateOTP,
  sendOTP,
};

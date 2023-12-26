const AppointModel=require('../models/appointModel')
const checkAvailability = async (req, res, next) => {
    try {
      const { appointDate, appointTime, email, mobile } = req.body;
      
      if(Object.keys(req.body).length === 0){
        return res.status(400).send({status:false,message:"Please provide inputs"})
      }

      const alreadyBooked = await AppointModel.findOne({
        appointDate: new Date(appointDate),
        $or: [{ email }, { mobile }],
      });
  
      if (alreadyBooked) {
        return res.status(400).json({ success: false, message: "Person has already booked an appointment for the specified date" });
      }
  
      const desiredTime = new Date(`${appointDate} ${appointTime}`);
      
      if (desiredTime.getDay() === 2) { // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        return res.status(400).json({ success: false, message: "Shop is closed on Tuesdays" });
      }

      const openingTime = new Date(`${appointDate} 10:00:00 AM`);
      const closingTime = new Date(`${appointDate} 09:30:00 PM`);
      
      if (desiredTime >= openingTime && desiredTime <= closingTime) {
        const dailyAppointmentsCount = await AppointModel.countDocuments({
          appointDate: new Date(appointDate),
        });
      
        const maxDailyAppointments = 10;

        // Specify the number of days for advance booking
        const advanceBookingDays = 7; // Allow bookings up to 7 days in advance
  
  
        if (dailyAppointmentsCount < maxDailyAppointments || desiredTime > new Date(Date.now() + advanceBookingDays * 24 * 60 * 60 * 1000)) {
          // Check if the person has exceeded the limit for advance bookings
          const advanceBookingsCount = await AppointModel.countDocuments({
            $or: [
              { email, appointDate: { $gt: new Date() } }, // Count advance bookings for the person
              { mobile, appointDate: { $gt: new Date() } },
            ],
            appointTime,
          });
  
          const maxAdvanceBookings = 5; // Limit the person to 5 advance bookings
  
          if (advanceBookingsCount < maxAdvanceBookings) {
            // Check if the desired time slot is available
            const existingAppointment = await AppointModel.findOne({
              appointDate: new Date(appointDate),
              appointTime,
            });
  
            if (!existingAppointment) {
              // The time slot is available, proceed to the next middleware
              next();
            } else {
              // The time slot is already booked
              res.status(400).json({ success: false, message: "Time slot not available" });
            }
          } else {
            // Exceeded the limit for advance bookings
            res.status(400).json({ success: false, message: "Exceeded the limit for advance bookings" });
          }
        } else {
          // Daily appointment limit reached
          res.status(400).json({ success: false, message: "Daily appointment limit reached" });
        }
      } else {
        // The desired time is outside of operating hours
        res.status(400).json({ success: false, message: "Appointment time is outside of operating hours" });
      }
    } catch (error) {
      // Handle database query errors
      res.status(500).json({ success: false, message: "Error checking availability", error: error.message });
    }
  };
  

  module.exports.checkAvailability=checkAvailability;
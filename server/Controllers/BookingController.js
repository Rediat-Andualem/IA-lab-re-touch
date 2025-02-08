
const { Equipment ,Booking,User } = require('../models');
// const bookEquipment = async (req, res) => {
//   const { bookings, bookingsCount, equipmentId, userID } = req.body;

//   try {
//     // Check if equipment exists
//     const equipment = await Equipment.findOne({ where: { equipmentId } });
//     const {guideId} = await User.findOne({ where: { userID } });
//     const bookingDoneByProfessor = await Booking.count({
//       where: {
//         equipmentId: equipmentId,
//         guideId: guideId
//       }
//     });



//     if (!equipment) {
//       return res.status(404).json({ message: "Equipment not found." });
//     }

//     // Check maxBookingsPerTwoWeeks limit
//     if (parseInt(bookingDoneByProfessor, 10) > parseInt(equipment.maxBookingsPerTwoWeeks, 10)) {
//       return res.status(201).json({ message: "Faculty quota exhausted" });
//     }

//     // Ensure bookings is a valid array
//     let parsedBookings = bookings;
//     if (typeof bookings === 'string') {
//       try {
//         parsedBookings = JSON.parse(bookings); // Parse if it's a stringified JSON array
//       } catch (error) {
//         return res.status(400).json({ message: "Invalid bookings data format." });
//       }
//     }

//     // Check if bookings is an array after parsing
//     if (!Array.isArray(parsedBookings)) {
//       return res.status(400).json({ message: "Bookings must be an array." });
//     }

//     // Prepare booking data
//     const bookingData = parsedBookings?.map((booking) => ({
//       userId: userID,
//       equipmentId,
//       bookedDate: booking.bookingDate,
//       slotTime: booking.timeSlot,
//       slotDate: booking.slotDate,
//       bookingStatus: "Booked",
//       guideId
//     }));

//     // Insert bookings into the database
//     await Booking.bulkCreate(bookingData);

//     return res.status(201).json({ message: "Booking successful." });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "An error occurred while processing the booking." });
//   }
// };

 
//  to get booked slot based on equipment ID 

const bookEquipment = async (req, res) => {
  const { bookings, bookingsCount, equipmentId, userID } = req.body;

  try {
    // Check if equipment exists
    const equipment = await Equipment.findOne({ where: { equipmentId } });
    const { guideId } = await User.findOne({ where: { userID } });
    
    // Ensure no duplicate bookings for the same slot
    for (let booking of bookings) {
      const existingBooking = await Booking.findOne({
        where: {
          equipmentId: equipmentId,
          userId: userID,
          slotDate: booking.slotDate,
          slotTime: booking.timeSlot,
        },
      });

      if (existingBooking) {
        return res.status(400).json({ message: `Slot already booked for ${booking.slotDate} at ${booking.timeSlot}.` });
      }
    }

    // Check maxBookingsPerTwoWeeks limit
    const bookingDoneByProfessor = await Booking.count({
      where: {
        equipmentId: equipmentId,
        guideId: guideId
      }
    });

    if (parseInt(bookingDoneByProfessor + bookings.length, 10) > parseInt(equipment.maxBookingsPerTwoWeeks, 10)) {
      return res.status(201).json({ message: "Faculty quota exhausted" });
    }

    // Prepare booking data
    const bookingData = bookings.map((booking) => ({
      userId: userID,
      equipmentId,
      bookedDate: booking.bookingDate,
      slotTime: booking.timeSlot,
      slotDate: booking.slotDate,
      bookingStatus: "Booked",
      guideId
    }));

    // Insert bookings into the database
    await Booking.bulkCreate(bookingData);

    return res.status(201).json({ message: "Booking successful." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while processing the booking." });
  }
};



const getBookingById = async (req,res)=>{
  const {equipmentId} = req.params
  try {
    const equipment = await Booking.findAll({ where: { equipmentId } });
    return res.status(201).send(equipment);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred on sending booking status." });
  }
}




module.exports = { bookEquipment,getBookingById };

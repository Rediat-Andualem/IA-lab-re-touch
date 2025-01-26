// const { Equipment } = require('../models');
// const { Booking } = require('../models'); // Assuming you have a Booking model

// const bookEquipment = async (req, res) => {
//   const { bookings, bookingsCount, equipmentId, userID } = req.body;
//  console.log(bookings)
//   try {
//     // Check if equipment exists
//     const equipment = await Equipment.findOne({ where: { equipmentId } });

//     if (!equipment) {
//       return res.status(404).json({ message: "Equipment not found." });
//     }

//     // Check maxBookingsPerTwoWeeks limit
//     if (parseInt(bookingsCount, 10) > parseInt(equipment.maxBookingsPerTwoWeeks, 10)) {
//       return res.status(400).json({ message: "Your booking exceeds the maximum limits." });
//     }
//     const parsedBookings = JSON.parse(bookings);

//     // Prepare booking data
//     const bookingData = parsedBookings?.map((booking) => ({
//       userId: userID,
//       equipmentId,
//       bookedDate: booking.bookingDate,
//       slotTime: booking.timeSlot,
//       slotDate: booking.slotDate,
//       bookingStatus: "Booked",
//     }));

//     // Insert bookings into the database
//     await Booking.bulkCreate(bookingData);

//     return res.status(201).json({ message: "Booking successful." });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "An error occurred while processing the booking." });
//   }
// };

// module.exports = { bookEquipment };
const { Equipment } = require('../models');
const { Booking } = require('../models');

const bookEquipment = async (req, res) => {
  const { bookings, bookingsCount, equipmentId, userID } = req.body;
  try {
    // Check if equipment exists
    const equipment = await Equipment.findOne({ where: { equipmentId } });

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found." });
    }

    // Check maxBookingsPerTwoWeeks limit
    if (parseInt(bookingsCount, 10) > parseInt(equipment.maxBookingsPerTwoWeeks, 10)) {
      return res.status(400).json({ message: "Your booking exceeds the maximum limits." });
    }

    // Ensure bookings is a valid array
    let parsedBookings = bookings;
    if (typeof bookings === 'string') {
      try {
        parsedBookings = JSON.parse(bookings); // Parse if it's a stringified JSON array
      } catch (error) {
        return res.status(400).json({ message: "Invalid bookings data format." });
      }
    }

    // Check if bookings is an array after parsing
    if (!Array.isArray(parsedBookings)) {
      return res.status(400).json({ message: "Bookings must be an array." });
    }

    // Prepare booking data
    const bookingData = parsedBookings?.map((booking) => ({
      userId: userID,
      equipmentId,
      bookedDate: booking.bookingDate,
      slotTime: booking.timeSlot,
      slotDate: booking.slotDate,
      bookingStatus: "Booked",
    }));

    // Insert bookings into the database
    await Booking.bulkCreate(bookingData);

    return res.status(201).json({ message: "Booking successful." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while processing the booking." });
  }
};

 
//  to get booked slot based on equipment ID 

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

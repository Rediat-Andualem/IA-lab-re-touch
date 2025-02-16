
const { Equipment ,Booking,User,Result } = require('../models');


const bookEquipment = async (req, res) => {
  const { bookings, bookingsCount, equipmentId, userID } = req.body;
console.log(bookings, bookingsCount, equipmentId, userID )
  // Function to generate a 6-digit random number
  const generateRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

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
        guideId: guideId,
      }
    });

    if (parseInt(bookingDoneByProfessor + bookings.length, 10) > parseInt(equipment.maxBookingsPerTwoWeeks, 10)) {
      return res.status(201).json({ message: "Faculty quota exhausted" });
    }

    // Prepare booking data with unique displayBookingId
    const bookingData = bookings.map((booking) => ({
      userId: userID,
      equipmentId,
      bookedDate: booking.bookingDate,
      slotTime: booking.timeSlot,
      slotDate: booking.slotDate,
      bookingStatus: "Booked",
      guideId,
      displayBookingId: generateRandomNumber(), // Generate unique 6-digit number for each booking
    }));

    // Insert bookings into the database
    let bookingInfoForResult = await Booking.bulkCreate(bookingData);

    // Extract the bookingIds from the inserted bookings
    const bookingIds = bookingInfoForResult.map(booking => booking.bookingId);

    // Prepare the result data based on the bookingIds
    const resultData = bookingIds.map((bookingId, index) => ({
      bookingId: bookingId,
      userId: bookingData[index].userId,
      equipmentId: bookingData[index].equipmentId,
      guideId: bookingData[index].guideId,
      bookedDate: bookingData[index].bookedDate,
      displayBookingId: bookingData[index].displayBookingId,
      slotDate: bookingData[index].slotDate,
      slotTime: bookingData[index].slotTime,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Bulk create the results using the extracted bookingIds
    await Result.bulkCreate(resultData);

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

const getStudentBooking = async (req,res)=>{
  const {userId}=req.params
  try {
    // Fetch the booking history of the student, including the related equipment details
    const bookingHistoryOfStudent = await Booking.findAll({
      where: { userId },
      include: {
        model: Equipment,
        attributes: ['equipmentName'], // Only include the equipmentName from the Equipment table
      },
      attributes: ['bookingId', 'bookedDate', 'slotTime', 'slotDate', 'bookingStatus'], // Only include the necessary fields from Booking
    });
console.log(bookingHistoryOfStudent)
    // Respond with an empty array if no bookings are found, but still return 200 OK
    if (bookingHistoryOfStudent.length === 0) {
      return res.status(200).json({ message: ["No booking history found."] });
    }

    // Respond with the booking history along with the equipment name
    return res.status(200).json({ bookingHistoryOfStudent });
  } catch (err) {
    if (err.name === "ValidationErrorItem") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: [validationErrors.message] });
    }
    return res.status(500).json({ errors: [err.message] });
  }
}

const clearWeeklyBooking = async (req, res) => {
  try {
    // Remove all bookings from the table
    const deletedBookings = await Booking.destroy({
      where: {},
    });

    if (deletedBookings > 0) {
      return res.status(200).json( "bookings table have been cleared.");
    } else {
      return res.status(404).json({ message: 'No bookings found to clean.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error while clearing bookings.', error: error.message });
  }
};


module.exports = { bookEquipment,getBookingById,getStudentBooking ,clearWeeklyBooking};

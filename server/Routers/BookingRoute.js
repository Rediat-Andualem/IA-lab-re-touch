// routes/bookingRoutes.js
const express = require('express');
const { bookEquipment,getBookingById,getStudentBooking, clearWeeklyBooking } = require('../Controllers/BookingController');
const BookingRouter = express.Router();

BookingRouter.post('/equipmentBookings', bookEquipment);
BookingRouter.get('/status/:equipmentId', getBookingById);
BookingRouter.get('/getStudentSingleBooking/:userId', getStudentBooking);
BookingRouter.delete('/cleanOldBooking', clearWeeklyBooking);

module.exports = {BookingRouter};



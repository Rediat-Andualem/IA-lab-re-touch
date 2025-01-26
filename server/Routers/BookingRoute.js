// routes/bookingRoutes.js
const express = require('express');
const { bookEquipment,getBookingById } = require('../Controllers/BookingController');
const BookingRouter = express.Router();

BookingRouter.post('/equipmentBookings', bookEquipment);
BookingRouter.get('/status/:equipmentId', getBookingById);

module.exports = {BookingRouter};



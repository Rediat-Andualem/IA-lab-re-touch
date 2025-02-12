const express = require('express');
const {AllBookingFinderFromResultForUser,statusUpdateByOperator,StatusUpdateByStudent} = require('../Controllers/ResultsController');
const ResultRouter = express.Router();

ResultRouter.get('/findAllBooking/:userId', AllBookingFinderFromResultForUser);  // to find all booking from result table
ResultRouter.get('/statusUpdateByUser/:userId', statusUpdateByOperator);  
ResultRouter.get('/statusUpdateByOperator/:userId', StatusUpdateByStudent);  



module.exports = {ResultRouter};



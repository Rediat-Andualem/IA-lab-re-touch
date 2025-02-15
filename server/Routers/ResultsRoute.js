const express = require('express');
const {AllBookingFinderFromResultForUser,statusUpdateByOperator,StatusUpdateByStudent} = require('../Controllers/ResultsController');
const ResultRouter = express.Router();

ResultRouter.get('/findAllBooking/:userId', AllBookingFinderFromResultForUser);  
ResultRouter.get('/statusUpdateByUser/:userId/:resultId', statusUpdateByOperator);  
ResultRouter.get('/statusUpdateByOperator/:userId/:resultId', StatusUpdateByStudent);  



module.exports = {ResultRouter};



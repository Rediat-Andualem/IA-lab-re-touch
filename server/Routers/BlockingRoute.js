const express = require('express');
const {BlockingInputs,DeleteBlocking,GetAllBlocking} = require('../Controllers/BlockingController');
const BlockingRouter = express.Router();

BlockingRouter.post('/createBlocking', BlockingInputs);
BlockingRouter.delete('/deleteBlocking/:blockingId/:role',DeleteBlocking );
BlockingRouter.get('/getAllBlocking',GetAllBlocking );


module.exports = {BlockingRouter};



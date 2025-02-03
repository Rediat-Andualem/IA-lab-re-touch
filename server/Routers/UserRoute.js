// routes/bookingRoutes.js
const express = require("express");
const {
  createUser,
  userLogIn,
  userProfileUpdate,
  userRoleUpdater,
  userProfileDelete,
  singleUserFinder,
  userPasswordResetRequest,
  allUserFinder,
  userPasswordUpdate,
  confirmUser,
  deleteUsersByYear
} = require("../Controllers/userController");
// const {checkRole} = require('../middleware/CheckRole.js')
// const {authenticateToken} = require('../Auth/Auth.js')
const userRoute = express.Router();

userRoute.post("/createUser", createUser);
userRoute.post("/login", userLogIn);
userRoute.patch("/userRole/:userId", userRoleUpdater);
userRoute.delete("/userProfileDelete/:userId", userProfileDelete);
userRoute.patch("/userProfileUpdate/:userId", userProfileUpdate);
userRoute.get("/getSingleUser/:userId", singleUserFinder);
userRoute.post("/userPasswordResetRequest", userPasswordResetRequest);
userRoute.post("/userPasswordReset/:userId", userPasswordUpdate);
userRoute.get("/allUsers", allUserFinder);
userRoute.post("/studentConfirmation/:userId", confirmUser);  
userRoute.post("/deleteOldRecord", deleteUsersByYear);  


module.exports = { userRoute };

// userRoute.get('/getSingleUser/:userId',authenticateToken,checkRole(["1","2","3"]),singleUserFinder);

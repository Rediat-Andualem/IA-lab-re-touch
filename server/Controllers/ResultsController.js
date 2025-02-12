const {Result} = require("../models");


const AllBookingFinderFromResultForUser = async (req, res) => {
    const {userId}=req.params

    try {
      // Fetch all users from the database, excluding sensitive fields like password
      const results = await Result.findAll({
        where :{userId}
      });
  console.log(results.length)
      // Respond with an empty array if no users are found, but still return 200 OK
      if (results.length === 0) {
        return res.status(200).json({ message: ["No Booking/result history found."] });
      }
  
      // Respond with the list of users
      return res.status(200).json({ results });
    } catch (err) {
      if (err.name === "ValidationErrorItem") {
        const validationErrors = err.errors.map((e) => e.message);
        return res.status(400).json({ errors: [validationErrors.message] });
      }
      return res.status(500).json({ errors: [err.message] });
    }
  };

 const StatusUpdateByStudent = async (req,res)=>{
     const {userId} = req.params
 }

 const statusUpdateByOperator = async (req,res)=>{
    
 }




  module.exports={AllBookingFinderFromResultForUser,StatusUpdateByStudent,statusUpdateByOperator}


 
const {Result,Equipment} = require("../models");


// const AllBookingFinderFromResultForUser = async (req, res) => {
//     const {userId}=req.params

//     try {
//       // Fetch all users from the database, excluding sensitive fields like password
//       const results = await Result.findAll({
//         where :{userId}
//       });
//       // Respond with an empty array if no users are found, but still return 200 OK
//       if (results.length === 0) {
//         return res.status(200).json({ message: ["No Booking/result history found."] });
//       }else{
//         console.log(results[0].equipmentId)
//       }
  
//       // Respond with the list of users
//       return res.status(200).json({ results });
//     } catch (err) {
//       if (err.name === "ValidationErrorItem") {
//         const validationErrors = err.errors.map((e) => e.message);
//         return res.status(400).json({ errors: [validationErrors.message] });
//       }
//       return res.status(500).json({ errors: [err.message] });
//     }
//   };


const AllBookingFinderFromResultForUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch all results and include the related equipment details
        const results = await Result.findAll({
            where: { userId },
            include: [{
                model: Equipment,
                as: 'Equipment',
              }]
        });

        // Check if there are no results
        if (results.length === 0) {
            return res.status(200).json({ message: ["No Booking/result history found."] });
        }

        // Now the results will include the equipmentName, you can directly send it
        return res.status(200).json({ results });
    } catch (err) {
        // Handle validation or other errors
        if (err.name === "ValidationErrorItem") {
            const validationErrors = err.errors.map((e) => e.message);
            return res.status(400).json({ errors: [validationErrors.message] });
        }
        return res.status(500).json({ errors: [err.message] });
    }
};


const StatusUpdateByStudent = async (req, res) => {
    const { userId, resultId } = req.params;
  
    try {
      // Find the result by both userId and resultId
      const ResultToUpdate = await Result.findOne({
        where: {
          userId: userId,
          resultId: resultId
        }
      });
  
      // Check if the result exists
      if (!ResultToUpdate) {
        return res.status(404).json({ errors: ["No status found to update."] });
      }
  
      // Update the studentConfirmation field to "Results collected"
      ResultToUpdate.studentConfirmation = "Results collected";
  
      // Save the update without changing other fields
      await ResultToUpdate.save();
  
      // Respond with a success message
      return res.status(200).json({ message: ["Status updated successfully."] });
  
    } catch (err) {
      // Handle validation errors if they occur
      if (err.name === "ValidationError") {
        const validationErrors = err.errors.map((e) => e.message);
        return res.status(400).json({ errors: validationErrors });
      }
  
      // General error handling
      return res.status(500).json({ errors: [err.message] });
    }
  };
  

 const statusUpdateByOperator = async (req,res)=>{
    
 }




  module.exports={AllBookingFinderFromResultForUser,StatusUpdateByStudent,statusUpdateByOperator}


 
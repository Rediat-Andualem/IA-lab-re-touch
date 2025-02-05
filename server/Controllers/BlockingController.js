const { Blocking } = require('../models'); 
// day type should be  = Feb 8  three first letter with

const BlockingInputs = async (req, res) => {
  const { blockingDay, blockingNumber, blockingMessage } = req.body;
  const errors = [];

  // Helper function for input validation
  const validateInputs = () => {
    // Check for missing fields
    if (!blockingDay || !blockingMessage || !blockingNumber) {
      errors.push("All fields are required.");
    } else if (blockingMessage.length > 25) {
      // Adjusted message length validation
      errors.push("Message should be less than 25 characters including spaces.");
    }
  };

  // Run validation
  validateInputs();

  // Check if there are any errors
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }

  try {
    // Create the blocking record
    const BlockingInputsSaving = await Blocking.create({
      blockingNumber,
      blockingDay,
      blockingMessage,
    });

    return res.status(200).json({
      message: "Blocking created successfully.",
      data: {
        blockingMessage: BlockingInputsSaving.blockingMessage,
        blockingDay: BlockingInputsSaving.blockingDay,
        blockingNumber: BlockingInputsSaving.blockingNumber,
      },
    });
  } catch (err) {
    if (err.name === "ValidationErrorItem") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: [validationErrors] });
    }

    return res.status(500).json({ errors: [err.message] });
  }
};


const DeleteBlocking = async (req, res) => {
    const { blockingId, role } = req.params;
  
    // Validation checks
    if (!blockingId || !role) {
      return res.status(400).json({ errors: ["Blocking ID and role are required"] });
    }
  
    try {
      // Find the blocking entry by ID
      const BlockingInfo = await Blocking.findByPk(blockingId);
  
      // Check if the blocking entry exists
      if (!BlockingInfo) {
        return res.status(404).json({ errors: ["Blocking Date not found."] });
      }
  
      // Check if the user's role is an admin role
      if (role !== "1" && role !== "3" && role !== "4") {
        return res
          .status(403)
          .json({ errors: ["Only admin can delete Blocking"] });
      }
  
      // Perform the deletion of the specific blocking entry
      await Blocking.destroy({
        where: {
           blockingId 
        }
      });
  
      // Respond with a success message
      return res
        .status(200)
        .json({ message: ["Blocking deleted successfully."] });
    } catch (err) {
      if (err.name === "ValidationErrorItem") {
        const validationErrors = err.errors.map((e) => e.message);
        return res.status(400).json({ errors: [validationErrors.message] });
      }
      return res.status(500).json({ errors: [err.message] });
    }
  };
  

  const GetAllBlocking = async (req, res) => {
    try {
      // Retrieve all blocking records from the database
      const allBlockingRecords = await Blocking.findAll();
  
      // Check if no records were found
      if (allBlockingRecords.length === 0) {
        return res.status(404).json({ errors: ["No blocking records found."] });
      }
  
      // Return the retrieved records
      return res.status(200).json({
        message: "Blocking records retrieved successfully.",
        data: allBlockingRecords,
      });
    } catch (err) {
      // Handle any errors
      return res.status(500).json({ errors: [err.message] });
    }
  };
  

  
  module.exports = {BlockingInputs,DeleteBlocking,GetAllBlocking};
const { Professor } = require("../models");


const createProfessorProfile = async (req, res) => {
  const { firstName, lastName, email, labName, labRoomNumber } = req.body;

  // Helper function to validate individual fields
  const validateField = (value, errorMessage, regex = null) => {
    if (!value) {
      res.status(400).json({ error: errorMessage });
      return false; // Stop execution
    }
    if (regex && !regex.test(value)) {
      res.status(400).json({ error: errorMessage });
      return false; // Stop execution
    }
    return true;
  };

  // Trim input values
  const trimmedFirstName = firstName ? firstName.trim() : "";
  const trimmedLastName = lastName ? lastName.trim() : "";
  const trimmedEmail = email ? email.trim() : "";
  const trimmedLabName = labName ? labName.trim() : "";
  const trimmedLabRoomNumber = labRoomNumber ? labRoomNumber.trim() : "";

  // Check for missing required fields
  if (!trimmedFirstName || !trimmedLastName || !trimmedEmail) {
    return res.status(400).json({
      error: "All required fields (firstName, lastName, email) must be provided.",
    });
  }

  // Validate each field individually
  if (
    !validateField(
      trimmedFirstName,
      'First name must start with "Dr." followed by a valid name(alphabet only) without spaces. Example: "Dr.George".',
      /^Dr\.[A-Za-z]+$/
    )
  )
    return;

  if (
    !validateField(
      trimmedLastName,
      "Last name must contain only letters.",
      /^[A-Za-z]+$/
    )
  )
    return;

  if (
    !validateField(
      trimmedEmail,
      'Email must be a valid IITR email address ending with "iitr.ac.in". Example: "name_t@ch.iitr.ac.in".',
      /^[^\s@]+@.*\.iitr\.ac\.in$/
    )
  )
    return;

  // Optional fields validation
  if (
    trimmedLabName &&
    !validateField(
      trimmedLabName,
      "Lab name must only include letters, numbers, and spaces. Example: 'Advanced Research Lab'.",
      /^[A-Za-z0-9 ]+$/
    )
  )
    return;

  if (
    trimmedLabRoomNumber &&
    !validateField(
      trimmedLabRoomNumber,
      "Lab room number must contain only letters, numbers, and hyphens. Example: 'B-304'.",
      /^[A-Za-z0-9-]+$/
    )
  )
    return;

  try {
    // Create the professor record
    const professor = await Professor.create({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      email: trimmedEmail.toLowerCase(),
      labName: trimmedLabName || null,
      labRoomNumber: trimmedLabRoomNumber || null,
    });

    return res
      .status(201)
      .json({ message: ["Professor profile created successfully"], professor });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: validationErrors });
    }
    return res.status(500).json({ errors: [err.message] });
  }
};



const allProfessorsFinder = async (req, res) => {
    try {
      // Fetch all users from the database, excluding sensitive fields like password
      const AllProfessors = await Professor.findAll();
  
      // Respond with an empty array if no users are found, but still return 200 OK
      if (AllProfessors.length === 0) {
        return res.status(200).json({ message: ["No Professor list found."] });
      }
  
      // Respond with the list of users
      return res.status(200).json({ AllProfessors });
    } catch (err) {
      if (err.name === "ValidationErrorItem") {
        const validationErrors = err.errors.map((e) => e.message);
        return res.status(400).json({ errors: [validationErrors.message] });
      }
      return res.status(500).json({ errors: [err.message] });
    }
  };


  const deleteProfessor = async (req, res) => {
    const { professorId } = req.params;
  
    try {
      // Check if the professor exists
      const professor = await Professor.findByPk(professorId);
  
      if (!professor) {
        return res.status(404).json({
          errors: ["Professor not found with the provided ID."],
        });
      }
  
      // Delete the professor
      await professor.destroy();
  
      return res.status(200).json({
        message: "Professor deleted successfully.",
      });
    } catch (err) {
      return res.status(500).json({
        errors: [err.message],
      });
    }
  };
  

  module.exports = {
    allProfessorsFinder,createProfessorProfile,deleteProfessor
  };
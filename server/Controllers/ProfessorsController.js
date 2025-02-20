const { Professor,User,Booking,Equipment } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const createProfessorProfile = async (req, res) => {
  const { firstName, lastName, email, labName, password, labRoomNumber } = req.body;

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

  const trimmedFirstName = firstName ? firstName.trim() : "";
  const trimmedLastName = lastName ? lastName.trim() : "";
  const trimmedEmail = email ? email.trim() : "";
  const trimmedLabName = labName ? labName.trim() : "";
  const trimmedLabRoomNumber = labRoomNumber ? labRoomNumber.trim() : "";
  const trimmedPassword = password ? password.trim() : "";

  // Check for missing required fields
  if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !trimmedPassword) {
    return res.status(400).json({
      error: "All required fields (firstName, lastName, email) must be provided.",
    });
  }

  if (
    !validateField(
      trimmedFirstName,
      "Last name must contain only letters.",
       /^[A-Za-z]+$/
    )
  ) return;

  if (
    !validateField(
      trimmedLastName,
      "Last name must contain only letters.",
      /^[A-Za-z]+$/
    )
  ) return;

  if (
    !validateField(
      trimmedEmail,
      'Email must be a valid IITR email address ending with "iitr.ac.in". Example: "name_t@ch.iitr.ac.in".',
      /^[^\s@]+@.*\.iitr\.ac\.in$/
    )
  ) return;

  if (
    trimmedLabName &&
    !validateField(
      trimmedLabName,
      "Lab name must only include letters, numbers, and spaces. Example: 'Advanced Research Lab'.",
      /^[A-Za-z0-9 ]+$/
    )
  ) return;

  if (
    trimmedLabRoomNumber &&
    !validateField(
      trimmedLabRoomNumber,
      "Lab room number must contain only letters, numbers, and hyphens. Example: 'B-304'.",
      /^[A-Za-z0-9-]+$/
    )
  ) return;

  if (
    trimmedPassword &&
    !validateField(
      trimmedPassword,
      "Password must be at least 6 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/
    )
  ) return;

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(trimmedPassword, salt);

  try {
    // Create the professor record
    const professor = await Professor.create({
      firstName: `Dr.${trimmedFirstName} `,
      lastName: trimmedLastName,
      email: trimmedEmail.toLowerCase(),
      labName: trimmedLabName || null,
      labRoomNumber: trimmedLabRoomNumber || null,
      password: hashPassword,
    });

    // Send email asynchronously
    const sendEmail = async () => {
      let mailSender = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const details = {
        from: process.env.EMAIL_USER,
        to: professor.email,
        subject: "Credentials for accessing IA lab professors portal",
        html: `
          <html>
          <head>
           <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f6f6f6;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  border: 1px solid #cccccc;
              }
              .header {
                  text-align: center;
                  padding: 10px 0;
              }
              .content {
                  text-align: center;
                  padding: 20px;
              }
              .cta-button {
                  display: inline-block;
                  padding: 15px 25px;
                  margin: 20px 0;
                  background-color: #FF8318;
                  color: #ffffff;
                  font-weight: bold;
                  text-decoration: none;
                  border-radius: 5px;
                  text-align: center;
              }
              .footer {
                  text-align: center;
                  padding: 10px 0;
                  font-size: 12px;
                  color: #777777;
              }
          </style></head>
          <body>
             <div class="container">
              <div class="header">
                  <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" fill="#007BFF"/>
                      <h1>IA Lab.</h1>
                  </svg>
              </div>
              <div class="content">
                   <h3>Credentials to access IA lab Professor's portal</h3>
                  <h5>Make sure to update your password using the forgot password option up on login</h5>
                <p> <b>Email</b>: ${email}</p>
            <p> <b>Password</b>: ${password}</p>
              </div>
              <div class="footer">
                  <p>If you did not sign up for this account, please ignore this email.</p>
              </div>
          </div>
          </body>
        
      </body>
          </html>
        `,
      };

      try {
        await mailSender.sendMail(details);
        console.log("Email sent to:", professor.email);
      } catch (err) {
        console.log("Error sending email:", err);
        throw new Error("Error sending email");
      }
    };

    // Call sendEmail
    await sendEmail();

    // Send success response after email is sent
    return res.status(201).json({ message: "Professor profile created successfully", professor });
  } catch (err) {
    console.error(err);
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
  
const ProfessorLogin = async (req, res) => {
  const { email, password } = req.body;

  const errors = [];

  // Trim input values
  const trimmedEmail = email ? email.trim() : "";
  const trimmedPassword = password ? password.trim() : "";

  // Validation checks
  if (!trimmedEmail) errors.push("Email is required.");
  if (!trimmedPassword) errors.push("Password is required.");

  // If there are validation errors, respond with the errors
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Find the user by email
    const user = await Professor.findOne({ where: { email: trimmedEmail } });
    // Check if user exists
    if (!user) {
      return res.status(401).json({ errors: ["Invalid credentials"] });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ errors: ["Invalid credentials"] });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.professorId	,
        userName: user.firstName,
        userEmail:user.email,
        userRole : "5"
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    // Send response with token
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).json({
      message: ["User logged in successfully"],
    });
  } catch (err) {
    if (err.name === "ValidationErrorItem") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: [validationErrors.message] });
    }

    return res.status(500).json({ errors: [err.message] });
  }
};

const ProfessorResetRequest = async (req, res) => {
  const { email } = req.body;
  const errors = [];


  // Validation checks
  if (!email) {
    errors.push("Email is required.");
  }

  // If there are validation errors, respond with the errors
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Find the user by email
    const user = await Professor.findOne({ where: { email } });

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ message: ["Update link has been sent to your email"] });
    }

    // Create a password reset link
    const resetLink = `http://${process.env.FRONTEND_URL}/ProfessorPasswordReset/${user.professorId}`


    // Send email asynchronously
    const sendEmail = async () => {
      let mailSender = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const details = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset Request For Professors",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Update Password</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f6f6f6;
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #ffffff;
                      padding: 20px;
                      border-radius: 8px;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                      border: 1px solid #cccccc;
                  }
                  .header {
                      text-align: center;
                      padding: 10px 0;
                  }
                  .content {
                      text-align: center;
                      padding: 20px;
                  }
                  .cta-button {
                      display: inline-block;
                      padding: 15px 25px;
                      margin: 20px 0;
                      background-color: #FF8318;
                      color: #ffffff;
                      font-weight: bold;
                      text-decoration: none;
                      border-radius: 5px;
                      text-align: center;
                  }
                  .footer {
                      text-align: center;
                      padding: 10px 0;
                      font-size: 12px;
                      color: #777777;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                          <rect width="100" height="100" fill="#007BFF"/>
                          <h1>IA Lab.</h1>
                      </svg>
                  </div>
                  <div class="content">
                      <h3>Update your password</h3>
                      <h5>Click the button below to update the password which was provided to you from admin section</h5>
                      
                      <a href="${resetLink}" class="cta-button">Update Password</a>
                  </div>
                  <div class="footer">
                      <p>If you did not sign up for this account, please ignore this email.</p>
                  </div>
              </div>
          </body>
          </html>
        `,
      };
      
      try {
        // Send the email asynchronously and await its result
        const info = await mailSender.sendMail(details);
        console.log("Email sent:", info.response);
        return res.status(200).json({ message: ["Password reset email sent"] });
      } catch (err) {
        console.log("Error sending email:", err);
        return res.status(500).json({ message: ["Error sending email"] });
      }
    };

    // Call sendEmail asynchronously
    await sendEmail();

  } catch (err) {
    if (err.name === "ValidationErrorItem") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: [validationErrors.message] });
    }
    return res.status(500).json({ errors: [err.message] });
  }
};


const ProfessorPasswordUpdate = async (req, res) => {
  const { professorId	 } = req.params;
  const { newPassword } = req.body;
  const errors = [];

  // Validate new password (as previously done)
  if (!newPassword) {
    errors.push("New password is required.");
  } else {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      errors.push(
        "Password must be at least 6 characters long and include one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }
  }

  // If there are validation errors, respond with the errors
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Find the user by ID
    const user = await Professor.findByPk(professorId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ errors: ["User not found."] });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;

    // Save the updated user to the database
    await user.save();

    // Respond with a success message
    return res
      .status(200)
      .json({ message: ["Password updated successfully."] });
  } catch (err) {
    if (err.name === "ValidationErrorItem") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: [validationErrors.message] });
    }
    return res.status(500).json({ errors: [err.message] });
  }
};


const GetProfessorStudents = async (req,res)=>{
      const {professorId}=req.params

      try {
        // Fetch all users from the database, excluding sensitive fields like password
        const AllProfessorsStudents = await User.findAll({
          where: { guideId: professorId },
          attributes: { exclude: ['password'] }
        });
        
        // Respond with an empty array if no users are found, but still return 200 OK
        if (AllProfessorsStudents.length === 0) {
          return res.status(200).json({ message: ["No Student list to show"] });
        }
    
        // Respond with the list of users
        return res.status(200).json({ AllProfessorsStudents });
      } catch (err) {
        if (err.name === "ValidationErrorItem") {
          const validationErrors = err.errors.map((e) => e.message);
          return res.status(400).json({ errors: [validationErrors.message] });
        }
        return res.status(500).json({ errors: [err.message] });
      }
}

const deleteProfessorStudents = async(req, res) => {
  const { studentId } = req.params;

  try {
    // Check if the student exists
    const studentToDelete = await User.findByPk(studentId);
    if (!studentToDelete) {
      return res.status(404).json({
        errors: ["No student with the provided ID."],
      });
    }

    // Delete the student
    await User.destroy({
      where: { userId: studentId } 
    });

    return res.status(200).json({
      message: "Student deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      errors: [err.message],
    });
  }
};

const viewStudentBooking = async (req, res) => {
  const { userId, guideId } = req.params;

  try {
    // Fetch the booking history of the student, including the related equipment details
    const bookingHistoryOfStudent = await Booking.findAll({
      where: { guideId, userId },
      include: {
        model: Equipment,
        attributes: ['equipmentName'], // Only include the equipmentName from the Equipment table
      },
      attributes: ['bookingId', 'bookedDate', 'slotTime', 'slotDate', 'bookingStatus'], // Only include the necessary fields from Booking
    });

    // Respond with an empty array if no bookings are found, but still return 200 OK
    if (bookingHistoryOfStudent.length === 0) {
      return res.status(200).json({ message: ["No booking history found."] });
    }

    // Respond with the booking history along with the equipment name
    return res.status(200).json({ bookingHistoryOfStudent });
  } catch (err) {
    if (err.name === "ValidationErrorItem") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: [validationErrors.message] });
    }
    return res.status(500).json({ errors: [err.message] });
  }
};

module.exports = {
    allProfessorsFinder,createProfessorProfile,deleteProfessor,ProfessorLogin,ProfessorResetRequest,ProfessorPasswordUpdate,GetProfessorStudents,deleteProfessorStudents,viewStudentBooking
  };
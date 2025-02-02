const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User,Professor} = require("../models");
const nodemailer = require("nodemailer");

// const {html}=mjml2html(mjml)
const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    instituteId,
    guideId,
    mobileNumber,
    password,
  } = req.body;

  const errors = [];

  // Helper function for input validation
  const validateInputs = () => {
    const trimmedFirstName = firstName ? firstName.trim() : "";
    const trimmedLastName = lastName ? lastName.trim() : "";
    const trimmedEmail = email ? email.trim() : "";
    const trimmedInstituteID = instituteId ? instituteId.trim() : "";
    const trimmedGuideId= guideId ? guideId.trim() : "";
    const trimmedMobileNumber = mobileNumber? mobileNumber.trim():""
    const trimmedPassword = password ? password.trim() : "";
    // Check for missing fields
    if (
      !trimmedFirstName ||
      !trimmedLastName ||
      !trimmedEmail ||
      !trimmedInstituteID ||
      !trimmedGuideId ||
      !trimmedMobileNumber ||
      !trimmedPassword
    ) {
      errors.push("All fields are required.");
    }

    // Validate firstname (letters only)
    if (!/^[A-Za-z]+$/.test(trimmedFirstName)) {
      errors.push("First name must contain letters only.");
    }

    // Validate lastname (letters only)
    if (!/^[A-Za-z]+$/.test(trimmedLastName)) {
      errors.push("Last name must contain letters only.");
    }

    if (!/^\d+$/.test(trimmedInstituteID)) {
      errors.push("Institute ID must contain numbers only.");
    }
    
    if (!/^\+91\d{10}$/.test(trimmedMobileNumber)) {
      errors.push("Contact number must start with +91 and contain 12 digits in total (excluding +).");
    }
    

    // Validate email format
const emailRegex = /^[^\s@]+@ch\.iitr\.ac\.in$/;

if (!emailRegex.test(trimmedEmail)) {
  errors.push("Invalid email ID");
}


    // Validate password complexity
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    if (!passwordRegex.test(trimmedPassword)) {
      errors.push(
        "Password must be at least 6 characters long and include one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }
  };

  // Run validation
  validateInputs();

  // Check if there are any errors
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        instituteId: instituteId.trim(),
        guideId: guideId.trim(),
        email: email.trim().toLowerCase(),
        mobileNumber: mobileNumber.trim(),
        password: hashPassword,
    });

    const guideEmail = await Professor.findOne({
      where: { professorId: guideId },
      attributes: ['email'],
    });
 

// Create a password reset link
const resetLink = `http://${process.env.FRONTEND_URL}/studentConfirmation/${user.userId}`


// Send email asynchronously
const sendEmail = async () => {
  // let mailSender = nodemailer.createTransport({
  //   service: "gmail",
  //   port: 465,
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });
  const mailSender = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, 
    },
  });
  

  const details = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `${user.firstName} is requesting to access IA lab booking portal`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm Student</title>
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
                  <h3>Confirm student</h3>
                  <h5>By clicking the button below, you are confirming that the student is working under your supervision and granting permission for the use of equipment in the IA lab. Additionally, you will have access to view the equipment utilized by your students through the IA Lab Professors Portal.</h5>
                  <a href="${resetLink}" class="cta-button">Confirm Access to ${user.firstName}</a>
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
    // Generate JWT token
    // const token = jwt.sign(
    //   {
    //     userId: user.userId,
    //     userName: user.firstName,
    //     userEmail:user.email,
    //     userRole: user.role,
    //     verification:user.verification,
    //     userGuidEmail : guideEmail.email
    //   },
    //   process.env.JWT_SECRET_KEY,
    //   { expiresIn: "3d" }
    // );

    // res.setHeader("Authorization", `Bearer ${token}`);
    // return res.status(200).json({
    //   message: ["User created successfully"],
    // });

  } catch (err) {
    if (err.name === "ValidationErrorItem") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: [validationErrors.message] });
    }

    return res.status(500).json({ errors: [err.message] });
  }
};

const userLogIn = async (req, res) => {
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
    const user = await User.findOne({ where: { email: trimmedEmail } });
    // Check if user exists
    if (!user) {
      return res.status(401).json({ errors: ["Invalid credentials"] });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ errors: ["Invalid credentials"] });
    }
    if(!user.verification){
      return res.status(401).json({ errors: ["You're not verified yet. Please ask your guide to respond to the confirmation email already sent."] });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.userId,
        userName: user.firstName,
        userEmail:user.email,
        userRole: user.role,
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

const userProfileUpdate = async (req, res) => {
  const { userId } = req.params;
  const { username, firstname, lastname, role } = req.body;
  const errors = [];

  // Helper function for input validation
  const validateInputs = () => {
    const trimmedUsername = username ? username.trim() : undefined;
    const trimmedFirstname = firstname ? firstname.trim() : undefined;
    const trimmedLastname = lastname ? lastname.trim() : undefined;
    const trimmedrole = role ? role.trim() : undefined;

    // Validation checks for required fields
    const isAnyFieldProvided = [
      trimmedUsername,
      trimmedFirstname,
      trimmedLastname,
      trimmedrole,
    ].some((field) => field !== undefined);

    if (!isAnyFieldProvided) {
      errors.push("At least one field must be provided for update.");
    }
    // Check for valid username (optional: customize as needed)
    if (trimmedUsername && trimmedUsername.length < 3) {
      errors.push("Username must be at least 3 characters long.");
    }

    // Validate firstname (letters only)
    if (trimmedFirstname && !/^[A-Za-z]+$/.test(trimmedFirstname)) {
      errors.push("First name must contain letters only.");
    }

    // Validate lastname (letters only)
    if (trimmedLastname && !/^[A-Za-z]+$/.test(trimmedLastname)) {
      errors.push("Last name must contain letters only.");
    }
  };

  // Run validation
  validateInputs();

  // Check if there are any errors
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ errors: ["User not found."] });
    }
    // Update user information only for fields that are provided
    Object.assign(user, {
      username: username ? username.trim() : user.username,
      firstname: firstname ? firstname.trim() : user.firstname,
      lastname: lastname ? lastname.trim() : user.lastname,
      role: role ? role.trim() : user.role,
    });
    // Save the updated user to the database
    await user.save();

    // Respond with the updated user data
    return res.status(200).json({ message: ["Profile updated successfully."] });
  } catch (err) {
    if (err.name === "ValidationErrorItem") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: [validationErrors.message] });
    }

    return res.status(500).json({ errors: [err.message] });
  }
};

const userRoleUpdater = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  const errors = [];

  // roles 👍
  // 0 user (default)
  // 1 lab technician  
  // 2  TA
  // 3  admin 
  // 4  super-admin


  // List of valid roles
  const validRoles = ["0", "1", "2","3","4"];

  // Validation checks
  if (!role) {
    errors.push("Role is required.");
  } else if (!validRoles.includes(role)) {
    errors.push("Invalid role provided.");
  }

  // If there are validation errors, respond with the errors
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ errors: ["User not found."] });
    }

    // Update user role
    user.role = role;

    // Save the updated user to the database
    await user.save();

    // Remove sensitive information from the response
    const { password, ...updatedUser } = user.toJSON();

    // Respond with the updated user data
    return res
      .status(200)
      .json({ message: ["User role updated successfully."] });
  } catch (err) {
    if (err.name === "ValidationErrorItem") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: [validationErrors.message] });
    }
    return res.status(500).json({ errors: [err.message] });
  }
};

const userProfileDelete = async (req, res) => {
  const { userId } = req.params;

  // Validation checks
  if (!userId) {
    return res.status(400).json({ errors: ["User ID is required."] });
  }

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ errors: ["User not found."] });
    }

    // Check if the user's role is the admin role (1)
    console.log(user.role);
    console.log(typeof user.role);
    if (user.role === "1") {
      return res
        .status(403)
        .json({ errors: ["Admin profiles cannot be deleted."] });
    }

    // Hard delete the user profile
    await user.destroy();

    // Respond with a success message
    return res
      .status(200)
      .json({ message: ["User profile deleted successfully."] });
  } catch (err) {
    if (err.name === "ValidationErrorItem") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: [validationErrors.message] });
    }
    return res.status(500).json({ errors: [err.message] });
  }
};

const singleUserFinder = async (req, res) => {
  const { userId } = req.params;

  // Validation check
  if (!userId) {
    return res.status(400).json({ errors: ["User ID is required."] });
  }

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ errors: ["User not found."] });
    }

    // Exclude sensitive data from the response
    const { password, ...safeUserData } = user.toJSON();

    // Respond with the user data (excluding sensitive information)
    return res.status(200).json({ user: safeUserData });
  } catch (err) {
    if (err.name === "ValidationErrorItem") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: [validationErrors.message] });
    }
    return res.status(500).json({ errors: [err.message] });
  }
};

const allUserFinder = async (req, res) => {
  try {
    // Fetch all users from the database, excluding sensitive fields like password
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    // Respond with an empty array if no users are found, but still return 200 OK
    if (users.length === 0) {
      return res.status(200).json({ message: ["No users found."] });
    }

    // Respond with the list of users
    return res.status(200).json({ users });
  } catch (err) {
    if (err.name === "ValidationErrorItem") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: [validationErrors.message] });
    }
    return res.status(500).json({ errors: [err.message] });
  }
};


const userPasswordResetRequest = async (req, res) => {
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
    const user = await User.findOne({ where: { email } });

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ message: ["Update link has been sent to your email"] });
    }

    // Create a password reset link
    const resetLink = `http://${process.env.FRONTEND_URL}/userPasswordReset/${user.userId}`


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
        subject: "Password Reset Request",
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
                      <h5>Click the button below to update your password.</h5>
                      
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


const userPasswordUpdate = async (req, res) => {
  const { userId } = req.params;
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
    const user = await User.findByPk(userId);

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

const confirmUser = async (req, res) => {
  const { userId } = req.params;
  console.log(userId)
  try {
    // Find the user by primary key (userId)
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ errors: ["User not found."] });
    }

    // Update only the 'verification' column to true
    await user.update({
      verification: true,
    });

    return res.status(200).json({ message: "Student Confirmation successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["An error occurred while updating user verification."] });
  }
};


module.exports = {
  createUser,
  userLogIn,
  userProfileUpdate,
  userRoleUpdater,
  userProfileDelete,
  singleUserFinder,
  userPasswordResetRequest,
  allUserFinder,
  userPasswordUpdate,
  confirmUser
};

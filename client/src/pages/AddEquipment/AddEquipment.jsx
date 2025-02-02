// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../Utility/urlInstance.js";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
// } from "mdb-react-ui-kit";
// import useSignIn from "react-auth-kit/hooks/useSignIn";
// import useAuthUser from "react-auth-kit/hooks/useAuthUser";
// import { jwtDecode } from "jwt-decode";
// import { Link, useNavigate } from "react-router-dom";
// import "./AddEquipment.css";
// import {BeatLoader} from 'react-spinners'
// // import Spinner from 'react-bootstrap/spi';
// import Spinner from "react-bootstrap/Spinner";
// function AddEquipment() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [handleError, setHandleError] = useState("");
//   const [operator, setOperator] = useState([]);

//   //!   ---------------------
//   const signIn = useSignIn();
//   const navigate = useNavigate();
//   const auth = useAuthUser();
//   //   ! sign up and log in data

//   const [signUpData, setSignUpData] = useState({
//     equipmentName: "",
//     equipmentModel: "",
//     guidelines: "",
//     maxSamples: "",
//     maxBookingsPerTwoWeeks: "",
//     operatorName: "",
//     operatorEmail: "",
//     operatorPhoneNumber: "",
//     workingStatus: "",
//   });
//   //! --- get operators 

// useEffect(()=>{
//    let getOperators = async()=>{
//       const operator = await axiosInstance.get('/equipments/getOperator')
//       setOperator(operator?.data.users)
//    }
//    getOperators()
// })

// const handleOperatorChange = (userId) => {
//   setSignUpData((prev) => ({ ...prev, operatorId: userId }));
// };


//   // !--------------------------------------------
//   return (
//     <MDBContainer fluid className="p-4 container">
//       <MDBRow>
//         <MDBCol
//           md="6"
//           className="text-center text-md-start d-flex flex-column justify-content-center"
//         >
//           <h1 className="my-5 display-3 fw-bold ls-tight px-3 text-white">
//            Add <br />
//             <span className="text-warning">Equipments</span>
//           </h1>
//           <h5
//             className="px-3"
//             style={{ color: "#F5F5F5", textAlign: "justify" }}
//           >

// Please enter the equipments details in the designated space. Be sure to double-check the information and refer to the example provided in the label if needed.
//           </h5>
//         </MDBCol>

//         <MDBCol md="6" className="position-relative">
//           <MDBCard className="">
//             <MDBCardBody
//               className="p-5 position-relative overflow-hidden"
//               style={{ height: "650px" }}
//             >
//               <div
//                 className="form-transition-container"
//                 style={{
//                   position: "absolute",
//                   width: "80%",
//                   height: "100%",
//                   top: 0,
//                   left: isLogin ? "0%" : "-100%",
//                   transition: "left 0.6s ease-in-out",
//                   padding: "6% 0 0 20%",
//                 }}
//               >
//                 {/* Login Form */}
//                 <div className="auth-form mt-1">
//                   {handleError && (
//                     <span className="errorDisplay">{handleError}</span>
//                   )}
//                   <form onSubmit={LogIn}>
//                     <h2 className="mb-4">Insert  Details</h2>
//                     <MDBInput
//                       wrapperClass="mb-4"
//                       label="Equipment name"
//                       id="email-login"
//                       type="text"
//                       name="equipmentName"
//                       onChange={handleLogIn}
//                     />
//                     <MDBInput
//                       wrapperClass="mb-4"
//                       label="Equipment model"
//                       id="email-login"
//                       type="text"
//                       name="equipmentModel"
//                       onChange={handleLogIn}
//                     />
//                     <MDBInput
//                       wrapperClass="mb-4"
//                       label="Guideline"
//                       id="email-login"
//                       type="text"
//                       name="guidelines"
//                       onChange={handleLogIn}
//                     />
//                     <MDBInput
//                       wrapperClass="mb-4"
//                       label="Maximum number of sample per slot"
//                       id="email-login"
//                       type="text"
//                       name="maxSamples"
//                       onChange={handleLogIn}
//                     />
//                     <MDBInput
//                       wrapperClass="mb-4"
//                       label="Maximum booking for 2 weeks"
//                       id="email-login"
//                       type="text"
//                       name="maxBookingsPerTwoWeeks"
//                       onChange={handleLogIn}
//                     />
//                     {/* <MDBInput
//                       wrapperClass="mb-4"
//                       label="Operator name"
//                       id="email-login"
//                       type="text"
//                       name="operatorName"
//                       onChange={handleLogIn}
//                     />
//                     <MDBInput
//                       wrapperClass="mb-4"
//                       label="Operator email (IITR)"
//                       id="email-login"
//                       type="text"
//                       name="operatorEmail"
//                       onChange={handleLogIn}
//                     />
//                     <MDBInput
//                       wrapperClass="mb-4"
//                       label="Operator phone number (10 digit)"
//                       id="email-login"
//                       type="text"
//                       name="operatorPhoneNumber"
//                       onChange={handleLogIn}
//                     /> */}

// <select
//   className="form-select mb-4"
//   onChange={(e) => handleOperatorChange(e.target.value)}
//   required
// >
//   <option value="" disabled>
//     Select Operator
//   </option>
//   {operator.map((op) => (
//     <option key={op.userId} value={op.userId}>
//       {op.email}
//     </option>
//   ))}
// </select>



//                     <MDBBtn
//                       className="w-100 mb-4"
//                       size="md"
//                       type="submit"
//                       disabled={loading}
//                     >
//                       {loading ? <BeatLoader /> : "Add Equipment"}
//                     </MDBBtn>
//                     <div className="forgot">
//                 </div>
//                   </form>
//                 </div>
//               </div>

//               <div
//                 className="form-transition-container"
//                 style={{
//                   position: "absolute",
//                   width: "80%",
//                   height: "100%",
//                   top: 0,
//                   left: isLogin ? "100%" : "0%",
//                   transition: "left 0.6s ease-in-out",
//                   padding: "0 0 0 20%",
//                 }}
//               >
//                 {/* Signup Form */}
//                 <div className="auth-form">
//                   {handleError && (
//                     <span className="errorDisplay">{handleError}</span>
//                   )}
//                 </div>
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }

// export default AddEquipment;

import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Utility/urlInstance.js";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea
} from "mdb-react-ui-kit";
import { BeatLoader } from "react-spinners";
import "./AddEquipment.css";

function AddEquipment() {
  const [loading, setLoading] = useState(false);
  const [handleError, setHandleError] = useState("");
  const [operator, setOperator] = useState([]);
  const [success, setHandleSuccess] = useState("");
  const [signUpData, setSignUpData] = useState({
    equipmentName: "",
    equipmentModel: "",
    guidelines: "",
    maxSamples: "",
    maxBookingsPerTwoWeeks: "",
    operatorId: "",
    workingStatus: true, // assuming default to true
  });

  // Fetch operators on component mount
  useEffect(() => {
    const getOperators = async () => {
      try {
        const response = await axiosInstance.get("/equipments/getOperator");
        setOperator(response?.data.users || []);
      } catch (error) {
        console.error("Error fetching operators", error);
      }
    };
    getOperators();
  }, []);

  const handleOperatorChange = (userId) => {
    setSignUpData((prev) => ({ ...prev, operatorId: userId }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/equipments/equipmentDetails", signUpData);
      console.log(response.data);
      setHandleSuccess("Equipment Added Successfully")
    } catch (error) {
      setHandleError("Failed to add equipment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="p-4 container">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3 text-white">
            Add <br />
            <span className="text-warning">Equipments</span>
          </h1>

       

<h5 className="px-3" style={{ color: "#F5F5F5", textAlign: "justify" }}>Please enter the equipment details in the designated space. Be sure to double-check the information, as it will be used by students for publication purposes. The equipment information should include the Equipment Model (e.g., name with model, company, and country e.g., GC-MS 11256, Agilent, USA).</h5>

        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <MDBCard className="">
            <MDBCardBody
              className="p-5 position-relative overflow-hidden"
              style={{ height: "650px" }}
            >
              <div
                className="form-transition-container"
                style={{
                  position: "absolute",
                  width: "80%",
                  height: "100%",
                  top: 0,
                  left: "0%",
                  padding: "6% 0 0 20%",
                }}
              >
                <div className="auth-form mt-1">
                  {handleError && <span className="errorDisplay fw-bold">{handleError}</span>}
                  {success && <p className="text-success fw-bold">{success}</p>}
                  <form onSubmit={handleSubmit}>
                    <h2 className="mb-4">Insert Details</h2>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Equipment Name"
                      type="text"
                      name="equipmentName"
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Equipment Model"
                      type="text"
                      name="equipmentModel"
                      onChange={handleInputChange}
                    />
                    <MDBTextArea
                      wrapperClass="mb-4"
                      label="Guideline (600 characters)"
                      type="text"
                      name="guidelines"
                       maxLength="600"
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Max. Samples per slot"
                      type="text"
                      name="maxSamples"
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Max. Bookings (2 weeks)"
                      type="text"
                      name="maxBookingsPerTwoWeeks"
                      onChange={handleInputChange}
                    />

                    <select
                      className="form-select mb-4"
                      onChange={(e) => handleOperatorChange(e.target.value)}
                      value={signUpData.operatorId}
                      required
                    >
                      <option value="" disabled>
                        Select Operator
                      </option>
                      {operator.map((op) => (
                        <option key={op.userId} value={op.userId}>
                          {op.email}
                        </option>
                      ))}
                    </select>

                    <MDBBtn
                      className="w-100 mb-4"
                      size="md"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <BeatLoader /> : "Add Equipment"}
                    </MDBBtn>
                  </form>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AddEquipment;


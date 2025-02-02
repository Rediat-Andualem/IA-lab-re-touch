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
} from "mdb-react-ui-kit";
import {BeatLoader} from 'react-spinners'
import classes from './AddProfessors.module.css'
// import Spinner from 'react-bootstrap/spi';
function AddProfessors() {
  const [loading, setLoading] = useState(false);
  const [handleError, setHandleError] = useState("");
  const [success, setHandleSuccess] = useState("");
  //!   ---------------------
  const [registerProf, setProfData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    labName: "",
    labRoomNumber: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Clear previous messages
    setHandleError(""); // Clear any previous error
    setHandleSuccess(""); // Clear any previous success
  
    try {
      const response = await axiosInstance.post("/professors/createProfessorProfile", registerProf);
      setHandleSuccess(response?.data.message);
    } catch (error) {
      setHandleError(error.response.data.errors[0]);
    } finally {
      setLoading(false);
    }
  };
  
 //* -----------------------
  let handleProfessorDetails = (e) => {
    switch (e.target.name) {
      case "firstName":
        setProfData((pre) => {
          return { ...pre, firstName: e.target.value };
        });
        break;
      case "lastName":
        setProfData((pre) => {
          return { ...pre, lastName: e.target.value };
        });
        break;
      case "email":
        setProfData((pre) => {
          return { ...pre, email: e.target.value };
        });
        break;
      case "labName":
        setProfData((pre) => {
          return { ...pre, labName: e.target.value };
        });
        break;
      case "labRoomNumber":
        setProfData((pre) => {
          return { ...pre, labRoomNumber: e.target.value };
        });
        break;
      default:
        break;
    }
  };
  return (
   <div className={classes.mainDash}>
       <MDBContainer fluid  className="p-5 container">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3 text-white">
           Add <br />
            <span className="text-warning">Professor Profile</span>
          </h1>
          <h5
            className="px-3"
            style={{ color: "#F5F5F5", textAlign: "justify" }}
          >
               Please enter the professor's details in the designated space. Be sure to double-check the information and refer to the example provided in the label if needed.
          </h5>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <MDBCard className="">
            <MDBCardBody
              className="p-5 position-relative overflow-hidden"
              style={{ height: "550px" }}
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
                {/* Login Form */}
                <div className="auth-form mt-5">
                  {handleError && (
                    <span className="text-danger fw-bold">{handleError}</span>
                  )}
                  {success && (
                    <span className="text-success fw-bold">{success}</span>
                  )}
                  <form onSubmit={handleSubmit}>
                    <h2 className="mb-4">Insert Profile Details </h2>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="First name (Eg. Dr.Rama)"
                      id="email-login"
                      type="text"
                      name="firstName"
                      onChange={handleProfessorDetails}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Last name"
                      id="email-login"
                      type="text"
                      name="lastName"
                      onChange={handleProfessorDetails}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="email (IITR)"
                      id="email-login"
                      type="text"
                      name="email"
                      onChange={handleProfessorDetails}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Lab name"
                      id="email-login"
                      type="text"
                      name="labName"
                      onChange={handleProfessorDetails}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Lab room Number"
                      id="email-login"
                      type="text"
                      name="labRoomNumber"
                      onChange={handleProfessorDetails}
                    />
                    
                    <MDBBtn
                      className="w-100 mb-4"
                      size="md"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <BeatLoader /> : "Add Professor Profile"}
                    </MDBBtn>
                  </form>
                </div>
              </div>

             
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
   </div>
  );
}

export default AddProfessors;

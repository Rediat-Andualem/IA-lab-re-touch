import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import axios from 'axios';
import classes from './DeleteRecords.module.css';
import { BeatLoader } from "react-spinners";
import {axiosInstance} from "../../Utility/urlInstance"

function DeleteRecords() {
  const [year, setYear] = useState('');
  const [handleError, setHandleError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("this is ", year);
  
    // Basic validation for year
    if (!year) {
      setHandleError("Year is required.");
      return;
    }
    if (isNaN(year) || year.length !== 4) {
      setHandleError("Invalid year format. Please enter a 4-digit year.");
      return;
    }
  
    setLoading(true);
    try {
      // Use POST instead of DELETE and pass the year in the body as data
      const res = await axiosInstance.post("/user/deleteOldRecord", { year });
      setSuccess(res?.data.message);
      setHandleError('');
    } catch (err) {
      setHandleError(err?.response?.data?.errors?.[0] || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  

  const handleInputChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className={`${classes.mainDash} d-flex flex-column`}>
      <MDBContainer fluid className="p-4 container">
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1 className="my-5 display-3 fw-bold ls-tight px-3 text-white">
              Clean <br />
              <span className="text-warning">Old Data </span>
            </h1>

            <h5 className="px-3" style={{ color: "#F5F5F5", textAlign: "justify" }}>
              Based on the provided year, all users and their data for that year will be deleted, except for operators and admins.
            </h5>
          </MDBCol>

          <MDBCol md="6" className="position-relative">
            <MDBCard>
              <MDBCardBody
                className="p-5 position-relative overflow-hidden"
                style={{ height: "300px" }}
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
                      <h2 className="mb-4">Insert year for clean up</h2>
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Pass the year here eg(2025)"
                        type="text"
                        name="year"
                        value={year}
                        onChange={handleInputChange}
                      />
                      <MDBBtn
                        className="w-100 mb-4"
                        size="md"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? <BeatLoader /> : "Clean Data"}
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

export default DeleteRecords;

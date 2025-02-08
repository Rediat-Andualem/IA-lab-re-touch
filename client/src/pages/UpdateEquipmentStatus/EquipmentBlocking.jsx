import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Utility/urlInstance.js";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { BeatLoader } from "react-spinners";
import classes from './EquipmentBlocking.module.css'
import Button from "react-bootstrap/Button";
function EquipmentBlocking() {
  const [loading, setLoading] = useState(false);
  const [handleError, setHandleError] = useState("");
  const [success, setHandleSuccess] = useState("");
  const [Message, setBlockingMessage] = useState("");
  const [Month, setBlockingMonth] = useState("");
  const [Number, setBlockingNumber] = useState("");
  const [blocking, setBlocking] = useState("");


      useEffect(() => {
        getAllBlocking();
      }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Number || !Month || !Message) {
      setHandleError("Please select all required inputs");
      setHandleSuccess(""); // Clear success message if error occurs
      return;
    }

    setLoading(true);
    try {
      // Reset previous messages before submitting
      setHandleError("");
      setHandleSuccess("");

      await axiosInstance.post(`/blocking/createBlocking`, {
        blockingNumber: Number,
        blockingMonth: Month,
        blockingMessage: Message,
      });

      setHandleSuccess("Slot blocked successfully.");
    } catch (error) {
      setHandleError(
        error.response?.data?.errors?.[0] || "Failed blocking."
      );
    } finally {
      setLoading(false);
    }
  };


     const getAllBlocking = async () => {
        try {
          const res = await axiosInstance.get(`/blocking/getAllBlocking`); 
          if (res?.data.data.length > 0) {
            setBlocking(res?.data.data);
          } else {
            setBlocking([]);
          }
        } catch (error) {
          setBlocking([]); 
        }
      };



     let toDelete = async (blockingId) => {
        // let token = auth.token;
        try {
          await axiosInstance.delete(`/blocking/deleteBlocking/${blockingId}`);
          // await axiosInstance.delete(`equipments/deleteEquipmentDetails/${equipmentId}`, { 
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // });
          getAllBlocking();
        } catch (error) {
          console.error("Error deleting blocking:", error);
        }
      };

console.log(blocking)
  return (

    <div className={classes.mainDash}>
    <MDBContainer fluid className="p-5 container">
      <MDBRow>
        <MDBCol md="6" className="text-center text-md-start">
          <h1 className="my-5 display-3 fw-bold text-white">
            Update <span className="text-warning">Equipment Status</span>
          </h1>
          <h5 className="text-white">
            By selecting The Day, month and reason for blocking, you can block
            booking on active instruments accordingly.
          </h5>
        </MDBCol>

        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody className="p-5">
              <form onSubmit={handleSubmit}>
                <h2 className="mb-4">Select Details</h2>

                {/* Reason for blocking */}
                <select
                  className="form-select mb-4"
                  value={Message}
                  onChange={(e) => setBlockingMessage(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select reason for blocking
                  </option>
                  <option value="Public Holiday">Public Holiday</option>
                  <option value="Equipment Not Working">
                    Equipment Not Working
                  </option>
                  <option value="Professor Booking">Professor Booking</option>
                  <option value="External User">External User</option>
                </select>

                {/* Month selection */}
                <select
                  className="form-select mb-4"
                  value={Month}
                  onChange={(e) => setBlockingMonth(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Month
                  </option>
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                  <option value="Apr">Apr</option>
                  <option value="May">May</option>
                  <option value="Jun">Jun</option>
                  <option value="Jul">Jul</option>
                  <option value="Aug">Aug</option>
                  <option value="Sep">Sep</option>
                  <option value="Oct">Oct</option>
                  <option value="Nov">Nov</option>
                  <option value="Dec">Dec</option>
                </select>

                {/* Date selection */}
                <select
                  className="form-select mb-4"
                  value={Number}
                  onChange={(e) => setBlockingNumber(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Date
                  </option>
                  {[...Array(31)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>

                <MDBBtn
                  className="w-100 mb-4"
                  size="md"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <BeatLoader size={8} color="#ffffff" />
                  ) : (
                    "Set Blocking"
                  )}
                </MDBBtn>

                {handleError && (
                  <p className="text-danger fw-bold">{handleError}</p>
                )}
                {success && <p className="text-success fw-bold">{success}</p>}
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <div className={`${classes.listContainer}`}>
  <h2 className="text-center text-decoration-underline text-white m-4">List of blockings</h2>
  {blocking?.length > 0 ? (
    blocking?.map((singleBlocking, i) => (
    
      <div key={i} className={`${classes.equipment_row} text-white mb-3`}>
    
        <div className={`${classes.equipment_item} col-12 col-md-3`}>
          <strong> Blocked Month : </strong> {singleBlocking.blockingMonth}
        </div>
        <div className={`${classes.equipment_item} col-12 col-md-3`}>
          <strong>Blocked Day :</strong> {singleBlocking.blockingNumber}
        </div>
        <div className={`${classes.equipment_item} col-12 col-md-3 ${classes.guideline}`}>
          <strong>Blocked Message :</strong> {singleBlocking.blockingMessage}
        </div>
        <div>
          <Button className="m-4" onClick={() => toDelete(singleBlocking.blockingId)} variant="danger">
            Delete Blocking 
          </Button>
        </div>
      <h1>-------------------------------------------------------------------------</h1>
      </div>    
    ))
  
  ) : (
    <h3 className="text-center text-white">No Blocking Detail Added so far.</h3>
  )}
</div>

    </MDBContainer>
    </div>

  );
}

export default EquipmentBlocking;

import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Utility/urlInstance.js";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { BeatLoader } from "react-spinners";
import classes from "./UpdateEquipStatus.module.css";
import Button from "react-bootstrap/Button";

function UpdateEquipStatus() {
  const [loading, setLoading] = useState(false);
  const [handleError, setHandleError] = useState("");
  const [success, setHandleSuccess] = useState("");
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(""); // Store selected equipment ID
  const [visibility, setVisibility] = useState(""); // Store visibility status

  useEffect(() => {
    const fetchEquipmentList = async () => {
      try {
        const response = await axiosInstance.get("/equipments/getAllEquipmentDetails");
        setEquipments(response?.data.data);
      } catch (error) {
        console.error("Error fetching equipment details:", error);
      }
    };

    fetchEquipmentList();
  }, []);

  const filteredEquipments = equipments.filter((equipment) => equipment.workingStatus === true);
  const notWorkingEquipments = equipments.filter((equipment) => equipment.workingStatus === false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "equipment") {
      setSelectedEquipment(value);
    } else if (name === "visibility") {
      setVisibility(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEquipment) {
      setHandleError("Please select  equipment");
      return;
    }

    setLoading(true);
    try {
      setHandleError(""); // Reset error
      setHandleSuccess(""); // Reset success message

      // Update the server with the visibility status
      await axiosInstance.patch(`/equipments/updateEquipmentWorkingStatus`, {
        equipmentId: selectedEquipment,
        workingStatus: "false",
      });

      // Update equipment state to move the equipment from visible list to invisible
      setEquipments(equipments.map((equipment) =>
        equipment.equipmentId === selectedEquipment ? { ...equipment, workingStatus: false } : equipment
      ));
      
      setHandleSuccess("Equipment visibility updated successfully.");
    } catch (error) {
      setHandleError(error.response?.data?.errors?.[0] || "Failed to update.");
    } finally {
      setLoading(false);
    }
  };

  const handleMakeVisible = async (equipmentId) => {
    try {
      await axiosInstance.patch(`/equipments/updateEquipmentWorkingStatus`, {
        equipmentId,
        workingStatus: "true",
      });

      // Update equipment state to move the equipment from invisible list to visible
      setEquipments(equipments.map((equipment) =>
        equipment.equipmentId === equipmentId ? { ...equipment, workingStatus: true } : equipment
      ));
    } catch (error) {
      console.error("Error making equipment visible:", error);
    }
  };

  return (
    <div className={classes.mainDash}>
      <MDBContainer fluid className="p-5 container">
        <MDBRow>
          <MDBCol md="6" className="text-center text-md-start">
            <h1 className="my-3 display-3 fw-bold text-white">
              Update <span className="text-warning">Equipment Status</span>
            </h1>
            <h5 className="text-white">
              By specifying the equipment name and its working status, you can
              control its visibility to users. If you set the visibility to{" "}
              <span style={{ color: "black" }}><b>Invisible</b></span>, the equipment
              will not be available for booking, preventing users from selecting it. On the other hand, if the
              visibility is set to{" "}
              <span style={{ color: "black" }}><b>Visible</b></span>, the equipment will be shown as available and
              users will be able to book it.
            </h5>
          </MDBCol>

          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody className="p-5">
                <form onSubmit={handleSubmit}>
                  <h2 className="mb-4">Select Equipment</h2>

                  {/* Equipment selection */}
                  <select
                    className="form-select mb-4"
                    name="equipment"
                    value={selectedEquipment}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select Equipment</option>
                    {filteredEquipments?.map((equipment) => (
                      <option key={equipment.equipmentId} value={equipment.equipmentId}>
                        {equipment.equipmentName}
                      </option>
                    ))}
                  </select>

                  <MDBBtn
                    className="w-100 mb-4"
                    size="md"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <BeatLoader size={8} color="#ffffff" /> : "Make Equipment Invisible"}
                  </MDBBtn>

                  {/* Error and success messages */}
                  {handleError && <p className="text-danger fw-bold">{handleError}</p>}
                  {success && <p className="text-success fw-bold">{success}</p>}
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <div className={`${classes.listContainer}`}>
          <h2 className="text-center text-decoration-underline text-white m-4">
            List of Invisible Equipments
          </h2>
          {notWorkingEquipments.length > 0 ? (
            notWorkingEquipments.map((equipment) => (
              <div key={equipment.equipmentId} className={`${classes.equipment_row} text-white mb-3`}>
                <div className={`${classes.equipment_item} col-12 col-md-3`}>
                  <strong>Equipment Name:</strong> {equipment.equipmentName}
                </div>
                <div className={`${classes.equipment_item} col-12 col-md-3`}>
                  <strong>Equipment Model:</strong> {equipment.equipmentModel}
                </div>
                <div>
                  <Button className="m-4" onClick={() => handleMakeVisible(equipment.equipmentId)} variant="success">
                    Make Visible
                  </Button>
                </div>
                <h1>-------------------------------------------------------------------------</h1>
              </div>
            ))
          ) : (
            <h3 className="text-center text-white">No Equipment marked as Invisible.</h3>
          )}
        </div>
      </MDBContainer>
    </div>
  );
}

export default UpdateEquipStatus;

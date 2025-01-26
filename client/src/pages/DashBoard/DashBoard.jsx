import React, { useEffect, useState } from 'react';
import classes from './DashBoard.module.css';
import cheg from '../../assets/image/main.jpg';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import { axiosInstance } from '../../Utility/urlInstance.js';

function DashBoard() {
  // State to store the selected equipment details
  const [selectedEquipment, setSelectedEquipment] = useState({ id: '', name: '' });
  const [equipments, setEquipments] = useState([]);
  const navigate = useNavigate(); // For navigation

  // Handle the selection of an equipment
  const handleSelect = (eventKey) => {
    // Find the selected equipment by its ID
    const selected = equipments.find(
      (equipment) => equipment.equipmentId === eventKey
    );
    setSelectedEquipment({
      id: selected?.equipmentId || '',
      name: selected?.equipmentName || '',
    });
  };

  // Handle the continue button click
  const handleContinue = () => {
    if (selectedEquipment.id) {
      // Navigate to the next page with the selected equipment as a query parameter
      navigate(`/bookingTable?equipmentId=${selectedEquipment.id}`);
    } else {
      alert('Please select an equipment before continuing.');
    }
  };

  useEffect(() => {
    const fetchEquipmentList = async () => {
      try {
        const response = await axiosInstance.get('/equipments/getAllEquipmentDetails');
        setEquipments(response?.data.data);
      } catch (error) {
        console.error('Error fetching equipment details:', error);
      }
    };

    fetchEquipmentList();
  }, []);

  return (
    <>
      <div className={classes.mainDash}>
        <div className="d-md-flex bg-dark">
          <div className="p-2">
            <img src={cheg} alt="" />
          </div>
          <div className="text-white p-5">
            <h1 className="p-5">IA Lab Booking Portal</h1>
            <div>
              <DropdownButton
                id="dropdown-basic-button"
                title="Select Equipment"
                onSelect={handleSelect} // Handle selection
              >
                {equipments?.map((singleEquipment, i) => (
                  <Dropdown.Item 
                    key={i} 
                    eventKey={singleEquipment.equipmentId} 
                  >
                    {singleEquipment.equipmentName}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <div className="p-5">
                <p>
                  Selected Equipment: <strong>{selectedEquipment.name || 'None'}</strong>
                </p>
              </div>
              <MDBBtn
                color="danger"
                onClick={handleContinue}
                disabled={!selectedEquipment.id} 
              >
                Continue
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;

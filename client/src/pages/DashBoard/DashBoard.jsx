
// import React, { useEffect, useState } from 'react';
// import classes from './DashBoard.module.css';
// import cheg from '../../assets/image/main.jpg';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import { useNavigate } from 'react-router-dom';
// import { MDBBtn } from 'mdb-react-ui-kit';
// import { axiosInstance } from '../../Utility/urlInstance.js';

// function DashBoard() {
//   // State to store the selected equipment details
//   const [selectedEquipment, setSelectedEquipment] = useState({ id: '', name: '' });
//   const [equipments, setEquipments] = useState([]);
//   const navigate = useNavigate(); // For navigation

//   // Handle the selection of an equipment
//   const handleSelect = (eventKey) => {
//     // Find the selected equipment by its ID
//     const selected = equipments.find(
//       (equipment) => equipment.equipmentId === eventKey
//     );
//     setSelectedEquipment({
//       id: selected?.equipmentId || '',
//       name: selected?.equipmentName || '',
//     });
//   };

//   // Handle the continue button click
//   const handleContinue = () => {
//     if (selectedEquipment.id) {
//       // Navigate to the next page with the selected equipment as a query parameter
//       navigate(`/bookingTable?equipmentId=${selectedEquipment.id}`);
//     } else {
//       alert('Please select an equipment before continuing.');
//     }
//   };

//   // Fetch the equipment list from the backend and set it to state
//   useEffect(() => {
//     const fetchEquipmentList = async () => {
//       try {
//         const response = await axiosInstance.get('/equipments/getAllEquipmentDetails');
//         setEquipments(response?.data.data);
//       } catch (error) {
//         console.error('Error fetching equipment details:', error);
//       }
//     };

//     fetchEquipmentList();
//   }, []);

//   // Filter equipments based on workingStatus (only show those with workingStatus true)
//   const filteredEquipments = equipments.filter(
//     (equipment) => equipment.workingStatus === true
//   );

//   return (
//     <>
//       <div className={classes.mainDash}>
//         <div className="d-md-flex bg-dark">
//           <div className="p-2">
//             <img src={cheg} alt="" />
//           </div>
//           <div className="text-white p-5">
//             <h1 className="p-5">IA Lab Booking Portal</h1>
//             <div>
//               <DropdownButton
//                 id="dropdown-basic-button"
//                 title="Select Equipment"
//                 onSelect={handleSelect} // Handle selection
//               >
//                 {filteredEquipments?.map((singleEquipment, i) => (
//                   <Dropdown.Item 
//                     key={i} 
//                     eventKey={singleEquipment.equipmentId} 
//                   >
//                     {singleEquipment.equipmentName}
//                   </Dropdown.Item>
//                 ))}
//               </DropdownButton>
//               <div className="p-5">
//                 <p>
//                   Selected Equipment: <strong>{selectedEquipment.name || 'None'}</strong>
//                 </p>
//               </div>
//               <MDBBtn
//                 color="danger"
//                 onClick={handleContinue}
//                 disabled={!selectedEquipment.id} 
//               >
//                 Continue
//               </MDBBtn>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>List of equipments which are not working currently</div>
//     </>
//   );
// }

// export default DashBoard;
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

  // Fetch the equipment list from the backend and set it to state
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

  // Filter equipments based on workingStatus (only show those with workingStatus true)
  const filteredEquipments = equipments.filter(
    (equipment) => equipment.workingStatus === true
  );

  // Filter equipments that are not working (workingStatus: false)
  const notWorkingEquipments = equipments.filter(
    (equipment) => equipment.workingStatus === false
  );
console.log(notWorkingEquipments)
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
                {filteredEquipments?.map((singleEquipment, i) => (
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
        {notWorkingEquipments.length > 0 && (
        <div className="p-5">
          <h3 className='text-light bg-dark text-center'>
            The following equipment will not be available for selection as they are not functioning:
          </h3>
          <ul>
            {notWorkingEquipments?.map((equipment, i) => (
              <li className='text-white fw-bold' key={i}>{equipment.equipmentName}</li>
            ))}
          </ul>
        </div>
      )}
      </div>

      {/* Section for non-working equipment */}
      {/* {notWorkingEquipments.length > 0 && (
        <div className="p-5">
          <h3 className='text-danger'>
            The following equipment will not be available for selection as they are not functioning:
          </h3>
          <ul>
            {notWorkingEquipments?.map((equipment, i) => (
              <marque className='text-white' key={i}>{equipment.equipmentName}</marque>
            ))}
          </ul>
        </div>
      )} */}
    </>
  );
}

export default DashBoard;

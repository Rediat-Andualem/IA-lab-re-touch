import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { axiosInstance } from '../../Utility/urlInstance';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // For React Router v6+
import { useParams } from 'react-router-dom';
function bookingHisotryBookingDetail() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [response, setResponse] = useState({
    message: "",
    status: null,
  });
  const [message, setMessage] = useState(""); // To hold the message for admin bookingHisotry
  const { userId, professorId } = useParams();

  useEffect(() => {
    getUserBookings();
  }, []);


  const getUserBookings = async () => {
      
    try {
      const res = await axiosInstance.get(`/professors/viewStudentBooking/${userId}/${professorId}`);

      if (res?.status === 200) {
               if(res?.data.bookingHistoryOfStudent.length === 0){
                   setBookingHistory(["No booking history"])
               }
      } else {

          setBookingHistory(res?.data.bookingHistoryOfStudent)
          setLoading(false);
      }
    } catch (error) {
      setResponse({
        message: error?.response?.data?.errors[0] || "Error getting user booking history",
        status: false,
      });
    }
  };

  // {
  //   headers: { Authorization: `Bearer ${token}` },
  // }

  const columns = [
    { field: 'EquipmentName', headerName: 'Booked equipment name', width: 220 },
    { field: 'bookedDate', headerName: 'Date of booking', width: 180 },
    { field: 'slotDate', headerName: 'Slot Date', width: 180 },
    { field: 'slotTime', headerName: 'Slot Time', width: 180 },
  ];
  
  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Paper sx={{ height: '90%', width: '50%', margin: '2%  auto' }}>
      {/* Conditionally render the message for admin bookingHisotry */}
      {message && (
        <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>
          {message}
        </div>
      )}
      <DataGrid
        rows={bookingHistory?.map(booking => ({
            id: booking.bookingId,
            EquipmentName: booking.Equipment.equipmentName,
            bookedDate: booking.bookedDate,
            slotDate: booking.slotDate,
            slotTime: booking.slotTime,
        }))}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        loading={loading}
        sx={{ border: 2 }}
      />
    </Paper>

  );
}

export default bookingHisotryBookingDetail;

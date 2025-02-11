import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../Utility/urlInstance';
import { useParams } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

function StudentsDashBoard() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); 
  const auth = useAuthUser();
  const userId = auth.userId;

  useEffect(() => {
    getUserBookings();
  }, []);

  const getUserBookings = async () => {
    try {
      const res = await axiosInstance.get(`/booking/getStudentSingleBooking/${userId}`);
      console.log(res.data.bookingHistoryOfStudent);  // Logs response data immediately after fetching
      if (res?.status === 200) {
        if (res?.data.bookingHistoryOfStudent.length === 0) {
          setMessage("No booking history found");
          setBookingHistory([]);  // Set to empty array instead of string
        } else {
          setBookingHistory(res?.data.bookingHistoryOfStudent);
        }
      } else {
        setMessage("Error fetching booking history");
        setBookingHistory([]);  // Set to empty array in case of error
      }
    } catch (error) {
      setMessage(error?.response?.data?.errors[0] || "Error getting user booking history");
      setBookingHistory([]);  // Set to empty array in case of error
    } finally {
      setLoading(false);  // Ensure loading is set to false no matter what
    }
  };

  // useEffect(() => {
  //   console.log(bookingHistory);  // Log booking history when it changes
  // }, [bookingHistory]);

  const columns = [
    { field: 'EquipmentName', headerName: 'Booked equipment name', width: 220 },
    { field: 'bookedDate', headerName: 'Date of booking', width: 180 },
    { field: 'slotDate', headerName: 'Slot Date', width: 180 },
    { field: 'slotTime', headerName: 'Slot Time', width: 180 },
  ];

  return (
    <Paper sx={{ height: '90%', width: '50%', margin: '2% auto' }}>
      {/* Conditionally render the message */}
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
        pagination
        pageSize={10}
        rowsPerPageOptions={[5, 10]}
        loading={loading}
        sx={{ border: 2 }}
      />
    </Paper>
  );
}

export default StudentsDashBoard;

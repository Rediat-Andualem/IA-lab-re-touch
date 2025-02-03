import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { axiosInstance } from '../../Utility/urlInstance';
import Button from 'react-bootstrap/Button';

function ProfessorDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [response, setResponse] = useState({
    message: "",
    status: null,
  });
  const [message, setMessage] = useState(""); // To hold the message for admin users

  
//   let token = auth.token;
// console.log(token)
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/user/allUsers");
      setUsers(res?.data.users || []);
    } catch (error) {
      setError("Failed to fetch users");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const deleteUser = async (userId, role) => {
    // Prevent deletion if the user is an admin (role 3 or 4)
    if (role === 3 || role === 4) {
      setMessage("Can't delete admin.");
      return;
    }

    try {
      const response = await axiosInstance.delete(
        `/user/userProfileDelete/${userId}`);
      if (response.status === 200) {
        setResponse({
          message: "User deleted successfully",
          status: true,
        });
        fetchAllUsers();
      } else {
        setResponse({
          message: `Unexpected status code: ${response.status}`,
          status: false,
        });
      }
    } catch (error) {
      setResponse({
        message: error?.response?.data?.errors[0] || "Error deleting user",
        status: false,
      });
    }
  };
  // {
  //   headers: { Authorization: `Bearer ${token}` },
  // }
  // Columns configuration for Material UI DataGrid
  const columns = [
    { field: 'instituteId', headerName: 'Institute ID', width: 180 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'guideId', headerName: 'Guide ID', width: 180 },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => (
        <Button
          style={{ margin: "5px" }}
          onClick={() => deleteUser(params.row.userId, params.row.role)}
          variant="danger"
        >
          Delete
        </Button>
      ),
      width: 150,
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Paper sx={{ height: '90%', width: '95%', margin: '2%' }}>
      {/* Conditionally render the message for admin users */}
      {message && (
        <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>
          {message}
        </div>
      )}
      <DataGrid
        rows={users?.map(user => ({
          id: user.userId,
          instituteId: user.instituteId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          guideId: user.guideId,
          mobileNumber: user.mobileNumber,
          userId: user.userId,
          role: user.role,  // Including role in the rows
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

export default ProfessorDashboard;

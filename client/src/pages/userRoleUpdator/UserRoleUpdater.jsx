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
// // import "./AddEquipment.css";
// import {BeatLoader} from 'react-spinners'
// // import Spinner from 'react-bootstrap/spi';
// import Spinner from "react-bootstrap/Spinner";

// function UserRoleUpdater() {
//   const [loading, setLoading] = useState(false);
//   const [handleError, setHandleError] = useState("");
//   const [userInfo , setUserInfo]=useState("")
//   //!   ---------------------
//   const signIn = useSignIn();
//   const navigate = useNavigate();
//   const auth = useAuthUser();
  
//   const [signUpData, setSignUpData] = useState({
//     equipmentName: "",
//     equipmentModel: ""
//   });


//  useEffect(()=>{
//   let userGetter = async ()=>{
//     let userInformation = await axiosInstance.get('/user/allUsers')
//     setUserInfo(userInformation?.data.users)
//   }
//   userGetter()
//  },[])
// console.log("user coming info", userInfo)

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axiosInstance.post("/user/login", {
//         email: logInData.email,
//         password: logInData.password,
//       });
//       setHandleError(false);
//       const token = res.headers["authorization"]?.split(" ")[1];
//       const decodedToken = jwtDecode(token);
//       console.log("decoded from login", decodedToken);
//       if (token) {
//         if (
//           signIn({
//             auth: {
//               token,
//               type: "Bearer",
//               expiresIn: 4320,
//             },
//             userState: {
//               userId: decodedToken.userId,
//               userName: decodedToken.userName,
//               userRole: decodedToken.userRole,
//               token,
//             },
//           })
//         ) {
//           navigate("/dashboard");
//         } else {
//           navigate("/signUp");
//         }
//       }
//     } catch (error) {
//       setHandleError(error.response.data.errors[0]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   let handleInputChange = (e) => {
//     switch (e.target.name) {
//       case "email":
//         setLogInData((pre) => {
//           return { ...pre, email: e.target.value };
//         });
//         break;
//       case "password":
//         setLogInData((pre) => {
//           return { ...pre, password: e.target.value };
//         });
//         break;
//       default:
//         break;

//     }
//   };
//   //* -----------SignUp handler


//   // !--------------------------------------------
//   return (
//     <MDBContainer fluid className="p-4 container">
//       <MDBRow>
//         <MDBCol
//           md="6"
//           className="text-center text-md-start d-flex flex-column justify-content-center"
//         >
//           <h1 className="my-5 display-3 fw-bold ls-tight px-3 text-white">
//            Update  <br />
//             <span className="text-warning">User Role</span>
//           </h1>
//           <h5
//             className="px-3"
//             style={{ color: "#F5F5F5", textAlign: "justify" }}
//           >

// Here, you can grant a user the privilege to become an Operator, TA, or Admin in the portal, or revoke their privileges to revert them to a normal user.
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
//                   // left: isLogin ? "0%" : "-100%",
//                   transition: "left 0.6s ease-in-out",
//                   padding: "6% 0 0 20%",
//                 }}
//               >
//                 {/* Login Form */}
//                 <div className="auth-form mt-1">
//                   {handleError && (
//                     <span className="errorDisplay">{handleError}</span>
//                   )}
//                   <form onSubmit={handleSubmit}>
//                     <h2 className="mb-4">Insert  Details</h2>
  
//     <select className="form-select mb-4" name="guideId"  onChange={handleInputChange} required>
//                     <option value="" disabled>Select email</option>
//                     {userInfo.map((user) => (
//                       <option key={user.userId} value={user.userId}>{user.email}</option>
//                     ))}
//                   </select> 
//     <select className="form-select mb-4" name="guideId"  onChange={handleInputChange} required>
//                   <option value="1">Operator</option>
//                   <option value="2">TA</option>
//                   <option value="0">user</option>
//                   <option value="3">Admin</option>
//                   </select> 
                  
//                     <MDBBtn
//                       className="w-100 mb-4"
//                       size="md"
//                       type="submit"
//                       disabled={loading}
//                     >
//                       {loading ? <BeatLoader /> : "Update Role"}
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
//                   // left: isLogin ? "100%" : "0%",
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

// export default UserRoleUpdater;
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

function UserRoleUpdater() {
  const [loading, setLoading] = useState(false);
  const [handleError, setHandleError] = useState("");
  const [success, setHandleSuccess] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user/allUsers");
        setUserInfo(response?.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedRole) {
      setHandleError("Please select both a user and a role.");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.patch(`/user/userRole/${selectedUser}`, {
        role: selectedRole,
      });

      setHandleSuccess("User role updated successfully.");
    } catch (error) {
      setHandleError(
        error.response?.data?.errors?.[0] || "Failed to update role."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="p-4 container">
      <MDBRow>
        <MDBCol md="6" className="text-center text-md-start">
          <h1 className="my-5 display-3 fw-bold text-white">
            Update <span className="text-warning">User Role</span>
          </h1>
          <h5 className="text-white">
            Grant or revoke user roles like Operator, TA, or Admin.
          </h5>
        </MDBCol>

        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody className="p-5">
              <form onSubmit={handleSubmit}>
                <h2 className="mb-4">Insert Details</h2>

                {/* User Selection */}
                <select
                  className="form-select mb-4"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select email
                  </option>
                  {userInfo.map((user) => (
                    <option key={user.userId} value={user.userId}>
                      {user.email}
                    </option>
                  ))}
                </select>

                {/* Role Selection */}
                <select
                  className="form-select mb-4"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="0">User</option>
                  <option value="1">Operator</option>
                  <option value="2">TA</option>
                  <option value="3">Admin</option>
                  <option value="5">Professor</option>
                </select>

                <MDBBtn className="w-100 mb-4" size="md" type="submit" disabled={loading}>
                  {loading ? <BeatLoader size={8} color="#ffffff" /> : "Update Role"}
                </MDBBtn>

                {handleError && <p className="text-danger fw-bold">{handleError}</p>}
                {success && <p className="text-success fw-bold">{success}</p>}
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default UserRoleUpdater;

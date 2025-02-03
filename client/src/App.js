import React, { useEffect } from "react";
import DashBoard from "./pages/DashBoard/DashBoard";
import { Routes, Route } from "react-router-dom";
import LogInSignUp from "./pages/LogInSignUp/LogInSignUp.jsx";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import BookingTable from "./pages/BookingTable/BookingTable.jsx";
import EmailForPassword from "./pages/EmailForPassword/EmailForPassword.jsx";
import PasswordUpdater from "./pages/PasswordUpdator/PasswordUpdater.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import LayOut from "./components/LayOut/LayOut.jsx";
import AddEquipment from "./pages/AddEquipment/AddEquipment.jsx";
import AddProfessors from "./pages/AddProfessors/AddProfessors.jsx";
import VerifyRequest from "./pages/verifyRequestPage/VerifyRequest.jsx";
import StudentConfirmation from "./pages/StudentConfirmation/StudentConfirmation.jsx";
import UserRoleUpdater from "./pages/userRoleUpdator/UserRoleUpdater.jsx";
import ListOfUsers from "./pages/ListOfUsersForAdmin/ListOfUsers.jsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import DeleteRecords from "./pages/deleteOldRecords/DeleteRecords.jsx";
import ProfessorDashboard from "./pages/ProffesorsDashboard/ProfessorDashboard.jsx"
function App() {
  const auth = useAuthUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.token && auth?.verification === true) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<LogInSignUp />} />
        <Route path="/login" element={<LogInSignUp />} />
        <Route path="/signup" element={<LogInSignUp />} />
        <Route
          path="/dashBoard"
          element={
            <RequireAuth fallbackPath="/login">
              <LayOut showHeader={true} showFooter={true}>
                <DashBoard />
              </LayOut>
            </RequireAuth>
          }
        />
        <Route
          path="/bookingTable"
          element={
            <RequireAuth fallbackPath="/login">
              <BookingTable />
            </RequireAuth>
          }
        />
        <Route path="/emailProvide" element={<EmailForPassword />} />
        <Route
          path="/userPasswordReset/:userId"
          element={<PasswordUpdater />}
        />
        <Route
          path="/addEquipments"
          element={
            <LayOut showHeader={true} showFooter={false}>
              <AddEquipment />
            </LayOut>
          }
        />
        <Route
          path="/addProfessors"
          element={
            <LayOut showHeader={true} showFooter={false}>
              <AddProfessors />
            </LayOut>
          }
        />
        <Route path="/successReg" element={<VerifyRequest />} />
        <Route
          path="/studentConfirmation/:userId"
          element={<StudentConfirmation />}
        />
        <Route
          path="/userRoleUpdate"
          element={
            <LayOut showHeader={true} showFooter={true}>
              <UserRoleUpdater />
            </LayOut>
          }
        />
        <Route
          path="/ListOfAllUsers"
          element={
            <LayOut showHeader={true} showFooter={true}>
              <ListOfUsers />
            </LayOut>
          }
        />
        <Route
          path="/deleteOldData"
          element={
            <LayOut showHeader={true} showFooter={true}>
              <DeleteRecords />
            </LayOut>
          }
        />
        <Route
          path="/ProfessorDashboard"
          element={
            <LayOut showHeader={true} showFooter={true}>
              <ProfessorDashboard />
            </LayOut>
          }
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
<LayOut></LayOut>;
export default App;

{
  /* <RequireAuth fallbackPath='/login'>
<DashBoard />
</RequireAuth> */
}

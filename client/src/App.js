import React, { useEffect } from "react";
import DashBoard from "./pages/DashBoard/DashBoard";
import { Routes, Route } from "react-router-dom";
import LogInSignUp from "./pages/LogInSignUp/LogInSignUp.jsx";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import BookingTable from "./pages/BookingTable/BookingTable.jsx";
import EmailForPassword from "./pages/EmailForPassword/EmailForPassword.jsx";
import EmailForPasswordForProfessors from "./pages/EmailForPassword/EmailForPasswordForProfessors.jsx";
import PasswordUpdater from "./pages/PasswordUpdator/PasswordUpdater.jsx";
import ProfessorPasswordUpdator from "./pages/PasswordUpdator/ProfessorPasswordUpdator.jsx"
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
import EquipmentBlocking from "./pages/BlockEquipmentSlot/EquipmentBlocking.jsx";
import UpdateEquipStatus from "./pages/UpateEquipmentStatus/UpdateEquipStatus.jsx";
import ProfessorLogIn from "./pages/ProfessorLogIn/ProfessorLogIn.jsx";
import StudentsBookingDetail from "./pages/StudentsBookingDetailForProfessor/StudentsBookingDetail.jsx"
import StudentsDashBoard from "./pages/StudentDashBoard/StudentsDashBoard.jsx"
import OperatorDashBoard from "./pages/OperatorsDashBoard/OperatorDashBoard.jsx";
import OperatorUpdating from "./pages/OperatorUpdating/OperatorUpdating.jsx";
import About from "./pages/AboutPage/AboutPage.jsx";
import Information from "./pages/InformationDesk/Information.jsx";
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
        <Route path="/ProfessorEmailProvide" element={<EmailForPasswordForProfessors />} />
        
        <Route
          path="/userPasswordReset/:userId"
          element={<PasswordUpdater />}
        />
        <Route
          path="/professorPasswordReset/:professorId"
          element={<ProfessorPasswordUpdator />}
        />
        {/* <Route
          path="//:userId"
          element={<PasswordUpdater />}
        /> */}
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
        <Route
          path="/blockBooking"
          element={
            <LayOut showHeader={true} showFooter={true}>
              <EquipmentBlocking />
            </LayOut>
          }
        />
        <Route
          path="/EquipStatusUpdate"
          element={
            <LayOut showHeader={true} showFooter={true}>
              < UpdateEquipStatus/>
            </LayOut>
          }
        />
        <Route
          path="/ProfessorLogin"
          element={
            <LayOut showHeader={false} showFooter={true}>
              <ProfessorLogIn/>
            </LayOut>
          }
        />
        <Route
          path="/professors/viewStudentBooking/:userId/:professorId"
          element={
            <LayOut showHeader={false} showFooter={true}>
              <StudentsBookingDetail/>
            </LayOut>
          }
        />
        <Route
          path="/myBookings"
          element={
            <LayOut showHeader={true} showFooter={true}>
              <StudentsDashBoard/>
            </LayOut>
          }
        />
        <Route
          path="/operatorList"
          element={
            <LayOut showHeader={true} showFooter={true}>
              <OperatorDashBoard/>
            </LayOut>
          }
        />
        <Route
          path="/operatorUpdates/:resultId"
          element={
            <LayOut showHeader={true} showFooter={true}>
              <OperatorUpdating/>
            </LayOut>
          }
        />
        <Route
          path="/about"
          element={
            <LayOut showHeader={true} showFooter={true}>
              <About/>
            </LayOut>
          }
        />
        <Route
          path="/information"
          element={
            <LayOut showHeader={true} showFooter={true}>
              <Information/>
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

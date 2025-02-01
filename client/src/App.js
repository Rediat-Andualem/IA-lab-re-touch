import React from "react";
import DashBoard from "./pages/DashBoard/DashBoard";
import { Routes, Route } from "react-router-dom";
import LogInSignUp from "./pages/LogInSignUp/LogInSignUp.jsx";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import BookingTable from "./pages/BookingTable/BookingTable.jsx"
import EmailForPassword from "./pages/EmailForPassword/EmailForPassword.jsx";
import PasswordUpdater from "./pages/PasswordUpdator/PasswordUpdater.jsx"
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import LayOut from "./components/LayOut/LayOut.jsx"
import AddEquipment from "./pages/AddEquipment/AddEquipment.jsx";
import AddProfessors from "./pages/AddProfessors/AddProfessors.jsx";
import VerifyRequest from "./pages/verifyRequestPage/VerifyRequest.jsx";
import StudentConfirmation from "./pages/StudentConfirmation/StudentConfirmation.jsx"

function App() {
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
              <LayOut>
              <DashBoard />
              </LayOut>
            </RequireAuth>
          }
        />
        <Route
          path="/bookingTable"
          element={
            <RequireAuth fallbackPath="/login">
              < BookingTable/>
            </RequireAuth>
          }
        />
           <Route path="/emailProvide" element={<EmailForPassword />} />
           <Route path="/userPasswordReset/:userId" element={<PasswordUpdater />} />
           <Route path="/*" element={<PageNotFound />} />
           <Route path="/addEquipments" element={<AddEquipment />} />
           <Route path="/addProfessors" element={<AddProfessors />} />
           <Route path="/successReg" element={<VerifyRequest />} />
           <Route path="/studentConfirmation/:userId" element={<StudentConfirmation />} />
      </Routes>
    </>
  );
}

export default App;

{
  /* <RequireAuth fallbackPath='/login'>
<DashBoard />
</RequireAuth> */
}

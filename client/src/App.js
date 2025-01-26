import React from "react";
import DashBoard from "./pages/DashBoard/DashBoard";
import { Routes, Route } from "react-router-dom";
import LogInSignUp from "./pages/LogInSignUp/LogInSignUp.jsx";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import BookingTable from "./pages/BookingTable/BookingTable.jsx"
import EmailForPassword from "./pages/EmailForPassword/EmailForPassword.jsx";
import PasswordUpdater from "./pages/PasswordUpdator/PasswordUpdater.jsx"
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
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
              <DashBoard />
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

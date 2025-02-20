import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRotue/PrivateRoute.jsx";

// Import Pages
import DashBoard from "./pages/DashBoard/DashBoard";
import LogInSignUp from "./pages/LogInSignUp/LogInSignUp";
import BookingTable from "./pages/BookingTable/BookingTable";
import VerifyRequest from "./pages/verifyRequestPage/VerifyRequest";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Layout from "./components/LayOut/LayOut";
import About from "./pages/AboutPage/AboutPage";
import Information from "./pages/InformationDesk/Information";
import ProfessorDashboard from "./pages/ProffesorsDashboard/ProfessorDashboard";
import StudentsDashBoard from "./pages/StudentDashBoard/StudentsDashBoard";
import OperatorDashBoard from "./pages/OperatorsDashBoard/OperatorDashBoard";
import Verify from "./pages/VerifyPage/Verify.jsx";
import EquipmentBlocking from "./pages/BlockEquipmentSlot/EquipmentBlocking.jsx"
import UpdateEquipStatus from "./pages/UpateEquipmentStatus/UpdateEquipStatus.jsx"
import AddEquipment from "./pages/AddEquipment/AddEquipment.jsx"
import EmailForPassword from "./pages/EmailForPassword/EmailForPassword.jsx"
import ProfessorLogIn from "./pages/ProfessorLogIn/ProfessorLogIn.jsx"
import EmailForPasswordForProfessors from "./pages/EmailForPassword/EmailForPasswordForProfessors.jsx"
const RoutesConfig = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LogInSignUp />} />
      <Route path="/login" element={<LogInSignUp />} />
      <Route path="/signup" element={<LogInSignUp />} />
      <Route path="/verify" element={<VerifyRequest />} />
      <Route path="/verifyLogIn" element={<Verify />} />
     
      {/* Protected Routes - Require Authentication */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Layout><DashBoard /></Layout>} />
        <Route path="/bookingTable" element={<BookingTable />} />
        <Route path="/professorDashboard" element={<Layout><ProfessorDashboard /></Layout>} />
        <Route path="/myBookings" element={<Layout><StudentsDashBoard /></Layout>} />
        <Route path="/operatorList" element={<Layout><OperatorDashBoard /></Layout>} />
        <Route path="/blockBooking"element={ <Layout> <EquipmentBlocking /></Layout>}/>
        <Route path="/EquipStatusUpdate" element={<Layout > < UpdateEquipStatus/></Layout>}/>
         <Route path="/addEquipments" element={<Layout ><AddEquipment /></Layout>}/>
      </Route>
         <Route path="/emailProvide" element={<Layout ><EmailForPassword  /></Layout>}/>

      {/* Public Info Pages */}
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/information" element={<Layout><Information /></Layout>} />
      <Route path="/ProfessorLogin" element={<Layout><ProfessorLogIn /></Layout>} />
      <Route path="/ProfessorEmailProvide" element={<Layout><EmailForPasswordForProfessors /></Layout>} />

      {/* Redirect to Dashboard if No Match */}
      <Route path="/*" element={<PageNotFound/>} />
    </Routes>
  );
};

export default RoutesConfig;

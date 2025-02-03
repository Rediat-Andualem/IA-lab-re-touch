import React, { useState } from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBBtn,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import classes from './Header.module.css'
function DashBoard() {
  const [showBasic, setShowBasic] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();

  const logOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <>
      <header>
        <MDBNavbar expand='lg' light bgColor='white'>
          <MDBContainer fluid>
            <MDBNavbarToggler
              onClick={() => setShowBasic(!showBasic)}
              aria-controls='navbarExample01'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <MDBIcon fas icon='bars' />
            </MDBNavbarToggler>
            <MDBCollapse navbar show={showBasic}>
              <MDBNavbarNav right className='mb-2 mb-lg-0'>
                <MDBNavbarItem active>
                  <MDBNavbarLink aria-current='page' className={`${classes.custom_navbar_link}`}>
                    <Link className={`${classes.link}`} to="/dashboard">Home</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink className={`${classes.custom_navbar_link}`}>
                    <Link className={`${classes.link}`} to="/addEquipments">Add Equipment</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink className={`${classes.custom_navbar_link}`}>
                    <Link className={`${classes.link}`} to="/addProfessors">Add Professor</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink className={`${classes.custom_navbar_link}`}>
                    <Link className={`${classes.link}`} to="/ListOfAllUsers">See All Users</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink className={`${classes.custom_navbar_link}`}>
                    <Link className={`${classes.link}`} to="/ProfessorDashboard">Professor Dashboard</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink className={`${classes.custom_navbar_link}`}>
                    <Link className={`${classes.link}`} to="/userRoleUpdate">Grant Privilege</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink className={`${classes.custom_navbar_link}`}>
                    <Link className={`${classes.link}`}  to="/deleteOldData">Delete old data</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink className={`${classes.custom_navbar_link}`}>
                    <Link className={`${classes.link}`} to="#">Alter Equipment Availability</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
            <MDBRow>
              <MDBCol>
                <h5>Welcome : {auth?.userName}</h5>
                <MDBBtn onClick={logOut} className='me-1' color='danger'>
                  LogOut
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBNavbar>
      </header>
    </>
  );
}

export default DashBoard;


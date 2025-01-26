import React, { useState } from 'react'
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom'
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
function DashBoard() {
  const [showBasic, setShowBasic] = useState(false);
const signOut = useSignOut()
const navigate = useNavigate()
const auth = useAuthUser()
// console.log(auth)
const logOut = ()=>{
  signOut();
  navigate('/login')
}
  return (
    <>
    <header>
      <MDBNavbar expand='lg' light bgColor='white' >
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
                <MDBNavbarLink aria-current='page' href='#'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Features</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Pricing</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>About</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>About</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            
          </MDBCollapse>
          <MDBRow>
          <MDBCol>

          <h3>Welcome : {auth?.userName}</h3>
          <MDBBtn onClick={logOut} className='me-1' color='danger'>
        LogOut
      </MDBBtn>
          </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBNavbar>
    </header>
      </>
  )
}

export default DashBoard
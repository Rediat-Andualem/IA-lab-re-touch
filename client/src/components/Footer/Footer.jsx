import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Engineering of catalyst and reaction kinetics research lab</span>
        </div>
        <div className="me-5 d-none d-lg-block">
          {/* <span>contact for code base : <a href="https://drive.google.com/drive/folders/1o2yOTF2EpqUBj0jN-N3stXyyKEjXMMMH?usp=sharing">click here</a></span> */}
        <span> For code base contact us :<Link to="/contactForCode">click here</Link></span>  

        </div>
        <div className="me-5 d-none d-lg-block">
          <span>contact us : prakash.biswas@ch.iitr.ac.in</span>
        </div>

        <div>
          {/* <a href="#" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="#" className="me-4 text-reset">
            <MDBIcon fab icon="twitter" />
          </a>
          <a href="#" className="me-4 text-reset">
            <MDBIcon fab icon="google" />
          </a>
          <a href="#" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="#" className="me-4 text-reset">
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href="#" className="me-4 text-reset">
            <MDBIcon fab icon="github" />
          </a> */}
        </div>
      </section>
    </MDBFooter>
  );
}




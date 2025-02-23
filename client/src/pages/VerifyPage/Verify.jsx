import React from "react";
import {Link} from "react-router-dom"
function Verify() {
  return (
    <div>
      <section className="mt-5 flex flex-col justify-center items-center text-center">
        <h1 className="text-6xl font-bold mb-4 text-white text-decoration-underline">
          Verification Request !
        </h1>
        <h2 className="text-4xl font-semibold mb-6 text-white">
          <i>Your Account is not verified by your guide yet</i>
        </h2>

        <div className="">
          <div className="resizer">
            <h3 className="text-xl mb-5 text-justify text-white">
             <h4><b>Dear User</b></h4>
              <h5 className="text-center ">
              Upon your registration, an email was sent to your guide to
              verify that you are a student working under their supervision.
              Kindly contact your guide and ask them to check their email and
              click the Verify button after reading the necessary
              information. If they accidentally delete the verification email,
              please contact Support for assistance😊
                </h5>
            </h3>
          </div>
          <Link to='/login' className="text-white fw-bold" > Click to logIn</Link>
        </div>
      </section>
    </div>
  );
}

export default Verify;

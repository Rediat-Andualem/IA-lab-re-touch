import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Utility/urlInstance.js";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import "./AddEquipment.css";
import {BeatLoader} from 'react-spinners'
// import Spinner from 'react-bootstrap/spi';
import Spinner from "react-bootstrap/Spinner";
function AddEquipment() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [handleError, setHandleError] = useState("");

  //!   ---------------------
  const signIn = useSignIn();
  const navigate = useNavigate();
  const auth = useAuthUser();
  //   ! sign up and log in data
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    instituteId: "",
    guideName: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  //! --- check user Auth
  useEffect(() => {
    if (auth?.token) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);
  // !--------------------------
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // *-----------LogIn handler
  const LogIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/user/login", {
        email: logInData.email,
        password: logInData.password,
      });
      setHandleError(false);
      const token = res.headers["authorization"]?.split(" ")[1];
      const decodedToken = jwtDecode(token);
      console.log("decoded from login", decodedToken);
      if (token) {
        if (
          signIn({
            auth: {
              token,
              type: "Bearer",
              expiresIn: 4320,
            },
            userState: {
              userId: decodedToken.userId,
              userName: decodedToken.userName,
              userRole: decodedToken.userRole,
              token,
            },
          })
        ) {
          navigate("/dashboard");
        } else {
          navigate("/signUp");
        }
      }
    } catch (error) {
      setHandleError(error.response.data.errors[0]);
    } finally {
      setLoading(false);
    }
  };

  let handleLogIn = (e) => {
    switch (e.target.name) {
      case "email":
        setLogInData((pre) => {
          return { ...pre, email: e.target.value };
        });
        break;
      case "password":
        setLogInData((pre) => {
          return { ...pre, password: e.target.value };
        });
        break;
      default:
        break;
    }
  };
  //* -----------SignUp handler
  const SignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (signUpData.password !== signUpData.confirmPassword) {
        setHandleError("Password doesn't match");
      }

      const res = await axiosInstance.post("/user/createUser", {
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        guideName: signUpData.guideName,
        instituteId: signUpData.instituteId,
        mobileNumber: signUpData.mobileNumber,
        email: signUpData.email,
        password: signUpData.password,
      });

      setHandleError(false);
      const token = res.headers["authorization"]?.split(" ")[1];
      const decodedToken = jwtDecode(token);
      console.log("decoded from signup", decodedToken);
      if (token) {
        if (
          signIn({
            auth: {
              token,
              type: "Bearer",
              expiresIn: 4320,
            },
            userState: {
              userId: decodedToken.userId,
              userName: decodedToken.userName,
              userRole: decodedToken.userRole,
              token,
            },
          })
        ) {
          navigate("/dashboard");
        } else {
          navigate("/signUp");
        }
      }
    } catch (err) {
      setHandleError(err?.response?.data?.errors[0]);
    } finally {
      setLoading(false);
    }
  };

  console.log(logInData);
  let handleSignUpChange = (e) => {
    switch (e.target.name) {
      case "firstName":
        setSignUpData((pre) => {
          return { ...pre, firstName: e.target.value };
        });
        break;
      case "lastName":
        setSignUpData((pre) => {
          return { ...pre, lastName: e.target.value };
        });
        break;
      case "email":
        setSignUpData((pre) => {
          return { ...pre, email: e.target.value };
        });
        break;
      case "mobileNumber":
        setSignUpData((pre) => {
          return { ...pre, mobileNumber: e.target.value };
        });
        break;
      case "password":
        setSignUpData((pre) => {
          return { ...pre, password: e.target.value };
        });
        break;
      case "confirmPassword":
        setSignUpData((pre) => {
          return { ...pre, confirmPassword: e.target.value };
        });
        break;
      case "instituteId":
        setSignUpData((pre) => {
          return { ...pre, instituteId: e.target.value };
        });
        break;
      case "guideName":
        setSignUpData((pre) => {
          return { ...pre, guideName: e.target.value };
        });
        break;
      default:
        break;
    }
  };

  // !--------------------------------------------
  return (
    <MDBContainer fluid className="p-5 container">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3 text-white">
           Add <br />
            <span className="text-warning">Equipments</span>
          </h1>
          <h5
            className="px-3"
            style={{ color: "#F5F5F5", textAlign: "justify" }}
          >

Welcome to IA Lab Equipment Booking Portal. Simplify your access to essential tools and resources with just a few clicks. Sign up or log in to manage your bookings effortlessly!
          </h5>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <MDBCard className="">
            <MDBCardBody
              className="p-5 position-relative overflow-hidden"
              style={{ height: "550px" }}
            >
              <div
                className="form-transition-container"
                style={{
                  position: "absolute",
                  width: "80%",
                  height: "100%",
                  top: 0,
                  left: isLogin ? "0%" : "-100%",
                  transition: "left 0.6s ease-in-out",
                  padding: "6% 0 0 20%",
                }}
              >
                {/* Login Form */}
                <div className="auth-form mt-5">
                  {handleError && (
                    <span className="errorDisplay">{handleError}</span>
                  )}
                  <form onSubmit={LogIn}>
                    <h2 className="mb-4">Insert  Details</h2>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Email"
                      id="email-login"
                      type="email"
                      name="email"
                      onChange={handleLogIn}
                    />
                    <div className="position-relative">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Password"
                        id="password-login"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleLogIn}
                      />
                      <span
                        className="position-absolute top-50 end-0 translate-middle-y me-3"
                        style={{ cursor: "pointer" }}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </span>
                    </div>
                    <MDBBtn
                      className="w-100 mb-4"
                      size="md"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <BeatLoader /> : "Add Equipment"}
                    </MDBBtn>

                    {/* <p>
                      Don't have an account?{" "}
                      <span
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={toggleAuthMode}
                      >
                        Sign Up
                      </span>
                    </p> */}
                    <div className="forgot">
                  {/* <Link to="/emailProvide">Forgot password?</Link> */}
                </div>
                  </form>
                </div>
              </div>

              <div
                className="form-transition-container"
                style={{
                  position: "absolute",
                  width: "80%",
                  height: "100%",
                  top: 0,
                  left: isLogin ? "100%" : "0%",
                  transition: "left 0.6s ease-in-out",
                  padding: "0 0 0 20%",
                }}
              >
                {/* Signup Form */}
                <div className="auth-form">
                  {handleError && (
                    <span className="errorDisplay">{handleError}</span>
                  )}
                  <form onSubmit={SignUp}>
                    <h2 className="mb-3 mt-2">Sign Up</h2>
                    <MDBRow>
                      <MDBCol col="6">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="First name"
                          id="first-name"
                          type="text"
                          name="firstName"
                          onChange={handleSignUpChange}
                        />
                      </MDBCol>

                      <MDBCol col="6">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Last name"
                          id="last-name"
                          type="text"
                          name="lastName"
                          onChange={handleSignUpChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol col="6">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Institute ID"
                          id="institute-id"
                          type="text"
                          name="instituteId"
                          onChange={handleSignUpChange}
                        />
                      </MDBCol>

                      <MDBCol col="6">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Institute Email"
                          id="institute-email"
                          type="email"
                          name="email"
                          onChange={handleSignUpChange}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBInput
                      wrapperClass="mb-4"
                      label="Guide name (Dr.P..)"
                      id="guide-name"
                      type="text"
                      name="guideName"
                      onChange={handleSignUpChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Contact Number"
                      id="contact-number"
                      type="text"
                      name="mobileNumber"
                      onChange={handleSignUpChange}
                    />

                    <MDBCol col="6" className="position-relative">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Password"
                        id="password-signup"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleSignUpChange}
                      />
                      <span
                        className="position-absolute top-50 end-0 translate-middle-y me-3"
                        style={{ cursor: "pointer" }}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </span>
                    </MDBCol>

                    <MDBCol col="6" className="position-relative">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Confirm Password"
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        onChange={handleSignUpChange}
                      />
                      <span
                        className="position-absolute top-50 end-0 translate-middle-y me-3"
                        style={{ cursor: "pointer" }}
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? "🙈" : "👁️"}
                      </span>
                    </MDBCol>

                    <MDBBtn
                      className="w-100 mb-4"
                      size="md"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <BeatLoader /> : "Sign Up"}
                    </MDBBtn>

                    <p>
                      Already have an account?{" "}
                      <span
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={toggleAuthMode}
                      >
                        Log In
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AddEquipment;

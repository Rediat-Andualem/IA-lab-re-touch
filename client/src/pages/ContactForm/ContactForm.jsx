import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { toast, ToastContainer } from 'react-toastify'; // Ensure correct import
import 'react-toastify/dist/ReactToastify.css';  // Make sure CSS is imported

function ContactForm() {
  const [state, handleSubmit] = useForm("xbldwvrd");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission
    e.target.reset();  // Reset the form fields after submission
    
    handleSubmit(e);  // Submit the form
    setFormSubmitted(true);  // Set form submission state to true
    
    // Show the success toast after resetting the form
    toast.success("Your request for the code base has been sent! We will get back to you soon.", {
      position: "top-right",  // Use string directly for position
      autoClose: 5000,  // Automatically close the toast after 5 seconds
    });
  };
  

  return (
    <div>
      <form onSubmit={handleFormSubmit} style={formStyle}>
        <label htmlFor="email" style={labelStyle}>
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          style={inputStyle}
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          style={errorStyle}
        />
        
        <label htmlFor="message" style={labelStyle}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          style={textareaStyle}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          style={errorStyle}
        />
        
        <button type="submit" disabled={state.submitting} style={buttonStyle}>
          Submit
        </button>
      </form>

      {/* Toast Container to display the toast notifications */}
      <ToastContainer />
    </div>
  );
}

// Styles (same as before)
const formStyle = {
  maxWidth: '500px',
  margin: '10% auto',
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '16px',
  fontWeight: '600',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '12px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '12px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  minHeight: '100px',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const errorStyle = {
  color: 'red',
  fontSize: '12px',
  marginBottom: '12px',
};

const successMessageStyle = {
  marginTop: '15px',
  color: '#4CAF50',
  fontSize: '16px',
  fontWeight: '600',
};

export default ContactForm;

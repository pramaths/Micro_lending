import React, { useState } from 'react';
import axios from 'axios';
import '../utils/kyc.css';
import { useNavigate } from 'react-router-dom';


const AadharForm = () => {
const [aadharNumber, setAadharNumber] = useState('');
   const [mobileNumber, setMobileNumber] = useState('');
   const [error, setError] = useState(null);
   const navigate = useNavigate();
   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set('txn_id', '17c6fa41-778f-49c1-a80a-cfaf7fae2fb8');
      encodedParams.set('consent', 'Y');
      encodedParams.set('uidnumber', aadharNumber);
      encodedParams.set('clientid', '222');
      encodedParams.set('method', 'uidvalidatev2');

      const options = {
        method: 'POST',
        url: 'https://verifyaadhaarnumber.p.rapidapi.com/Uidverifywebsvcv1/VerifyAadhaarNumber',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '6078eb86a8msh76a026506e72872p16f6fajsna0612471a6fa',
          'X-RapidAPI-Host': 'verifyaadhaarnumber.p.rapidapi.com'
        },
        data: encodedParams,
      };

      const response = await axios.request(options);
      console.log('API Response:', response.data);

      if (response.data &&  response.data.Succeeded) {
        const uidDetails = response.data.Succeeded.Uid_Details.Data;
        if (uidDetails && uidDetails.maskedMobileNumber && uidDetails.maskedMobileNumber.slice(-3) === mobileNumber.slice(-3)) {
          console.log('Mobile number verified successfully.');
          // Implement navigation logic to the next page here
          navigate('/home');

        } else {
          setError('Mobile number does not match the Aadhar details.');
        }
      } else {
        setError('Invalid response format from the API.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setError('Error verifying Aadhar number. Please try again.');
    }
  };

  return (
    <section>
    <div className="kyc">
      <div className="content">
        <img src="/icon.png" alt="Logo" className="logo" style={{ width: '100px', height: 'auto' }}  />
        <h2>Verify Aadhar Number</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputBox">
            <input
              type="number"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              required
            />
            <i>Aadhar Number</i>
          </div>
          <div className="inputBox">
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
            <i>Mobile Number</i>
          </div>
          <div className="inputBox">
          <button className="inputBox color"  type="submit">Submit</button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
    </section>
  );
};

export default AadharForm;
import './App.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from './firebase';
import { useState } from 'react';

function App() {
  const [mobile, setMobile] = useState()
  const [otp, setOtp] = useState();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        console.log(response);
      },
      defaultCountry: "IN"
    }, authentication);
  }

  const requestOTP = (e) => {
    e.preventDefault();
    const phoneNumber = '+91' + mobile
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier
    signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(`confirmation of otp => ${JSON.stringify(confirmationResult)}`);
        // ...
      }).catch((error) => {
        console.log(`error=> ${error.message}`);
      });
  }
  const verifyOTP = (e) => {
    e.preventDefault();
    let confirmationResult = window.confirmationResult;
    confirmationResult.confirm(otp).then((result) => {
      console.log(result);
      console.log(JSON.stringify(result));
      const user = result.user;
      console.log(`signed in successfully as ${JSON.stringify(user)}`);
      // ...
    }).catch((error) => {
      console.log(`error=> ${error.message}`);
    });
  }
  return (
    <div className="App">
      <h1>Enter Mobile Number</h1>
      <form onSubmit={requestOTP}  >
        <div id='sign-in-button'></div>
        <input type='number' placeholder='enter number' id='recaptcha-container' onChange={(e) => setMobile(e.target.value)}></input>
        <input type="submit" value="ok" />
      </form>

      <h1>Enter OTP</h1>
      <form onSubmit={verifyOTP}>
        <input type='number' placeholder='enter number' id='recaptcha-container' onChange={(e) => setOtp(e.target.value)} ></input>
        <input type="submit" value="ok" />
      </form>
    </div>
  );
}

export default App; 

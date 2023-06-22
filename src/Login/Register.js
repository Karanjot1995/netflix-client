import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../actions";
import { useNavigate } from "react-router-dom";
import { register } from "../services/services";

function Register() {
  let navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [UserPassword, setPassword] = useState ("");
  const [Fname, setFname] = useState ("");
  const [Lname, setLname] = useState ("");
  const [PhoneNo, setPhone] = useState (null);
  const [DOB, setDob] = useState (new Date());
  const [CardNo, setCardNum] = useState (null);
  const [CVV, setCvv] = useState (null);
  const [ExpiryDate, setExpiry] = useState (null);
  const [errMsgs, setErrMsgs] = useState({}) 


  const [loginStatus, setLoginStatus] = useState("");
  const userData = useSelector(state => state.user.userData)
  const isLogged = useSelector(state => state.user.isLogged)

  const dispatch = useDispatch()

   const registerUser = async (e) => {
     e.preventDefault()
     let data = {Fname, Lname, Email, UserPassword, PhoneNo, DOB, CardNo, CVV, ExpiryDate}
     register(data).then(data=>{
      if(data.success){
        alert(data.message)
        navigate('/login')
      }else{
        setErrMsgs(data.message)
      }
      // if(data.isLogged){
      //   dispatch(setUserData({userData:data,isLogged:true}))
      // }
    })
  };

  function chkLen(e,l){
    if(e.target.value.length>l) e.target.value = e.target.value.slice(0,l)
  }

   return (
     <div className="login-page pt-50 register">
       <div className="login-wrapper-background">
         <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt=""/>
       </div>
       <div className="login-body">
        <div className="login-form">
        <h1 className="login-title text-start">Register</h1>
          <form className="register-form" id="register-form"  onSubmit={registerUser}>
            <div className="personal-info">
              <h2 className="text-start">Personal Information</h2>
              <div className="row-inputs">
                <div className="lInput">
                  <input
                    className=""
                    type="text"
                    placeholder="First name*"
                    onChange = { (e) => {
                      setFname (e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="lInput">
                  <input
                    className=""
                    type="text"
                    placeholder="Last name"
                    onChange = { (e) => {
                      setLname (e.target.value);
                    }}
                  />
                </div>
              </div>
              
              <div className="row-inputs">
                <div className="lInput">
                  <input
                    className="email"
                    type="email"
                    placeholder="Email*"
                    onChange = { (e) => {
                      setEmail (e.target.value);
                    }}
                    required
                  /> 
                  <p className="error-msg">{errMsgs['email']?errMsgs['email']:''}</p>
                </div>
                <div className="lInput">
                  <input
                    className="password"
                    type="password"
                    placeholder="Password*"
                    onChange = { (e) => {
                      setPassword (e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="row-inputs">
                <div className="lInput">
                  <input
                    className=""
                    type="number"
                    placeholder="Phone Number*"
                    maxlength="10"
                    onInput={(e)=>chkLen(e,10)}
                    onChange = { (e) => {
                      setPhone (e.target.value);
                    }}
                    required
                  />
                  <p className="error-msg">{errMsgs['phone']?errMsgs['phone']:''}</p>
                </div>
                <div className="lInput">
                  <input
                    className=""
                    type="date"
                    placeholder="Date of birth*"
                    onChange = { (e) => {
                      setDob (e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            

            <div className="payment-details">
              <h2 className="text-start title">Payment Details</h2>
              <div className="row-inputs pd-acc">
                <div className="lInput">
                  <input
                    className=""
                    type="number"
                    placeholder="Card Number"
                    onInput={(e)=>chkLen(e,20)}
                    onChange = { (e) => {
                      setCardNum (e.target.value);
                    }}
                  />
                  <p className="error-msg">{errMsgs['card']?errMsgs['card']:''}</p>
                </div>
                <div className="lInput">
                  <input
                    className=""
                    type="number"
                    placeholder="CVV"
                    maxlength="4"
                    onChange = { (e) => {
                      setCvv (e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="row-inputs">
                <div className="lInput">
                  <input
                    className=""
                    type="number" min="1900" max="2099"
                    placeholder="Expiry year"
                    pattern="/^-?\d+\.?\d*$/" onInput={(e)=>chkLen(e,4)}
                    // maxLength="4"
                    onChange = { (e) => {
                      setExpiry (e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
           
            <button type="submit" className="login-btn">Register</button>
          </form>
          <div className="login-signup-now text-start" data-uia="login-signup-now">
                  {`Already a member? `}
                  <a className=" " target="_self" href="/login">Sign In</a>
          </div>
        </div>

       </div>
        {/* <h1> {loginStatus}</h1> */}
        {/* <div className="login-wrapper hybrid-login-wrapper">
          <div className="login-wrapper-background">
            <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt=""/>
          </div>
          <div className="nfHeader login-header signupBasicHeader">
            <a href="/" className="svg-nfLogo signupBasicHeader" data-uia="netflix-header-svg-logo">
              <span className="screen-reader-text">Netflix</span>
            </a>
          </div>
          <div className="login-body">
            <div>
              <div className="login-content login-form hybrid-login-form hybrid-login-form-signup" data-uia="login-page-container">
                <div className="hybrid-login-form-main">
                  <h1 data-uia="login-page-title">Sign In</h1>
                  <form method="post" className="login-form" action="">
                    <div data-uia="login-field+container" className="nfInput nfEmailPhoneInput login-input login-input-email">
                      <div className="nfInputPlacement"><div className="nfEmailPhoneControls">
                        <label className="input_id" placeholder="">
                          <input type="text" data-uia="login-field" name="userLoginId" className="nfTextField" id="id_userLoginId" value="" tabindex="0" autocomplete="email" dir=""/>
                          <label for="id_userLoginId" className="placeLabel">Email or phone number</label>
                        </label>
                        <div data-uia="phone-country-selector+container" className="ui-select-wrapper country-select">
                          <a data-uia="phone-country-selector+target" href="#" className="ui-select-wrapper-link">
                            <div className="ui-select-current" placeholder="{&quot;current_selected_country&quot;:&quot;US&quot;}">
                              <span className="country-select-flag nf-flag nf-flag-us"></span>
                              <span className="country-select-code">{`+<!-- -->1`}</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div> */}
     </div>
   );
}
 
export default Register;
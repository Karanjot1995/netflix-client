import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../actions";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import SignIn from "./SignIn";
import { login } from "../services/services";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState ("");
  const [loginStatus, setLoginStatus] = useState("");
  const userData = useSelector(state => state.user.userData)
  // const [value, setValue] = React.useState(
  //   localStorage.getItem('persistantState') || ''
  // )
  const isLogged = useSelector(state => state.user.isLogged)

  const dispatch = useDispatch()

   const userLogin = async () => {
    login({email: email,password: password}).then(data=>{
      if(data.isLogged){
        // localStorage.setItem('persistantState',JSON.stringify({userData:data,isLogged:true}));
        dispatch(setUserData({userData:data,isLogged:true}))
      }
      // setLoginStatus(data);
      // if (!data.message) {
      //   setLoginStatus(data.message);
      // } else {
      //   dispatch(setUserData(data))
      //   setLoginStatus(data);
      // }
    })
  };

   return (
     <div className="login-page pt-50">
       <div className="login-wrapper-background">
         <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt=""/>
       </div>
       <div className="login-body">
        <div className="login-form">
          <div>
            <h1 className="login-title text-start">Sign In</h1>
            <div className="lInput">
              <input
                className="email"
                type="email"
                placeholder="Email..."
                onChange = { (e) => {
                  setEmail (e.target.value);
                }}
              /> 
            </div>
            <div className="lInput">
              <input
                className="password"
                type="password"
                placeholder="Password..."
                onChange = { (e) => {
                  setPassword (e.target.value);
                }}
              />
            </div>
            <button onClick={userLogin} className="login-btn">Sign In</button>
          </div>
          <div className="login-signup-now text-start" data-uia="login-signup-now">
                  {`New to Netflix? `}
                  <a className=" " target="_self" href="/register">Sign up now</a>
          </div>
        </div>

       </div>
     </div>
   );
}
 
export default Login;
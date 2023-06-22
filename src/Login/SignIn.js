import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../actions";

function SignIn (props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState ("");
    const [loginStatus, setLoginStatus] = useState("");
    const userData = useSelector(state => state.user.userData)
    const isLogged = useSelector(state => state.user.isLogged)
  
    const dispatch = useDispatch()
  
     const login = async () => {
      fetch(`/users/login`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: email,password: password})
      }).then(res=>res.json()).then(data=>{
        if(data.isLogged){
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

    return(
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
        <button onClick={login} className="login-btn">Sign In</button>
        <div className="login-signup-now text-start" data-uia="login-signup-now">
              {`New to Netflix? `}
              <a className=" " target="_self" href="/register">Sign up now</a>
        </div>
      </div>
    )

}

export default SignIn;
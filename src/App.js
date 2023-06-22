import React, { useState, useEffect } from "react";
import AllContent from './AllContent/AllContent';
import Home from './Home/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './common/Header'
import Customers from './Customers/Customers'
import CustomisedList from './CustomisedList/CustomisedList'
import NewPopular from './NewPopular/NewPopular';
import Content from './common/Content';
import Login from "./Login/Login";
import Register from "./Login/Register";
import Profile from "./Login/Profile";
import Shows from "./AllContent/Shows";
import Movies from "./AllContent/Movies";
import GenrePage from "./GenrePage/GenrePage";
import UserContent from "./UserContent/UserContent";
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from "./actions";
import BottomNav from "./mobile/Header/BottomNav";
import useWindowSize from "./common/DeviceSize";
import ContentDetails from "./ContentDetails/ContentDetails";
// import useWindowDimensions from "./common/DeviceSize";


function App() {
  // const [windowDimensions, setWindowDimensions] = useState(useWindowDimensions) 
  const userData = useSelector(state => state.user.userData)
  const isLogged = useSelector(state => state.user.isLogged)

  const windowSize = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)
 
  useEffect(() => {
    if(windowSize.width>600){
      setIsMobile(false)
    }else{
      setIsMobile(true)
    }
  },[])
  // useEffect(async () => {
  //   fetch(`/api/user-list`,{
  //     method: "POST",
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({userid:21001})
  //   }).then(res=>res.json()).then(data=>
  //     dispatch(setUserData(data))
  //   )
  // },[]);


  return (
    <div className="App">
      <Header/>
      {isMobile?<BottomNav/>:''}
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/home" element={<Home/>}/>
        {/* <Route path="/customers" component={<Customers/>} /> */}
        <Route path="/all-content" element={<AllContent/>}/>
        <Route exact path="/shows" element={<Shows/>}/>
        <Route path="/movies/:id" element={<GenrePage/>}/>
        <Route path="/shows/:id" element={<GenrePage/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/latest" element={<NewPopular/>}/>
        <Route exact path={`/content/:id`} element={<Content/>}/>  
        <Route path={`/content/info/:id`} element={<ContentDetails/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/profile" element={<Profile/>}/>  
        {isLogged?
          <>
            <Route path="/login" element={<Navigate to ="/home"/>}/>
            <Route path="/register" element={<Navigate to ="/home"/>}/>
            <Route path="/my-list" element={<UserContent/>}/>
          </>
        :
          <>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/my-list" element={<Navigate to ="/login"/>}/>
          </>
        } 
      </Routes>
      {/* <Route path="/login" component={isLogged? <Navigate to ="/home"/>: Login}></Route>
        {isLogged?<Route path="/my-list"><UserContent/></Route>: <Navigate to ="/login"/>} */}
      {/* <Route path="/login">{isLogged?<Navigate to ="/home"/>:null}</Route> */}

      {/* {isLogged?<Route path="/my-list"><UserContent/></Route>: <Navigate to ="/login"/>} */}

    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import AllContent from './AllContent/AllContent';
import Home from './Home/Home';
import { Route, Switch, Redirect } from 'react-router-dom';
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


function Main() {
  const [content, setAllContent] = useState({})
   
  // useEffect(async () => {
  //     fetch('/all-movies').then(res => res.json()).then(data=>setAllContent(data.content))
  // },[]);

  // console.log(content.rows)


  return (
    <div className="App">
      <Switch>
        <Route exact path="/"><Redirect to ="/home" /></Route>
        <Route exact path={"/home"}><Home/></Route>
        {/* <Route path="/customers" component={<Customers/>} /> */}
        <Route path="/all-content"><AllContent/></Route>  
        <Route exact path="/shows"><Shows/></Route>
        <Route path={["/movies/:id","/shows/:id"]}><GenrePage/></Route>
        <Route path="/movies"><Movies/></Route>
        <Route path="/latest"><NewPopular/></Route>             
        <Route path="/my-list"><CustomisedList/></Route> 
        <Route path={`/content/:id`}><Content/></Route>  
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/register"><Register/></Route>
        <Route exact path="/profile"><Profile/></Route>


        {/* <Route path={`/content/${item['CONTENTID']}`} render={() => <Content/> */}
        {/* {content.rows && content.rows.length? 
        content.rows.map((item)=><Route path={`/content/${item['CONTENTID']}`} render={() => (
          <Content {...content.rows} authed={true} />
        )}/>)
        :null
        }  */}
              
      </Switch>
         
    </div>
  );
}

export default Main;

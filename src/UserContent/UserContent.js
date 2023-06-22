import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SliderSection from "../common/Slider/SliderSection";
import { BASE_API_URL } from "../utils/constants";

function UserContent () {
    // const [userData, setUserData] = useState({})
    const userData = useSelector(state => state.user.userData)

    // function getData(){
    //     fetch(`/api/user-list`,{
    //         method: "POST",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({userid:21001})
    //     }).then(res=>res.json()).then(data=>
    //         setUserData(data)
    //     )
    // }


    // useEffect(async () => {
    //     setUserData(userData)
    // },[]);


    console.log(userData)


    if(userData.userContent && userData.userContent.length){
        return (
            <div className="pt-50" id="movies">
                <SliderSection list={userData.userContent}/>
            </div>
        )
    }else{
        return <div className="text-center pt-100 text-light">Loading...</div>
    }

}

export default UserContent;
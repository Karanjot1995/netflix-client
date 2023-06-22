import React, { useState, useEffect } from "react";
import { FaRegPlayCircle } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';
import {AiOutlineMinusCircle} from 'react-icons/ai';
// import { BASE_API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../actions";
import { addToList } from "../../services/services";
// import useWindowSize from "./DeviceSize";


function MobileListItem(props) {
    const [inList, setInlist] = useState(false)
    const userData = useSelector(state => state.user.userData)
    const isLogged = useSelector(state => state.user.isLogged)
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const width = window.innerWidth;
    // const windowSize = useWindowSize()
    // const [isMobile, setIsMobile] = useState(false)
   
    // useEffect(() => {
    //   if(windowSize.width>600){
    //     setIsMobile(false)
    //   }else{
    //     setIsMobile(true)
    //   }
    // },[])

    function addToUserList(e,cid){
        e.stopPropagation();
        e.preventDefault();
        if(isLogged){
            addToList({user_id:userData.userDetails.CustomerID, content_id:cid}).then(data=>{
                dispatch(setUserData({userData:{...userData,userContent:data.updatedContent}}))
                inListItem(data.updatedContent)
            })
        }else{
            navigate('/login')
        }

    }

    function removeFromList(e,cid){
        e.stopPropagation();
        e.preventDefault();
        removeFromList({user_id:userData.userDetails.CustomerID, content_id:cid}).then(data=>{
            dispatch(setUserData({userData:{...userData,userContent:data.updatedContent}}))
            inListItem(data.updatedContent)
        })
    }

    function inListItem(uc){
        uc.map(c=>{
            if(c.ContentID == props.item['ContentID']){
                setInlist(true)
            }
        })
    }

    useEffect(async () => {
        if(userData.userContent?.length){
            inListItem(userData.userContent)
        }

    },[]);


    let imgData = props.item['image_data'];
    let g = []

    if(props.item['Genre']){
        g = Array.isArray(props.item['Genre']) ? g = props.item['Genre'] : g = props.item['Genre'].split(',') ;
    }

    return (
        <div className={`list-item ${props.mrgBtm ? props.mrgBtm : ''}`}>
            <div className="card-item">
                <a href={`/content/info/${props.item['ContentID']}`} className="content-link">
                    <div className="list-details text-center">
                    <img width={"100%"} heigth={'100px'} src={imgData?imgData:'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg'}/>
                    {/* <div className="card-desc">
                        {props.item['name']? <p className="title text-white">{props.item['name']}</p>:''}
                        {props.item['average_rating']? <p className="text-white">{props.item['average_rating'].toFixed(1)}/10</p>:''}
                        {props.item['avgRating']? <p className="text-white">{props.item['avgRating'].toFixed(1)}/10</p>:''}
                    </div> */}
                    </div>
                </a>
            </div>
            
        </div>

    );

}


export default MobileListItem
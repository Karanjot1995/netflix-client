import React, { useState, useEffect } from "react";
import { FaPlay, FaRegPlayCircle } from 'react-icons/fa';
import { BsPlayCircle, BsPlusCircle } from 'react-icons/bs';
import {AiOutlineMinusCircle} from 'react-icons/ai';
import { BASE_API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setUserData } from "../actions";
import { addToList, getContent } from "../services/services";
// import useWindowSize from "./DeviceSize";


function ContentDetails(props) {
    let navigate = useNavigate();
    const [content, setContent] = useState({})
    const { id } = useParams();
    const [inList, setInlist] = useState(false)
    const userData = useSelector(state => state.user.userData)
    const isLogged = useSelector(state => state.user.isLogged)
    const dispatch = useDispatch()

    function inListItem(uc){
        let cid = null
        uc.map(c=>{
            if(c.id == content.id){
                cid = c.id
            }
        })
        if(cid == content.id){
            setInlist(true)
        }else{
            setInlist(false)
        }
    }


    useEffect(async () => {
        getContent(id).then(data=>{
            setContent(data[0])
            if(userData.userContent?.length){
                inListItem(userData.userContent)
            }
        });
    },[]);

    useEffect( () => {
        if(userData.userContent?.length){
            inListItem(userData.userContent)
        }
    },[]);


    function addToUserList(e,cid){
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
        removeFromList({user_id:userData.userDetails.CustomerID, content_id:cid}).then(data=>{
            dispatch(setUserData({userData:{...userData,userContent:data.updatedContent}}))
            inListItem(data.updatedContent)
        })
    }
    
    console.log(content, inList)

    return (
        <div className="content-details pt-50 m-pb-50">
            {/* <div className="banner-item" style={{"background-image": `url('${content['image_data']}')`}}> */}
            <div className="banner-item">
                <img src={`${content['image_data']}`}/>
                <div className="play-btn">
                    <a href={`/content/${content['id']}`}>
                        <BsPlayCircle className="play-icon"/>
                    </a>
                </div>
            </div>
            <div className="description m-2">
                {content['name'] && <h3 className="title fs-50">{content['name']}</h3>}
                {content['average_rating'] && <p>{Number(content['average_rating']).toFixed(1)}/10</p>}
                {content['avgRating'] && <p>{content['avgRating'].toFixed(1)}/10</p>}
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                {!inList?
                    <a className="title-text" onClick={(e)=>addToUserList(e,content['id'])}>
                        <BsPlusCircle className="add-list"/>
                        <span className="t"><span>Add to My List</span></span>
                    </a>
                    :
                    <a className="title-text" onClick={(e)=>removeFromList(e,content['id'])}>
                        <AiOutlineMinusCircle className="add-list"/>
                        <span className="t"><span>Remove from My List</span></span>
                        {/* <span className="title">Remove from List<span className="arrow"></span></span> */}
                    </a>
                }
            
            </div>
        </div>

    );

}


export default ContentDetails
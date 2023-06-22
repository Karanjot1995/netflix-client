import React, { useState, useEffect } from "react";
import { FaRegPlayCircle } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';
import {AiOutlineMinusCircle} from 'react-icons/ai';
import { BASE_API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../actions";
import { addToList, removeFromList } from "../services/services";
// import useWindowSize from "./DeviceSize";


function ListItem(props) {
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
    function inListItem(uc,id){
        let cid = null
        uc.map(c=>{
            if(c.id == props.item['id']){
                cid = c.id
                // setInlist(true)
            }
        })
        if(cid == props.item['id']){
            setInlist(true)
        }else{
            setInlist(false)
        }
    }

    useEffect( () => {
        if(userData.userContent?.length){
            inListItem(userData.userContent)
        }

    },[]);

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

    function removeFromUserList(e,cid){
        e.stopPropagation();
        e.preventDefault();
        removeFromList({user_id:userData.userDetails.CustomerID, content_id:cid}).then(data=>{
            dispatch(setUserData({userData:{...userData,userContent:data.updatedContent}}))
            inListItem(data.updatedContent)
        })
    }




    let imgData = props.item['image_data'];
    let g = []

    if(props.item['Genre']){
        g = Array.isArray(props.item['Genre']) ? g = props.item['Genre'] : g = props.item['Genre'].split(',') ;
    }

    return (
        <div className={`list-item ${props.mrgBtm ? props.mrgBtm : ''}`}>
            <div className="card-item">
                <a href={`/content/${props.item['id']}`} className="content-link">
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
            <div className='popup'>
                <a href={`/content/${props.item['id']}`} className="content-link">
                    <div className="card-details text-center mb-3">
                    <img width={"100%"} heigth={'100px'} src={imgData?imgData:'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg'}/>
                        <div className="p-3">
                            <div className="d-flex justify-content-between pb-3 text-start">
                                {props.item['name']? <p className="title text-white">{props.item['name']}</p>:''}
                                {props.item['average_rating']? <p className="text-white">{Number(props.item['average_rating']).toFixed(1)}/10</p>:''}
                                {props.item['avgRating']? <p className="text-white">{props.item['avgRating'].toFixed(1)}/10</p>:''}
                                {/* {props.item['runningTime']? <p className="text-white">{props.item['runningTime']}/10</p>:''} */}
                            </div>
                            <div className="preview d-flex justify-content-start mb-2">
                                <FaRegPlayCircle className="preview-play-btn mr-10"/>
                                {!inList?
                                <a className="title-text" onClick={(e)=>addToUserList(e,props.item['id'])}>
                                    <BsPlusCircle className="preview-play-btn"/>
                                    <span className="t"><span>Add to My List</span></span>
                                </a>
                                :
                                <a className="title-text" onClick={(e)=>removeFromUserList(e,props.item['id'])}>
                                    <AiOutlineMinusCircle className="preview-play-btn"/>
                                    <span className="t"><span>Remove from My List</span></span>
                                    {/* <span className="title">Remove from List<span className="arrow"></span></span> */}
                                </a>
                                }

                            </div>
                            <div className="">
                            {/* {Array.isArray(props.item['Genre']) ? 
                                <p className="text-white">{geres.join(',')}</p>
                                :<p className="text-white">{props.item['Genre'].split(',').join(', ')}</p>
                            } */}
                                <p className="text-white">{g.length ? g.join(',') : ''}</p>
                                {/* {props.item['Genre']? <p className="text-white">{props.item['Genre'].split(',').join(', ')}</p>:''} */}
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>

    );

}


export default ListItem
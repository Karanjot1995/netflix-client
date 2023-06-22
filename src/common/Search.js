import React, { useState, useEffect } from "react";
import ListItem from "../common/ListItem";
import { BiSearch } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import { useLocation, matchPath ,useNavigate} from 'react-router-dom';
import { BASE_API_URL } from "../utils/constants";
import { getSearch } from "../services/services";


function Search () {  
    const [result, setResult] = useState([]);
    const [disabled, setDisabled] = useState(false)
    const [toggle, setToggle] = useState('close-search')
    let navigate = useNavigate();


    // useEffect(async () => {
    //     fetch('/search').then(res => res.json()).then(data=>setQuery(data))
    // },[]);
    function handleChange(e){
        getSearch(e.target.value).then(d=>setResult(d))
    }

    // function getSearchResults(){
    //     console.log('search')
    //     // fetch('/seatch', {
    //     //     method: "POST",
    //     //     headers: { 'Content-Type': 'application/json' },
    //     //     body: JSON.stringify(data)
    //     // }).then(res => res.json()).then(d=>console.log(Object.values(d)));
    // }

    function openSearch(e) {
        setDisabled(true)
        setToggle('open-search')
    }
      
    function closeSearch(e) {
        setDisabled(false)
        setToggle('close-search')
    }

    // function navigate(item){
    //     closeSearch()
    //     navigate(`/content/${item['ContentID']}`)
        
    // }


    return (
        <div className="" id="search">
            <div className="search-bar">
                <input onClick={openSearch} className="input-search" placeholder="Search titles..." disabled={disabled}/>
                <BiSearch fill="#9b9ea3" className="nav-search" onClick={openSearch}/>
                <div id="myOverlay" className={`overlay ${toggle}`}>
                    <span className="closebtn" onClick={closeSearch} title="Close Overlay">×</span>
                    <div className="overlay-content">
                        <div className="overlay-search">
                            <input autocomplete="off" type="text" placeholder="Search Titles.." onChange={handleChange} name="search"/>
                            <span className="search-icon"><FaSearch fill="#9b9ea3" className="fa-search"/></span>

                            {result && result.length? 
                                <div id="search-results">
                                    <table className="search-table">

                                    {result.map((item)=>
                                        // <tr className="search-res d-flex justify-content-between p-2">
                                        // <a className="search-link d-flex" href={`/content/${item['ContentID']}`}>
                                        <a role="row" className="row search-res p-2" href={`/content/${item['id']}`}>
                                            <div role="gridcell" className="cell">
                                                <img height="50px" src ={item['image_data']?item['image_data']:'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg'}/>
                                            </div>
                                            <div role="gridcell" className="cell">
                                                <p className="text-light">{item['name']}</p>
                                            </div>
                                            <div role="gridcell" className="cell">
                                                <p className="text-light">{item['Genre']}</p>
                                            </div>
                                            <div role="gridcell" className="cell">
                                                <p className="text-light">{item['average_rating'].toFixed(1)}</p>
                                            </div>
                                        </a>
                                    )}
                                    </table>
                                </div>
                            :null
                            }
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )

}

export default Search;



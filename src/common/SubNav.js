import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSortDown } from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";



function SubNavigation (props) {  
    // let genres = props.genres.map((i))
    const [hide, setHide] = useState(true)
    const [genre, setGenre] = useState('')
    const {id} = useParams();
    const [scrolling, setScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const location = useLocation();

    let pathname = location.pathname
    if(pathname[0]=='/'){
        pathname = pathname.slice(1)
    }
    let path = pathname.split('/')

    let genres = []
    let k = 0;
    let count = 0;
    if(props.genres && props.genres.length){
        props.genres.map((g,i)=>{
            if(!genres[k]){
                genres[k] = []
            }
            genres[k].push(g)  
            count++;      
            if(count==10){
                k++
                count=0;
            }
        })
    }

  
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    }
  
    useEffect(() => {
      window.addEventListener('scroll', onScroll);
    },[]);
  
    useEffect(() => {
        let nav = document.getElementById('nav')
        if(scrollTop>50){
            nav.classList.add('scrolled')
        }else{
            nav.classList.remove('scrolled')
        }
    }, [scrollTop])


    return(
        <div className="sub-nav w-100" id="nav">
            {genres.length ? 
            <div className="d-flex align-items-baseline">
                <h3 className="page-title text-capitalize mb-0">{props.page}</h3>
                <div className="sel-genre">
                    <a className="genres-btn d-flex align-items-center" onClick={()=>setHide(!hide)}>Genres <FaSortDown className="down-caret"/></a>
                    <div className={`genres-list ${hide?'':'open'}`}>
                        {genres.map((v,i)=>
                            <ul className="sub-list p-3">
                                {genres[i] && genres[i].map(g=>
                                    <li className="text-capitalize">
                                        {/* <Link to={`movies/${g}`}>{g}</Link> */}
                                        <a role="button" className="text-white" href={`${location.pathname}/${g}`}>{g}</a>
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            :
            <div className="nav-steps pl-3 d-flex align-items-center">
                {path.map((p,i)=>
                    p!==id ? 
                    <>
                        <a role="button" href={`/${path[0]}`} className="p-3 text-capitalize font-small">{p}</a>
                        {i<path.length?<span className="m-1">{'>'}</span>:''}
                    </>
                    :
                    <p className="m-0 p-3 text-capitalize font-large">{p}</p>
                    
                )}
            </div>
            }
        </div>
    )

}

export default SubNavigation;



import React, { useRef, useState, useEffect } from "react";
import ListItem from "../ListItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../SlickArrow";
import { FaChevronRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Explore from "../Explore/Explore";
import useWindowSize from "../DeviceSize";
import MobileListItem from "../../mobile/ListItem/MobileListItem";

function SliderSection (props) {  
    const[explore, setExplore] = useState(false)
    const location = useLocation();
    const {list,genre,id, title, keyWord} = props

    const [components, setComponents] = useState([]); 
    const width = window.innerWidth;
    const minListLength = width>700?4:2
    const windowSize = useWindowSize()
    const [isMobile, setIsMobile] = useState(false)
   
    useEffect(() => {
      if(windowSize.width>600){
        setIsMobile(false)
      }else{
        setIsMobile(true)
      }
    },[])

    let pathname = location.pathname
    if(pathname[0]=='/'){
        pathname = pathname.slice(1)
    }
    let path = pathname.split('/')

    var settings = {
        dots: false,
        arrows:true,
        touchMove:true,
        draggable:true,        
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
        {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          }  
        ]
    };

    function exploreAll(){
        setExplore(true)
    }

    let t = ''
    if(title||genre){
        t = title? title: `${genre}${id? ` and ${id}`:''}`
    }

    function closeExplore(){
        setComponents([])
    }

    function openExplore(){
        let g = [];
        if(genre){
            g.push(genre)
        }
        if(id){
            g.push(id)
        }
        // id? g = [genre,id] : g = [genre];
        setComponents([<Explore title={t} keyWord={keyWord} genre={g} closeModal={closeExplore}/>]) 
    }


    return (
        <div className="section">
            {/* <Explore title={'comedy'} genre={'comedy'}/> */}
            {components.length ? components.map(c=>c):''}
            <div className="content">
                <div>
                    <h2 className="rowHeader ltr-0">
                    {/* href="/browse/m/genre/3276033" */}
                        <a className="rowTitle ltr-0 d-flex"  
                            onMouseOver={exploreAll} 
                            onMouseLeave={()=>setExplore(false)}
                            onClick={openExplore}
                        >
                            {title?
                                <div className="row-header-title text-capitalize">{title}</div>
                                :
                                <div className="row-header-title text-capitalize">{genre}{id? ` and ${id}`:''}</div>
                            }
                            <div className={`aro-row-header ${explore?'expand':''}`}>
                                <div className="see-all-link">Explore All</div>
                                <FaChevronRight className="aro-row-chevron icon-akiraCaretRight"/>
                            </div>
                        </a>
                    </h2>
                    {/* <h3 className="text-uppercase row-header-title">{id} and {genre}</h3> */}
                    {list.length> minListLength ?
                    <Slider className="mt-3 mb-4" {...settings}>
                        {list.map(item=> isMobile?<MobileListItem item={item} />:<ListItem item={item} /> )}
                    </Slider>
                    :
                    <div className="content-list d-flex mt-3 mb-4">{list.map(item=><ListItem item={item} />)}</div>
                    }
                </div>
            </div>
        </div>
    )

}

export default SliderSection;



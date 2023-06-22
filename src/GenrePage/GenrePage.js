import React, { useState, useEffect } from "react";
import ListItem from "../common/ListItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../common/SlickArrow";
import Banner from "../common/Banner";
import { useParams, useLocation } from "react-router-dom";
import SubNavigation from "../common/SubNav";
import { FaChevronRight } from "react-icons/fa";
import SliderSection from "../common/Slider/SliderSection";
import { BASE_API_URL } from "../utils/constants";
import { getMovies, getShows } from "../services/services";


function GenrePage (props) {  
    const {id} = useParams();
    const location = useLocation();

    const [commonData, setCommonData] = useState([]);
    // const [movies, setMovies] = useState({})
    const [data, setData] = useState({})

    // console.log(id,location)

    let type = location.pathname.split('/')[1]

   
    useEffect(async () => {
        if(type=="shows"){
            getShows().then(data=> {
                let hash = {}

                setCommonData(data.shows)
                // if(data.shows && data.shows.length){
                //     data.shows.map((item)=>hash[item['Genre']] ? hash[item['Genre']].push(item) : hash[item['Genre']] = [item]);
                //     setData(hash)
                // }
                let c = data.shows;
                let d = {}
                for(let i=0;i<c.length;i++){
                    let gArr = c[i]['genre'];
                    for(let j=0;j<gArr.length;j++){
                        let g = gArr[j]
                        if(!d[g]){
                            d[g] = []
                        }
                        d[g].push(c[i])                    
                    }
                }
                setData(d)
                // console.log(d)
            })
        }
        if(type=="movies"){
            getMovies().then(data=> {
                console.log(data)
                let hash = {}
                setCommonData(data.movies)
                // setAllData(data)
                // if(data.movies && data.movies.length){
                //     data.movies.map((item)=>hash[item['Genre']] ? hash[item['Genre']].push(item) : hash[item['Genre']] = [item]);
                //     setData(hash)
                // }
                let c = data.movies;
                let d = {}
                for(let i=0;i<c.length;i++){
                    let gArr = c[i]['genre'];
                    for(let j=0;j<gArr.length;j++){
                        let g = gArr[j]
                        if(!d[g]){
                            d[g] = []
                        }
                        d[g].push(c[i])                    
                    }
                }
                setData(d)
            })
        }
    },[]);


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
        prevArrow: <PrevArrow />    
    };

    var settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
    };
    let otherGenres = []
    if(Object.keys(data).length){
        data[id].map(c=>
            c['genre'].map(g=>{
                if(g!= id){
                    if(!otherGenres[g]){
                        otherGenres[g] = []
                    }
                    otherGenres[g].push(c)
                }
            })
        )
        console.log(otherGenres)
    }



    if(Object.keys(data).length){
        return (
            <div className="pt-50" id="all-content">
                <SubNavigation page={type} />
                <div className="banner">
                    {commonData.length  ? 
                    <Slider className="mb-5" {...settings1}>
                        {commonData.slice(0,5).map((item)=><Banner item={item} />)}
                    </Slider>
                    : ''}
                </div>
                {Object.keys(otherGenres).map(genre=>
                    <SliderSection id={id} list={otherGenres[genre]} genre={genre}/>
                // <div className="section">
                //     <div className="content">
                //         <div>
                //             <h2 className="rowHeader ltr-0">
                //             {/* href="/browse/m/genre/3276033" */}
                //                 <a className="rowTitle ltr-0 d-flex" onMouseOver={exploreAll()}>
                //                     <div className="row-header-title text-capitalize">{id} and {genre}</div>
                //                     <div className="aro-row-header d-flex">
                //                         <div className="see-all-link">Explore All</div>
                //                         <div className="aro-row-chevron icon-akiraCaretRight"><FaChevronRight/></div>
                //                     </div>
                //                 </a>
                //             </h2>
                //             {/* <h3 className="text-uppercase row-header-title">{id} and {genre}</h3> */}
                //             {otherGenres[genre].length>4 ?
                //             <Slider className="mt-5 mb-5" {...settings}>
                //                 {otherGenres[genre].map(item=><ListItem item={item} />)}
                //             </Slider>
                //             :
                //             <div className="content-list d-flex mt-2 mb-3">{otherGenres[genre].map(item=><ListItem item={item} />)}</div>
                //             }
                //         </div>
                //     </div>
                // </div>
                )}

                {/* {Object.keys(data).map(genre=>
                <div className="section">
                    <div className="content">
                        <div>
                            <h3 className="text-uppercase">{genre}</h3>
                            {data[genre].length>4 ?
                            <Slider className="mt-5 mb-5" {...settings}>
                                {data[genre].map(item=><ListItem item={item} />)}
                            </Slider>
                            :
                            <div className="content-list d-flex mt-5 mb-5">{data[genre].map(item=><ListItem item={item} />)}</div>
                            }
                        </div>
                    </div>
                </div>
                )} */}
            </div>
        )
    }else{
        return <div className="text-center pt-100 text-light">Loading...</div>
    }

}

export default GenrePage;



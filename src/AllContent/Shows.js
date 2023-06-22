import React, { useState, useEffect } from "react";
import ListItem from "../common/ListItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../common/SlickArrow";
import Banner from "../common/Banner";
import SubNavigation from "../common/SubNav";
import SliderSection from "../common/Slider/SliderSection";
import { BASE_API_URL } from "../utils/constants";
import { getNewReleases, getPopular, getShows } from "../services/services";

function Shows () {  
    const [shows, setShows] = useState({});
    const [newReleases, setNewReleases] = useState({movies:[],content:[]})
    const [genShows, setGenShows] = useState({});
    const [popular, setPopular] = useState({});

   
    useEffect(async () => {
        // let hash = 	data.map((item)=>hash[item['GENRE']]?hash[item['GENRE']].push(item) : hash[item['GENRE']] = [item])
        getShows().then(data=> {
            setShows(data)
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
            setGenShows(d)
        })
        getNewReleases({'query':'TV'}).then(c=>
            setNewReleases(c)
        )
        getPopular({type:'TV'}).then(data=>setPopular(data))


        // fetch(`/api/popular`,{
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({type:'tv'})
        // }).then(res => res.json()).then(data=>setPopular(data))

    },[]);

    console.log(shows)

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

    if(Object.keys(genShows).length){
        return (
            <div className="pt-50" id="all-content">
                <SubNavigation page={'shows'} genres={Object.keys(genShows)}/>

                <div className="banner">
                    {shows.shows && shows.shows.length ? 
                    <Slider className="mb-5" {...settings1}>
                        {shows.shows.slice(0,5).map((item)=><Banner item={item} />)}
                    </Slider>
                    : ''}
                </div>

                {newReleases.content && newReleases.content.length ? 
                    <SliderSection list={newReleases.content} keyWord={'new-releases'} title="New Releases"/>
                :''}
                
                {popular.mostViewed && popular.mostViewed && 
                    <SliderSection title={'Popular on Netflix'} keyWord={'popular'} list={popular.mostViewed}/>
                }
                {Object.keys(genShows).map(genre=>
                    <SliderSection list={genShows[genre]} genre={genre}/>
                )}
            </div>
        )
    }else{
        return <div className="text-center pt-100 text-light">Loading...</div>
    }

}

export default Shows;



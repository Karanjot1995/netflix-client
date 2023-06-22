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
import { getMovies, getNewReleases, getPopular } from "../services/services";

function Movies () {  
    const [movies, setMovies] = useState({movies:[],content:[]})
    const [newReleases, setNewReleases] = useState({movies:[],content:[]})
    const [popular, setPopular] = useState({});
    const [genMovies, setGenMovies] = useState({})

   
    useEffect(async () => {
        fetch(`/api/user-list`,{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userid:21001})
        }).then(res=>res.json()).then(data=>
            console.log(data)
        )
        // let hash = 	data.map((item)=>hash[item['GENRE']]?hash[item['GENRE']].push(item) : hash[item['GENRE']] = [item])
        getMovies().then(data=> {
            let hash = {}
            setMovies(data)
            // if(data.movies && data.movies.length){
            //     data.movies.map((item)=>hash[item['Genre']] ? hash[item['Genre']].push(item) : hash[item['Genre']] = [item]);
            //     setGenMovies(hash)
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
            setGenMovies(d)
        })
        getNewReleases({'query':'movie'}).then(c=>{
            setNewReleases(c)
        })
        getPopular({type:'Movie'}).then(data=>setPopular(data))

        // fetch(`/api/popular`,{
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({type:'movie'})
        // }).then(res => res.json()).then(data=>setPopular(data))
        
    },[]);

    // console.log(movies)



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

    if(Object.keys(genMovies).length){
        return (
            <div className="pt-50" id="movies">
                <SubNavigation page={'movies'} genres={Object.keys(genMovies)}/>
                <div className="banner">
                    {movies.movies && movies.movies.length ? 
                    <Slider className="mb-5" {...settings1}>
                        {movies.movies.slice(0,5).map((item)=><Banner item={item} />)}
                    </Slider>
                    : ''}
                </div>
                {newReleases.content && newReleases.content.length ? 
                    <SliderSection list={newReleases.content} keyWord={'new-releases'} title="New Releases"/>
                :''}
                {popular.mostViewed && popular.mostViewed && 
                    <SliderSection title={'Popular on Netflix'} keyWord={'popular'} list={popular.mostViewed}/>
                }
                {Object.keys(genMovies).map(genre=>
                    <SliderSection list={genMovies[genre]} genre={genre}/>
                )}
            </div>
        )
    }else{
        return <div className="text-center pt-100 text-light">Loading...</div>
    }

}

export default Movies;

// <div className="section">
//     <div className="content">
//         <div>
//             <h3 className="text-uppercase">{genre}</h3>
//             {genMovies[genre].length>4 ?
//             <Slider className="mt-5 mb-5" {...settings}>
//                 {genMovies[genre].map(item=><ListItem item={item} />)}
//             </Slider>
//             :
//             <div className="content-list d-flex mt-5 mb-5">{genMovies[genre].map(item=><ListItem item={item} />)}</div>
//             }
//         </div>
//     </div>
// </div>



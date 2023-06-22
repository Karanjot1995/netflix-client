import React, { Component, useState, useEffect } from "react";
import ListItem from "../common/ListItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Banner from "../common/Banner";
import { NextArrow, PrevArrow } from "../common/SlickArrow";
import SliderSection from "../common/Slider/SliderSection";
import { BASE_API_URL } from "../utils/constants";
import { getAllContent, getAllMovies, getBestRated, getMovies, getPopular, getShows } from "../services/services";

function Home () {
    const [allMovies, setAllMovies] = useState({})
    const [allContent, setAllContent] = useState({})
    const [popular, setPopular] = useState({})
    const [shows, setShows] = useState({})

    const [bestRated, setBestRated] = useState({})

    const [rating, setRating] = useState(9)
    let textInput = React.createRef();

    function getData(){
        getAllMovies().then(data=>setAllMovies(data))
        getShows().then(data=>setShows(data))
        getMovies().then(data=>console.log(data))
        getAllContent().then(data=>setAllContent(data))
        getBestRated().then(data=>setBestRated(data))
        getPopular().then(data=>setPopular(data))

        // fetch(`/api/popular`,{
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        // }).then(res => res.json()).then(data=>setPopular(data))

        // fetch(`/api/best-rated`, {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({rating:9})
        // }).then(res => res.json()).then(data=>setBestRated(data));
    }

    function changeRating(){
        setRating(textInput.current.value)
        fetch(`/api/best-rated`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({rating:textInput.current.value})
        }).then(res => res.json()).then(data=>setBestRated(data));
    }


    useEffect(async () => {
        getData()
    },[]);

    // if(allContent && !!allContent.content){
    //     let c = allContent.content
    //     for(let i = 0;i<c.length;i++){
    //         // console.log(c[i]['Genre'])
    //         let g = c[i]['Genre']
    //         g = g.split(',')
    //         c[i]['Genre'] = g
    //     }
    //     console.log(c)
    // }


    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        arrows:true,
        touchMove:true,
        draggable:true,
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
 
    if(Object.keys(allMovies).length){
        return (
            <div className="home pt-50">
                <div className="banner">
                    {popular && popular.mostViewed ? 
                    <Slider className="mb-5" {...settings1}>
                        {popular.mostViewed.slice(0,5).map((item)=><Banner item={item} />)}
                    </Slider>
                    : ''}
                </div>
                <div className="text-center">
                    {/* <h3 className="mb-5">Rating above {rating} ({bestRated.bestRated && bestRated.bestRated.length ? bestRated.bestRated.length:''})</h3>
                    <p className="mb-5"><span>Select best rated movies above </span><input ref={textInput} defaultValue={rating} type="number"/><button onClick={()=>changeRating()}>Submit</button></p> */}
                    {bestRated.bestRated?.length && 
                    // <Slider className="mb-5" {...settings}>
                    //     {bestRated.bestRated.map(item=><ListItem item={item} />)}
                    // </Slider>
                    <SliderSection keyWord={'top-rated'} title={"Top rated on Netflix"} list={bestRated.bestRated}/>
                    }
                </div>
                {popular && popular.mostViewed && 
                    <SliderSection keyWord={'popular'} title={'Popular on Netflix'} list={popular.mostViewed}/>
                }

                {/* <div className="section">
                    <h3 className="mb-5 text-center">New Movies</h3>
                    {Object.keys(allMovies).length ? 
                    <Slider {...settings}>
                        {allMovies.content.map(item=><ListItem item={item} />)}
                    </Slider>
                    : ''}
                </div>
                <div className="section">
                    <h3 className="mb-5 text-center">New TV</h3>
                    {Object.keys(allMovies).length ? 
                    <Slider {...settings}>
                        {allMovies.content.map(item=><ListItem item={item} />)}
                    </Slider>
                    : ''}
                </div> */}
            </div>
        )
    }else{
        return <div className="text-center pt-100 text-light">Loading...</div>
    }

}

export default Home;
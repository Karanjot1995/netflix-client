import { Component } from "react";
import { FaPlay } from "react-icons/fa";


class Banner extends Component {
    render(){
        const props = this.props
        // console.log(props)
       
        return (
            <div className="banner-item" style={{"background-image": `url('${props.item['image_data']}')`}}>
                <div className="p-5 b-txt text-uppercase">
                    <div className="banner-desc">
                    {/* <img width={'100px'} heigth={'100px'} src={'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'}/> */}
                    {props.item['name'] && <h3 className="title fs-50">{props.item['name']}</h3>}
                    {props.item['average_rating'] && <p>{Number(props.item['average_rating']).toFixed(1)}/10</p>}
                    {props.item['avgRating'] && <p>{props.item['avgRating'].toFixed(1)}/10</p>}
                    <a href={`/content/${props.item['id']}`} className="banner-play-btn">
                        <FaPlay className="play-icon"/>Play
                    </a>
                    </div>
                </div>
            </div>

          );
    }

}

export default Banner;
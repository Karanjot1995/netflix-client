import { FaChevronLeft,FaChevronRight } from 'react-icons/fa';

export function NextArrow(props){
    const { className, style, onClick } = props;

    return(
        <div className={className} onClick={onClick} style={{...style}}>
            <div className="arrow-c">
                <FaChevronRight className="slider-arrow" />
            </div>
        </div>
    )
}

export function PrevArrow(props){
    const { className, style, onClick } = props;

    return(
        <div className={className} onClick={onClick} style={{...style}}>
            <div className="arrow-c">
                <FaChevronLeft className="slider-arrow"/>
            </div>
        </div>
    )
}
import React, {Component} from 'react'
import './HeaderContent.scss'
import HeaderSlider from '../HeaderSlider/HeaderSlider'
import map from '../../img/map.png'
import map2 from '../../img/map2.png'
import 'react-id-swiper/src/styles/scss/swiper.scss'

export default class HeaderContent extends Component {
    render() {

        const {slides} = this.props

        return (
            <div className="header-content">
                <HeaderSlider params={this.props.params} slideIndex={this.props.slideIndex} />
                {
                    slides.map((item,i) =>
                        <div className="header-map" key={i}>
                            <img src={item.img} className={`${this.props.slideIndex !== item.id ? "slideFadeOut" : 'slideFadeIn'}`} alt="" />
                        </div>
                    )
                }
            </div>
        )
    }
}

HeaderContent.defaultProps = {
    slides: [
        {
            id: 0,
            img: map2
        },
        {
            id: 1,
            img: map
        },
        {
            id: 2,
            img: map2
        },
        {
            id: 3,
            img: map
        },
        {
            id: 4,
            img: map2
        }
    ]
}

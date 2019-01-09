import React, {Component, Fragment} from "react"
import "./Slider.scss"

import Swiper from "react-id-swiper"
import "react-id-swiper/src/styles/scss/swiper.scss"

import {ArrowType1} from "../Elements/Icons/Icons"

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import uuid from "uuid";

class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }

    handleGalleryClick = (e, i) => {
        this.setState({photoIndex: i, isOpen: true})
    }

    render() {

        const {photoIndex, isOpen} = this.state

        const {sliderImages, largeImages} = this.props;
        const dateSliderParams = {
            slidesPerView: 4,
            // centeredSlides: true,
            initialSlide: 0,
            shortSwipes: true,
            // loop: sliderImages.length > 4,
            spaceBetween: 25,
            shouldSwiperUpdate: true,
            /*autoplay: {
                      delay: 3000,
                  },*/
        };
        const goNext = () => {
            if (this.swiper) this.swiper.slideNext();
        };

        const goPrev = () => {
            if (this.swiper) this.swiper.slidePrev();
        };

        return (
            <Fragment>
                <div className="Slider">
                    {/* eslint-disable */}
                    <Swiper
                        {...dateSliderParams}
                        ref={node => {
                            if (node) this.swiper = node.swiper;
                        }}
                    >
                        {sliderImages.map((image, i) => (
                            <div
                                className='Slider__item-wrapper'
                                style={{backgroundImage: `url(${image})`}}
                                onClick={e => {
                                    this.handleGalleryClick(e, i)
                                }}
                                key={uuid()}
                            >
                            </div>
                        ))}
                    </Swiper>
                    <div
                        className="row mb-4 align-items-center"
                        style={{width: "156px", textAlign: "center"}}
                    >
                        <div className="col">
                            <div style={{marginBottom: "3px", fontWeight: "600"}}>
                                {sliderImages.length} фото
                            </div>
                            <div
                                onClick={goPrev}
                                className="news-slider__arr news-slider__arr_prev"
                            >
                                <ArrowType1/>
                            </div>
                            <div
                                onClick={goNext}
                                className="news-slider__arr news-slider__arr_next"
                            >
                                <ArrowType1/>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    isOpen && (
                        <Lightbox
                            mainSrc={largeImages[photoIndex]}
                            // imageTitle={media[photoIndex].text}
                            // imageCaption={media[photoIndex].text}
                            nextSrc={largeImages[(photoIndex + 1) % largeImages.length]}
                            prevSrc={largeImages[(photoIndex + largeImages.length - 1) % largeImages.length]}
                            onCloseRequest={() => this.setState({isOpen: false})}
                            onMovePrevRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + largeImages.length - 1) % largeImages.length,
                                })
                            }
                            onMoveNextRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + 1) % largeImages.length,
                                })
                            }
                        />
                    )
                }
            </Fragment>
        )
    }
}

export default Slider;

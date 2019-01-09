import React, {Component} from 'react'
import './NewsSlider.scss'
import Swiper from 'react-id-swiper'
import 'react-id-swiper/src/styles/scss/swiper.scss'
import {ArrowType1, Rss} from "../Elements/Icons/Icons"
import BtnBlue from "../Elements/BtnBlue/BtnBlue"
import axios from "axios";
import moment from 'moment'
import 'moment/locale/ru'
import Truncate from "react-truncate";
import {Link} from "react-router-dom";
import Spinner from '../Spinner/Spinner'

// import LazyLoad from 'react-lazyload';

export default class NewsSlider extends Component {

    state = {
        news: null,
        carouselInited: false
    }

    componentWillMount() {
        axios.get('/api/v1/news/')
            .then((response) => {
                // console.log(response)
                this.setState({
                    news: response.data
                })
                // console.log(this.state.news.items[0].thumb_urls.previewPicture.thumb)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const dateSliderParams = {
            slidesPerView: 4,
            // centeredSlides: true,
            initialSlide: 0,
            shortSwipes: true,
            // loop: true,
            spaceBetween: 30,
            /*autoplay: {
                delay: 3000,
            },*/
            on: {
                init: () => {
                    this.setState({
                        carouselInited: true
                    })
                },
            }
        }

        const goNext = () => {
            if (this.swiper) this.swiper.slideNext()
        }

        const goPrev = () => {
            if (this.swiper) this.swiper.slidePrev()
        }

        const {
            news
        } = this.state

        if (news === null) {
            return <div style={{heigth: '378pxs'}}><Spinner /></div>
          }

        return (
            <section className='news-slider'>
                <div className="section-wrapper">
                    <div className="row mb-4 align-items-center">
                        <div className="col">
                            <h2 className='title-section d-flex align-items-center'>
                                НОВОСТИ
                                {Rss(`#41C0E4`)}
                            </h2>
                        </div>
                        <div className="col text-right news-slider__bar">
                            {BtnBlue('/news/?page=1', 'больше новостей')}

                            <div onClick={goPrev} className="news-slider__arr news-slider__arr_prev">
                                <ArrowType1/>
                            </div>
                            <div onClick={goNext} className="news-slider__arr news-slider__arr_next">
                                <ArrowType1/>
                            </div>
                        </div>
                    </div>
                    {
                        news.items
                            ? <Swiper {...dateSliderParams} ref={node => {
                                if (node) this.swiper = node.swiper
                            }}>
                                {
                                    [...news.items].map((el, i) =>
                                        <div
                                            key={el.id}
                                            className='text-center news-slider__slide'
                                        >
                                            <Link to={`/news/detail/${el.id}`} className='news-card'>
                                            {/* <LazyLoad offset={[-100, 0]}> */}
                                                <div
                                                    className="news-card__img"
                                                     style={{backgroundImage: `url(${el.thumb_urls.previewPicture ? el.thumb_urls.previewPicture.thumb : ''})`}}
                                                >&zwnj;</div>
                                                {/* </LazyLoad> */}
                                                <div className="news-card__text-wrapper">
                                                    <h4 className='news-card__title'>
                                                    {
                                                        this.state.carouselInited &&
                                                        <Truncate lines={2}>
                                                            {el.title}
                                                        </Truncate>
                                                    }
                                                    </h4>
                                                    <p className='news-card__descr'>
                                                        {
                                                            this.state.carouselInited &&
                                                            <Truncate lines={4}>
                                                                {el.preview}
                                                            </Truncate>
                                                        }
                                                    </p>
                                                    <span
                                                        className='news-card__date'>{moment(el.published_at).format('D MMMM YYYY')}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }
                            </Swiper>
                            : ''
                    }
                </div>
            </section>
        )
    }
}

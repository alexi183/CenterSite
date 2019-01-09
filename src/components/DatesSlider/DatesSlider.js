import React, {Component} from 'react'
import {inject, observer} from "mobx-react"
import './DatesSlider.scss'
import Swiper from 'react-id-swiper'
import 'react-id-swiper/src/styles/scss/swiper.scss'

import moment from 'moment'
import 'moment/locale/ru'

import {ArrowType1} from "../Elements/Icons/Icons";

@inject('eventsStore')
@observer
class DatesSlider extends Component {

    componentWillMount() {
        this.props.eventsStore.loadDates()
    }

    render() {
        const {
            eventsStore: {
                onSliderDateSelect,
                onAllEventsClicked,
                allEventsBtnSelected,
                datesArray,
                datesActiveDate
            }
        } = this.props

        const dateSliderParams = {
            slidesPerView: 9,
            // spaceBetween: 15,
            // centeredSlides: true,
            // initialSlide: 5,
            shortSwipes: true,
            on: {
                slideChange: function () {
                }
            }
        }

        const goNext = () => {
            if (this.swiper) this.swiper.slideNext()
        }

        const goPrev = () => {
            if (this.swiper) this.swiper.slidePrev()
        }

        return (
            <div className='dates-slider'>
                <div className="dates-slider__all">
                    <div
                        className={`dates-slider__all-btn ${allEventsBtnSelected ? 'active' : ''}`}
                        onClick={onAllEventsClicked}
                    >
                        все события
                    </div>
                </div>
                <div className="dates-slider__swiper-wrapper">
                    <div className="">
                        <div onClick={goNext} className="dates-slider__arrows dates-slider__arrows-next">
                            <ArrowType1/>
                        </div>
                        <div onClick={goPrev} className="dates-slider__arrows dates-slider__arrows-prev">
                            <ArrowType1/>
                        </div>
                    </div>
                    {
                        datesArray.length && <Swiper {...dateSliderParams} ref={node => {
                            if (node) this.swiper = node.swiper
                        }}
                        >
                            {
                                datesArray && datesArray.map((el, i) =>
                                    <div
                                        key={i}
                                        className={`text-center dates-slider__slide ${datesActiveDate[i].selected ? 'active' : ''}`}
                                        onClick={() => onSliderDateSelect(i)}

                                    >
                                        <div className="dates-slider__date">
                                            <div className="dates-slider__date">{moment(el).format('D ')}</div>
                                            <span className="dates-slider__month">{moment(el).format('MMMM')}</span>
                                        </div>
                                    </div>
                                )
                            }
                        </Swiper>
                    }
                </div>

            </div>
        )
    }
}

export default DatesSlider

DatesSlider.defaultProps = {}
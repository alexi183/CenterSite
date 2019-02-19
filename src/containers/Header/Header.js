import React, {Component, Fragment} from 'react'
import {inject, observer} from "mobx-react";
import HeaderContent from '../../components/HeaderContent/HeaderContent'
import HeaderTop from '../../components/HeaderTop/HeaderTop';
import './Header.scss';
import HeaderCircle from "../../components/HeaderCircle/HeaderCircle";
/*import EventsCalendarPopup from "../../components/EventsCalendarPopup/EventsCalendarPopup";*/
import Particle from '../../components/Particle/Particle'
import sliderImg from '../../img/Page_1.png'

@inject('headerStore')
@observer

class Header extends Component {

    render() {
        const {slideIndex, prevIndex, onSlideIndexChange, onSlideIndexPrev} = this.props.headerStore

        const params = {
            loop: true,
            direction: 'vertical',
            autoplay: {
                delay: 6000,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            parallax: true,
            speed: 2000,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            on: {
                slideChange() {
                    onSlideIndexChange(this.realIndex);
                },

                prevSlide() {
                    onSlideIndexPrev(this.previousIndex);
                }
            }
        };

        return (
            <Fragment>
                <HeaderTop />
                {this.props.indexFunc() &&
                <Fragment>
                    <div className="header-container">
                        <HeaderContent params={params} slideIndex={slideIndex}/>
                        <Particle params={params} slideIndex={slideIndex}/>
                        <div className="header-container__backgroundImage" />
                        {/* <HeaderCircle slideIndex={slideIndex} prevIndex={prevIndex} /> */}
                    </div>

                </Fragment>
                }
            </Fragment>
        )
    }
}

export default Header

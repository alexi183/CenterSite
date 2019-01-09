import React, {Component} from 'react'
import './HeaderSlider.scss'
import Swiper from 'react-id-swiper'
import ruslogo from "../../img/ruslogo.png";
import logo1 from "../../img/logo1.png";
import img3 from "../../img/header-slider-img.png"
import img4 from "../../img/header-slider-img2.png"
import img5 from "../../img/header-slider-img3.png"
import BtnBlue from "../Elements/BtnBlue/BtnBlue";

class HeaderSlider extends Component {

    render() {
        const { params, slider} = this.props;

        return (
            <div className="header-slide">
                <Swiper {...params}>
                    {
                        slider.map((item, i) =>
                            <div className="header-slide__item" key={i}>
                                <div className="header-slide__row-top">
                                    <div className="header-slide__img-block" data-swiper-parallax="-500">
                                        <img src={item.img} alt="search" />
                                    </div>

                                    <div className="header-slide__text" data-swiper-parallax-duration="3500">
                                        <div className="header-slide__head">
                                            {item.header}
                                        </div>
                                        {item.text}
                                        <div className="header-slide__btn">
                                            {BtnBlue(item.link,'Перейти')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Swiper>
            </div>
        )
    }
}

export default HeaderSlider

HeaderSlider.defaultProps = {
    slider: [
        {
            id: 1,
            img: ruslogo,
            header: 'Российская электронная школа',
            text: 'Информационно-образовательная среда, содержащая полный школьный курс уроков, объединяющая ученика, учителя и родителя, открывающая равный доступ к качественному контенту независимо от социокультурных условий',
            link: '/projects/detail/4'
        },
        {
            id: 2,
            img: logo1,
            header: 'Учитель года',
            text: 'Выявление, поддержка и поощрение талантливых школьных учителей, распространение их педагогического опыта и повышение престижа труда учителя',
            link: '/projects/detail/3'
        },
        {
            id: 3,
            img: img3,
            header: 'Федеральная система доступности дошкольного образования',
            text: 'Повышение эффективности и качества реализации мероприятий по обеспечению доступности дошкольного образования, мониторинг потребности в создании дополнительных мест в дошкольных образовательных организациях',
            link: '/projects/detail/6'
        },
        {
            id: 4,
            img: img4,
            header: 'Всероссийский конкурс сочинений',
            text: 'Возрождение традиций написания сочинения как самостоятельной творческой работы, в которой отражаются личностные, предметные и метапредметные результаты на разных этапах обучения и воспитания личности',
            link: '/projects/detail/36'
        },
        {
            id: 5,
            img: img5,
            header: 'Единое пространство дополнительного профессионального образования',
            text: 'Информационно - образовательная среда, обеспечивающая персонифицированное повышение квалификации педагогических работников',
            link: '/projects/detail/35'
        }

    ]
};
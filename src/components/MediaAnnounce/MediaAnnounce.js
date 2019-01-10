import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MediaAnnounce.scss";

import Spinner from '../Spinner/Spinner'

import BtnBlue from "../Elements/BtnBlue/BtnBlue";
import mediaBlock from "../../img/mediablock.png";
import media1 from "../../img/media1.png";
import media2 from "../../img/media2.png";
import media3 from "../../img/media3.png";
import medialenta1 from "../../img/media-lenta1.png";
import medialenta2 from "../../img/media-lenta2.png";
import medialenta3 from "../../img/media-lenta3.png";
import medialenta4 from "../../img/media-lenta4.png";
import mediaIcon from '../../img/media-icon-main.png'
import uuid from "uuid";

class MediaAnnounce extends Component {
    state = {
        media: null
    };

    componentWillMount() {
        axios
            .get("/api/v1/medias/")
            .then(response => {
                this.setState({
                    media: response.data.itemsz
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        if (this.state.media === null) {
            return <div style={{height: "447px"}}><Spinner /></div>
        }

        const renderMediaBlock = el => (
            <a href={`/media/detail/${el.id}`} key={uuid()} className="media-announce__block">
                <div
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${el
                            .thumb_urls.image && el.thumb_urls.image.original})`
                    }}
                    className="media-announce__img-container"
                />
                <i
                    className={`media-announce__icon media-announce__icon_${
                        el.type === 1 ? "photo" : "video"
                        }`}
                >
                    &zwnj;
                </i>
                <h4 className="media-announce__block-title">
                    {el.name ? el.name : null}
                </h4>
            </a>
        );

        const renderMediaBlockCenter = mediaCenter => (
            <div className="media-announce__block-center">
                <h3>Самое интересное на фото и видео</h3>
                <div className="media-announce__link-block">
                    {mediaCenter.map((item, i) => (
                        <Link className="media-announce__link" to={item.link} key={i}>
                            <img src={item.img} alt="" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
                <div className="media-announce__block-center-footer">
                    <img src={mediaBlock} alt="mediaBlock" />
                </div>
            </div>
        );

        const { mediaCenter } = this.props;

        return (
            <section className="media-announce">
                <div className="section-wrapper">
                    <div className="row mb-4 align-items-center">
                        <div className="col">
                            <h2 className="title-section" style={{display: 'inline-block', marginRight: '30px'}}>МЕДИАЛЕНТА</h2>
                            <div style={{display: 'inline-block', cursor:'pointer', verticalAlign: 'super'}}>
                                <a href="/presentations/?page=1" style={{color: '#000'}}>
                                    <img src={mediaIcon} className="media-icon-main" alt='media-icon'/>
                                    <span className='media-icon-span'>ПРЕЗЕНТАЦИИ</span>
                                </a>
                            </div>
                        </div>
                        <div className="col text-right flex-grow-0">
                            {BtnBlue(`/media/?page=1`, `в галерею`, true)}
                        </div>
                    </div>
                    <div className="media-announce__blocks-wrapper">
                        <div className="media-announce__col">
                            {this.state.media &&
                            this.state.media.slice(0, 2).map(el => renderMediaBlock(el))}
                        </div>
                        <div className="media-announce__col">
                            {renderMediaBlockCenter(mediaCenter)}
                        </div>
                        <div className="media-announce__col">
                            {this.state.media &&
                            this.state.media
                                .slice(2, 4)
                                .map((el) => renderMediaBlock(el))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default MediaAnnounce;

MediaAnnounce.defaultProps = {
    media: [
        {
            type: "gallery",
            text:
                'Фоторепортаж с курсов повышения квалификации учителей "РЭШ - наше будущее - (c) РИА Новости"',
            link: "#",
            img: medialenta1
        },
        {
            type: "video",
            text:
                "Видеорепортаж с курсов повышения квалификации учителей - также наше будущее",
            link: "#",
            img: medialenta2
        },
        {
            type: "video",
            text:
                "Видеорепортаж с курсов повышения квалификации учителей - также наше будущее",
            link: "#",
            img: medialenta3
        },
        {
            type: "gallery",
            text:
                'Фоторепортаж с курсов повышения квалификации учителей "РЭШ - наше будущее"',
            link: "#",
            img: medialenta4
        },
        {
            type: "gallery",
            text:
                'Фоторепортаж с курсов повышения квалификации учителей "РЭШ - наше будущее"',
            link: "#",
            img: medialenta4
        }
    ],

    mediaCenter: [
        {
            link: "/media/?page=1&category=1",
            img: media1,
            name: "Вебинары"
        },
        {
            link: "/media/?page=1&category=2",
            img: media2,
            name: "События"
        },
        {
            link: "/media/?page=1&category=3",
            img: media3,
            name: "Конкурсы"
        }
    ]
};

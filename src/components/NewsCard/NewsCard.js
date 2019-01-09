import React from "react";
import "./NewsCard.scss";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";

const NewsCard = (title, description, link, date, img, listStyle) => {
    return (
        <div className="news-card">
            <Link to={`/news/detail/${link}`} style={{ textDecoration: "none" }}>
                <div
                    className={`${
                        listStyle ? "news-card__list-style-img" : "news-card__img"
                        }`}
                    style={{ backgroundImage: `url(${img})` }}
                >
                    &zwnj;
                </div>
                <div className="news-card__text-wrapper">
                    <h4
                        className={`${
                            listStyle ? "news-card__list-style-title" : "news-card__title"
                            }`}
                    >
                        <Truncate lines={2}>
                            {title}
                        </Truncate>
                    </h4>
                    <p className="news-card__descr js-news-descr">
                        <Truncate lines={4}>{description}</Truncate>
                    </p>
                </div>
            </Link>

            <div className="news-card__download-wrapper">
                <span className="news-card__date">{date}</span>
            </div>

        </div>
    );
};

export default NewsCard;

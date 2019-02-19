import React from "react";
import "./NewsCard.scss";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";

// import DOCicon from "../../img/DOC-icon.png";
// import PDFicon from "../../img/PDF-icon.png";
// import XLSicon from "../../img/XLS-icon.png";

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
            <Truncate lines={3}>
              {title}
            </Truncate>
          </h4>
          <p className="news-card__descr js-news-descr">
            <Truncate lines={4}>{description}</Truncate>
          </p>
        </div>
      </Link>
      {/*eslint-disable*/}

      <div className="news-card__download-wrapper">
        {/* <div className="news-card__download-wrapper__download">
          <span style={{ marginRight: "25px" }}>Скачать</span>
          <a style={{ marginRight: "15px" }}>
            <img src={DOCicon} alt="" />
          </a>
          <a style={{ marginRight: "15px" }}>
            <img src={PDFicon} alt="" />
          </a>
          <a style={{ marginRight: "15px" }}>
            <img src={XLSicon} alt="" />
          </a>
        </div> */}
        <span className="news-card__date">{date}</span>
      </div>
      {/*eslint-enable*/}
    </div>
  );
};

export default NewsCard;

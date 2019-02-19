import React, { Component, Fragment } from "react";

import { withRouter } from "react-router-dom";

import NewsCard from "../../NewsCard/NewsCard";
import PaginationComponent from "../../Pagination/Pagination";
import PageSelectHeader from "../../PageSelectHeader/PageSelectHeader";

import Truncate from "react-truncate";
import moment from "moment";
import "moment/locale/ru";
import { inject, observer } from "mobx-react";

@inject("newsStore")
@inject("SelectHeaderStore")
@observer
class NewsPageList extends Component {
  state = {
    link: "/news"
  };

  render() {
    const {
      newsStore: { newsList, main_news, total, page, limit, defStyle },
      SelectHeaderStore: { newsRoute, newsLink, newsTitle, news_style }
    } = this.props;

    const topLink = main_news && `/news/detail/${main_news.id}`;

    let topNews = null;

    if (this.props.location.search === "?page=1") {
      (main_news !== null) ?
      topNews = (
        <a href={topLink} className="news-page__top-news__desc__a">
          <div className="news-page__top-news">
            <div className="news-page__top-news__img">
              <img
                className="img"
                src={`${main_news &&
                  main_news.thumb_urls.previewPicture.thumb}`}
                alt=""
              />
            </div>
            <div className="news-page__top-news__desc">
              <span className="news-page__top-news__desc__date">
                {main_news &&
                  `${moment(main_news.published_at).format("D MMMM YYYY")}`}
              </span>
              <h3 className="news-page__top-news__desc__title">
                {main_news && main_news.title}
              </h3>
              <p className="news-page__top-news__desc__p">
                <Truncate lines={4}>
                  {main_news && main_news.preview}
                </Truncate>
              </p>
            </div>
          </div>
        </a>
      ) : topNews = null
    } else {
      topNews = null;
    }

    return (
      <Fragment>
        <div className="pages-header-wrapper">
          <PageSelectHeader
            route={newsRoute}
            link={newsLink}
            list={newsList}
            title={newsTitle}
            news_style={news_style}
          />
          {/* <div className="header-circle">
            <div className="header-circle__item" style={{ top: "-229px" }} />
            <div className="header-circle__item" style={{ top: "-37px" }} />
            <div className="header-circle__item" style={{ top: "86px" }} />
            <div className="header-circle__item" style={{ top: "190px" }} />
          </div> */}
        </div>
        {newsList.length < 1 ? (
          <h2 className="text-center mb-5">За выбранный период новостей нет</h2>
        ) : (
          <Fragment>
            {topNews}
            <ul className="news-page__list">
              {newsList.length > 0 &&
                newsList.map(el => (
                  <li key={el.id} className="text-center news-page__list__item">
                    {NewsCard(
                      el.title,
                      el.preview,
                      el.id,
                      `${moment(el.published_at).format("D MMMM YYYY")}`,
                      `${
                        el.all_thumbnails
                        ? el.all_thumbnails.previewPicture_c_news445x200
                        : ""
                      }`,
                      defStyle
                    )}
                  </li>
                ))}
            </ul>
            {
              total > 1 ?
              <PaginationComponent
              link={this.state.link}
              total={total}
              page={page}
              limit={limit}
            />
            : null
            }
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withRouter(NewsPageList);

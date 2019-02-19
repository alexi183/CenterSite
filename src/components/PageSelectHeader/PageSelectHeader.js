import React, { Component } from "react";
import "./PageSelectHeader.scss";

import { inject, observer } from "mobx-react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { withRouter } from "react-router-dom";
// import queryString from "query-string";

@inject("newsStore")
@inject("eventsStore")
@inject("SelectHeaderStore")
@observer
@withRouter
class PageSelectHeader extends Component {
  // state = {
  //   activeStyleEvent : null
  // }

  handleDateClick = date => {
    this.props.newsStore.setDateId(date);
    this.props.newsStore.setPageNumber(1);
    this.props.history.push({
      // pathname: `${this.props.link}`,
      search: `?${this.props.newsStore.filterURL}`
    });
  };

  // handleTypeClickEvent = type => {
  //   this.props.eventsStore.setTypeId(type);
  //   this.props.eventsStore.setPageNumber(1);
  //   this.props.history.push({
  //     // pathname: `${this.props.link}`,
  //     search: `?${this.props.eventsStore.filterURL}`
  //   });
  // };

  handleFullCategoryClick = () => {
    this.props.newsStore.setPageNumber(1);
    delete this.props.newsStore.params["type"];
    delete this.props.newsStore.params["date"];
    this.props.history.push({
      search: `?page=1`
    });
  }

  handleCategoryClick = item => {
    // console.log(item)
    this.props.newsStore.setCategoryId(item);
    delete this.props.newsStore.params["date"];
    // this.props.newsStore.filterParamsFetch(
    //   queryString.parse(this.props.newsStore.params)
    // );
    this.props.history.push({
      search: `?page=1&category=${item}`
    });
  };

  // handleCategoryClickEvent = item => {
  //   this.props.eventsStore.setCategoryId(item);
  //   this.props.eventsStore.setPageNumber(1);
  //   delete this.props.eventsStore.params["type"];
  //   // this.props.eventsStore.filterParamsFetch(
  //   //   queryString.parse(this.props.eventsStore.params)
  //   // );
  //   this.props.history.push({
  //     search: `?page=1&category=${item}`
  //   });
  // };

  render() {
    const {
      newsStore: { categoryList },
      eventsStore: { eventCategoryList }
    } = this.props;

    let pagesHeader = null;
    let categories = null;
    let activeAllNews = { backgroundColor: "#fff", color: "#337b99" };
    let activeStyle = { backgroundColor: "#fff", color: "#337b99" };
    let activeStyleEvent = { backgroundColor: "#fff", color: "#337b99" };

    if (categoryList === null) {
      return null;
    }

    // if (eventCategoryList === null) {
    //   return null;
    // }

    this.props.location.pathname === "/news/"
      ? (categories = categoryList.length && (
          <React.Fragment>
            <li className="news-page__section-item">
              <div
                className={`${
                  this.props.SelectHeaderStore.news_style
                    ? "events-page__date-change-item"
                    : "news-page__date-change-item"
                }`}
                style={
                  this.props.newsStore.activeCategory === undefined &&
                  this.props.newsStore.activeDate === undefined
                    ? activeAllNews
                    : {}
                }
              >
                <div
                  // href="/news/?page=1"
                  className={`${
                    this.props.news_style
                      ? "events-page__date-change-item__a__category"
                      : "news-page__date-change-item__a"
                  }`}
                  style={
                    this.props.newsStore.activeCategory === undefined &&
                    this.props.newsStore.activeDate === undefined
                      ? activeAllNews
                      : {}
                  }
                  onClick={this.handleFullCategoryClick}
                >
                  Все новости
                </div>
              </div>
            </li>
            {categoryList.map(item => (
              <li className="news-page__section-item" key={item.id}>
                <div
                  className={`${
                    this.props.SelectHeaderStore.news_style
                      ? "events-page__date-change-item"
                      : "news-page__date-change-item"
                  }`}
                  style={
                    this.props.newsStore.activeCategory === `${item.id}`
                      ? activeStyle
                      : {}
                  }
                  onClick={() => this.handleCategoryClick(item.id)}
                >
                  <span
                    className={`${
                      this.props.news_style
                        ? "events-page__date-change-item__a__category"
                        : "news-page__date-change-item__a"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </li>
            ))}
          </React.Fragment>
        ))
      : (categories = (
          <React.Fragment>
            {/* <li className="news-page__section-item">
              <div
                className={`${
                  this.props.SelectHeaderStore.news_style
                    ? "events-page__date-change-item"
                    : "news-page__date-change-item"
                }`}
              >
                <span
                  className={`${
                    this.props.news_style
                      ? "events-page__date-change-item__a__category"
                      : "news-page__date-change-item__a"
                  }`}
                  style={{fontSize: '20px'}}
                >
                  Совещания
                </span>
              </div>
            </li>
            <li className="news-page__section-item">
              <div
                className={`${
                  this.props.SelectHeaderStore.news_style
                    ? "events-page__date-change-item"
                    : "news-page__date-change-item"
                }`}
              >
                <span
                  className={`${
                    this.props.news_style
                      ? "events-page__date-change-item__a__category"
                      : "news-page__date-change-item__a"
                  }`}
                  style={{fontSize: '20px'}}
                >
                  Мероприятия
                </span>
              </div>
            </li> */}
            {eventCategoryList.map(item => (
              <li className="news-page__section-item" key={item.id}>
                <div
                  className={`${
                    this.props.SelectHeaderStore.news_style
                      ? "events-page__date-change-item"
                      : "news-page__date-change-item"
                  }`}
                  style={
                    this.props.eventsStore.eventCategoryList === `${item.id}`
                      ? activeStyle
                      : {}
                  }
                  onClick={() => this.handleCategoryClickEvent(item.id)}
                >
                  <span
                    className={`${
                      this.props.news_style
                        ? "events-page__date-change-item__a__category"
                        : "news-page__date-change-item__a"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </li>
            ))}
          </React.Fragment>
        ));

    if (this.props.location.pathname !== undefined) {
      pagesHeader = (
        <React.Fragment>
          <div className="header-container__backgroundImage" style={{top: '-80%', left: '0'}}/>
          <h1 className="title-section">{this.props.title}</h1>
          {/* {this.props.title === "Новости" ? ( */}
            <ul className="news-page__sections">
              {/* {categoryList.length > 0 ? categories : ""} */}
              {categories}
            </ul>
          {/* ) : ( */}
            {/* <div className="events-height-div" /> */}
          {/* )} */}
          <div
            className={`${
              this.props.SelectHeaderStore.news_style
                ? "events-page__date-change"
                : "news-page__date-change"
            }`}
          >
            {this.props.location.pathname === "/news/" ? (
              <React.Fragment>
                {/* <div
                  className={`${
                    this.props.SelectHeaderStore.news_style
                      ? "events-page__date-change-item"
                      : "news-page__date-change-item"
                  }`}
                  style={
                    this.props.newsStore.activeDate === "today"
                      ? activeStyle
                      : {}
                  }
                  onClick={() => this.handleDateClick("today")}
                >
                  <span
                    className={`${
                      this.props.SelectHeaderStore.news_style
                        ? "events-page__date-change-item__a"
                        : "news-page__date-change-item__a"
                    }`}
                  >
                    Сегодня
                  </span>
                </div>
                <div
                  className={`${
                    this.props.SelectHeaderStore.news_style
                      ? "events-page__date-change-item"
                      : "news-page__date-change-item"
                  }`}
                  style={
                    this.props.newsStore.activeDate === "yesterday"
                      ? activeStyle
                      : {}
                  }
                  onClick={() => this.handleDateClick("yesterday")}
                >
                  <span
                    className={`${
                      this.props.SelectHeaderStore.news_style
                        ? "events-page__date-change-item__a"
                        : "news-page__date-change-item__a"
                    }`}
                  >
                    Вчера
                  </span>
                </div> */}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* <div
                  className={`${
                    this.props.SelectHeaderStore.news_style
                      ? "events-page__date-change-item"
                      : "news-page__date-change-item"
                  }`}
                  style={
                    this.props.eventsStore.activeType === "finished"
                      ? activeStyleEvent
                      : {}
                  }
                  onClick={() => this.handleTypeClickEvent("finished")}
                >
                  <span
                    className={`${
                      this.props.SelectHeaderStore.news_style
                        ? "events-page__date-change-item__a"
                        : "news-page__date-change-item__a"
                    }`}
                  >
                    Прошедшие
                  </span>
                </div>
                <div
                  className={`${
                    this.props.SelectHeaderStore.news_style
                      ? "events-page__date-change-item"
                      : "news-page__date-change-item"
                  }`}
                  style={
                    this.props.eventsStore.activeDate === "current"
                      ? activeStyleEvent
                      : {}
                  }
                  onClick={() => this.handleTypeClickEvent("current")}
                >
                  <span
                    className={`${
                      this.props.SelectHeaderStore.news_style
                        ? "events-page__date-change-item__a"
                        : "news-page__date-change-item__a"
                    }`}
                  >
                    Текущие
                  </span>
                </div>
                <div
                  className={`${
                    this.props.SelectHeaderStore.news_style
                      ? "events-page__date-change-item"
                      : "news-page__date-change-item"
                  }`}
                  style={
                    this.props.eventsStore.activeDate === "future"
                      ? activeStyleEvent
                      : {}
                  }
                  onClick={() => this.handleTypeClickEvent("future")}
                >
                  <span
                    className={`${
                      this.props.SelectHeaderStore.news_style
                        ? "events-page__date-change-item__a"
                        : "news-page__date-change-item__a"
                    }`}
                  >
                    Будущие
                  </span>
                </div> */}
              </React.Fragment>
            )}
            {/* <div
              className={`${
                this.props.SelectHeaderStore.news_style
                  ? "events-page__date-change-item"
                  : "news-page__date-change-item"
              }`}
              style={
                this.props.newsStore.activeDate === "today"
                  ? activeStyle
                  : {}
              }
              onClick={() => this.handleDateClick("today")}
            >
              <span
                className={`${
                  this.props.SelectHeaderStore.news_style
                    ? "events-page__date-change-item__a"
                    : "news-page__date-change-item__a"
                }`}
              >
                Сегодня
              </span>
            </div>
            <div
              className={`${
                this.props.SelectHeaderStore.news_style
                  ? "events-page__date-change-item"
                  : "news-page__date-change-item"
              }`}
              style={
                this.props.newsStore.activeDate === "yesterday"
                  ? activeStyle
                  : {}
              }
              onClick={() => this.handleDateClick("yesterday")}
            >
              <span
                className={`${
                  this.props.SelectHeaderStore.news_style
                    ? "events-page__date-change-item__a"
                    : "news-page__date-change-item__a"
                }`}
              >
                Вчера
              </span>
            </div> */}
          </div>
        </React.Fragment>
      );
    } else {
      pagesHeader = null;
    }

    return (
      <div
        className={`${
          this.props.news_style ? "events-page__header" : "news-page__header"
        }`}
      >
        <BreadcrumbsItem className="breadcrumbs" to={`/${this.props.route}`}>
          {this.props.title}
        </BreadcrumbsItem>
        {pagesHeader}
      </div>
    );
  }
}

export default PageSelectHeader;

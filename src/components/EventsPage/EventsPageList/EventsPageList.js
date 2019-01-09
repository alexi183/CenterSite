import React, { Component, Fragment } from "react";
import "./EventsPageList.scss";

import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Truncate from "react-truncate";

import EventCard from "../EventCard/EventCard";
import PaginationComponent from "../../Pagination/Pagination";
import PageSelectHeader from "../../PageSelectHeader/PageSelectHeader";

import moment from "moment";
import "moment/locale/ru";

@inject("eventsStore")
@inject("SelectHeaderStore")
@observer
class EventsPageList extends Component {
    state = {
        link: "/events"
    };

    render() {
        const {
            eventsStore: { main_event, eventsList, total, page, limit },
            SelectHeaderStore: { eventsRoute, eventsLink, eventsTitle }
        } = this.props;

        let topEvents = null
        let mapEvents = null

        if(total === null) {
            return null
        }

        if (this.props.location.search === "?page=1") {
            (main_event !== null) ?
                topEvents = (
                    <a href={`/events/event/${main_event !== undefined && main_event.id}`} className="news-page__top-news__desc__a">
                        <div className="news-page__top-news">
                            <div className="news-page__top-news__img">
                                <img
                                    className="img"
                                    src={`${main_event !== undefined && main_event.thumb_urls.previewPicture
                                        ? main_event.thumb_urls.previewPicture.thumb
                                        : ""}`}
                                    alt=""
                                />
                            </div>
                            <div className="news-page__top-news__desc">
              <span className="news-page__top-news__desc__date">
                {eventsList &&
                `${moment(main_event !== undefined && main_event.date_start).format("D MMMM YYYY")}`}
              </span>
                                <h3 className="news-page__top-news__desc__title">
                                    <Truncate lines={5}>
                                        {main_event !== undefined && main_event.title}
                                    </Truncate>
                                </h3>
                                <p className="news-page__top-news__desc__p">
                                    <Truncate lines={4}>
                                        {main_event !== undefined && main_event.preview}
                                    </Truncate>
                                </p>
                            </div>
                        </div>
                    </a>
                ) : topEvents = null

            mapEvents = (
                eventsList &&
                eventsList.map(el => (
                    <div className="events-card__block-sm-grid" key={el.id}>
                        <Link
                            to={`/events/event/${el.id}`}
                            className="news-page__list__item__a"
                        >
                            {EventCard(
                                el.title,
                                el.preview,
                                `${moment(el.date_start).format("D MMMM YYYY")}`,
                                `${
                                    el.thumb_urls.previewPicture
                                        ? el.thumb_urls.previewPicture.thumb
                                        : ""
                                    }`,
                                el.id,
                                el.showDate
                            )}
                        </Link>
                    </div>
                ))
            )
        } else {
            topEvents = null

            mapEvents = (
                eventsList &&
                eventsList.map(el => (
                    <div className="events-card__block-sm-grid" key={el.id}>
                        <Link
                            to={`/events/event/${el.id}`}
                            className="news-page__list__item__a"
                        >
                            {EventCard(
                                el.title,
                                el.preview,
                                `${moment(el.date_start).format("D MMMM YYYY")}`,
                                `${
                                    el.thumb_urls.previewPicture
                                        ? el.thumb_urls.previewPicture.thumb
                                        : ""
                                    }`,
                                el.id
                            )}
                        </Link>
                    </div>
                ))
            )
        }

        return (
            <Fragment>
                <div className="pages-header-wrapper">
                    <PageSelectHeader
                        route={eventsRoute}
                        link={eventsLink}
                        title={eventsTitle}
                    />
                    <div className="header-circle">
                        <div className="header-circle__item" style={{ top: "-229px" }} />
                        <div className="header-circle__item" style={{ top: "-37px" }} />
                        <div className="header-circle__item" style={{ top: "86px" }} />
                        <div className="header-circle__item" style={{ top: "190px" }} />
                    </div>
                </div>
                {topEvents}
                <div className={
                    this.props.location.pathname === "/events/?page=1"
                        ? `events-page__blocks-sm-row`
                        : `events-page__blocks-sm-row__change-margin`
                }>
                    {mapEvents}
                </div>
                <PaginationComponent
                    link={this.state.link}
                    limit={limit}
                    page={page}
                    total={total}
                />
            </Fragment>
        );
    }
}

export default withRouter(EventsPageList);

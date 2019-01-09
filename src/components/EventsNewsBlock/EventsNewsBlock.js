import React, {Component, Fragment} from "react";
import {inject, observer} from "mobx-react";
import "./EventsNewsBlock.scss";
import Truncate from "react-truncate";
import {Link} from "react-router-dom";
import uuid from "uuid";
import moment from "moment";
import "moment/locale/ru";
import Spinner from '../Spinner/Spinner'

@inject("eventsStore")
@observer
class EventsNewsBlock extends Component {
    componentWillMount() {
        this.props.eventsStore.loadIndexEvents()
    }

    render() {
        const {indexEvents} = this.props.eventsStore
        const firstEvent = indexEvents.items && indexEvents.items[0]
        const lowerBlocksNews = indexEvents.items && indexEvents.items.slice(2, 6)
        const rightBlock = indexEvents.items && indexEvents.items[1]

        if (indexEvents === null) {
            return <div style={{heigth: '794px'}}><Spinner /></div>
        }

        return (
            <Fragment>
                <div className="events-news-block">
                    <div className="row mb-4">
                        <div className="col-8">
                            <div className="events-news-block__wrapper pr-4">
                                <div
                                    className="events-news-block__img-block"
                                    style={{
                                        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${indexEvents.items &&
                                        firstEvent.thumb_urls.previewPicture !== undefined &&
                                        firstEvent.thumb_urls.previewPicture
                                            .original}) no-repeat 50%`
                                    }}
                                >
                                    <div className="events-news-block__date-aside">
                                        {firstEvent &&
                                        firstEvent.date_start &&
                                        moment(firstEvent.date_start).format("DD MMMM")}
                                        {
                                            (firstEvent &&
                                                moment(firstEvent.date_start).format("DD MMMM") !==
                                                moment(firstEvent.date_end).format("DD MMMM")) ?  (
                                                <span>&nbsp;&mdash;&nbsp;</span>
                                            ) : null
                                        }
                                        {
                                            (firstEvent && moment(firstEvent.date_start).format("DD MMMM") !== moment(firstEvent.date_end).format("DD MMMM")) ?
                                                firstEvent &&
                                                firstEvent.date_end &&
                                                moment(firstEvent.date_end).format("DD MMMM") : null
                                        }
                                    </div>
                                    <Link
                                        to={`/events/event/${firstEvent && firstEvent.id}`}
                                        className="events-news-block__title-block"
                                    >
                                        <h3 className="events-news-block__title mb-3">
                                            <Truncate lines={5}>
                                                {firstEvent && firstEvent.title}
                                            </Truncate>
                                        </h3>
                                        {
                                            (firstEvent && firstEvent.title.length < 82) ?
                                                <p className="events-news-block__title-announce">
                                                    <Truncate lines={3}>
                                                        {firstEvent && firstEvent.preview}
                                                    </Truncate>
                                                </p>
                                                :
                                                ''
                                        }
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 ">
                            {
                                rightBlock &&
                                <div className='event-block-sm__right-block ml-auto'>
                                    <Link
                                        to={`/events/event/${rightBlock.id}`}
                                        className="event-block-sm"
                                    >
                                        <div
                                            className="event-block-sm__block-sm-img"
                                            style={{
                                                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${rightBlock.preview_picture &&
                                                rightBlock.thumb_urls.previewPicture.original}) center`,
                                                backgroundSize: `cover`
                                            }}
                                        >
                                            <div className="event-block-sm__block-sm-aside">
                                                {rightBlock.date_start
                                                    ? moment(rightBlock.date_start).format("DD MMMM")
                                                    : ""}
                                            </div>
                                        </div>
                                        <div className="event-block-sm__block-sm-text-box">
                                            <div className="event-block-sm__block-sm-title mb-2">
                                                <Truncate lines={3}>{rightBlock.title}</Truncate>
                                            </div>
                                            <p className="event-block-sm__block-sm-caption">
                                                <Truncate lines={2}>{rightBlock.preview}</Truncate>
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="events-news-block__blocks-sm-row">
                        {lowerBlocksNews &&
                        lowerBlocksNews.map((el, i) => (
                            <div className="events-news-block__block-sm-grid" key={uuid()}>
                                <Link
                                    to={`/events/event/${el.id}`}
                                    className="event-block-sm"
                                >
                                    <div
                                        className="event-block-sm__block-sm-img"
                                        style={{
                                            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${el.preview_picture &&
                                            el.thumb_urls.previewPicture.original}) center`,
                                            backgroundSize: `cover`
                                        }}
                                    >
                                        <div className="event-block-sm__block-sm-aside">
                                            {el.date_start
                                                ? moment(el.date_start).format("DD MMMM")
                                                : ""}
                                        </div>
                                    </div>
                                    <div className="event-block-sm__block-sm-text-box">
                                        <div className="event-block-sm__block-sm-title mb-2">
                                            <Truncate lines={3}>{el.title}</Truncate>
                                        </div>
                                        <p className="event-block-sm__block-sm-caption">
                                            <Truncate lines={2}>{el.preview}</Truncate>
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default EventsNewsBlock;

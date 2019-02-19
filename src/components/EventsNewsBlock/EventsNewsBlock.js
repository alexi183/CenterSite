import React, {Component, Fragment} from "react";
import {inject, observer} from "mobx-react";
import "./EventsNewsBlock.scss";
import Truncate from "react-truncate";
import {Link} from "react-router-dom";
// import eventsIcon from "../../img/events-icon.png";
import uuid from "uuid";
import moment from "moment";
import "moment/locale/ru";
// import Spinner from '../Spinner/Spinner'

@inject("eventsStore")
@observer
class EventsNewsBlock extends Component {
    // componentWillMount() {
    //     this.props.eventsStore.fetchMainEvent();
    //     this.props.eventsStore.loadIndexEvents()
    // }

    render() {
        const {main_event, indexEvents} = this.props.eventsStore
        const firstEvent = (main_event != null) ? main_event : indexEvents.items && indexEvents.items[0]
        const lowerBlocksNews = (main_event != null) ? indexEvents.items && indexEvents.items.slice(1, 5) : indexEvents.items && indexEvents.items.slice(2, 6)
        // const lowerBlocksNewsNoImgs = indexEvents.items && indexEvents.items.slice(4, 6)
        const rightBlock = (main_event != null) ? indexEvents.items && indexEvents.items[0] : indexEvents.items && indexEvents.items[1]

        // if (loading) {
        //     return <div style={{height: '989px'}}><Spinner /></div>
        //   }

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
                                        firstEvent.all_thumbnails !== undefined &&
                                        firstEvent.all_thumbnails.previewPicture_c_event800x465
                                            }) no-repeat 50%`
                                    }}
                                >
                                    <div className="events-news-block__date-aside">
                                        {firstEvent &&
                                        firstEvent.date_start &&
                                        moment(firstEvent.date_start).format("MMMM")}
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
                                        moment(firstEvent.date_end).format("MMMM") : null
                                        }&nbsp;
                                        {
                                            moment(firstEvent.date_start).format("YYYY")
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
                                       {/* <p className="events-news-block__title-announce">
                                            <Truncate lines={3}>
                                                {firstEvent && firstEvent.preview}
                                            </Truncate>
                                        </p> */}
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
                                                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${rightBlock.all_thumbnails &&
                                                rightBlock.all_thumbnails.previewPicture_c_event342x330}) center`,
                                                backgroundSize: `cover`
                                            }}
                                        >
                                            <div className="event-block-sm__block-sm-aside">
                                                {rightBlock.date_start
                                                    ? moment(rightBlock.date_start).format("DD MMMM YYYY")
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
                                            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${el.all_thumbnails &&
                                            el.all_thumbnails.previewPicture_c_event342x175}) center`,
                                            backgroundSize: `cover`
                                        }}
                                    >
                                        <div className="event-block-sm__block-sm-aside">
                                            {el.date_start
                                                ? moment(el.date_start).format("DD MMMM YYYY")
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
                        {/* {
                            lowerBlocksNewsNoImgs &&
                            lowerBlocksNewsNoImgs.map((el, i) => (
                                <div className="events-news-block__block-sm-grid" key={uuid()}>
                                    <Link
                                        to={`/events/event/${el.id}`}
                                        className="event-block-sm event-block-sm_no-img"
                                    >
                                        <div className="event-block-sm__block-sm-aside">
                                            {el.date_start
                                                ? moment(el.date_start).format("DD MMMM")
                                                : ""}
                                        </div>
                                        <img
                                            className="event-block-sm__events-icon"
                                            src={eventsIcon}
                                            alt="events"
                                        />
                                        <div className="event-block-sm__block-sm-text-box">
                                            <div className="event-block-sm__block-sm-title mb-2">
                                                <Truncate lines={3}>{el.title}</Truncate>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))} */}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default EventsNewsBlock;

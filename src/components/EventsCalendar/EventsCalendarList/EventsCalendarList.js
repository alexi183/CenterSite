import React, { Component } from "react";
import "./EventsCalendarList.scss";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import EventsCalendarCard from "../EventsCalendarCard/EventsCalendarCard";
import renderDocs from "../../../helpers/renderDocs";

@inject("eventCalendarStore",
    "educateEventsStore")
@observer
class EventsCalendarList extends Component {
    state = {
        docs: null
    };

    getDocs = () => {
        this.setState({ loading: true });
        axios
            .get("/api/v1/edu-events-main-documents/")
            .then(response => {
                console.log("response.data ", response.data);
                this.setState({
                    docs: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.getDocs()
    }
    render() {
        const { docs } = this.state;
        const {
            eventCalendarStore: { eventsCalendarList },
        } = this.props;

        if(docs === null) {
            return null
        }

        return (
            <React.Fragment>
                <div className="events-calendar documents__content section-wrapper" style={{paddingLeft: '0',marginTop: '28px'}}>
                    {Object.keys(docs).length > 0 && renderDocs(docs, 2)}
                </div>
                <ul className="news-page__list">
                    {eventsCalendarList &&
                    eventsCalendarList.map(item => (
                        <div key={item.id} className="events-card__block-sm-grid">
                            <Link to={`/event-calendar/${item.id}`} className="news-page__list__item__a">
                                <EventsCalendarCard
                                    date_start={item.date_start}
                                    date_end={item.date_end}
                                    title={item.title}
                                    image={item.thumb_urls.previewPicture
                                        ? item.thumb_urls.previewPicture.original
                                        : ""}
                                />
                            </Link>
                        </div>
                    ))}
                </ul>
            </React.Fragment>
        );
    }
}

export default withRouter(EventsCalendarList);

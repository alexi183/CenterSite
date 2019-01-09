import React from "react";
import Truncate from "react-truncate";
import moment from "moment";
import "moment/locale/ru";

const EventsCalendarCard = props => {
    console.log(props)
    return (
        <React.Fragment>
            <div
                className="events-card__block-sm"
                style={{
                    background: `${
                        // image !== ""
                        `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
                            props.image
                            }) center`
                        }`,
                    backgroundSize: `cover`,
                    padding: "0"
                }}
            >
                <div
                    className="events-card__block-sm-aside"
                >
                    {`${moment(props.date_start).format("D MMMM YYYY") +
                    " " +
                    (moment(props.date_start).format("D MMMM YYYY") !==
                    moment(props.date_end).format("D MMMM YYYY")
                        ? " - " +
                        moment(props.date_end).format("D MMMM YYYY") +
                        " "
                        : "")}`}

                </div>
                <div className="event-block-sm__block-sm-text-box">
                    <div className="event-block-sm__block-sm-title mb-2">
                        <Truncate lines={3}>{props.title}</Truncate>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default EventsCalendarCard;

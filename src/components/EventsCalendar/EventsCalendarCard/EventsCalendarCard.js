import React from "react";
// import "./EventCard.scss";

import Truncate from "react-truncate";
import moment from "moment";
import "moment/locale/ru";

/* eslint-disable */
const EventsCalendarCard = props => {
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
            //   : `#efeeee`
          }`,
          backgroundSize: `cover`,
          padding: "0"
        }}
      >
        <div
          className="events-card__block-sm-aside"
          // style={{ color: `${image !== "" ? `#fff` : `#000`}` }}
        >
          {/* {props.date} */}
          {`${moment(props.date_start).format("D MMMM YYYY") +
              " " +
              // (
              // moment(props.date_start).format("D MMMM YYYY") !==
              //   moment(props.date_end).format("D MMMM YYYY")
              //   ? moment(props.date_start).format("HH:mm")
              //   : "") +
              (moment(props.date_start).format("D MMMM YYYY") !==
              moment(props.date_end).format("D MMMM YYYY")
                ? " - " +
                  moment(props.date_end).format("D MMMM YYYY") +
                  " " 
                  // +
                  // (showDate
                  //   ? moment(props.date_end).format("HH:mm")
                  //   : "")
                : "")}`}
            {/* {
            moment(props.date_start).format("D MMMM YYYY") ===
              moment(props.date_end).format("D MMMM YYYY") ? (
              <span style={{ textTransform: "lowercase" }}>
                {`${" с " +
                  moment(props.date_start).format("HH:mm") +
                  " по " +
                  moment(props.date_end).format("HH:mm")}`}
              </span>
            ) : (
              ""
            )} */}
        </div>
        <div className="event-block-sm__block-sm-text-box">
          <div className="event-block-sm__block-sm-title mb-2">
            <Truncate lines={3}>{props.title}</Truncate>
          </div>
          {/* <p className="event-block-sm__block-sm-caption">
              <Truncate lines={2}>test</Truncate>
          </p> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventsCalendarCard;

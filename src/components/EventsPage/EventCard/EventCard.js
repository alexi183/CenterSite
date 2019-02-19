import React from "react";
import "./EventCard.scss";

import Truncate from "react-truncate";

// import img01 from '../../../img/temp-img-01.jpg';

/* eslint-disable */
const EventCard = (title, preview, date, image, id, showDate) => {
  return (
    <React.Fragment>
      {
        (id % 2 === 0) ?
        <div
        className="events-card__block-sm"
        style={{
          background: `${
            image !== ""
              ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image}) center`
              : `#efeeee`
          }`,
          backgroundSize: `cover`
        }}
      >
        <div
        className="events-card__block-sm-aside"
        style={{ color: `${image !== "" ? `#fff` : `#000`}` }}
        >
          {date}
        </div>
        {/* {
          showDate ?
            <div
            className="events-card__block-sm-aside"
            style={{ color: `${image !== "" ? `#fff` : `#000`}` }}
            >
    
            </div> : null
        } */}
        <div
          className="events-card__block-sm-title"
          style={{ color: `${image !== "" ? `#fff` : `#000`}` }}
        >
          <Truncate lines={3}>{title}</Truncate>
        </div>
        <p
          className="events-card__block-sm-caption"
          style={{ color: `${image !== "" ? `#fff` : `#000`}` }}
        >
          <Truncate lines={2}>{preview}</Truncate>
        </p>
      </div>
        :
        <div
        className="events-card__block-sm"
        style={{
          background: `${
            image !== ""
              ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image}) center`
              : `#efeeee`
          }`,
          backgroundSize: `cover`,
          padding: '0'
        }}
      >
        <div
        className="events-card__block-sm-aside"
        style={{ color: `${image !== "" ? `#fff` : `#000`}` }}
        >
          {date}
        </div>
        <div className="event-block-sm__block-sm-text-box">
          <div className="event-block-sm__block-sm-title mb-2">
              <Truncate lines={3}>{title}</Truncate>
          </div>
          <p className="event-block-sm__block-sm-caption">
              <Truncate lines={2}>{preview}</Truncate>
          </p>
        </div>
        </div>
      }
      </React.Fragment>)
};

export default EventCard;

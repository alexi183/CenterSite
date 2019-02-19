import React, { Component } from "react";
import "./FullEventInCalendar.scss";

import axios from "axios";
import moment from "moment";
import "moment/locale/ru";

// import PageHeader from "../../PageHeader/PageHeader";
import { inject, observer } from "mobx-react";
// import PageHeader from "../../PageHeader/PageHeader";
import renderDocs from "../../../helpers/renderDocs";
import createMarkup from "../../../helpers/dangerouslySetHTML";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

// import img from "../../../img/проект-1.png";

@inject("educateEventsStore")
@observer
class FullEventInCalendar extends Component {
  state = {
    selectedEvent: null,
    loading: true,
    docs: null
  };

  componentDidMount() {
    // this.getDocs();

    const { id } = this.props.match.params;

    axios
      .get(`/api/v1/edu-event/${id}`)
      .then(response => {
        // console.log(response.data);
        this.setState({
          selectedEvent: response.data,
          docs: Object.values(response.data.structured_uploads),
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // getDocs = () => {
  //   const { id } = this.props.match.params;
  //   axios
  //     .get(`/api/v1/edu-event/${id}`)
  //     .then(response => {
  //       console.log(
  //         "response.data ",
  //         Object.values(response.data.structured_uploads).map(
  //           item => item.child
  //         )
  //       );
  //       this.setState({
  //         docs: Object.values(response.data.structured_uploads)
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  render() {
    const { selectedEvent, docs } = this.state;
    // const {
    //     educateEventsStore: { parsedMonth }
    // } = this.props;

    if (selectedEvent === null) {
      return null;
    }

    if (docs === null) {
      return null;
    }

    // const pageHeader = {
    //   breadCrumbs: true,
    //   title: this.state.selectedEvent.title,
    //   background: "#005a7f",
    //   headerModifierClass: "dark-theme",
    //   description: true,
    //   headerProjectImg: img
    // };

    return (
      <div className="FullEventInCalendar">
        <BreadcrumbsItem
          className="breadcrumbs"
          to={`/${this.state.selectedEvent.title + `                   `}`}
        >
          {this.state.selectedEvent.title}
        </BreadcrumbsItem>
        <div className="title-item">
        <div className="header-container__backgroundImage" style={{top: '-85%', left: '0'}}/>
          <div className="event-calendar-title-block">
            <div className="event-calendar-title-block__title-date">
              <span className="event-calendar-title-block__title-date__item">
              {`${moment(selectedEvent.date_start).format("D MMMM") +
                " " +
                (moment(selectedEvent.date_start).format("D MMMM YYYY") !==
                moment(selectedEvent.date_end).format("D MMMM YYYY")
                  ? " - " + moment(selectedEvent.date_end).format("D MMMM")
                  : "")}`}
              </span>
            </div>
            <h2 className="title-item__name">
              {this.state.selectedEvent.title}
            </h2>
          </div>
          {/* <div className="header-circle">
            <div className="header-circle__item" style={{ top: "-232px" }} />
            <div className="header-circle__item" style={{ top: "-40px" }} />
            <div className="header-circle__item" style={{ top: "88px" }} />
            <div className="header-circle__item" style={{ top: "183px" }} />
          </div> */}
        </div>
        <div className="documents__content section-wrapper section-wrapper_sm">
          {selectedEvent &&
            docs.map(item => {
              return docs.length > 0
                ? Object.keys(item).length > 0 && renderDocs(item, 2)
                : Object.keys(item).length > 0 && renderDocs(item, 2);
            })}
        </div>
        <div className="FullNews__text" style={{ marginBottom: "40px" }}>
          <span className="events-calendar-titles">История</span>
        </div>
        <div className="FullEvent__top-img">
          <div className="FullEvent__top-img__container">
            <img
              className="img"
              src={
                this.state.selectedEvent.thumb_urls.previewPicture &&
                this.state.selectedEvent.thumb_urls.previewPicture
                  .thumb_w840 !== undefined
                  ? this.state.selectedEvent.thumb_urls.previewPicture
                      .thumb_w840
                  : ""
              }
              alt=""
            />
          </div>
        </div>
        <div className="FullNews__text">
          <div dangerouslySetInnerHTML={createMarkup(selectedEvent.text)} />
        </div>
      </div>
    );
  }
}

export default FullEventInCalendar;

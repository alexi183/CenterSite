import React, { Component } from "react";
import "./FullEvent.scss";

import axios from "axios";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import createMarkup from "../../../helpers/dangerouslySetHTML";
import { inject, observer } from "mobx-react";

import Slider from "../../Slider/Slider";
import SocialBtn from "../../Elements/BtnBlue/BtnBlue";
import MapComponent from "../../Map/Map";
import Modal from "../../ModalComponent/Modal";

import DOCicon from "../../../img/fileIcons/doc.png";
import XLSicon from "../../../img/fileIcons/xls.png";
import PDFicon from '../../../img/fileIcons/pdf.png';
import LIKEicon from "../../../img/like-icon.png";

import moment from "moment";
import "moment/locale/ru";
import {
  FacebookShareButton,
  // TelegramShareButton,
  VKShareButton,
  WhatsappShareButton
} from "react-share";
import BtnSocial from "../../Elements/BtnSocial/BtnSocial";
import whatsappIcon from "../../../img/whatsapp-icon.png";
import vkIcon from "../../../img/vk-icon.png";
import fbIcon from "../../../img/fb-icon.png";
// import telegramIcon from "../../../img/telegram-icon.png";

/* eslint-disable */
@inject("eventsStore")
@observer
class FullEvent extends Component {
  state = {
    selectedEvent: null,
    showDate: false,
    showModal: false,
    commentsOpen: false,
    like: null
  };

  toggleComments = () => {
    this.setState(prevState => ({
      commentsOpen: !prevState.commentsOpen
    }));
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/v1/event/${id}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          selectedEvent: response.data,
          showDate: response.data.show_date
        });
      })
      .catch(error => {
        console.log(error);
      });
    // this.props.eventsStore.likes(id)
    // console.log(this.props.eventsStore.likesCount)
  }

  handleLikeClick = () => {
    // this.props.eventsStore.likesCount = this.props.eventsStore.likesCount + 1
    // this.props.eventsStore.self = true
    const { id } = this.props.match.params;

    this.props.eventsStore.likes(id);
    this.props.eventsStore.likesCount = this.props.eventsStore.likesCount + 1;
    // this.setState({
    //   likes: this.state.like + 1
    // })
  };

  handleShowMessageClick = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });

  render() {
    const { selectedEvent, commentsOpen, showDate } = this.state;

    let haveSlider = null;
    let downloadIcon = null;
    let address = null;
    let map = null;

    if (selectedEvent === null) {
      return null;
    }

    if (
      selectedEvent.thumb_urls.galleryPicture !== undefined &&
      Object.keys(selectedEvent.thumb_urls.galleryPicture).length !== 0
    ) {
      haveSlider = (
        <Slider
          sliderImages={selectedEvent.thumb_urls.galleryPicture.thumb}
          largeImages={selectedEvent.thumb_urls.galleryPicture.original}
        />
      );
    } else {
      haveSlider = "";
    }

    // if(selectedEvent.uploaded_files.file_type === 'application_vnd_openxmlformats_officedocument_spreadsheetml_sheet') {
    //   downloadIcon = <img src={XLSicon} alt="" />
    // }

    if (selectedEvent.address) {
      address = (
        <div className="Event-on-map">
          <h3>Адрес проведения мероприятия</h3>
          <p className="Event-on-map__address">{selectedEvent.address}</p>
        </div>
      );
      map = (
        <MapComponent lat={selectedEvent.geo_lat} lon={selectedEvent.geo_lon} />
      );
    }

    return (
      <div className="FullEvent">
        <BreadcrumbsItem className="breadcrumbs" to="/events/?page=1">
          События
        </BreadcrumbsItem>
        <BreadcrumbsItem to={`/${selectedEvent.title + `             `}`}>
        {selectedEvent.title && selectedEvent.title.substring(0, 95) + ((selectedEvent.title.length > 94) ? "…" : '')}
          {/* {selectedEvent.title} */}
        </BreadcrumbsItem>
        <div className="title-item">
        <div className="header-container__backgroundImage" style={{top: '-60%', left: '0'}}/>
        {
          (selectedEvent.title === "Установочный семинар для участников федерального этапа Всероссийского конкурса «Учитель года России»") ?
          <div className="title-item__date">
            ИЮНЬ — ИЮЛЬ 2019
          </div>
          :
          <div className="title-item__date">
             {`${moment(selectedEvent.date_start).format("D MMMM YYYY") 
            + " " +
              (showDate &&
              moment(selectedEvent.date_start).format("D MMMM YYYY") !==
                moment(selectedEvent.date_end).format("D MMMM YYYY")
                ? moment(selectedEvent.date_start).format("HH:mm")
                : "") +
              (moment(selectedEvent.date_start).format("D MMMM YYYY") !==
              moment(selectedEvent.date_end).format("D MMMM YYYY")
                ? " - " +
                  moment(selectedEvent.date_end).format("D MMMM YYYY") +
                  " " +
                  (showDate
                    ? moment(selectedEvent.date_end).format("HH:mm")
                    : "")
                : "")}`}
            {showDate &&
            moment(selectedEvent.date_start).format("D MMMM YYYY") ===
              moment(selectedEvent.date_end).format("D MMMM YYYY") ? (
              <span style={{ textTransform: "lowercase" }}>
                {`${" с " +
                  moment(selectedEvent.date_start).format("HH:mm") +
                  " по " +
                  moment(selectedEvent.date_end).format("HH:mm")}`}
              </span>
            ) : (
              ""
            )} 
          </div>
        }
          {/* <div className="title-item__date">
             {`${moment(selectedEvent.date_start).format("D MMMM YYYY") 
            + " " +
              (showDate &&
              moment(selectedEvent.date_start).format("D MMMM YYYY") !==
                moment(selectedEvent.date_end).format("D MMMM YYYY")
                ? moment(selectedEvent.date_start).format("HH:mm")
                : "") +
              (moment(selectedEvent.date_start).format("D MMMM YYYY") !==
              moment(selectedEvent.date_end).format("D MMMM YYYY")
                ? " - " +
                  moment(selectedEvent.date_end).format("D MMMM YYYY") +
                  " " +
                  (showDate
                    ? moment(selectedEvent.date_end).format("HH:mm")
                    : "")
                : "")}`}
            {showDate &&
            moment(selectedEvent.date_start).format("D MMMM YYYY") ===
              moment(selectedEvent.date_end).format("D MMMM YYYY") ? (
              <span style={{ textTransform: "lowercase" }}>
                {`${" с " +
                  moment(selectedEvent.date_start).format("HH:mm") +
                  " по " +
                  moment(selectedEvent.date_end).format("HH:mm")}`}
              </span>
            ) : (
              ""
            )} 
          </div> */}
          <h1 className="title-item__name">{selectedEvent.title}</h1>
          {/* <div className="header-circle">
            <div className="header-circle__item" style={{ top: "-231px" }} />
            <div className="header-circle__item" style={{ top: "-40px" }} />
            <div className="header-circle__item" style={{ top: "86px" }} />
            <div className="header-circle__item" style={{ top: "186px" }} />
          </div> */}
        </div>
        <div className="FullEvent__top-img">
          <div className="FullEvent__top-img__container">
            <img
              className="img"
              src={`${selectedEvent.thumb_urls.previewPicture !== undefined &&
                selectedEvent.thumb_urls.previewPicture.detail_preview}`}
              alt=""
            />
          </div>
        </div>

        {selectedEvent.thumb_urls.previewPicture
          ? selectedEvent.preview_picture.copyright && (
              <div className="FullEvent__copyright">
                <div className="FullEvent__copyright-container">
                  <i>{selectedEvent.preview_picture.copyright}</i>
                </div>
              </div>
            )
          : ""}

        {haveSlider}
        <div className="FullNews__text">
          <div dangerouslySetInnerHTML={createMarkup(selectedEvent.text)} />
        </div>
        <div className="date-likes" onClick={this.handleLikeClick}>
          <span className="full-event__date">
            <span style={{ marginRight: "5px" }}>Дата начала</span>
            {`${moment(selectedEvent.date_start).format("D.MM.YYYY")}`}
          </span>
          <span className="like-span">
            <img src={LIKEicon} className="like-icon" alt="like-icon" />
            <span> 250</span>
            {}
            {/* {this.props.eventsStore && this.props.eventsStore.likesCount} */}
          </span>
        </div>
        {selectedEvent.uploaded_files.length > 0 ? (
          <div className="full-event__download-wrapper">
            <div className="full-event__download-wrapper__download">
              <span style={{ marginRight: "25px" }}>Скачать</span>
              {selectedEvent.uploaded_files.length &&
                selectedEvent.uploaded_files.map(file => (
                  <a
                    // style={{ marginRight: "15px" }}
                    href={file.download_url}
                    key={file.id}
                  >
                    {file.download_url.split(".").pop() === "xlsx" ||
                        file.download_url.split(".").pop() === "xls" ? (
                          <div style={{ marginTop: "15px" }}>
                            <img src={XLSicon} alt="" />
                            <span style={{ color: "#000", marginLeft: "15px" }}>
                              {file.display_name !== ""
                                ? file.display_name
                                : file.title}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                        {file.download_url.split(".").pop() === "doc" ||
                        file.download_url.split(".").pop() === "docx" ? (
                          <div style={{ marginTop: "15px" }}>
                            <img src={DOCicon} alt="" />
                            <span style={{ color: "#000", marginLeft: "15px" }}>
                              {file.display_name !== ""
                                ? file.display_name
                                : file.title}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                        {file.download_url.split(".").pop() === "pdf" ? (
                          <div style={{ marginTop: "15px" }}>
                            <img src={PDFicon} alt="" />
                            <span style={{ color: "#000", marginLeft: "15px" }}>
                              {file.display_name !== ""
                                ? file.display_name
                                : file.title}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                  </a>
                ))}
            </div>
          </div>
        ) : null}
        {/* <div className="full-event__download-wrapper">
           <div className="full-event__download-wrapper__download">
             <span style={{ marginRight: "25px" }}>Скачать</span>

             <a
              style={{ marginRight: "15px" }}
              href={selectedEvent.uploaded_files[0].download_url}
            >
              <img src={DOCicon} alt="" />
            </a>
            <a style={{ marginRight: "15px" }}>
              <img src={PDFicon} alt="" />
            </a>
            <a style={{ marginRight: "15px" }}>
              <img src={XLSicon} alt="" />
            </a>
          </div>
        </div> */}

        {address}

        <div className="FullNews__text">
          {map}

          {/* <div onClick={this.handleShowMessageClick} className="register">
            {SocialBtn("", "Зарегистрироваться", "#ec5155")}
          </div> */}

          <div className="FullNews__social-btns text-right">
            <WhatsappShareButton url={window.location.href}>
              <BtnSocial img_link={whatsappIcon} color="#16ae61" />
            </WhatsappShareButton>
            <VKShareButton url={window.location.href}>
              <BtnSocial img_link={vkIcon} color="#4c75a1" />
            </VKShareButton>
            <FacebookShareButton url={window.location.href}>
              <BtnSocial img_link={fbIcon} color="#0662af" />
            </FacebookShareButton>
            {/* <TelegramShareButton url={window.location.href}>
              <BtnSocial img_link={telegramIcon} color="#00bff3" />
            </TelegramShareButton> */}
          </div>

          {this.state.showModal ? (
            <Modal onClose={this.handleCloseModal} />
          ) : null}
          {/* <p className="toggle-comments-btn" onClick={this.toggleComments}>
                        <span style={{marginRight: "11px"}}>
                            ОСТАВЬТЕ ВАШ КОММЕНТАРИЙ
                        </span>
                        <span style={{display: "inline-block", marginBottom: "3px"}}>
                            {ArrowIcon("#ec5155")}
                        </span>
                    </p>*/}
          {commentsOpen && (
            <form className="comment-form">
              <div className="comment-form__title row align-items-center">
                <div className="col">
                  <h3>КОММЕНТАРИИ</h3>
                </div>
                <div className="col text-right">
                  <div className="fake-social" />
                  <div className="fake-social" />
                  <div className="fake-social" />
                </div>
              </div>
              <textarea className="comment-form__textarea" rows="4" cols="40" />
              {SocialBtn("", "Отправить", "#ec5155")}
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default FullEvent;

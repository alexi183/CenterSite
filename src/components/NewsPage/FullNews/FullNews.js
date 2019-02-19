import React, { Component } from "react";
import "./FullNews.scss";

import axios from "axios";
import { withRouter } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import Spinner from "../../Spinner/Spinner";
import Slider from "../../Slider/Slider";
import createMarkup from "../../../helpers/dangerouslySetHTML";
import BtnSocial from "../../Elements/BtnSocial/BtnSocial";
import whatsappIcon from "../../../img/whatsapp-icon.png";
import vkIcon from "../../../img/vk-icon.png";
import fbIcon from "../../../img/fb-icon.png";
// import telegramIcon from "../../../img/telegram-icon.png";

import DOCicon from "../../../img/fileIcons/doc.png";
import XLSicon from "../../../img/fileIcons/xls.png";
import PDFicon from '../../../img/fileIcons/pdf.png';

import moment from "moment";
import "moment/locale/ru";

import {
  FacebookShareButton,
  // TelegramShareButton,
  WhatsappShareButton,
  VKShareButton
} from "react-share";

// @inject('newsStore')
// @observer
class FullNews extends Component {
  state = {
    selectedNews: null,
    loading: true
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    axios
      .get(`/api/v1/news/${id}`)
      .then(response => {
        this.setState({
          selectedNews: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
        window.location.replace("/404");
      });
  }

  // checkFile = (file) => {
  //   let downloadFile = file.download_url.split(".").pop();
  //   console.log(downloadFile)

  //   const checkFileExtention = (extention) => {
  //     console.log("extention", extention)
  //     return (
  //       downloadFile === extention ? (
  //         <div style={{ marginTop: "15px" }}>
  //           <img src={XLSicon} alt="" />
  //           <span style={{ color: "#000", marginLeft: "15px" }}>
  //             {file.display_name !== ""
  //               ? file.display_name
  //               : file.title}
  //           </span>
  //         </div>
  //       ) : (
  //         ""
  //       )
  //     )
  //   }
    
  //   switch(downloadFile) {
  //     case 'xlsx':
  //       return checkFileExtention("xlsx")
  //     default:
  //       return
  //   }
  // }

  render() {
    const { selectedNews, loading } = this.state;
    let selectedNewsLoad = null;
    let haveSlider = null;

    if (selectedNews === null) {
      return null;
    }

    if (
      selectedNews.thumb_urls.galleryPicture !== undefined &&
      Object.keys(selectedNews.thumb_urls.galleryPicture).length !== 0
    ) {
      haveSlider = (
        <Slider
          sliderImages={selectedNews.thumb_urls.galleryPicture.thumb}
          largeImages={selectedNews.thumb_urls.galleryPicture.original}
        />
      );
    } else {
      haveSlider = "";
    }

    if (loading) {
      selectedNewsLoad = <Spinner />;
    } else {
      selectedNewsLoad = (
        <div className="FullNews">
         {/* <div className="header-container__backgroundImage" style={{top: '-104%', left: '0', zIndex: '10'}}/> */}
          <BreadcrumbsItem className="breadcrumbs" to="/news/?page=1">
            Новости
          </BreadcrumbsItem>
          <BreadcrumbsItem to={`/${selectedNews.title + `             `}`}>
            {selectedNews.title}
          </BreadcrumbsItem>
          <div className="title-item">
          <div className="header-container__backgroundImage" style={{top: '-80%', left: '0', zIndex: '10'}}/>
            <div className="title-item__date">{`${moment(
              selectedNews.published_at
            ).format("D MMMM YYYY")}`}</div>
            <h1 className="title-item__name">{selectedNews.title}</h1>
            {/* <div className="header-circle">
              <div className="header-circle__item" style={{ top: "-232px" }} />
              <div className="header-circle__item" style={{ top: "-40px" }} />
              <div className="header-circle__item" style={{ top: "88px" }} />
              <div className="header-circle__item" style={{ top: "183px" }} />
            </div> */}
          </div>
          <div className="FullNews__top-img">
            <div className="FullNews__top-img__container">
              <img
                className="img"
                src={`${
                  selectedNews.thumb_urls.previewPicture
                    ? selectedNews.thumb_urls.previewPicture.detail_preview
                    : ""
                }`}
                alt=""
              />
            </div>
          </div>

          {selectedNews.preview_picture && (
            <div className="FullNews__copyright">
              <div className="FullNews__copyright-container">
                <i>{selectedNews.preview_picture.copyright}</i>
              </div>
            </div>
          )}

          {haveSlider}
          <div className="FullNews__text">
            <div dangerouslySetInnerHTML={createMarkup(selectedNews.text)} />
            {selectedNews.uploaded_files.length > 0 ? (
              <div className="full-event__download-wrapper">
                <div className="full-event__download-wrapper__download">
                  <span style={{ marginRight: "25px" }}>Скачать</span>
                  {selectedNews.uploaded_files.length &&
                    selectedNews.uploaded_files.map(file => (
                      <a
                        // style={{ marginRight: "15px" }}
                        href={file.download_url}
                        key={file.id}
                      >
                      {/* {this.checkFile(file)} */}
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
            <div className="FullNews__social-btns text-right">
              <WhatsappShareButton
                url={window.location.href}
                style={{ display: "inline-block" }}
              >
                <BtnSocial img_link={whatsappIcon} color="#16ae61" />
              </WhatsappShareButton>
              <VKShareButton
                url={window.location.href}
                style={{ display: "inline-block" }}
              >
                <BtnSocial img_link={vkIcon} color="#4c75a1" />
              </VKShareButton>
              <FacebookShareButton
                url={window.location.href}
                style={{ display: "inline-block" }}
              >
                <BtnSocial img_link={fbIcon} color="#0662af" />
              </FacebookShareButton>
              {/* <TelegramShareButton
                url={window.location.href}
                style={{ display: "inline-block" }}
              >
                <BtnSocial img_link={telegramIcon} color="#00bff3" />
              </TelegramShareButton> */}
            </div>
          </div>
        </div>
      );
    }

    return <React.Fragment>{selectedNewsLoad}</React.Fragment>;
  }
}

export default withRouter(FullNews);

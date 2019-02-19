import React, { Component } from "react";
import "./FullMedia.scss";

import axios from "axios";
import { withRouter } from "react-router-dom";
import ReactPlayer from "react-player";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Swiper from "react-id-swiper";
import createMarkup from "../../../helpers/dangerouslySetHTML";

import { SliderArrow } from "../../Elements/Icons/Icons";
import BtnSocial from "../../Elements/BtnSocial/BtnSocial";
import whatsappIcon from "../../../img/whatsapp-icon.png";
import vkIcon from "../../../img/vk-icon.png";
import fbIcon from "../../../img/fb-icon.png";
// import telegramIcon from "../../../img/telegram-icon.png";
import Spinner from "../../Spinner/Spinner";
import {
  FacebookShareButton,
  // TelegramShareButton,
  WhatsappShareButton,
  VKShareButton
} from "react-share";
import moment from "moment";
import "moment/locale/ru";

import Lightbox from "react-image-lightbox";
import download_btn from "../../../img/download-button.svg";

class FullMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMedia: null,
      selectedMediaSlider: null,
      gallerySwiper: null,
      thumbnailSwiper: null,
      photoIndex: 0,
      isOpen: false
    };
  }

  handleGalleryClick = (e, i) => {
    this.setState({ photoIndex: i, isOpen: true });
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px";
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    axios
      .get(`/api/v1/media/${id}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          selectedMedia: response.data,
          selectedMediaSlider:
            response.data.thumb_urls.galleryPicture &&
            response.data.thumb_urls.galleryPicture.detail_preview,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { selectedMedia, selectedMediaSlider } = this.state;
    const { photoIndex, isOpen } = this.state;

    const gallerySwiperParams = {
      slidesPerView: 3,
      slidesPerColumn: 2,
      spaceBetween: 5,
      shortSwipes: true
    };

    const goNext = () => {
      if (this.swiper) this.swiper.slideNext();
    };

    const goPrev = () => {
      if (this.swiper) this.swiper.slidePrev();
    };

    if (selectedMedia === null) {
      return <Spinner />;
    }

    return (
      <React.Fragment>
        <div className="FullMedia">
          <BreadcrumbsItem
            className="breadcrumbs"
            to={`/${selectedMedia.name + `            `}`}
          >
            {selectedMedia.name &&
              selectedMedia.name.substring(0, 95) +
                (selectedMedia.name.length > 94 ? "…" : "")}
            {/* {selectedMedia.name} */}
          </BreadcrumbsItem>
          <div className="title-item">
            <div
              className="header-container__backgroundImage"
              style={{ top: "-80%", left: "0" }}
            />
            <div className="title-item__date">{`${moment(
              selectedMedia.created_at
            ).format("D MMMM YYYY")}`}</div>
            <h1 className="title-item__name">{selectedMedia.name}</h1>
            {/* <div className="header-circle">
              <div className="header-circle__item" style={{ top: "-232px" }} />
              <div className="header-circle__item" style={{ top: "-40px" }} />
              <div className="header-circle__item" style={{ top: "88px" }} />
              <div className="header-circle__item" style={{ top: "183px" }} />
            </div> */}
          </div>
          {this.state.selectedMedia.type === 1 ? (
            <React.Fragment>
              <div className="FullNews__top-img">
                <div className="FullNews__top-img__container">
                  <Swiper
                    {...gallerySwiperParams}
                    ref={node => {
                      if (node) this.swiper = node.swiper;
                    }}
                  >
                    {this.state.selectedMediaSlider &&
                      this.state.selectedMediaSlider.map((image, i) => (
                        <div
                          className="slider-image"
                          key={i}
                          style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: `cover`,
                            backgroundPosition: "center",
                            width: "840px",
                            height: "480px"
                          }}
                          onClick={e => {
                            this.handleGalleryClick(e, i);
                          }}
                        />
                      ))}
                  </Swiper>
                  <div className="carousel__btns-row">
                    <div
                      onClick={goPrev}
                      className="news-slider__arr news-slider__arr_prev gallery-btn"
                    >
                      <SliderArrow />
                    </div>
                    <div
                      onClick={goNext}
                      className="news-slider__arr news-slider__arr_next gallery-btn-right"
                    >
                      <SliderArrow />
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <ReactPlayer
              className="FullMedia__video"
              url={selectedMedia.url}
              width="843px"
              height="480px"
            />
          )}
          <div className="FullNews__text" style={{ marginTop: "31px" }}>
            <div dangerouslySetInnerHTML={createMarkup(selectedMedia.intro)} />
          </div>
          <div className="FullNews__social-btns">
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
        {isOpen && (
          <React.Fragment>
            <Lightbox
              mainSrc={selectedMediaSlider[photoIndex]}
              // imageTitle={media[photoIndex].text}
              // imageCaption={media[photoIndex].text}
              nextSrc={
                selectedMediaSlider[
                  (photoIndex + 1) % selectedMediaSlider.length
                ]
              }
              prevSrc={
                selectedMediaSlider[
                  (photoIndex + selectedMediaSlider.length - 1) %
                    selectedMediaSlider.length
                ]
              }
              onCloseRequest={() => {
                this.setState({ isOpen: false })
                document.body.style.overflow = "auto";
                document.body.style.paddingRight = "0";
                }
              }
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex:
                    (photoIndex + selectedMediaSlider.length - 1) %
                    selectedMediaSlider.length
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % selectedMediaSlider.length
                })
              }
            />
            <a
              href={selectedMediaSlider[photoIndex]}
              className="lightbox-media__download"
              download
            >
              <img src={download_btn} alt="" />
            </a>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(FullMedia);

import React, { Component } from "react";
import "./HeaderContent.scss";
import HeaderSlider from "../HeaderSlider/HeaderSlider";
import map from "../../img/map.png";
import map2 from "../../img/map2.png";
import "react-id-swiper/src/styles/scss/swiper.scss";

import { CSSTransitionGroup } from "react-transition-group";

export default class HeaderContent extends Component {

  slideActive = () => {
    switch (this.props.slideIndex + 1) {
      case 1:
        return "gradient-1";
      case 2:
        return "gradient-2";
      case 3:
        return "gradient-3";
      case 4:
        return "gradient-4";
      case 5:
        return "gradient-5";
      default:
        break;
    }
  };

  render() {
    const { slides } = this.props;

    return (
      <div className={`header-content `}>
        {this.props.slideIndex === 0 ? <div className="gradient-1" /> : ""}
        {this.props.slideIndex === 1 ? <div className="gradient-2" /> : ""}
        {this.props.slideIndex === 2 ? <div className="gradient-3" /> : ""}
        {this.props.slideIndex === 3 ? <div className="gradient-4" /> : ""}
        {this.props.slideIndex === 4 ? <div className="gradient-5" /> : ""}
        <CSSTransitionGroup
          transitionName="gradientTransition"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={500}
        >
        {this.props.slideIndex === 0 ? <div className="gradient-1" /> : ""}
        {this.props.slideIndex === 1 ? <div className="gradient-2" /> : ""}
        {this.props.slideIndex === 2 ? <div className="gradient-3" /> : ""}
        {this.props.slideIndex === 3 ? <div className="gradient-4" /> : ""}
        {this.props.slideIndex === 4 ? <div className="gradient-5" /> : ""}
        </CSSTransitionGroup>
        <HeaderSlider
          params={this.props.params}
          slideIndex={this.props.slideIndex}
        />
        {/* {
                    slides.map((item,i) =>
                        <div className="header-map" key={i}>
                            <img src={item.img} className={`${this.props.slideIndex !== item.id ? "slideFadeOut" : 'slideFadeIn'}`} alt="" />
                        </div>
                    )
                } */}
      </div>
    );
  }
}

HeaderContent.defaultProps = {
  slides: [
    {
      id: 0,
      img: map2
    },
    {
      id: 1,
      img: map
    },
    {
      id: 2,
      img: map2
    },
    {
      id: 3,
      img: map
    },
    {
      id: 4,
      img: map2
    }
  ]
};

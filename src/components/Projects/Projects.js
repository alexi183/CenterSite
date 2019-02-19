import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Projects.scss";

import Truncate from "react-truncate";
import Spinner from "../Spinner/Spinner";

import BtnBlue from "../Elements/BtnBlue/BtnBlue";
// import logo1 from "../../img/logo1.png";
// import logo3 from "../../img/logo3.png";
// import logo4 from "../../img/logo4.png";
// import projects1 from "../../img/projects1.png";

export default class Projects extends Component {
  state = {
    projects: null
  };

  componentWillMount() {
    axios
      .get("/api/v1/projects/")
      .then(response => {
        this.setState({
          projects: response.data.items
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // if(!this.state || this.state.projects === undefined){
    if (this.state.projects === null) {
      return (
        <div style={{display: 'flex', alignItems: 'center', height: "692px" }}>
          <Spinner />
        </div>
      );
    }

    return (
      <section className="projects">
        <div className="section-wrapper">
          <div className="row mb-4 align-items-center">
            <div className="col">
              <h2 className="title-section">Образовательные проекты</h2>
            </div>
            <div className="col text-right flex-grow-0">
              {BtnBlue(`/projects/?page=1&type=0`, `все проекты`, true)}
            </div>
          </div>

          <div className="projects-wrapper">
            <div className="projects__col" style={{paddingLeft: '0'}}>
              {
                (this.state.projects && this.state.projects[0]) ?
                <Link
                to={
                  this.state.projects &&
                  `/projects/detail/${this.state.projects[0].id}`
                }
                className="projects__cell projects__cell_small"
                >
                  <div className="projects__cell-inner">
                    {/* <img
                      src={
                        this.state.projects &&
                        this.state.projects[0].thumb_urls.projectIco &&
                        this.state.projects[0].thumb_urls.projectIco.thumb
                      }
                      alt=""
                    /> */}
                    <div
                      style={{
                        display: 'inline-block',
                        height: '100px',
                        width: '100px',
                        background: `url(${
                          this.state.projects &&
                        this.state.projects[0].thumb_urls.projectIco &&
                        this.state.projects[0].thumb_urls.projectIco.thumb
                        }) center / contain no-repeat`,
                      }}
                    ></div>
                    <span className="projects__name">
                      <Truncate lines={2}>{this.state.projects[0] && this.state.projects[0].title}</Truncate>
                    </span>
                  </div>
                </Link> : ''
              }
              {
                (this.state.projects && this.state.projects[1]) ?
                <Link
                to={
                  this.state.projects &&
                  `/projects/detail/${this.state.projects[1].id}`
                }
                className="projects__cell align-items-end"
                style={{
                  background: `linear-gradient(to top, #000000 0%, rgba(140, 140, 140, 0) 55%, rgba(255, 255, 255, 0) 100%), url(${this
                    .state.projects &&
                    this.state.projects[1].thumb_urls.projectImage &&
                    this.state.projects[1].thumb_urls.projectImage.original})`,
                  backgroundSize: "cover"
                }}
                >
                  <div className="projects__cell-inner">
                    <img
                      src={
                        this.state.projects &&
                        this.state.projects[1].thumb_urls.projectIco &&
                        this.state.projects[1].thumb_urls.projectIco.thumb
                      }
                      alt=""
                    />
                    <span className="projects__name projects__name_white">
                      <Truncate lines={2}>{this.state.projects[1] && this.state.projects[1].title}</Truncate>
                    </span>
                  </div>
                </Link>
                : ''
              }
            </div>

            <div className="projects__col" style={{paddingRight: '0'}}>
              {
                (this.state.projects && this.state.projects[2]) ?
                <Link
                to={
                  this.state.projects &&
                  `/projects/detail/${this.state.projects[2].id}`
                }
                className="projects__cell align-items-start"
                style={{
                  background: `linear-gradient(to top, #000000 0%, rgba(140, 140, 140, 0) 55%, rgba(255, 255, 255, 0) 100%), url(${this
                    .state.projects &&
                    this.state.projects[2].thumb_urls.projectImage &&
                    this.state.projects[2].thumb_urls.projectImage.original})`,
                  backgroundSize: "cover"
                }}
                >
                  <div className="projects__cell-inner">
                  <img
                      src={
                        this.state.projects &&
                        this.state.projects[2].thumb_urls.projectIco &&
                        this.state.projects[2].thumb_urls.projectIco.thumb
                      }
                      alt=""
                    />
                    <span className="projects__name projects__name_white">
                      <Truncate lines={2}>{this.state.projects[2] && this.state.projects[2].title}</Truncate>
                    </span>
                  </div>
                </Link>
                : ''
              }
              {
                (this.state.projects && this.state.projects[3]) ?
                <Link
                to={
                  this.state.projects &&
                  `/projects/detail/${this.state.projects[3].id}`
                }
                className="projects__cell projects__cell_small"
                >
                  <div className="projects__cell-inner">
                  <img
                      src={
                        this.state.projects &&
                        this.state.projects[3].thumb_urls.projectIco &&
                        this.state.projects[3].thumb_urls.projectIco.thumb
                      }
                      alt=""
                    />
                    <span className="projects__name">
                      <Truncate lines={2}>{this.state.projects[3] && this.state.projects[3].title}</Truncate>
                    </span>
                  </div>
                </Link>
                : ''

              }
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Projects.defaultProps = {
  data: [{}, {}, {}]
};

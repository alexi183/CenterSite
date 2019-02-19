import React, { Fragment } from "react";
import { inject, observer } from "mobx-react";
import "./ProjectsPageList.scss";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";

import PaginationComponent from "../../Pagination/Pagination";

@inject("projectsStore")
@observer
class ProjectsPageList extends React.Component {
  state = {
    link: "/projects"
  };

  render() {
    const {
      projectsStore: { projectsList, total, page, limit }
    } = this.props;
    // console.log(projectsList)

    // if(projectsList === null) {
    //   return null
    // }

    return (
      <Fragment>
        {projectsList.length < 1 ? (
          <h2 className="text-center mb-5 mt-5">К сожалению, по Вашему запросу ничего не найдено</h2>
        ) : (
          <div style={{ marginTop: "40px" }}>
            {projectsList.length &&
              projectsList.map((item, key) => (
                <div
                  key={item.id}
                  className={`project-card${key % 2 !== 0 ? "-reverse" : ""}`}
                >
                  <div
                    className={`project-card${
                      key % 2 !== 0 ? "-reverse" : ""
                    }__desc__img`}
                    style={{
                      paddingTop: "233px",
                      paddingBottom: "233px",
                      background: `url(${
                        item.thumb_urls.projectImage
                          ? item.thumb_urls.projectImage.original
                          : ""
                      }) center no-repeat`,
                      backgroundSize: `cover`
                    }}
                  />

                  <div
                    className={`project-card${
                      key % 2 !== 0 ? "-reverse" : ""
                    }__desc`}
                  >
                    <div
                      className={`project-card${
                        key % 2 !== 0 ? "-reverse" : ""
                      }__desc__card`}
                    >
                      <Link to={`/projects/detail/${item.id}`}>
                        <div style={{ display: "flex" }}>
                          <div className="projects__cell-inner" style={{width: '630px'}}>
                            {item.thumb_urls.projectIco ? (
                              <React.Fragment>
                                <div
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    background: `url(${
                                      item.thumb_urls.projectIco
                                        ? item.thumb_urls.projectIco.original
                                        : ""
                                    }) center / contain no-repeat`
                                  }}
                                />
                                <span className="project-card__title">
                                  <Truncate lines={2}>{item.title}</Truncate>
                                </span>
                              </React.Fragment>
                            ) : (
                              <h2
                                className="project-card__title"
                                style={{ marginLeft: "0px" }}
                              >
                                <Truncate lines={2}>{item.title}</Truncate>
                              </h2>
                            )}
                          </div>
                        </div>
                        <p className="project-card__preview">{item.preview}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            {
              total > 1 ?
              <PaginationComponent
              link={this.state.link}
              total={total}
              page={page}
              limit={limit}
            />
            : null
            }
          </div>
        )}
      </Fragment>
    );
  }
}

export default ProjectsPageList;

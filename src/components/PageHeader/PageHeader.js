import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import "./PageHeader.scss";
// import HeaderGoalImg from "../../img/projectDescGoal.png";
import HeaderTimeImg from "../../img/projectDescTime.png";
import HeaderSiteImg from "../../img/projectDescSite.png";
import { inject, observer } from "mobx-react";
// import Truncate from "react-truncate";
import AdditionalContent from "./AdditionalContent";

@inject("contentPagesStore")
@observer
class PageHeader extends Component {
  render() {
    const {
      breadCrumbs,
      background,
      headerModifierClass,
      headerProjectImg,
      title,
      description,
      descriptionRealisation,
      descriptionSite,
      linkBlock,
      links
    } = this.props;

    const linkPage = this.props.location.pathname;

    const { filterContent, filterIndex } = this.props.contentPagesStore;

   /* const currentPath = this.props.location.pathname.split("/content/")[1];*/

    return (
      <div
        style={{ backgroundColor: background }}
        className={`page-header ${headerModifierClass}`}
      >
      <div className="header-container__backgroundImage" style={{top: '-60%', left: '0'}}/>
        {breadCrumbs && (
          <div className="page-header__breadcrumbs">
            {linkPage.split("/")[1] === "content" ? (
              <Fragment>
                {this.props.location.pathname ===
                  "/content/vestnik-obrazovaniia" ||
                this.props.location.pathname ===
                  "/content/informatizatsiia-obrazovaniia-i-nauki/o-zhurnale" ? (
                  <Breadcrumbs
                    separator={<span className="separator"> / </span>}
                    finalItem={"b"}
                    finalProps={{
                      style: { color: "#cdebf5", fontWeight: "normal" }
                    }}
                  />
                ) : (
                  <Breadcrumbs
                    separator={<span className="separator"> / </span>}
                    finalItem={"b"}
                    finalProps={{
                      style: { color: "#cdebf5", fontWeight: "normal" }
                    }}
                  />
                )}
                <BreadcrumbsItem className="breadcrumbs" to="/">
                  Главная
                </BreadcrumbsItem>

                <BreadcrumbsItem className="breadcrumbs" to={`${linkPage}`}>
                  {title}
                </BreadcrumbsItem>
              </Fragment>
            ) : (
              <Fragment>
                <BreadcrumbsItem className="breadcrumbs" to="/projects/?page=1">
                  Проекты
                </BreadcrumbsItem>
                <BreadcrumbsItem to={`/${title + `               `}`}>
                  {/* {title} */}
                  {title && title.substring(0, 95) + ((title.length > 94) ? "…" : '')}
                </BreadcrumbsItem>
              </Fragment>
            )}
          </div>
        )}
        <div className="page-header__top">
          {description ? (
            <Fragment>
              {headerProjectImg ? (
                <div
                  style={{
                    display: "inline-block",
                    width: "100px",
                    height: "100px",
                    marginRight: "10px",
                    background: `url(${headerProjectImg}) center / contain no-repeat`
                  }}
                />
              ) : (
                ""
              )}
              <h1
                className="page-header__title mb-0"
                style={{ fontWeight: "400" }}
              >
                {title}
              </h1>
            </Fragment>
          ) : (
            <h1
              className="page-header__title mb-0"
              style={{ fontWeight: "700", textTransform: "uppercase" }}
            >
              {title}
            </h1>
          )}

          {/* <div className="header-circle">
            <div className="header-circle__item" style={{ top: "-231px" }} />
            <div className="header-circle__item" style={{ top: "-40px" }} />
            <div className="header-circle__item" style={{ top: "86px" }} />
            <div className="header-circle__item" style={{ top: "186px" }} />
          </div> */}
        </div>

        {description && (
          <div className="page-header__description">
            {/* <div className="page-header__description-col">
              <div className="page-header__description-cell">
                <div className="page-header__description-cell-img">
                  <img src={HeaderGoalImg} alt="" />
                </div>
                <div className="page-header__description-cell-text">
                  <b>Цель проекта:</b>
                  <div>{descriptionGoal}</div>
                </div>
              </div>
            </div> */}

            {/* <div className="page-header__description-col"> */}
              <div className="page-header__description-cell">
                <div className="page-header__description-cell-img">
                  <img src={HeaderTimeImg} alt="" />
                </div>
                <div className="page-header__description-cell-text">
                  <b>Сроки реализации:</b>
                  <div>{descriptionRealisation}</div>
                </div>
              </div>
              {descriptionSite !== null ? (
                <div className="page-header__description-cell">
                  <div className="page-header__description-cell-img">
                    <img src={HeaderSiteImg} alt="" />
                  </div>
                  <div className="page-header__description-cell-text">
                    <b>Сайт:</b>
                    <div>
                      <a
                        href={descriptionSite}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {descriptionSite}
                      </a>
                    </div>
                  </div>
                </div>
              ) : null}
            {/* </div> */}
          </div>
        )}

        {linkBlock && (
          <div className="page-header__links">
            <ul className="page-header__link-list d-flex">
              {links.map((item, i) => (
                <li
                  className={`page-header__link ${
                    filterIndex === item.id ? "page-header__link_active" : ""
                  }`}
                  key={i}
                  onClick={() => filterContent(item.id, item.category)}
                >
                  {item.link ? (
                    <Link to={item.link}>{item.name}</Link>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {AdditionalContent(this.props.location)}
      </div>
    );
  }
}

export default withRouter(PageHeader);

PageHeader.defaultProps = {
  breadCrumbs: true,
  title: "",
  headerModifierClass: "",
  background: "#029dd2",
  description: false,
  descriptionGoal: "",
  descriptionRealisation: "",
  descriptionSite: "",
  headerProjectImg: "",
  linkBlock: false,
  links: [
    {
      id: "",
      category: "",
      link: "",
      name: ""
    }
  ]
};

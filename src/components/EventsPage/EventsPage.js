import React, { Component } from "react";
import "./EventsPage.scss";

import { Route, Switch, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import queryString from "query-string";

// import PageSelectHeader from "../PageSelectHeader/PageSelectHeader";
// import DatesSlider from '../DatesSlider/DatesSlider';
import Spinner from "../Spinner/Spinner";

import EventsPageList from "./EventsPageList/EventsPageList";
import FullEvent from "./FullEvent/FullEvent";
import DocumentTitle from "react-document-title";

// import ScrollToTop from "../../layout/ScrollToTop/ScrollToTop";

@inject("eventsStore")
@inject("SelectHeaderStore")
@observer
class EventsPage extends Component {
  handleActiveCLickEvents = () => {
    let link = queryString.parse(this.props.location.search);
    this.props.eventsStore.activeType = link.type;
    this.props.eventsStore.activeCategory = link.category;
  };

  handleTypeClickEvent = type => {
    this.props.eventsStore.setTypeId(type);
    this.props.eventsStore.setPageNumber(1);
    this.props.history.push({
      // pathname: `${this.props.link}`,
      search: `?${this.props.eventsStore.filterURL}`
    });
  };

  handleCategoryClickEvent = item => {
    this.props.eventsStore.setCategoryId(item);
    this.props.eventsStore.setPageNumber(1);
    delete this.props.eventsStore.params["type"];
    // this.props.eventsStore.filterParamsFetch(
    //   queryString.parse(this.props.eventsStore.params)
    // );
    this.props.history.push({
      search: `?page=1&category=${item}`
    });
  };

  handleFullCategoryClick = () => {
    this.props.eventsStore.setPageNumber(1);
    delete this.props.eventsStore.params["type"];
    delete this.props.eventsStore.params["category"];
    this.props.history.push({
      search: `?page=1`
    });
  }

  componentWillMount() {
    this.props.eventsStore.categoryEventHandler();
    this.props.eventsStore.fetchMainEvent();
    this.props.eventsStore.filterParamsFetch(
      queryString.parse(this.props.location.search)
    );
    this.props.eventsStore.params = queryString.parse(
      this.props.location.search
    );
    this.handleActiveCLickEvents();
  }

  componentDidUpdate(prevProps) {
    // const {
    //   eventsStore: { setPageNumber }
    // } = this.props;

    if (this.props.location.search !== prevProps.location.search) {
      if(this.props.location.pathname === '/events/') {
        // let pageValue = queryString.parse(this.props.location.search);
        // let newPage = +pageValue.page;
        // setPageNumber(newPage);
        this.handleActiveCLickEvents();
        this.props.eventsStore.filterParamsFetch(
          queryString.parse(this.props.location.search)
        );
      }
    }
  }

  render() {
    const {
      eventsStore: { loading },
      // SelectHeaderStore: { eventsRoute, eventsLink, eventsTitle }
    } = this.props;

    let activeStyleEvent = { backgroundColor: "#fff", color: "#337b99" };

    // let filterLoadEvent = null;
    let eventsLoad = null;

    // if (
    //   this.props.history.location.pathname === "/events/filter/today" ||
    //   this.props.history.location.pathname === "/events/filter/yesterday"
    // ) {
    //   filterLoadEvent = (
    //     <PageSelectHeader
    //       // route={"events/page/1"}
    //       // link={link}
    //       // list={eventsList}
    //       // title={"События"}
    //       // news_style={defStyle}
    //       route={eventsRoute}
    //       link={eventsLink}
    //       list={eventsList}
    //       title={eventsTitle}
    //     />
    //   );
    // }

    if (loading) {
      eventsLoad = <Spinner />;
    } else {
      eventsLoad = (
        <React.Fragment>
          <div className="pages-header-wrapper">
          <div className="header-container__backgroundImage" style={{top: '-60%', left: '0'}}/>
            <div className="bc-wrapper">
              <Breadcrumbs
                separator={<b style={{ color: "#bfe6f3" }}> / </b>}
                finalItem={"b"}
                finalProps={{
                  style: { color: "#bfe6f3", fontWeight: "normal" }
                }}
              />
              <BreadcrumbsItem className="breadcrumbs" to="/">
                Главная страница
              </BreadcrumbsItem>
              <BreadcrumbsItem className="breadcrumbs" to={`/events/?page=1`}>
              События
              </BreadcrumbsItem>
            </div>
            {this.props.location.pathname === "/events/" ? (
              <React.Fragment>
                <div className="events-page__header">
                  <h1 className="title-section">События</h1>
                  <ul className="events-page__sections">
                  <li className="events-page__section-item">
                      <div
                        className="events-page__date-change-item"
                        style={
                          this.props.eventsStore.activeType === undefined
                            ? activeStyleEvent
                            : {}
                        }
                        onClick={() => this.handleFullCategoryClick()}
                      >
                        <span className="events-page__date-change-item__a__category">
                          Все события
                        </span>
                      </div>
                    </li>
                    <li className="events-page__section-item">
                      <div
                        className="events-page__date-change-item"
                        style={
                          this.props.eventsStore.activeType === "finished"
                            ? activeStyleEvent
                            : {}
                        }
                        onClick={() => this.handleTypeClickEvent("finished")}
                      >
                        <span className="events-page__date-change-item__a__category">
                          Прошедшие
                        </span>
                      </div>
                    </li>
                    <li className="events-page__section-item">
                      <div
                        className="events-page__date-change-item"
                        style={
                          this.props.eventsStore.activeType === "current"
                            ? activeStyleEvent
                            : {}
                        }
                        onClick={() => this.handleTypeClickEvent("current")}
                      >
                        <span className="events-page__date-change-item__a__category">
                          Текущие
                        </span>
                      </div>
                    </li>
                    <li className="events-page__section-item">
                      <div
                        className="events-page__date-change-item"
                        style={
                          this.props.eventsStore.activeType === "future"
                            ? activeStyleEvent
                            : {}
                        }
                        onClick={() => this.handleTypeClickEvent("future")}
                      >
                        <span className="events-page__date-change-item__a__category">
                          Будущие
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </React.Fragment>
            ) : (
              ""
            )}
            {/* <div className="header-circle">
              <div className="header-circle__item" />
              <div className="header-circle__item" />
              <div className="header-circle__item" />
              <div className="header-circle__item" />
            </div> */}
          </div>
          <Switch>
            <Route path="/events/" exact component={EventsPageList} />
            <Route path="/events/event/:id" component={FullEvent} />
          </Switch>
        </React.Fragment>
      );
    }

    return (
      <DocumentTitle title="События">
        <section className="events-page">
          <div className="section-wrapper">{eventsLoad}</div>
        </section>
      </DocumentTitle>
    );
  }
}

export default withRouter(EventsPage);

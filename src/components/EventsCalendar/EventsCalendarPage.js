import React, { Component } from "react";
import "./EventsCalendarPage.scss";

import { inject, observer } from "mobx-react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import queryString from "query-string";

import EventsCalendarList from "./EventsCalendarList/EventsCalendarList";
import FullEventInCalendar from "./FullEventInCalendar/FullEventInCalendar";
// import renderDocs from "../../helpers/renderDocs";
import DocumentTitle from "react-document-title";
import Spinner from "../Spinner/Spinner";

@inject("eventCalendarStore")
@observer
class EventsCalendarPage extends Component {
    handleActiveCLick = () => {
        let link = queryString.parse(this.props.location.search);
        this.props.eventCalendarStore.activeCategory = link.category;
    };

    componentWillMount() {
        this.props.eventCalendarStore.categoryHandler();
        this.props.eventCalendarStore.filterParamsFetch(
            queryString.parse(this.props.location.search)
        );
        this.props.eventCalendarStore.params = queryString.parse(
            this.props.location.search
        );
        this.handleActiveCLick();
    }

    handleCategoryClick = item => {
        this.props.eventCalendarStore.setCategoryId(item);
        this.props.eventCalendarStore.setPageNumber(1);
        this.props.history.push({
            // pathname: `${this.props.link}`,
            search: `?${this.props.eventCalendarStore.filterURL}`
        });
    };

    componentDidUpdate(prevProps) {
        const {
            eventCalendarStore: { setPageNumber }
        } = this.props;

        if (this.props.location.search !== prevProps.location.search) {
            if (this.props.location.pathname === "/event-calendar/") {
                let pageValue = queryString.parse(this.props.location.search);
                let newPage = +pageValue.page;
                setPageNumber(newPage);
                this.handleActiveCLick();
                this.props.eventCalendarStore.filterParamsFetch(
                    queryString.parse(this.props.location.search)
                );
            }
        }
    }

    render() {
        const {
            eventCalendarStore: { eventsCalendarList, categoryList, loading }
        } = this.props;

        let loadEventCalendar = null;

        if (eventsCalendarList === null) {
            return null;
        }

        let activeStyle = { backgroundColor: "#029dd2", color: "#fff" };

        if (loading) {
            loadEventCalendar = <Spinner />;
        } else {
            loadEventCalendar = (
                <Switch>
                    <Route path="/event-calendar/" exact component={EventsCalendarList} />
                    <Route path="/event-calendar/:id" component={FullEventInCalendar} />
                </Switch>
            );
        }

        return (
            <DocumentTitle title="Календарь образовательных событий">
                <section className="presentation-page">
                    <div className="section-wrapper">
                        <React.Fragment>
                            <div className="pages-header-wrapper">
                                <div className="bc-wrapper">
                                    <Breadcrumbs
                                        separator={<span style={{ color: "#609eb7" }}> / </span>}
                                        finalItem={"b"}
                                        finalProps={{
                                            style: { color: "#609eb7", fontWeight: "normal" }
                                        }}
                                    />
                                    <BreadcrumbsItem className="breadcrumbs" to="/">
                                        Главная страница
                                    </BreadcrumbsItem>
                                    <BreadcrumbsItem
                                        className="breadcrumbs"
                                        to={`/event-calendar/?page=1`}
                                    >
                                        Календарь образовательных событий
                                    </BreadcrumbsItem>
                                </div>
                                {this.props.location.pathname === "/event-calendar/" ? (
                                    <div
                                        className="presentation-page__header"
                                        style={{ zIndex: "2" }}
                                    >
                                        <h1
                                            className="title-section"
                                            style={{ lineHeight: "40px" }}
                                        >
                                            КАЛЕНДАРЬ ОБРАЗОВАТЕЛЬНЫХ СОБЫТИЙ
                                        </h1>
                                        <ul className="presentation-page__sections">
                                            <li
                                                className="presentation-page__section-item"
                                                style={
                                                    this.props.eventCalendarStore.activeCategory ===
                                                    undefined
                                                        ? activeStyle
                                                        : {}
                                                }
                                            >
                                                <a
                                                    href="/event-calendar/?page=1"
                                                    className="presentation-page__section-item__a"
                                                    style={
                                                        this.props.eventCalendarStore.activeCategory ===
                                                        undefined
                                                            ? activeStyle
                                                            : {}
                                                    }
                                                >
                                                    Все события
                                                </a>
                                            </li>
                                            {categoryList &&
                                            categoryList.map(item => (
                                                <li
                                                    key={item.id}
                                                    className="presentation-page__section-item"
                                                    style={
                                                        this.props.eventCalendarStore.activeCategory ===
                                                        `${item.id}`
                                                            ? activeStyle
                                                            : {}
                                                    }
                                                >
                                                    <div
                                                        onClick={() => this.handleCategoryClick(item.id)}
                                                        className="presentation-page__section-item__a"
                                                        style={
                                                            this.props.eventCalendarStore.activeCategory ===
                                                            `${item.id}`
                                                                ? activeStyle
                                                                : {}
                                                        }
                                                    >
                                                        {item.name}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="header-circle" style={{ zIndex: "-1" }}>
                                            <div
                                                className="header-circle__item"
                                                style={{ top: "-231px" }}
                                            />
                                            <div
                                                className="header-circle__item"
                                                style={{ top: "-40px" }}
                                            />
                                            <div
                                                className="header-circle__item"
                                                style={{ top: "88px" }}
                                            />
                                            <div
                                                className="header-circle__item"
                                                style={{ top: "197px" }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div className="header-circle">
                                    <div className="header-circle__item" />
                                    <div className="header-circle__item" />
                                    <div className="header-circle__item" />
                                    <div className="header-circle__item" />
                                </div>
                            </div>
                            {loadEventCalendar}
                        </React.Fragment>
                    </div>
                </section>
            </DocumentTitle>
        );
    }
}

export default withRouter(EventsCalendarPage);

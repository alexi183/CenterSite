import React, { Component } from "react";
import "./EventsPage.scss";

import { Route, Switch, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import queryString from "query-string";

import PageSelectHeader from "../PageSelectHeader/PageSelectHeader";
import Spinner from "../Spinner/Spinner";

import EventsPageList from "./EventsPageList/EventsPageList";
import FullEvent from "./FullEvent/FullEvent";
import DocumentTitle from "react-document-title";


@inject("eventsStore")
@inject("SelectHeaderStore")
@observer
class EventsPage extends Component {
    handleActiveCLickEvents = () => {
        let link = queryString.parse(this.props.location.search);
        this.props.eventsStore.activeType = link.type;
        this.props.eventsStore.activeCategory = link.category;
    };

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
        const {
            eventsStore: { setPageNumber }
        } = this.props;

        if (this.props.location.search !== prevProps.location.search) {
            if(this.props.location.pathname === '/events/') {
                let pageValue = queryString.parse(this.props.location.search);
                let newPage = +pageValue.page;
                setPageNumber(newPage);
                this.handleActiveCLickEvents();
                this.props.eventsStore.filterParamsFetch(
                    queryString.parse(this.props.location.search)
                );
            }
        }
    }

    render() {
        const {
            eventsStore: { eventsList, loading },
            SelectHeaderStore: { eventsRoute, eventsLink, eventsTitle }
        } = this.props;

        let filterLoadEvent = null;
        let eventsLoad = null;

        if (
            this.props.history.location.pathname === "/events/filter/today" ||
            this.props.history.location.pathname === "/events/filter/yesterday"
        ) {
            filterLoadEvent = (
                <PageSelectHeader
                    route={eventsRoute}
                    link={eventsLink}
                    list={eventsList}
                    title={eventsTitle}
                />
            );
        }

        if (loading) {
            eventsLoad = <Spinner />;
        } else {
            eventsLoad = (
                <React.Fragment>
                    <div className="pages-header-wrapper">
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
                        </div>
                        {filterLoadEvent}
                        <div className="header-circle">
                            <div className="header-circle__item" />
                            <div className="header-circle__item" />
                            <div className="header-circle__item" />
                            <div className="header-circle__item" />
                        </div>
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

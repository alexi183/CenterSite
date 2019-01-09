import React, { Component } from "react";
import "./MediaPage.scss";

import { inject, observer } from "mobx-react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import queryString from "query-string";

import MediaPageList from "./MediaPageList/MediaPageList";
import FullMedia from './FullMedia/FullMedia';
import Spinner from "../Spinner/Spinner";
// import MediaCard from './MediaCard/MediaCard';
import DocumentTitle from "react-document-title";

@inject("mediaStore")
@observer
class MediaPage extends Component {
    handleTypeClick = type => {
        this.props.mediaStore.setTypeId(type);
        // this.props.mediaStore.setPageNumber(1);
        delete this.props.mediaStore.params['category']
        // this.props.mediaStore.filterParamsFetch(
        //   queryString.parse(this.props.location.search)
        // );
        this.props.history.push({
            // pathname: `${this.props.link}`,
            search: `?type=${type}&page=1`
        });
    };

    handleCategoryClick = item => {
        this.props.mediaStore.setCategoryId(item);
        this.props.mediaStore.setPageNumber(1);
        this.props.history.push({
            // pathname: `${this.props.link}`,
            search: `?${this.props.mediaStore.filterURL}`
        });
    };

    handleActiveCLick = () => {
        let link = queryString.parse(this.props.location.search);
        this.props.mediaStore.activeType = link.type;
        this.props.mediaStore.activeCategory = link.category;
    };

    componentWillMount() {
        this.props.mediaStore.filterParamsFetch(
            queryString.parse(this.props.location.search)
        );
        this.props.mediaStore.params = queryString.parse(
            this.props.location.search
        );
        this.handleActiveCLick();
    }

    componentDidUpdate(prevProps) {
        const {
            mediaStore: { setPageNumber }
        } = this.props;

        if (this.props.location.search !== prevProps.location.search) {
            if(this.props.location.pathname === '/media/') {
                let pageValue = queryString.parse(this.props.location.search);
                let newPage = +pageValue.page;
                setPageNumber(newPage);
                this.handleActiveCLick();
                this.props.mediaStore.filterParamsFetch(
                    queryString.parse(this.props.location.search)
                );
            }
        }
    }

    render() {
        const { loading } = this.props.mediaStore;

        let mediaLoad = null;
        let activeStyle = { backgroundColor: "#029dd2", color: "#fff" };

        if (loading) {
            mediaLoad = <Spinner />;
        } else {
            mediaLoad = (
                <React.Fragment>
                    <div className="pages-header-wrapper">
                        <div className="bc-wrapper">
                            <Breadcrumbs
                                separator={<span> / </span>}
                                finalItem={"b"}
                                finalProps={{
                                    style: { color: "#666666", fontWeight: "normal" }
                                }}
                            />
                            <BreadcrumbsItem className="breadcrumbs" to="/">
                                Главная страница
                            </BreadcrumbsItem>
                            <BreadcrumbsItem className="breadcrumbs" to={`/media/?page=1`}>
                                Медиалента
                            </BreadcrumbsItem>
                        </div>
                        {
                            this.props.location.pathname === "/media/" ? (
                                <div className="media-page__header">
                                    <h1 className="title-section">Медиалента</h1>
                                    <ul className="media-page__date-change">
                                        {/* eslint-disable */}
                                        <li
                                            className="media-page__date-change-item"
                                            style={
                                                this.props.mediaStore.activeType === "1" ? activeStyle : {}
                                            }
                                        >
                                            <div
                                                onClick={() => this.handleTypeClick(1)}
                                                className="media-page__date-change-item__a"
                                                style={
                                                    this.props.mediaStore.activeType === "1"
                                                        ? { color: "#fff" }
                                                        : { color: "#000" }
                                                }
                                            >
                                                Фото
                                            </div>
                                        </li>
                                        <li
                                            className="media-page__date-change-item"
                                            style={
                                                this.props.mediaStore.activeType === "2" ? activeStyle : {}
                                            }
                                        >
                                            <div
                                                onClick={() => this.handleTypeClick("2")}
                                                className="media-page__date-change-item__a"
                                                style={
                                                    this.props.mediaStore.activeType === "2"
                                                        ? { color: "#fff" }
                                                        : { color: "#000" }
                                                }
                                            >
                                                Видео
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="media-page__sections">
                                        <li
                                            className="media-page__section-item"
                                            style={
                                                this.props.mediaStore.activeCategory === undefined &&
                                                this.props.mediaStore.activeType === undefined
                                                    ? activeStyle
                                                    : {}
                                            }
                                        >
                                            <a
                                                href="/media/?page=1"
                                                className="media-page__section-item__a"
                                                style={
                                                    this.props.mediaStore.activeCategory === undefined &&
                                                    this.props.mediaStore.activeType === undefined
                                                        ? { color: "#fff" }
                                                        : { color: "#000" }
                                                }
                                            >
                                                Все материалы
                                            </a>
                                        </li>
                                        <li
                                            className="media-page__section-item"
                                            style={
                                                this.props.mediaStore.activeCategory === "1"
                                                    ? activeStyle
                                                    : {}
                                            }
                                        >
                                            <div
                                                onClick={() => this.handleCategoryClick("1")}
                                                className="media-page__section-item__a"
                                                style={
                                                    this.props.mediaStore.activeCategory === "1"
                                                        ? { color: "#fff" }
                                                        : { color: "#000" }
                                                }
                                            >
                                                Вебинары
                                            </div>
                                        </li>
                                        <li
                                            className="media-page__section-item"
                                            style={
                                                this.props.mediaStore.activeCategory === "2"
                                                    ? activeStyle
                                                    : {}
                                            }
                                        >
                                            <div
                                                onClick={() => this.handleCategoryClick("2")}
                                                className="media-page__section-item__a"
                                                style={
                                                    this.props.mediaStore.activeCategory === "2"
                                                        ? { color: "#fff" }
                                                        : { color: "#000" }
                                                }
                                            >
                                                События
                                            </div>
                                        </li>
                                        <li
                                            className="media-page__section-item"
                                            style={
                                                this.props.mediaStore.activeCategory === "3"
                                                    ? activeStyle
                                                    : {}
                                            }
                                        >
                                            <div
                                                onClick={() => this.handleCategoryClick("3")}
                                                className="media-page__section-item__a"
                                                style={
                                                    this.props.mediaStore.activeCategory === "3"
                                                        ? { color: "#fff" }
                                                        : { color: "#000" }
                                                }
                                            >
                                                Конкурсы
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            ) : ('')
                        }
                        <div className="header-circle">
                            <div className="header-circle__item" />
                            <div className="header-circle__item" />
                            <div className="header-circle__item" />
                            <div className="header-circle__item" />
                        </div>
                    </div>
                    <Switch>
                        <Route path="/media/" exact component={MediaPageList} />
                        <Route path="/media/detail/:id" component={FullMedia} />
                    </Switch>
                </React.Fragment>
            );
        }

        return (
            <DocumentTitle title="Медиалента">
                <section className="media-page">
                    <div className="section-wrapper">{mediaLoad}</div>
                </section>
            </DocumentTitle>
        );
    }
}

export default withRouter(MediaPage);

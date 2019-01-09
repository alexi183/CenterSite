import React, { Component } from "react";
import queryString from "query-string";
import { inject, observer } from "mobx-react";
import axios from 'axios';
import ProjectsPageList from "./ProjectsPageList/ProjectsPageList";
import PageHeader from "../PageHeader/PageHeader";
import "./ProjectsPage.scss";

import { Route, Switch, withRouter } from "react-router-dom";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";

// import PageSelectHeader from '../PageSelectHeader/PageSelectHeader';
// import BtnBlue from "../Elements/BtnBlue/BtnBlue";
import FullProject from "./FullProject/FullProject";

import Spinner from "../Spinner/Spinner";
import DocumentTitle from "react-document-title";

@inject("projectsStore")
@observer
class ProjectsPage extends Component {
    state = {
        searchQuery: "",
    };

    searchRequest = () => {
        axios
            .get("/api/v1/projects/", {
                params: {
                    text: this.state.searchQuery
                }
            })
            .then(response => {
                console.log(response)
                this.props.projectsStore.searchResponce = response.data.items
            })
            .catch(error => {
                console.log(error);
            });
    };

    onSubmitForm = (e) => {
        e.preventDefault()
        this.searchRequest()
        delete this.props.projectsStore.params["type"];
        this.props.projectsStore.setSearchId(this.state.searchQuery);
        this.props.history.push({
            search: `?text=${this.state.searchQuery}&page=1`
        });
    }

    handleSearchField = e => {
        this.setState({
            searchQuery: e.target.value
        });
    };

    handleActiveCLick = () => {
        let link = queryString.parse(this.props.location.search);
        this.props.projectsStore.activeType = link.type;
        this.props.projectsStore.activeText = link.text;
    };

    hadleTypeClick = type => {
        delete this.props.projectsStore.params["text"];
        this.props.projectsStore.setTypeId(type);
        this.props.projectsStore.setPageNumber(1);
        this.props.history.push({
            search: `?${this.props.projectsStore.filterURL}`
        });
        this.setState({
            searchQuery: ''
        });
    };

    componentWillMount() {
        this.props.projectsStore.filterParamsFetch(
            queryString.parse(this.props.location.search)
        );
        this.props.projectsStore.params = queryString.parse(
            this.props.location.search
        );
        this.handleActiveCLick();
    }

    componentDidUpdate(prevProps) {
        const {
            projectsStore: { setPageNumber }
        } = this.props;

        if (this.props.location.search !== prevProps.location.search) {
            if(this.props.location.pathname === '/projects/') {
                let pageValue = queryString.parse(this.props.location.search);
                let newPage = +pageValue.page;
                setPageNumber(newPage);
                this.handleActiveCLick();
                this.props.projectsStore.params = queryString.parse(
                    this.props.location.search
                );
            }
        }
    }

    render() {
        const { loading } = this.props.projectsStore;
        const {searchQuery} = this.state;

        let projectsLoad = null;
        let activeStyleEvent = { backgroundColor: "#fff", color: "#337b99" };

        if (loading) {
            projectsLoad = <Spinner />;
        } else {
            projectsLoad = (
                <React.Fragment>
                    <div className="pages-header-wrapper">
                        <div className="bc-wrapper">
                            <Breadcrumbs
                                separator={<span style={{ color: "#bfe6f3" }}> / </span>}
                                finalItem={"b"}
                                finalProps={{
                                    style: { color: "#bfe6f3", fontWeight: "normal" }
                                }}
                            />
                            <BreadcrumbsItem className="breadcrumbs" to="/">
                                Главная страница
                            </BreadcrumbsItem>
                            <BreadcrumbsItem className="breadcrumbs" to={`/projects/?page=1`}>
                                Проекты
                            </BreadcrumbsItem>
                        </div>
                        {this.props.location.pathname === "/projects/" ? (
                            <React.Fragment>
                                <div className="project-page__header">
                                    <h1 className="title-section">Проекты</h1>
                                    <ul className="projects-page__sections">
                                        <li className="projects-page__section-item">
                                            <div
                                                className="projects-page__date-change-item"
                                                style={
                                                    this.props.projectsStore.activeType === "0"
                                                        ? activeStyleEvent
                                                        : {}
                                                }
                                                onClick={() => this.hadleTypeClick(0)}
                                            >
                        <span className="projects-page__date-change-item__a__category">
                          Актуальные
                        </span>
                                            </div>
                                        </li>
                                        <li className="projects-page__section-item">
                                            <div
                                                className="projects-page__date-change-item"
                                                style={
                                                    this.props.projectsStore.activeType === "1"
                                                        ? activeStyleEvent
                                                        : {}
                                                }
                                                onClick={() => this.hadleTypeClick(1)}
                                            >
                        <span className="projects-page__date-change-item__a__category">
                          Реализованные
                        </span>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="project-page__header__form">
                                        <form
                                            action="#"
                                            className="section-wrapper position-relative search-popup__inner-wrapper"
                                            style={{ alignItems: "center" }}
                                        >
                                            <div className="search-popup__block mr-3">
                                                <input
                                                    className="search-popup__text-bar"
                                                    type="search"
                                                    value={searchQuery}
                                                    onChange={this.handleSearchField}
                                                />
                                            </div>

                                            <button
                                                className="btn-blue btn-blue_lighter"
                                                onClick={this.onSubmitForm}
                                                type="submit"
                                            >
                                                НАЙТИ
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </React.Fragment>
                        ) : (
                            ""
                        )}
                        <div className="header-circle">
                            <div className="header-circle__item" />
                            <div className="header-circle__item" />
                            <div className="header-circle__item" />
                            <div className="header-circle__item" />
                        </div>
                        {/* </div> */}
                        {/* </React.Fragment>
          ) : (
            ""
          )} */}
                    </div>
                    <Switch>
                        <Route path="/projects/" exact component={ProjectsPageList} />
                        <Route path="/projects/detail/:id" component={FullProject} />
                    </Switch>
                </React.Fragment>
            );
        }

        return (
            <DocumentTitle title="Образовательные проекты">
                <section className="project-page">
                    <div className="section-wrapper">{projectsLoad}</div>
                </section>
            </DocumentTitle>
        );
    }
}

export default withRouter(ProjectsPage);

PageHeader.defaultProps = {
    title: "",
    headerModifierClass: "",
    background: "#029dd2"
};

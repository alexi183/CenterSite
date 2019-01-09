import React, { Component } from "react";
import "./PresentationPage.scss";
import axios from "axios";

import PresentationList from "./PresentationList/PresentationList";

import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import queryString from "query-string";
import DocumentTitle from "react-document-title";

import Spinner from "../Spinner/Spinner";

// import BtnBlue from "../Elements/BtnBlue/BtnBlue";

@inject("presentationStore")
@observer
class PresentationPage extends Component {
    state = {
        searchQuery: ""
    };

    searchRequest = () => {
        axios
            .get("/api/v1/presentations/", {
                params: {
                    search: this.state.searchQuery
                }
            })
            .then(response => {
                console.log(response);
                this.props.presentationStore.searchResponce = response.data.items;
            })
            .catch(error => {
                console.log(error);
            });
    };

    onSubmitForm = e => {
        e.preventDefault();
        this.searchRequest();
        delete this.props.presentationStore.params["author"];
        delete this.props.presentationStore.params["category"];
        this.props.presentationStore.setSearchId(this.state.searchQuery);
        this.props.history.push({
            search: `?search=${this.state.searchQuery}&page=1`
        });
    };

    handleSearchField = e => {
        this.setState({
            searchQuery: e.target.value
        });
    };

    handleActiveCLick = () => {
        let link = queryString.parse(this.props.location.search);
        console.log(link);
        this.props.presentationStore.activeCategory = link.category;
        this.props.presentationStore.activeAuthor = link.author;
        this.props.presentationStore.activeSearch = link.search;
    };

    componentWillMount() {
        this.props.presentationStore.categoryHandler();
        this.props.presentationStore.authorHandler();
        delete this.props.presentationStore.params["search"];
        this.props.presentationStore.filterParamsFetch(
            queryString.parse(this.props.location.search)
        );
        this.props.presentationStore.params = queryString.parse(
            this.props.location.search
        );
        this.handleActiveCLick();
    }

    handleCategoryClick = item => {
        this.props.presentationStore.setCategoryId(item);
        this.props.presentationStore.authorCategoryHandler(item);
        // this.props.presentationStore.setPageNumber(1);
        delete this.props.presentationStore.params["author"];
        delete this.props.presentationStore.params["search"];
        // this.props.presentationStore.filterParamsFetch(
        //   queryString.parse(this.props.location.search)
        // );
        this.props.history.push({
            // pathname: `${this.props.link}`,
            search: `?category=${item}&page=1`
        });
    };

    handleAuthorClick = item => {
        this.props.presentationStore.setAuthorId(item);
        this.props.presentationStore.setPageNumber(1);
        this.props.history.push({
            // pathname: `${this.props.link}`,
            search: `?${this.props.presentationStore.filterURL}`
        });
    };

    componentDidUpdate(prevProps) {
        const {
            presentationStore: { setPageNumber }
        } = this.props;

        if (this.props.location.search !== prevProps.location.search) {
            if (this.props.location.pathname === "/presentations/") {
                let pageValue = queryString.parse(this.props.location.search);
                let newPage = +pageValue.page;
                setPageNumber(newPage);
                this.handleActiveCLick();
                this.props.presentationStore.filterParamsFetch(
                    queryString.parse(this.props.location.search)
                );
            }
        }
    }

    render() {
        const {
            presentationStore: {
                presentationsList,
                categoryList,
                authorsList,
                loading
            }
        } = this.props;
        const { searchQuery } = this.state;

        let presentationsLoad = null;

        if (presentationsList === null) {
            return null;
        }

        let activeStyle = { backgroundColor: "#029dd2", color: "#fff" };

        if (loading) {
            presentationsLoad = <Spinner />;
        } else {
            presentationsLoad = (
                <>
                <div className="presentation-page__header__form">
                    <form
                        action="#"
                        className="section-wrapper position-relative search-popup__inner-wrapper"
                        style={{ alignItems: "center" }}
                    >
                        <div className="search-popup__block mr-3">
                            <input
                                className="search-popup__text-bar"
                                type="search"
                                placeholder="Поиск по названию"
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
                <PresentationList />
                </>
            );
        }

        return (
            <DocumentTitle title="Презентации">
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
                                        to={`/presentations/?page=1`}
                                    >
                                        Презентации
                                    </BreadcrumbsItem>
                                </div>
                                {this.props.location.pathname === "/presentations/" ? (
                                    <div className="presentation-page__header">
                                        <h1 className="title-section">Презентации</h1>
                                        <ul className="presentation-page__sections">
                                            <li
                                                className="presentation-page__section-item"
                                                style={
                                                    this.props.presentationStore.activeCategory ===
                                                    undefined
                                                        ? // this.props.presentationStore.activeType === undefined
                                                        activeStyle
                                                        : {}
                                                }
                                            >
                                                <a
                                                    href="/presentations/?page=1"
                                                    className="presentation-page__section-item__a"
                                                    style={
                                                        this.props.presentationStore.activeCategory ===
                                                        undefined
                                                            ? // this.props.presentationStore.activeType === undefined
                                                            activeStyle
                                                            : {}
                                                    }
                                                >
                                                    Все презентации
                                                </a>
                                            </li>
                                            {categoryList &&
                                            categoryList.map(item => (
                                                <li
                                                    key={item.id}
                                                    className="presentation-page__section-item"
                                                    style={
                                                        this.props.presentationStore.activeCategory ===
                                                        `${item.id}`
                                                            ? activeStyle
                                                            : {}
                                                    }
                                                >
                                                    <div
                                                        onClick={() => this.handleCategoryClick(item.id)}
                                                        className="presentation-page__section-item__a"
                                                        style={
                                                            this.props.presentationStore.activeCategory ===
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
                                        <ul className="presentation-page__date-change">
                                            {authorsList &&
                                            authorsList.map(item => (
                                                <li
                                                    className="presentation-page__date-change-item"
                                                    style={
                                                        this.props.presentationStore.activeAuthor ===
                                                        `${item.id}`
                                                            ? activeStyle
                                                            : {}
                                                    }
                                                >
                                                    <div
                                                        onClick={() => this.handleAuthorClick(item.id)}
                                                        className="presentation-page__date-change-item__a"
                                                        style={
                                                            this.props.presentationStore.activeAuthor ===
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
                            {presentationsLoad}
                        </React.Fragment>
                    </div>
                </section>
            </DocumentTitle>
        );
    }
}

export default withRouter(PresentationPage);

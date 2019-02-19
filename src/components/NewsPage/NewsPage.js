import React, { Component } from "react";
import "./NewsPage.scss";

import { inject, observer } from "mobx-react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import queryString from "query-string";

import "moment/locale/ru";

import NewsPageList from "./NewsPageList/NewsPageList";
import FullNews from "./FullNews/FullNews";
// import PageSelectHeader from "../PageSelectHeader/PageSelectHeader";

import Spinner from "../Spinner/Spinner";
import DocumentTitle from "react-document-title";

@inject("newsStore")
@inject("SelectHeaderStore")
@observer
class NewsPage extends Component {
  handleActiveCLick = () => {
    let link = queryString.parse(this.props.location.search);
    this.props.newsStore.activeDate = link.date;
    this.props.newsStore.activeCategory = link.category;
    // console.log(this.props.newsStore.activeDate, this.props.newsStore.activeCategory)
  };

  async componentDidMount() {
    await this.props.newsStore.categoryHandler();
    await this.props.newsStore.fetchMainNews();
    // this.props.newsStore.params =  await queryString.parse(this.props.location.search);
    await this.handleActiveCLick();
    await this.props.newsStore.filterParamsFetch(
      queryString.parse(this.props.location.search)
    );
    // this.props.newsStore.params = queryString.parse(this.props.location.search);
    // await this.handleActiveCLick();
  }

  componentDidUpdate(prevProps) {
    // const {
    //   newsStore: { setPageNumber }
    // } = this.props;

    if (this.props.location.search !== prevProps.location.search) {
      if(this.props.location.pathname === '/news/') {
        // let pageValue = queryString.parse(this.props.location.search);
        // let newPage = +pageValue.page;
        // setPageNumber(newPage);
        this.handleActiveCLick();
        this.props.newsStore.filterParamsFetch(
          queryString.parse(this.props.location.search)
        );
      }
    }
  }

  render() {
    const {
      newsStore: { loading },
    } = this.props;

    let newsLoad = null;

    if (loading) {
      newsLoad = <Spinner />;
    } else {
      newsLoad = (
        <React.Fragment>
          <div className="pages-header-wrapper">
            <div className="bc-wrapper">
              <Breadcrumbs
                separator={<span style={{color: "#b2d8e5"}}> / </span>}
                finalItem={"b"}
                finalProps={{
                  style: { color: "#b2d8e5", fontWeight: "normal" }
                }}
              />
              <BreadcrumbsItem className="breadcrumbs" to="/">
                Главная страница
              </BreadcrumbsItem>
            </div>
            {/* <div className="header-circle">
              <div className="header-circle__item" />
              <div className="header-circle__item" />
              <div className="header-circle__item" />
              <div className="header-circle__item" />
            </div> */}
          </div>
          <Switch>
            <Route path="/news/" exact component={NewsPageList} />
            <Route path="/news/detail/:id" component={FullNews} />
            <Redirect to="/404" />
          </Switch>
        </React.Fragment>
      );
    }

    return (
      <DocumentTitle title="Новости">
        <section className="news-page">
          <div className="section-wrapper">{newsLoad}</div>
        </section>
      </DocumentTitle>
    );
  }
}

export default withRouter(NewsPage);

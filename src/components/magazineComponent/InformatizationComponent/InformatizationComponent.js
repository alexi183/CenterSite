import React, { Component } from "react";
import "./InformatizationComponent.scss";
import axios from "axios";
import { withRouter, Switch, Route } from "react-router-dom";
import DocumentTitle from "react-document-title";

import PageHeader from "../../PageHeader/PageHeader";
import RightSideMenu from "../RightSideMenu/RightSideMenu";
import InformatizationComponentContent_about from "./InformatizationComponentContent-about";
import InformatizationComponentContent_random from "./InformatizationComponentContent-random";


class InformatizationComponent extends Component {
  state = {
    menuItems: null
  };

  componentWillMount() {
    axios
      .get("/api/v1/pages/informatizatsiia-obrazovaniia-i-nauki")
      .then(response => {
        console.log(response.data.childs);
        this.setState({
          menuItems: response.data.childs
        });
      });
  }

  render() {
    const pageHeader = {
      breadCrumbs: true,
      title: "Информатизация образования и науки",
      background: "#ecedef",
      headerModifierClass: "gray-theme"
    };

    if (this.state.menuItems === null) {
      return null;
    }

    console.log(this.props.location);

    return (
      <DocumentTitle title="Информатизация образования и науки">
      <section className="section-wrapper">
        <PageHeader {...pageHeader} />
        <div className="informatization-page">
          <Switch>
            <Route
              path="/content/informatizatsiia-obrazovaniia-i-nauki/o-zhurnale"
              exact
              component={InformatizationComponentContent_about}
            />
            <Route
              path="/content/informatizatsiia-obrazovaniia-i-nauki/:id"
              component={InformatizationComponentContent_random}
            />
          </Switch>
          <RightSideMenu menuItems={this.state.menuItems} />
        </div>
      </section>
      </DocumentTitle>
    );
  }
}

export default withRouter(InformatizationComponent);

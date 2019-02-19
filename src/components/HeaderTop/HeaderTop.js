import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { Link, Redirect } from "react-router-dom";
import SearchPopup from "../SearchPopup/SearchPopup";
import FullScreenMenu from "../FullScreenMenu/FullScreenMenu";
import logo from "../../img/logo5.png";
import timer from "../../img/timer-icon.png";
/*import eye from '../../img/eye.png'*/
import "./HeaderTop.scss";
import { withRouter } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";

@withRouter
@inject("headerStore", "naviStore")
@observer
class HeaderTop extends Component {
  state = {
    searchVisible: true,
    isOpen: false,
    menuKey: undefined
  };

  componentDidMount() {
    this.props.naviStore.getMenu();
    this.props.headerStore.fetchBroadcast();
    // if (this.props.location.pathname.includes('/search')) {
    //     this.setState({searchVisible: false})
    // }
  }

  // componentWillReceiveProps(prevProps) {
  //     console.log(this.props.location.pathname, prevProps.location.pathname)
  //     if(this.props.location.pathname !== prevProps.location.pathname) {
  //         this.setState({isOpen: true})
  //     }
  // }
  handleClick = (b, link) => {
    this.props.naviStore.getUrl(link);
    this.renderRedirect(b);
    this.setState({ isOpen: false });
  };

  showMenu = i => {
    this.setState({ isOpen: true, menuKey: i });
  };
  hideMenu = () => {
    this.setState({ isOpen: false, menuKey: undefined });
  };

  render() {
    let path = this.props.history.location.pathname;

    const {
      headerStore: { onSearchPopupToggle, activeBroadcast },
      naviStore: {
        fullScreenMenuToggle,
        // getUrl,
        menu
      }
    } = this.props;

    this.renderRedirect = a => {
      if (a === "/content/struktura-i-organy-upravleniia") {
        return (
          <Redirect to="/content/struktura-i-organy-upravleniia/rukovodstvo" />
        );
      }
    };

    /* this.renderRedirect = (a) => {
            if (a === '/content/struktura-i-organy-upravleniia') {
                return <Redirect to='/content/page-develop' />
            }
        }*/

    // this.handleClick = (b, link) => {
    //     this.setState({isOpen: false})
    //     getUrl(link);
    //     this.renderRedirect(b)
    // };
    return (
      <Fragment>
        {<SearchPopup />}
        {<FullScreenMenu />}

        <div className="header-top">
          <div className="header-top__item">
            <div className="header-container">
              <div to="/" className="header-top__logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>

                <div className="header-top__slogan">
                  <a
                    href="https://edu.gov.ru/"
                    className="header-top__ministry"
                  >
                    Министерство просвещения российской федерации
                  </a>
                  <Link to="/" className="no-underline">
                    <span className="header-top__slogan_small">
                      Федеральное государственное автономное образовательное
                      учреждение дополнительного профессионального образования
                    </span>
                    <span className="header-top__slogan_big">
                      Центр реализации государственной образовательной политики
                      и информационных технологий
                    </span>
                  </Link>
                </div>
              </div>

              <div className="user-bar">
                {/* <div className="user-bar__item">
                                    <img src={eye} alt="eye"/>
                                </div>*/}
                {
                  // this.state.searchVisible &&
                  <div
                    className="user-bar__item user-bar__item_search"
                    onClick={onSearchPopupToggle}
                  />
                }

                <div
                  className="user-bar__item user-bar__item_hamburger"
                  onClick={fullScreenMenuToggle}
                >
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
          {this.props.naviStore.loading ? (
            <div className="header-container" style={{ height: "43px" }} />
          ) : (
            <div className="header-container">
              <nav className="menu">
                <ul className="menu-list">
                  {menu.map((item, i) => (
                    <li
                      className={"menu-item"}
                      key={i}
                      onMouseLeave={this.hideMenu}
                      onTouchStart={() => this.showMenu(i)}
                      onMouseEnter={() => this.showMenu(i)}
                    >
                      <span className="menu-link">{item.title}</span>
                      {this.state.menuKey === i
                        ? this.state.isOpen &&
                          item.childs.length !== 0 && (
                            <ul
                              className="menu-list__drop"
                              style={{ display: "block" }}
                            >
                              {item.childs.map((item2, i) => (
                                <li key={i}>
                                  {item2.slug !== "proekty" ? (
                                    item2.slug === "telefonnyi-spravochnik" ? (
                                      <Link
                                        to={`/content/${
                                          item2.slug
                                        }/?employee=&department=1`}
                                        onClick={() =>
                                          this.handleClick(path, item2.slug)
                                        }
                                      >
                                        {item2.title}
                                      </Link>
                                    ) : (
                                        <Link
                                          to={`/content/${item2.slug}`}
                                          onClick={() =>
                                            this.handleClick(path, item2.slug)
                                          }
                                        >
                                          {item2.title}
                                        </Link>
                                      ) &&
                                      item2.slug ===
                                        "informatizatsiia-obrazovaniia-i-nauki" ? (
                                      <Link
                                        to={`/content/${item2.slug}/o-zhurnale`}
                                        onClick={() =>
                                          this.handleClick(path, item2.slug)
                                        }
                                      >
                                        {item2.title}
                                      </Link>
                                    ) : (
                                      <Link
                                        to={`/content/${item2.slug}`}
                                        onClick={() =>
                                          this.handleClick(path, item2.slug)
                                        }
                                      >
                                        {item2.title}
                                      </Link>
                                    )
                                  ) : (
                                    <Link
                                      to={`/projects/?page=1&type=0`}
                                      onClick={() =>
                                        this.handleClick(path, item2.slug)
                                      }
                                    >
                                      {item2.title}
                                    </Link>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )
                        : null}
                    </li>
                  ))}
                  {activeBroadcast !== null ? (
                    <li className="menu-item live-item">
                      <span className="menu-link live-link">
                        Онлайн трансляция
                      </span>
                      <ul className="menu-list__drop live-drop">
                        <li>
                          <Link to={`/content/broadcast`}>
                            <span>{`"${activeBroadcast.title}"`}</span>
                            <br />
                            <img
                              src={timer}
                              alt="timer"
                              className="Schedule__main__time__icon live-timer"
                            />
                            <span>{`${moment(activeBroadcast.date_start).format(
                              "D.MM.YYYY HH:mm"
                            )}`}</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  ) : null}
                </ul>
              </nav>
            </div>
          )}
          {this.renderRedirect(path)}
        </div>

        {/* <Switch>
                   <Route path='/content/page-develop' component={DevelopPage} />
                </Switch>*/}
      </Fragment>
    );
  }
}

export default withRouter(HeaderTop);

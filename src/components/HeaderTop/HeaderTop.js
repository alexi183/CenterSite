import React, {Component, Fragment} from 'react'
import {inject, observer} from "mobx-react"
import { Link, Redirect} from 'react-router-dom'
import SearchPopup from "../SearchPopup/SearchPopup"
import FullScreenMenu from "../FullScreenMenu/FullScreenMenu";
import logo from '../../img/logo5.png'
import './HeaderTop.scss'
import {withRouter} from "react-router-dom";

@withRouter
@inject('headerStore', 'naviStore')
@observer
class HeaderTop extends Component {
    state = {
        searchVisible: true,
    }

    componentDidMount() {
        this.props.naviStore.getMenu()
    }

    render() {

        let path = this.props.history.location.pathname;

        const {
            headerStore: {
                onSearchPopupToggle
            },
            naviStore: {
                fullScreenMenuToggle,
                getUrl,
                menu
            }
        } = this.props;

        this.renderRedirect = (a) => {
            if (a === '/content/struktura-i-organy-upravleniia') {
                return <Redirect to='/content/struktura-i-organy-upravleniia/rukovodstvo' />
            }
        }

        this.handleClick = (b, link) => {
            getUrl(link);
            this.renderRedirect(b)
        };

        return (
            <Fragment>
                {
                    <SearchPopup/>
                }
                {
                    <FullScreenMenu/>
                }

                <div className="header-top">
                    <div className="header-top__item">
                        <div className="header-container">
                            <Link to="/" className="header-top__logo">
                                <img src={logo} alt="logo"/>

                                <div className="header-top__slogan">
                                <span className="header-top__ministry">
                                        Министерство просвещения российской федерации
                                    </span>
                                    <span className="header-top__slogan_small">
                                    Федеральное государственное автономное образовательное учреждение дополнительного профессионального образования
                                </span>
                                    Центр реализации государственной образовательной политики и информационных технологий
                                </div>
                            </Link>

                            <div className="user-bar">
                                {
                                    <div className="user-bar__item user-bar__item_search" onClick={onSearchPopupToggle}>
                                    </div>
                                }

                                <div className="user-bar__item user-bar__item_hamburger"
                                     onClick={fullScreenMenuToggle}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        (this.props.naviStore.loading) ?
                            <div className="header-container" style={{height: '43px'}}>

                            </div> :
                            <div className="header-container">
                                <nav className="menu">
                                    <ul className="menu-list">
                                        {
                                            menu.map((item, i) =>
                                                <li className={'menu-item'} key={i}>
                                                    <span className="menu-link">{item.title}</span>
                                                    {
                                                        (item.childs.length !== 0) &&
                                                        <ul className="menu-list__drop">
                                                            {
                                                                item.childs.map((item2, i) =>
                                                                    <li key={i}>
                                                                        {
                                                                            (item2.slug !== 'proekty') ?
                                                                                (item2.slug === 'informatizatsiia-obrazovaniia-i-nauki') ?
                                                                                    <Link to="/content/informatizatsiia-obrazovaniia-i-nauki/o-zhurnale">{item2.title}</Link>
                                                                                    :<Link to={`/content/${item2.slug}`} onClick={()=>this.handleClick(path, item2.slug)}>
                                                                                        {item2.title}
                                                                                    </Link>
                                                                                :
                                                                                <Link to={`/projects/?page=1&type=0`} onClick={()=>this.handleClick(path, item2.slug)}>
                                                                                    {item2.title}
                                                                                </Link>
                                                                        }
                                                                    </li>
                                                                )
                                                            }
                                                        </ul>
                                                    }
                                                </li>
                                            )
                                        }
                                    </ul>
                                </nav>
                            </div>
                    }
                    {this.renderRedirect(path)}
                </div>
            </Fragment>
        )
    }
}

export default withRouter(HeaderTop)

import './PageTitleNavBlock.scss'
import React, {Component} from 'react'
import {NavLink, Link, withRouter} from 'react-router-dom'
import { inject, observer } from "mobx-react";

import white from '../../img/circles_white.png'
import yellow from '../../img/circles_yellow.png'
import blue from '../../img/circles_blue.png'

@inject("naviStore")
@observer
class PageTitleNavBlock extends Component {
    // componentDidMount() {
    //     this.props.naviStore.indexSlug();
    // }

    render() {
        const {
            activePath,
            data: {
                backgroundColor, bgImage, breadCrumbs, fontColor, title, linksRow,
            }
        } = this.props

        let bgImgUrl = ''

        switch (bgImage) {
            case 'white':
                bgImgUrl =  white
                break
            case 'yellow':
                bgImgUrl =  yellow
                break
            case 'blue':
                bgImgUrl =  blue
                break
            default:
                break
        }

        console.log(this.props.location.search)

        return (
            <div
                className='page-title-navblock'
                style={{
                    backgroundColor: backgroundColor,
                    // backgroundImage: `url("${bgImgUrl}")`,
                    color: fontColor,
                }}
            >
            <div className="header-container__backgroundImage" style={{top: '-60%', left: '0'}}/>
                {
                    breadCrumbs &&
                    <div className='page-title-navblock__breadcrumbs-row'>
                        {
                            breadCrumbs.map((el, i) => {
                                if (i < breadCrumbs.length - 1) {
                                    return (
                                        <span className='' key={i}>
                                                <NavLink to={el.link}>
                                                    {el.title}
                                                </NavLink>
                                                <span className='page-title-navblock__delimiter'>/</span>
                                            </span>
                                    )
                                }
                                return (
                                    <span key={i}>
                                        {el.title}
                                    </span>
                                )
                            })
                        }
                    </div>
                }
                <h1 className='page-title-navblock__title'>
                    {title}
                </h1>
                {
                    this.props.naviStore.menu && this.props.naviStore.menu[3] && (this.props.location.pathname !== "/content/dokumenty") ?
                    <div className='page-title-navblock__links-row'>
                        {
                            this.props.naviStore.menu[3].childs.map((item2, i) => {
                                return (
                                    <span key={i} className='page-title-navblock__links-item'>
                                        {(item2.slug === "telefonnyi-spravochnik") ? 
                                            <Link to={`/content/${
                                                item2.slug
                                              }/?employee=&department=1`} className={`${this.props.location.search !== "?employee=&department=1" ? '':'active'}`}>
                                                {item2.title}
                                            </Link>
                                        :
                                            <NavLink to={`/content/${item2.slug}`} activeClassName={`${(activePath !== undefined) ? 'active-link':'active'}`}>
                                                {item2.title}
                                            </NavLink>
                                        }
                                    </span>
                                )
                            })
                        }
                    </div> : null
                }
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(PageTitleNavBlock);

PageTitleNavBlock.defaultProps = {
    data: {
        backgroundColor: '#005a80',
        fontColor: '#fff',
        bgImage: 'yellow', //white, yellow, blue
        title: '',
        breadCrumbs: [], // array of objects {title: '', link: '/'},
        linksRow: [] // array of objects {title: 'Форма обратной связи', link: '/content/forma-obratnoi-sviazi'},
    }
}
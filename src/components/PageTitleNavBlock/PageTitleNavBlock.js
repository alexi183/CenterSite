import './PageTitleNavBlock.scss'
import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import white from '../../img/circles_white.png'
import yellow from '../../img/circles_yellow.png'
import blue from '../../img/circles_blue.png'


class PageTitleNavBlock extends Component {

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

        return (
            <div
                className='page-title-navblock'
                style={{
                    backgroundColor: backgroundColor,
                    backgroundImage: `url("${bgImgUrl}")`,
                    color: fontColor,
                }}
            >
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
                    linksRow &&
                    <div className='page-title-navblock__links-row'>
                        {
                            linksRow.map((el, i) => {
                                return (
                                    <span key={i} className='page-title-navblock__links-item'>
                                        {
                                            <NavLink to={el.link} activeClassName={`${(activePath !== undefined) ? 'active-link':'active'}`}>
                                                {el.title}
                                            </NavLink>
                                        }
                                    </span>
                                )
                            })
                        }
                    </div>
                }
                {this.props.children}
            </div>
        )
    }
}

export default PageTitleNavBlock

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
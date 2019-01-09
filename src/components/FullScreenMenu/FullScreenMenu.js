import React, {Component, Fragment} from 'react'
import {inject, observer} from "mobx-react"
import './FullScreenMenu.scss'
import naviStore from '../../stores/naviStore' // eslint-disable-line no-unused-vars
import SubMenu from "../SubMenu/SubMenu"
import getScrollbarWidth from '../../helpers/scroll-width'

@inject('naviStore')
@observer
class FullScreenMenu extends Component {

    render() {
        const {fullScreenMenuIsOpen, fullScreenMenuToggle} = this.props.naviStore

        if (this.props.naviStore.fullScreenMenuIsOpen !== true) {
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = null
        } else {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${getScrollbarWidth()}px`
        }

        return (
            <Fragment>
                <div className={`fullscreen-menu-back ${fullScreenMenuIsOpen ? 'fullscreen-menu-active' : ''}`}>
                    <div className="header-container">
                        <div className='fullscreen-menu'>
                            <SubMenu/>
                        </div>
                        <div className="fullscreen-menu__close" onClick={fullScreenMenuToggle}>
                    </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default FullScreenMenu
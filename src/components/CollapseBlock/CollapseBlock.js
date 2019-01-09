import React, {Component} from 'react'
import './CollapseBlock.scss'
import seagull from '../../img/seagull.png'

export default class CollapseBlock extends Component {
    state = {
        collapsed: true
    }

    handleCollapse = () =>
        this.setState((prevState) => {
                return {
                    collapsed: !prevState.collapsed
                }
            }
        )

    render() {
        const {title} = this.props
        const {collapsed} = this.state
        return (
            <div className='collapse-block'>
                <div className="collapse-block__top-row" onClick={this.handleCollapse}>
                    <span className='collapse-block__title'>
                        {title}
                    </span>
                    <img
                        className={`collapse-block__arrow ${!collapsed ? 'expanded': ''}`}
                        src={seagull} alt="arrow"/>
                </div>
                {
                    !collapsed &&
                    <div className="collapse-block__content">
                        {this.props.children}
                    </div>
                }
            </div>
        )
    }
}

CollapseBlock.defaultProps = {
    title: 'Заголовок'
}
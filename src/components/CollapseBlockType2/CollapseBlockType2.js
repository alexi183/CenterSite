import React, {Component} from 'react'
import './CollapseBlockType2.scss'
import seagull from '../../img/seagull.png'


export default class CollapseBlockType2 extends Component {
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

    componentDidMount() {
        if (this.props.title === 'Общая информация') {
            this.setState({
                collapsed: false
            })
        }
        if (this.props.title === 'Документы') {
            this.setState({
                collapsed: false
            })
        }
    }

    render() {
        const {title} = this.props
        const {collapsed} = this.state

        return (
            <div className='collapse-block2'>
                <div className={`collapse-block2__top-row`}
                     onClick={this.handleCollapse}>
                    <img
                        className={`collapse-block2__arrow ${!collapsed ? 'expanded' : ''}`}
                        src={seagull} alt="arrow"/>
                    <span className='collapse-block2__title'>
                        {title}
                    </span>
                </div>
                {
                    !collapsed &&
                    <div className="collapse-block2__content">
                        {this.props.children}
                    </div>
                }
            </div>
        )
    }
}

CollapseBlockType2.defaultProps = {
    title: 'Заголовок'
}
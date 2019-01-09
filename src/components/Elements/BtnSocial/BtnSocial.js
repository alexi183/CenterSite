import React, {Component} from 'react'
import './BtnSocial.scss'

class BtnSocial extends Component{
    render() {
        const {
            className,
            color,
            img_link
        } = this.props
        return (
            <div className={`soc-btn ${className}`} style={{background: `${color}`}}>
                <div className='soc-btn__content'>
                    <img src={img_link} alt=''/>
                </div>
            </div>
        )
    }
}

export default BtnSocial

BtnSocial.defaultProps = {
    className: '',
    color: '#ccc',
    img_link: ''
}
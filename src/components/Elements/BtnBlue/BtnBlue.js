import React from 'react'
import './BtnBlue.scss'
// import ArrRightWhite from '../../../img/arr-right-white-sm.png'
import { Link } from 'react-router-dom'

const BtnBlue = (link, content = ``, color = ``, className= ``, img_link, margin_right, btn_mr) => {
    if (link) {
        return (
            <Link className={`btn-blue ${className}`} to={link} style={{background: `${color}`,marginRight:`${btn_mr}px`}}>
                <div className='btn-blue__content'>
                    <img style={{marginRight:`${margin_right}px`}} src={img_link} alt=''/>
                    {content}
                    {/*<img className='ml-3 btn-blue__arr' src={ArrRightWhite} alt="more"/>*/}
                </div>
            </Link>
        )
    }
    return (

        <div className='btn-blue'>
            <div className='btn-blue__content'>
                {content}
            </div>
        </div>
    )
};

export default BtnBlue


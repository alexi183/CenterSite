import React, {Component} from 'react'
import './Footer.scss'
import SubMenu from '../../components/SubMenu/SubMenu'
import footerlogo from '../../img/footer-logo2.png'
import fb from '../../img/fb.png'
import vk from '../../img/vk.png'

class Footer extends Component {
    render() {
        return (
            <div className="footer-wrapper">
                <div className="footer-left-col">
                    <a href="/" className="footer-logo">
                        <img src={footerlogo} alt=""/>
                        <div>
                            <p className="copyright-top">Министерство просвещения РФ</p>
                            <p>Центр реализации государственной образовательной политики и информационной технологий</p>
                        </div>
                    </a>
                    <p className="copyright">© Copyright 2018</p>
                </div>

                <SubMenu />

                <div className="footer-right-col">
                    <a href="#">подпишись на  новости</a>
                    <a href="#">подпишись на  события</a>
                    <div className="footer-social">
                        <a href="#">
                            <img src={fb} alt=""/>
                        </a>
                        <a href="#">
                            <img src={vk} alt=""/>
                        </a>
                    </div>
                </div>

            </div>
        )
    }
}

export default Footer
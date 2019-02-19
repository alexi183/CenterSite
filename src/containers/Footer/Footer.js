import React, {Component} from 'react'
import './Footer.scss'
import SubMenu from '../../components/SubMenu/SubMenu'
import footerlogo from '../../img/footer-logo2.png'
import fb from '../../img/fb.png'
import vk from '../../img/vk.png'

import moment from "moment";
import "moment/locale/ru";

class Footer extends Component {
    render() {
        return (
            <div className="footer-wrapper">
                <div className="footer-left-col">
                    <div className="footer-logo">
                        <img src={footerlogo} alt=""/>
                        <div>
                        <a href="https://edu.gov.ru/" className="copyright-top">Минпросвещения России</a>
                        <a href="/" className="footer-logo__slogan_small">Центр реализации государственной образовательной политики и информационных технологий</a>
                        </div>
                        {/* <p>Центр реализации государственной образовательной политики и информационной технологий</p> */}
                    </div>
                    {/* <p className="copyright-top">Министерство просвещения РФ</p> */}
                    <p className="copyright">© Copyright {moment().format('YYYY')}</p>
                </div>

                <SubMenu />

                <div className="footer-right-col">
                    {/*eslint-disable*/}
                    <a href="#">подпишись на  новости</a>
                    <a href="#">подпишись на  события</a>
                    {/* <div className="footer-social">
                        <a href="#">
                            <img src={fb} alt=""/>
                        </a>
                        <a href="#">
                            <img src={vk} alt=""/>
                        </a>
                    </div> */}
                    {/*eslint-enable*/}
                </div>

            </div>
        )
    }
}

export default Footer
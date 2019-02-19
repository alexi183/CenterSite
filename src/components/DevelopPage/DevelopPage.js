import React, {Component} from 'react'
import './DevelopPage.scss'
import BtnBlue from "../Elements/BtnBlue/BtnBlue";

export default class DevelopPage extends Component {
    render() {

        return (
            <section className='develop-page'>

              <div className='no-match__inner-wrapper pb-4'>
                    <p className='no-match__error' style={{textTransform: "Uppercase", marginBottom: "170px"}}>
                        страница в разработке
                    </p>
                    {BtnBlue('/', 'ПЕРЕЙТИ НА ГЛАВНУЮ СТРАНИЦУ')}
                </div>
            </section>
        )
    }
}
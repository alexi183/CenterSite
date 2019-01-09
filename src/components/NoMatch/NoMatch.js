import React, {Component} from 'react'
import './NoMatch.scss'
import BtnBlue from "../Elements/BtnBlue/BtnBlue";

export default class NoMatch extends Component {
    render() {
        console.log(
            '404!!!!! ',
        );
        return (
            <section className='no-match'>
                <div className='no-match__inner-wrapper pb-4'>
                    <p className='no-match__error'>
                        ОШИБКА
                    </p>
                    <p className='no-match__code'>
                        404
                    </p>
                    <p className='no-match__description'>
                        СТРАНИЦА НЕ НАЙДЕНА
                    </p>
                    <p className='no-match__description-2'>
                        ВОЗМОЖНО, ВВЕДЕН НЕКОРРЕКТНЫЙ АДРЕС ИЛИ СТРАНИЦА БЫЛА УДАЛЕНА
                    </p>
                    {BtnBlue('/', 'ПЕРЕЙТИ НА ГЛАВНУЮ СТРАНИЦУ')}
                </div>
            </section>
        )
    }
}
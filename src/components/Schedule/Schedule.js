import React from 'react';
import './Schedule.scss';

import timer from '../../img/timer-icon.png'

const Schedule = () => {
    return (
        <div className="Schedule">
            <div className="Schedule__header">
                <div>22/10/2018</div>
                <div>понедельник</div>
            </div>
            <div className="Schedule__main">
                <div className="Schedule__main__type">
                    <div className="Schedule__main__time">
                        <img src={timer} alt="timer" className="Schedule__main__time__icon" />09:30-17:00
                    </div>
                    <div className="Schedule__main__kind">УРОК</div>
                    <div className="Schedule__main__group">1 подгруппа</div>
                    <div className="Schedule__main__groups">1, 2, 3, 4 группы</div>
                </div>
            </div>
        </div>
    )
}

export default Schedule;
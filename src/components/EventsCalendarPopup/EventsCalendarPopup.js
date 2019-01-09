import './EventsCalendarPopup.scss'
import React, {Component, Fragment} from 'react'
import {inject, observer} from "mobx-react";
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import {Scrollbars} from 'react-custom-scrollbars'
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru'
import { Link } from 'react-router-dom';
import cross from '../../img/cross.png'
import Truncate from "react-truncate";
import moment from "moment";

@inject('eventsStore')
@observer
class EventsCalendarPopup extends Component {

    componentDidMount() {
        this.props.eventsStore.getCalendarEvents()
        console.log(this.props.eventsStore.parsedChangeMonth)
        console.log(this.props.eventsStore.parsedChangeYear)
    }

    componentWillReceiveProps() {
        this.props.eventsStore.getCalendarEvents(
            this.props.eventsStore.parsedChangeMonth,
            this.props.eventsStore.parsedChangeYear
        )
    }

    render() {
        const {
            onToggleEventsCalendar,
            onDatePickerDateSelected,
            datepickerDateSelected,
            datepickerEventDatesArray,
            calendarEvents,
            onDatePickerMonth,
            currentMonth,
            parsedChangeMonth,

        } = this.props.eventsStore

        console.log(parsedChangeMonth);


        let dates = this.props.dates.map((item) =>
            new Date(item.year, item.month, item.day),
        )

        dates.push(datepickerDateSelected)

        let dateStart = calendarEvents.map((el, i) =>
            <Fragment key={i}>
                <div>{moment(el.date_start).format('MM YYYY')}</div>
            </Fragment>
        )

        let dateEnd = calendarEvents.map((el, i) =>
            <Fragment key={i}>
                <div>{moment(el.date_end).format('MM YYYY')}</div>
            </Fragment>
        )

        let eventDates = dateStart.concat(dateEnd)
        let currentparseMonth = moment(currentMonth).format('MM YYYY')

        return (
            <Fragment>
                <div
                    className="events-popup-cover"
                    onClick={onToggleEventsCalendar}
                >&zwnj;</div>
                <div className='events-popup'>
                    <div>
                        {typeof currentparseMonth}
                    </div>
                    <img
                        src={cross}
                        onClick={onToggleEventsCalendar}
                        className="events-popup__close"
                        alt='close'/>
                    <div className="row">
                        <div className="col-5">
                            <DayPicker
                                locale={'ru'}
                                localeUtils={MomentLocaleUtils}
                                onDayClick={day => onDatePickerDateSelected(day)}
                                onMonthChange={date => onDatePickerMonth(date)}
                                selectedDays={dates}
                                modifiers={datepickerEventDatesArray}
                            />
                        </div>

                        <div className="col-7 customscroll-wrapper">
                            <Scrollbars
                                style={{height: 400}}>
                                <div className="events-popup__news-wrapper">
                                    <Fragment>
                                        {(currentparseMonth === eventDates[3]) ?
                                            console.log('1') : ''
                                        }
                                    </Fragment>
                                    {
                                        calendarEvents &&
                                        calendarEvents.map((el, i) =>
                                            <Link key={i} to={`/events/event/${el.id}`} className='events-popup__news-item'>
                                                <h4 className='events-popup__news-title'>
                                                    <Truncate lines={2}>
                                                        {el.title}
                                                    </Truncate>
                                                </h4>

                                                <p className='events-popup__news-descr'>
                                                    <Truncate lines={2}>
                                                        {el.title}
                                                    </Truncate>
                                                </p>
                                            </Link>
                                        )
                                    }
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default EventsCalendarPopup

EventsCalendarPopup.defaultProps = {
    dates: [
        {
            year: 2018,
            month: 11,
            day: 2
        },
        {
            year: 2018,
            month: 11,
            day: 4
        },
        {
            year: 2018,
            month: 10,
            day: 5
        },
        {
            year: 2018,
            month: 10,
            day: 2
        },
        {
            year: 2018,
            month: 10,
            day: 4
        },
        {
            year: 2018,
            month: 10,
            day: 5
        }
    ]
};
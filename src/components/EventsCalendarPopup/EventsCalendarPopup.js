import './EventsCalendarPopup.scss'
import React, {Component, Fragment} from 'react'
import {inject, observer} from "mobx-react";
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import {Scrollbars} from 'react-custom-scrollbars'
import Spinner from "../../components/Spinner/Spinner";
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
        this.props.eventsStore.getCalendarEvents(
            this.props.eventsStore.constParsedMonth,
            this.props.eventsStore.constParsedYear
        )

        this.props.eventsStore.getDisabledData(
            this.props.eventsStore.constParsedMonth,
            this.props.eventsStore.constParsedYear
        )

        this.props.eventsStore.onDatePickerDateSelected(
            this.props.eventsStore.constParsedMonth,
            this.props.eventsStore.constParsedYear
        )
    }

    render() {

        const {
            onToggleEventsCalendar,
            onDatePickerDateSelected,
            datepickerDateSelected,
            datepickerEventDatesArray,
            calendarEvent,
            calendarEvents,
            getCalendarEvents,
            getCalendarEvent,
            onDatePickerMonth,
            currentMonth,
            monthClick,
            dayClick,
            calendarDates,
            getDisabledDataChange,
            onCaptionClicked,
            loading

        } = this.props.eventsStore

        let dates = calendarDates.map((item) => new Date(item[0], item[1]-1, item[2]))

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

        this.monthClick = (date) => {
            onDatePickerMonth(date)
            getDisabledDataChange()
        }

        let loadingCalendar = null;
        let loadingEvents = null;

        if (loading) {
            (loadingCalendar = <Spinner />)
            &&
            (loadingEvents  = <Spinner />)

        } else {
            (loadingCalendar = <DayPicker
                locale={'ru'}
                localeUtils={MomentLocaleUtils}
                onDayClick={
                    day => onDatePickerDateSelected(day)
                }
                onCaptionClick={
                    day => onDatePickerMonth(day)
                }
                onMonthChange={
                    this.monthClick
                }
                disabledDays={
                    dates
                }
                selectedDays={datepickerDateSelected}
                modifiers={datepickerEventDatesArray}
            />)
            &&
            (loadingEvents =  <Scrollbars
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
                            <Link key={i}
                                  to={`/events/event/${el.id}`}
                                  className='events-popup__news-item'
                                  onClick={onToggleEventsCalendar}
                            >
                                <h4 className='events-popup__news-title'>
                                    <Truncate lines={2}>
                                        {el.title}
                                    </Truncate>
                                </h4>

                                <p className='events-popup__news-descr'>
                                    <Truncate lines={2}>
                                        {el.preview}
                                    </Truncate>
                                </p>
                            </Link>
                        )
                    }
                </div>
            </Scrollbars>)
        }

        return (
            <Fragment>
                <div
                    className="events-popup-cover"
                    onClick={onToggleEventsCalendar}
                >&zwnj;</div>
                <div className='events-popup'>
                    {/*<div>
                        {eventDates}
                    </div>*/}
                    <img
                        src={cross}
                        onClick={onToggleEventsCalendar}
                        className="events-popup__close"
                        alt='close'/>
                    <div className="row">
                        <div className="col-5">
                            {loadingCalendar}
                        </div>

                        <div className="col-7 customscroll-wrapper">
                            {loadingEvents}
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
        [
            2018,
            12,
            2
        ],
        [
            2018,
            12,
            4
        ],
        [
            2018,
            10,
            5
        ],
        [
            2018,
            11,
            4
        ],
        [
            2018,
            11,
            26
        ],
        [
            2018,
            11,
            15
        ],
        [
            2018,
            11,
            14
        ],[
            2018,
            11,
            17
        ],

        [
            2018,
            11,
            20
        ],
        [
            2018,
            10,
            4
        ],
        [
            2018,
            10,
            17
        ],
    ],
};
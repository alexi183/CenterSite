import React, {Component} from 'react'
import './Events.scss'

// import DatesSlider from "../../components/DatesSlider/DatesSlider"
import EventsNewsBlock from "../../components/EventsNewsBlock/EventsNewsBlock"
import {inject, observer} from "mobx-react"
import EventsCalendarPopup from "../../components/EventsCalendarPopup/EventsCalendarPopup"
import {CalendarIcon} from "../../components/Elements/Icons/Icons"
import BtnBlue from "../../components/Elements/BtnBlue/BtnBlue";
import Spinner from '../../components/Spinner/Spinner'

@inject('eventsStore')
@observer
class Events extends Component {
    componentWillMount() {
        this.props.eventsStore.fetchMainEvent();
        this.props.eventsStore.loadIndexEvents()
    }

    render() {
        const {onToggleEventsCalendar, eventCalendarIsOpened, loading} = this.props.eventsStore

        if (loading) {
            return <div style={{display: 'flex', alignItems: 'center', height: '989px'}}><Spinner /></div>
          }


        return (
            <section className='events'>
                <div className="section-wrapper position-relative">
                    {
                        eventCalendarIsOpened && <EventsCalendarPopup/>
                    }
                    <div className="row mb-5 align-items-center">
                        <div className="col d-flex">
                            <h2 className='title-section mr-5'>
                                СОБЫТИЯ
                            </h2>
                            <div
                                className="events__calendar-wrapper "
                                onClick={onToggleEventsCalendar}
                            >
                                {CalendarIcon(`#eb5155`)}
                                <span
                                    className='d-inline-block align-middle events__calendar-aside-caption'>КАЛЕНДАРЬ СОБЫТИЙ</span>
                            </div>
                        </div>
                        <div className="col text-right">
                            {BtnBlue('/events/?page=1', 'Все события')}
                        </div>
                    </div>
                    {/*<DatesSlider/>*/}
                    <EventsNewsBlock/>
                </div>
            </section>
        )
    }
}

export default Events


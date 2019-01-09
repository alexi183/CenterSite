import React, {Component} from 'react'
import './Events.scss'
import EventsNewsBlock from "../../components/EventsNewsBlock/EventsNewsBlock"
import {inject, observer} from "mobx-react"
import EventsCalendarPopup from "../../components/EventsCalendarPopup/EventsCalendarPopup"
import BtnBlue from "../../components/Elements/BtnBlue/BtnBlue";

@inject('eventsStore')
@observer
class Events extends Component {

    render() {
        const {eventCalendarIsOpened} = this.props.eventsStore
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
                        </div>
                        <div className="col text-right">
                            {BtnBlue('/events/?page=1', 'Все события')}
                        </div>
                    </div>
                    <EventsNewsBlock/>
                </div>
            </section>
        )
    }
}

export default Events


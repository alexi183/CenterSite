import React, {Component, Fragment} from 'react'
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';
import {ArrowType3} from "../Elements/Icons/Icons"
import {Scrollbars} from 'react-custom-scrollbars'
import Spinner from '../../components/Spinner/Spinner'
import './EducateEvents.scss';
import BtnBlue from "../Elements/BtnBlue/BtnBlue";
import Truncate from "react-truncate";
import edu1 from "../../img/edu-calendar.png";
import dataImg1 from "../../img/dataImg1.jpg";
import dataImg2 from "../../img/dataImg2.png";
import dataImg3 from "../../img/dataImg3.jpg";
import dataImg4 from "../../img/dataImg4.jpg";
import dataImg5 from "../../img/dataImg5.jpg";
import dataImg6 from "../../img/dataImg6.jpg";
import dataImg7 from "../../img/dataImg7.jpg";
import dataImg8 from "../../img/dataImg8.jpg";
import dataImgNo from "../../img/dataImgNo.jpg";
import moment from "moment";
import "moment/locale/ru";

@inject('eventsStore',
    'educateEventsStore')
@observer

class EducateEvents extends Component {

    componentDidMount() {
        this.props.eventsStore.getDate()
        this.props.educateEventsStore.getEduEvents(
            this.props.eventsStore.monthNumber
        )
        this.props.educateEventsStore.month()

    }

    state = {
        month: 8,
    };

    render() {
        const {
            EduEvents,
            parsedMainMonth,
            monthNumber,
            monthInc,
            monthDec,
            parsedMonthString,
            loading
        } = this.props.educateEventsStore

        /*      let filtered = EduEvents.filter(item => item.month === monthNumber).sort((a,b) => (a.day) - (b.day))*/

        let date = EduEvents.map(item => item);

        console.log('date', date)

        let loadingEvents = null;

        if (loading) {
            loadingEvents = <Spinner />
        } else {
            loadingEvents = (
                <div className="edu-events__slider-content">
                    {
                        EduEvents[0] ?
                            EduEvents.slice(1).map((item, i) =>
                                <Link to={`event-calendar/${item.id}`} className="edu-events__slider-row
                                                edu-events__link" key={i}>
                                    <Fragment>

                                        {
                                            (item.date_start === item.date_end) ?
                                                <div className="edu-events__date edu-events__date_blue">
                                                                         <span className="edu-events__day">
                                                            {moment(item.date_start).format('D')}
                                                        </span>
                                                    <div className="edu-events__month">
                                                        {parsedMonthString(moment(item.date_start).format('MMMM'))}
                                                    </div>
                                                </div> :

                                                <div className="edu-events__date edu-events__date_blue" style={{
                                                    height: "auto", paddingTop: "4.5px", paddingBottom: "4.5px"
                                                }}>
                                                    <div>
                                                        <div className="edu-events__day-month">
                                                            {moment(item.date_start).format('D MMMM')}
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        height: "9px",
                                                        justifyContent: "center"
                                                    }}>
                                                        -
                                                    </div>
                                                    <div>
                                                        <div className="edu-events__day-month">
                                                            {moment(item.date_end).format('DD MMMM')}
                                                        </div>
                                                    </div>
                                                </div>
                                        }

                                    </Fragment>


                                    <div className="edu-events__title ml-3">
                                        <Truncate lines={2}>
                                            {item.title}
                                        </Truncate>
                                    </div>

                                </Link>
                            ) :
                            <div>В данном месяцы событий нет</div>
                    }
                </div>
            )
        }

        return (
            <section className='edu-events'>
                <div className="section-wrapper">

                    <div className="d-flex mb-4 align-items-center">
                        <div className="d-flex">
                            <h2 className='title-section mr-3'>
                                Календарь Образовательных событий
                            </h2>

                        </div>
                        <div className="col text-right">
                            {BtnBlue('/event-calendar/?page=1', 'Все события')}
                        </div>
                    </div>

                    <div className="edu-events-wrapper">

                        <div className="edu-events__col">
                            <Link to={`event-calendar/${EduEvents[0] && EduEvents[0].id}`}
                                  className="edu-events__cell edu-events__background-img"
                                  style={{
                                      background:
                                          `linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0.33) 67%, rgba(255, 255, 255, 0) 100%),
                                      url(${EduEvents[0] && EduEvents[0].thumb_urls && EduEvents[0].thumb_urls.previewPicture ?
                                              EduEvents[0].thumb_urls.previewPicture.original :
                                              dataImgNo
                                              })`
                                  }}>
                                {
                                    EduEvents[0] &&
                                    <div className="edu-events__inner" >
                                        <div className="edu-events__date-row">

                                            {
                                                (EduEvents[0].date_start === EduEvents[0].date_end) ?

                                                    <div className="edu-events__date edu-events__date_red">
                                            <span className="edu-events__day">
                                                {EduEvents[0] && moment(EduEvents[0].date_start).format('D')}
                                            </span>
                                                        <div className="edu-events__month">
                                                            {parsedMonthString(EduEvents[0] && moment(EduEvents[0].date_start).format('MMMM'))}
                                                        </div>
                                                    </div>

                                                    :

                                                    <div className="edu-events__date edu-events__date_red" style={{
                                                        height: "auto", paddingTop: "4.5px", paddingBottom: "4.5px"

                                                    }}>
                                                        <div>
                                                            <div className="edu-events__day-month">
                                                                {(EduEvents[0] && moment(EduEvents[0].date_start).format('D MMMM'))}
                                                            </div>
                                                        </div>
                                                        <div style={{display: "flex", alignItems: "center", height: "9px", justifyContent: "center"}}>
                                                            -
                                                        </div>
                                                        <div>
                                                            <div className="edu-events__day-month">
                                                                {(EduEvents[0] && moment(EduEvents[0].date_end).format('D MMMM'))}
                                                            </div>
                                                        </div>
                                                    </div>

                                            }
                                            <div className="edu-events__title ml-3">
                                                <Truncate lines={2}>
                                                    {EduEvents[0] && EduEvents[0].title}
                                                </Truncate>
                                            </div>

                                        </div>
                                    </div>
                                }
                            </Link>

                        </div>

                        <div className="edu-events__col">
                            <div className="edu-events__slider">
                                <div className="edu-events__slider-head">

                                    <div className="edu-events__slider-prev" onClick={() => monthDec(monthNumber)}>
                                        <ArrowType3 />
                                    </div>

                                    <span className="edu-events__slider-month">
                                        {parsedMainMonth(monthNumber)}
                                    </span>
                                    <div className="edu-events__slider-next" onClick={() => monthInc(monthNumber)}>
                                        <ArrowType3 />
                                    </div>
                                </div>

                                <div className="edu-events__slider-wrapper">
                                    <Scrollbars
                                        style={{height: 308}}>
                                        {loadingEvents}
                                    </Scrollbars>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </section>

        )
    }
}

export default EducateEvents

EducateEvents.defaultProps = {
    dates: {
        Январь: [
            {
                month: 0,
                date: "1 января",
                title: "Новый год",
                img: dataImg1
            },
            {
                month: 0,
                date: "7 января",
                title: "Рождество"
            }
        ],
        Февраль: [
            {
                month: 1,
                date: "8 февраля",
                title: "День российской науки",
                img: dataImg8
            },
            {
                month: 1,
                date: "23 февраля",
                title: "День защитника Отечества"
            }
        ],
        Март: [
            {
                month: 2,
                date: "8 марта",
                title: "Международный женский день",
                img: dataImg6
            },
            {
                month: 2,
                date: "26-31 марта",
                title: "Неделя детской и юношеской книги"
            }
        ],
        Апрель: [
            {
                month: 3,
                date: "12 апреля",
                title: "День космонавтики",
                img: dataImg7
            },
            {
                month: 3,
                date: "21 апреля",
                title: "День местного самоуправления"
            }
        ],
        Май: [
            {
                month: 4,
                date: "1 Мая",
                title: "День Труда",
                img: dataImg2
            },
            {
                month: 4,
                date: "9 Мая",
                title: "День Победы"
            }
        ],
        Сентябрь: [
            {
                month: 8,
                date: "1 сентября",
                title: "День знаний",
                img: dataImg5
            },
        ],
        Октябрь: [
            {
                month: 9,
                date: "5 октября",
                title: "Международный День учителя",
                img: dataImg4
            },
        ],
        Ноябрь: [
            {
                month: 10,
                date: "4 ноября",
                title: "День народного единства",
                img: dataImg3
            },
        ]
        ,Декабрь: [
            {
                month: 11,
                date: "3 декабря",
                title: "День Неизвестного Солдата",
                img: edu1
            },
            {
                month: 11,
                date: "9 декабря",
                title: "День Героев Отечества"
            },
            {
                month: 11,
                date: "12 декабря",
                title: "День Конституции Российской Федерации"
            }
        ]
    },
    month: 0
};
import {action, observable, runInAction} from "mobx";
import axios from "axios";
import moment from "moment";
import "moment/locale/ru";

export class educateEventsStore {
    @observable dataCalendarSlider = '';
    @observable EduEvents = [];
    @observable sortNearestEventList = [];
    @observable EduEventsFiltered = [];
    @observable getAllMonths = [];
    @observable getAllMonthsArr = [];
    @observable calendarMonth;
    @observable newData = new Date();
    @observable monthNumber = this.newData.getMonth() + 1;
    @observable monthNumberCalculated = '';
    @observable loading = true;

    @action month = () => {
        this.calendarMonth = moment(this.newData).format('MMMM').toUpperCase();
        // console.log(this.calendarMonth);
        // console.log(' this.monthNumber', this.monthNumber);
    }

    /* @action checkData = (m1, m2) => {
     }*/
    /* var len = array.length;

     var current = array[i];
     var previous = array[(i+len-1)%len];
     var next = array[(i+1)%len];*/

    @action getEduEvents = () => {
        axios.get(`/api/v1/edu-events/?month=${this.monthNumber}`)
            .then(response => {
                console.log(response)
                runInAction(() => {
                    this.EduEvents = response.data.items
                    this.loading = false
                    this.sortNearestEventList = this.EduEvents.sort((a, b) => {
                        var distancea = Math.abs(this.newData - new Date(a.date_start));
                        var distanceb = Math.abs(this.newData - new Date(b.date_start));
                        return (
                            distancea - distanceb
                        )
                    })
                })
            })
    };

    // @action sortNearestEvent = () => {
    //     console.log(this.EduEvents)
    //     this.EduEvents.sort((a, b) => {
    //         var distancea = Math.abs(this.newData - a);
    //         var distanceb = Math.abs(this.newData - b);
    //         return console.log(a)
    //     })
    // }

    @action monthInc = (m) => {
        console.log(this.monthNumber)
        this.monthNumber = this.monthNumber + 1
        if (this.monthNumber === 13)  {
            this.monthNumber = 1
        }

        axios.get(`/api/v1/edu-events/?month=${this.monthNumber}`)
            .then(response => {
                runInAction(() => {
                    console.log(response)
                    this.EduEvents = response.data.items
                    this.loading = false
                    this.sortNearestEventList = this.EduEvents.sort((a, b) => {
                        var distancea = Math.abs(this.newData - new Date(a.date_start));
                        var distanceb = Math.abs(this.newData - new Date(b.date_start));
                        return (
                            distancea - distanceb
                        )
                    })
                })
            })
    }

    @action monthDec = (m) => {

        this.monthNumber = this.monthNumber - 1
        if (this.monthNumber === 0)  {
            this.monthNumber = 12
        }

        axios.get(`/api/v1/edu-events/?month=${this.monthNumber}`)
            .then(response => {
                runInAction(() => {
                    this.EduEvents = response.data.items
                    this.loading = false
                    this.sortNearestEventList = this.EduEvents.sort((a, b) => {
                        var distancea = Math.abs(this.newData - new Date(a.date_start));
                        var distanceb = Math.abs(this.newData - new Date(b.date_start));
                        return (
                            distancea - distanceb
                        )
                    })
                })
            })

    }

    @action parsedMonthString = (m) => {
        switch (m) {
            case 'январь':
                return 'января'
            case 'февраль':
                return 'февраля'
            case 'март':
                return 'марта'
            case 'апрель':
                return 'апреля'
            case 'май':
                return 'мая'
            case 'июнь':
                return 'июня'
            case 'июль':
                return 'июля'
            case 'август':
                return 'августа'
            case 'сентябрь':
                return 'сентября'
            case 'октябрь':
                return 'октября'
            case 'ноябрь':
                return 'ноября'
            case 'декабрь':
                return 'декабря'
            default:
                break;
        }
    }

    @action parsedMainMonth = (m) => {
        switch (m) {
            case 1:
                return 'январь'
            case 2:
                return 'февраль'
            case 3:
                return 'март'
            case 4:
                return 'апрель'
            case 5:
                return 'май'
            case 6:
                return 'июнь'
            case 7:
                return 'июль'
            case 8:
                return 'август'
            case 9:
                return 'сентябрь'
            case 10:
                return 'октябрь'
            case 11:
                return 'ноябрь'
            case 12:
                return 'декабрь'
            default:
                break;
        }
    }

    /*    @action parsedMonth = (m) => {
        switch (m) {
            case 1:
                return 'января'
            case 2:
                return 'февраля'
            case 3:
                return 'марта'
            case 4:
                return 'апреля'
            case 5:
                return 'мая'
            case 6:
                return 'июня'
            case 7:
                return 'июля'
            case 8:
                return 'августа'
            case 9:
                return 'сентября'
            case 10:
                return 'октября'
            case 11:
                return 'ноября'
            case 12:
                return 'декабря'
            default:
                break
        }
    }*/

    /*@action getAllMonths = () => {
        this.getAllMonth = this.getEduEvents.map(item => item.month)
        console.log(item.month)
    }*/
}

export default new educateEventsStore();

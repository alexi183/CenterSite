import {action, observable, runInAction} from "mobx";
import axios from "axios";
import moment from "moment";
import "moment/locale/ru";

export class educateEventsStore {
    @observable dataCalendarSlider = '';
    @observable EduEvents = [];
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
        console.log(this.calendarMonth);
        console.log(' this.monthNumber', this.monthNumber);
    }

    @action getEduEvents = () => {
        axios.get(`/api/v1/edu-events/?month=12`)
            .then(response => {
                runInAction(() => {
                    this.EduEvents = response.data.items
                    this.loading = false
                })
            })
    };

    @action monthInc = (m) => {
        this.monthNumber = m + 1
        if (this.monthNumber === 13) {
            this.monthNumber = 1
        }

        axios.get(`/api/v1/edu-events/?month=${this.monthNumber}`)
            .then(response => {
                runInAction(() => {
                    this.EduEvents = response.data.items
                    this.loading = false
                })
            })
    }

    @action monthDec = (m) => {

        this.monthNumber = m - 1
        if (this.monthNumber === 0)  {
            this.monthNumber = 12
        }

        axios.get(`/api/v1/edu-events/?month=${this.monthNumber}`)
            .then(response => {
                runInAction(() => {
                    this.EduEvents = response.data.items
                    this.loading = false
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
}

export default new educateEventsStore();

import { observable, action, runInAction, computed } from "mobx";
import Cookie from "mobx-cookie";
import axios from "axios";
import moment from "moment";
import "moment/locale/ru";

export class eventsStore {
  @observable params = {};
  @observable filterURL = "";
  @observable main_event = null;
  @observable loading = true;
  @observable categoriesLoading = true;

  @observable eventCategoryList = [];
  @observable eventsList = [];

  @observable activeType = "";
  @observable activeCategory = "";

  @observable datesArray = [];
  @observable datesActiveDate = [];
  @observable indexEvents = {};

  @observable total = null;
  @observable limit = 8;
  @observable page = 1;
  @observable object = "event";
  @observable likesCount = null;
  @observable self = false;
  @observable showDate = false;

  @observable eventCalendarIsOpened = false;
  @observable datepickerDateSelected = new Date();
  @observable datepickerDateSelected2 = new Date();
  @observable datepickerEventDatesArray = {
    birthday: [
      new Date("2018-10-19"),
      new Date("2018-10-18"),
      new Date("2018-10-17"),
      new Date("2018-10-15")
    ],
    weekend: { daysOfWeek: [0, 6] }
  };
  @observable allEventsBtnSelected = true;
  @observable calendarDates = [];
  @observable calendarEvent = [];
  @observable calendarEvents = [];

  @observable parsedDay = this.datepickerDateSelected.getDay();
  @observable parsedMonth = this.datepickerDateSelected.getMonth() + 1;
  @observable parsedYear = this.datepickerDateSelected.getFullYear();

  @observable parsedDay2 = this.datepickerDateSelected2.getDay();
  @observable parsedMonth2 = this.datepickerDateSelected2.getMonth() + 1;
  @observable parsedYear2 = this.datepickerDateSelected2.getFullYear();

  @observable constParsedDay = this.datepickerDateSelected.getDay();
  @observable constParsedMonth = this.datepickerDateSelected.getMonth() + 1;
  @observable constParsedYear = this.datepickerDateSelected.getFullYear();

  /*@observable monthClick = false;
    @observable dayClick = false;*/

  @observable parsedChangeMonth = "";
  @observable parsedChangeYear = "";

  @observable cookie = new Cookie("session_likes");
  @observable currentMonth = "";

  @computed get sessionCookie() {
    return this.cookie.value;
  }

  @action
  setSessionCookie = value => {
    this.cookie.set(value, { expires: 2 }); // 2 day expiry
  };

  @action
  unsetSessionCookie = () => {
    this.cookie.remove();
  };

  @action likes = id => {
    axios
      .get(`/api/v1/likes/event/${id}/${this.cookie.value}`)
      .then(response => {
        console.log(response);
        runInAction(() => {
          this.likesCount = response.data.like;
          this.self = response.data.self;
        });
      });
  };

  @action onSliderDateSelect = index => {
    this.allEventsBtnSelected = false;
    this.datesActiveDate.forEach(el => {
      el.selected = false;
    });
    this.datesActiveDate[index].selected = true;
  };

  @action onAllEventsClicked = () => {
    this.allEventsBtnSelected = true;
    this.datesActiveDate.forEach(el => {
      el.selected = false;
    });
  };

  @action loadDates = () => {
    axios.get("/api/v1/events/").then(response => {
      runInAction(() => {
        this.datesArray = response.data.days;
        this.datesActiveDate = response.data.days.map(() => ({}));
      });
    });
  };

  @action loadIndexEvents = () => {
    axios.get(`/api/v1/events/`).then(response => {
      // console.log(response)
      this.indexEvents = response.data;
      this.loading = false;
    });
  };

  @action
  categoryEventHandler = async () => {
    await axios.get("/api/v1/event-categories/").then(response => {
      runInAction(() => {
        return (
          (this.eventCategoryList = response.data.items),
          (this.categoriesLoading = false)
        );
      });
    });
  };

  @action
  setCategoryId = id => {
    this.params["category"] = id;
    this.filterParamsFetch(this.params);
  };

  @action
  setTypeId = id => {
    this.params["type"] = id;
    this.filterParamsFetch(this.params);
  };

  @action
  setPageNumber = number => {
    this.page = number;
    this.params["page"] = number;
    this.filterParamsFetch(this.params);
  };

  @action
  filterParamsFetch = async params => {
    console.log("filter");
    let query = Object.keys(params)
      .map(
        key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");
    let url = "/api/v1/events/?" + query;
    this.filterURL = query;

    // const response = await fetch(url)
    // let data = await response.json()
    // console.log(data)
    // runInAction(() => {
    //     return (
    //         this.eventsList = data.items,
    //             this.total = data.pagination.total_items,
    //             this.page = data.pagination.current_page,
    //             this.loading = false,
    //             this.showDate = data.items.show_date
    //     )
    // })
    axios.get(url).then(response => {
      console.log(response);
      runInAction(() => {
        this.eventsList = response.data.items;
        this.total = response.data.pagination.total_items;
        this.page = response.data.pagination.current_page;
        this.loading = false;
        this.showDate = response.data.items.show_date;
      });
    });
  };

  @action
  fetchMainEvent = () => {
    this.loading = true;
    axios.get("/api/v1/main-event/").then(response => {
      console.log(response);
      runInAction(() => {
        this.main_event = response.data;
        this.loading = false;
      });
    });
  };

  @action
  handleActiveColor = () => {
    this.activeCategoryColor = { backgroundColor: "#fff", color: "#337b99" };
  };

  getDate = () => {
    let d = new Date();
    this.month = d.getMonth();
  };

  ///Календарь PopUp
  @action onToggleEventsCalendar = () =>
    (this.eventCalendarIsOpened = !this.eventCalendarIsOpened);

  @action getCalendarEvents = (month, year) => {
    axios
      .get(`/api/v1/calendar-events/?month=${month}&year=${year}`)
      .then(response => {
        runInAction(() => {
          this.calendarEvents = response.data;
          this.loading = false;
        });
        /*console.log('getCalendarEvents', response.data)*/
      });
  };

  @action getDisabledData = (month, year) => {
    axios
      .get(`/api/v1/calendar-dates/?month=${month}&year=${year}`)
      .then(response => {
        this.calendarDates = response.data;
        console.log("getDisabledData", response.data);
      });
  };

  /*  @action
      getCalendarEvent = (day, month, year) => {
          axios.get(`/api/v1/calendar-events/?day=${day}&month=${month}&year=${year}`).then(response => {
              this.calendarEvent = response.data;
          });
      }*/

  @action getDisabledDataChange = () => {
    this.parsedMonth = moment(this.datepickerDateSelected2).format("MM");
    this.parsedYear = moment(this.datepickerDateSelected2).format("YYYY");

    axios
      .get(
        `/api/v1/calendar-dates/?month=${this.parsedMonth}&year=${
          this.parsedYear
        }`
      )
      .then(response => {
        runInAction(() => {
          this.calendarDates = response.data;
          this.loading = false;
        });
        console.log(response.data);
      });
  };

  @action onDatePickerMonth = date => {
    this.datepickerDateSelected2 = date;
    this.parsedMonth = moment(this.datepickerDateSelected2).format("MM");
    this.parsedYear = moment(this.datepickerDateSelected2).format("YYYY");

    /* console.log('this.parsedChangeMonth', this.parsedChangeMonth)
        console.log('this.parsedChangeYear', this.parsedChangeYear)*/

    // axios.get(`/api/v1/calendar-dates/?month=${this.parsedMonth}&year=${this.parsedYear}`).then(response => {
    //     this.calendarDates = response.data;
    //     console.log('this.calendarDates', response.data)
    // });

    axios
      .get(
        `/api/v1/calendar-events/?month=${this.parsedMonth}&year=${
          this.parsedYear
        }`
      )
      .then(response => {
        runInAction(() => {
          this.calendarEvents = response.data;
          this.loading = false;
        });

        console.log("onDatePickerMonthContent", response.data);
      });
  };

  @action onDatePickerDateSelected = date => {
    this.datepickerDateSelected = date;
    this.parsedDay = moment(this.datepickerDateSelected).format("DD");
    this.parsedMonth = moment(this.datepickerDateSelected).format("MM");
    this.parsedYear = moment(this.datepickerDateSelected).format("YYYY");

    /*console.log('dayclick',this.parsedDay)
        console.log('dayclick', this.parsedMonth)
        console.log('dayclick', this.parsedYear)*/

    axios
      .get(
        `/api/v1/calendar-events/?day=${this.parsedDay}&month=${
          this.parsedMonth
        }&year=${this.parsedYear}`
      )
      .then(response => {
        this.calendarEvents = response.data;
        console.log("onDatePickerDayContent", response.data);
      });
  };
}

export default new eventsStore();

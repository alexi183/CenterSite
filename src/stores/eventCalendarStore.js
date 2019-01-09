import { observable, action, runInAction } from "mobx";
import axios from "axios";

export class eventCalendarStore {
    @observable categoryList = [];
    @observable eventsCalendarList = [];
    @observable params = {};
    @observable filterURL = "";
    @observable total = null;
    @observable limit = 8;
    @observable page = 1;
    @observable loading = true;
    @observable categoriesLoading = true;
    @observable activeType = "";
    @observable activeCategory = "";

    @action
    categoryHandler = async () => {
        const response = await fetch("/api/v1/edu-events-categories/")
        let data = await response.json();
        runInAction(() => {
            return (
                this.categoryList = data.items,
                    this.categoriesLoading = false
            )
        })
    };

    @action
    setTypeId = id => {
        this.params["type"] = id;
        this.filterParamsFetch(this.params);
    };

    @action
    setCategoryId = id => {
        this.params["category"] = id;
        this.filterParamsFetch(this.params);
    };

    @action
    setPageNumber = number => {
        this.page = number;
        this.params["page"] = number;
        this.filterParamsFetch(this.params);
    };

    @action
    filterParamsFetch = params => {
        let query = Object.keys(params)
            .map(
                key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
            )
            .join("&");
        let url = "/api/v1/edu-events/?" + query;
        this.filterURL = query;

        axios.get(url).then(response => {
            console.log(response)
            runInAction(() => {
                this.eventsCalendarList = response.data.items;
                this.total = response.data.pagination.total_items;
                this.page = response.data.pagination.current_page;
                this.loading = false;
            });
        });
    };
}

export default new eventCalendarStore();

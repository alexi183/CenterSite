import { observable, action, runInAction } from "mobx";
import axios from "axios";

export class mediaStore {
    @observable mediaList = [];
    @observable params = {};
    @observable filterURL = ''
    @observable total = null;
    @observable limit = 6;
    @observable page = 1;
    @observable loading = true;
    @observable activeType = '';
    @observable activeCategory = '';

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
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            .join("&")
        let url = "/api/v1/medias/?" + query
        this.filterURL = query

        axios.get(url).then(response => {
            // console.log(response)
            runInAction(() => {
                this.mediaList = response.data.items;
                this.total = response.data.pagination.total_items;
                this.page = response.data.pagination.current_page;
                this.loading = false;
            })
        });
    }
}

export default new mediaStore();
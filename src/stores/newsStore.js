import { observable, action, runInAction } from "mobx";
import axios from "axios";

export class newsStore {
    @observable categoryList = [];
    @observable params = {};
    @observable filterURL = ''
    @observable main_news = null
    @observable newsList = [];
    @observable total = null;
    @observable limit = 6;
    @observable page = 1;
    @observable defStyle = true;
    @observable loading = true;
    @observable categoriesLoading = true;
    @observable error = false;
    @observable activeDate = '';
    @observable activeCategory = '';

    @action
    categoryHandler = async () => {
        const response = await fetch("/api/v1/news-categories/")
        let data = await response.json();
        runInAction(() => {
            return (
                this.categoryList = data.items,
                    this.categoriesLoading = false
            )
        })
    };

    @action
    setCategoryId = id => {
        console.log('category', id)
        this.params["category"] = id;
        this.filterParamsFetch(this.params);
    };

    @action
    setDateId = id => {
        console.log('date', id)
        this.params["date"] = id;
        this.filterParamsFetch(this.params);
    };

    @action
    setPageNumber = number => {
        console.log('page',number )
        this.page = number;
        this.params["page"] = number;
        this.filterParamsFetch(this.params);
    };

    @action
    filterParamsFetch = async params => {
        console.log('params', params)
        let query = Object.keys(params)
            .map(
                key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
            )
            .join("&");
        let url = "/api/v1/news/?" + query;
        this.filterURL = query

        const response = await fetch(url)
        let data = await response.json()
        runInAction(() => {
            return (
                this.newsList = data.items,
                    this.total = data.pagination.total_items,
                    this.page = data.pagination.current_page,
                    this.loading = false
            )
        })
    };

    @action
    fetchMainNews = () => {
        axios
            .get('/api/v1/main-news/')
            .then(response => {
                runInAction(() => {
                    this.main_news = response.data
                })
            })
    }
}

export default new newsStore();

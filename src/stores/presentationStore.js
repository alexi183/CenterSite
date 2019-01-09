import { observable, action, runInAction  } from "mobx";
import axios from 'axios'

export class presentationStore {
    @observable categoryList = [];
    @observable authorsList = []
    @observable presentationsList = [];
    @observable params = {};
    @observable filterURL = "";
    @observable total = 10;
    @observable limit = 6;
    @observable page = 1;
    @observable loading = true;
    @observable categoriesLoading = true;
    @observable authorsLoading = true;
    @observable activeAuthor = "";
    @observable activeCategory = "";
    @observable activeSearch = "";
    @observable searchResponce = [];

    @action
    categoryHandler = async () => {
        const response = await fetch("/api/v1/presentations-categories/")
        let data = await response.json();
        runInAction(() => {
            return (
                this.categoryList = data.items,
                    this.categoriesLoading = false
            )
        })
    };

    @action
    authorHandler = async (id) => {
        const response = await fetch(`/api/v1/presentations-authors/`)
        let data = await response.json();
        runInAction(() => {
            return (
                this.authorsList = data.items,
                    this.authorsLoading = false
            )
        })
    };

    @action
    authorCategoryHandler = async (id) => {
        const response = await fetch(`/api/v1/presentations-authors/?category=${id}`)
        let data = await response.json();
        runInAction(() => {
            return (
                this.authorsList = data.items,
                    this.authorsLoading = false
            )
        })
    };

    @action
    setAuthorId = id => {
        this.params["author"] = id;
        this.filterParamsFetch(this.params);
    };

    @action
    setCategoryId = id => {
        this.params["category"] = id;
        // this.filterParamsFetch(this.params);
    };

    @action
    setPageNumber = number => {
        this.page = number;
        this.params["page"] = number;
        // this.filterParamsFetch(this.params);
    };

    @action
    setSearchId = id => {
        this.params["search"] = id;
        // this.filterParamsFetch(this.params);
    };

    @action
    filterParamsFetch = params => {
        console.log(params)
        let query = Object.keys(params)
            .map(
                key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
            )
            .join("&");
        let url = "/api/v1/presentations/?" + query;
        this.filterURL = query;

        axios.get(url).then(response => {
            console.log(response);
            runInAction(() => {
                this.presentationsList =  Object.values(response.data.items)
                this.total = response.data.pagination.total_items;
                this.page = response.data.pagination.current_page;
                this.loading = false;
            });
        });
    };
}

export default new presentationStore();

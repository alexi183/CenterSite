import { observable, action, runInAction } from "mobx";
import axios from "axios";

export class projectsStore {
  @observable projectsList = [];
  @observable params = {};
  @observable filterURL = "";
  @observable total = null;
  @observable limit = 5;
  @observable page = 1;
  @observable loading = true;
  @observable activeType = ''
  @observable activeText = ''
  @observable searchResponce = [];

  @action
  setPageNumber = number => {
    this.page = number;
    this.params["page"] = number;
    this.filterParamsFetch(this.params);
  };

  @action
  setTypeId = id => {
      this.params["type"] = id
      this.filterParamsFetch(this.params)
  }

  @action
  setSearchId = id => {
    this.params["text"] = id;
    this.filterParamsFetch(this.params);
  };

  @action
  filterParamsFetch = params => {
      
    let query = Object.keys(params)
      .map(
        key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");
    let url = "/api/v1/projects/?" + query;
    this.filterURL = query;

    axios.get(url).then(response => {
      runInAction(() => {
        this.projectsList = response.data.items;
        this.total = response.data.pagination.total_items;
        this.page = response.data.pagination.current_page;
        this.loading = false;
      });
    });
  };
}

export default new projectsStore();

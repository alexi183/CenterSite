import { observable, action } from "mobx";
import axios from "axios";
export class headerStore {
  @observable slideIndex = 0;
  @observable prevIndex = 0;
  @observable searchPopupVisible = false;
  @observable searchQuery = "";
  @observable activeBroadcast = null;
  @observable loading = true;

  @action onSlideIndexChange = idx => {
    this.slideIndex = idx;
  };

  @action onSlideIndexPrev = id => {
    this.prevIndex = id;
  };

  @action onSearchPopupToggle = () => {
    this.searchPopupVisible = !this.searchPopupVisible;
  };

  @action clearSearchQuery = () => {
    this.searchQuery = "";
  };

  @action handleSearchInput = e => {
    this.searchQuery = e.target.value;
  };

  @action fetchBroadcast = () => {
    axios.get("/api/v1/broadcast/1").then(response => {
      console.log(response);
      this.activeBroadcast = response.data;
      this.loading = false;
    });
  };
}

export default new headerStore();

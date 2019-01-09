import {observable, action} from 'mobx';

export class headerStore {
    @observable slideIndex = 0
    @observable prevIndex = 0
    @observable searchPopupVisible = false
    @observable searchQuery = ''

    @action onSlideIndexChange = (idx) => {
        this.slideIndex = idx
    }

    @action onSlideIndexPrev = (id) => {
        this.prevIndex = id
    }

    @action onSearchPopupToggle = () => {
        this.searchPopupVisible = !this.searchPopupVisible
    }

    @action clearSearchQuery = () => {
        this.searchQuery = ''
    }

    @action handleSearchInput = (e) => {
        this.searchQuery = e.target.value

    }
}

export default new headerStore()
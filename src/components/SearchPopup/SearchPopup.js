import './SearchPopup.scss'
import React, {Component, Fragment} from 'react'
import {inject, observer} from "mobx-react"
import {withRouter} from "react-router-dom";

@withRouter
@inject('headerStore')
@observer
class SearchPopup extends Component {

    onSubmit = (e) => {
        const {searchQuery, clearSearchQuery} = this.props.headerStore

        e.preventDefault()
        this.props.history.push({
            pathname: `/search`,
            search: `?text=${searchQuery}`
        })
        clearSearchQuery()
    }

    render() {
        const {
            searchPopupVisible,
            handleSearchInput,
            searchQuery,
            onSearchPopupToggle,
        } = this.props.headerStore
        return (
            <Fragment>

                <div className={`search-popup ${searchPopupVisible ? 'search-active' : ''}`}>
                    <div className="header-container">
                        <form className="section-wrapper position-relative search-popup__inner-wrapper">
                            <div className="search-popup__block mr-3 p-0">
                                <div className="search-popup__block-item mb-2">Поиск по сайту</div>
                                <input
                                    onChange={handleSearchInput}
                                    value={searchQuery}
                                    className='search-popup__text-bar'
                                    type="search"/>
                            </div>
                            <button
                                onClick={e => {
                                    this.onSubmit(e)
                                    onSearchPopupToggle()
                                }}
                                type='submit'
                                className='btn-blue btn-blue_lighter search-popup__btn'>
                                Найти
                            </button>
                        </form>
                        <div
                            className="search-popup__close"
                            onClick={onSearchPopupToggle}
                        />
                    </div>

                </div>

            </Fragment>
        )
    }
}

export default SearchPopup
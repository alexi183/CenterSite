import React, {Component, Fragment} from 'react'
import './Search.scss'
import PageTitleNavBlock from "../PageTitleNavBlock/PageTitleNavBlock";
import axios from "axios";
import declOfNum from "../../helpers/pluralization";
import uuid from "uuid";
import NavLink from "react-router-dom/es/NavLink";
import clock from '../../img/clock.png'
import moment from "moment";
import createMarkup from "../../helpers/dangerouslySetHTML";
import Truncate from "react-truncate";
import queryString from 'query-string';
import PaginationComponent from "../Pagination/Pagination";

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchQuery: '',
            searchResponce: [],
            loading: false,
            itemsPerPage: 6,
            initPage: 1,
            paginationData: {}
        }
    }

    componentDidMount() {
        this.popStateHandler()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.key !== this.props.location.key) {
            this.popStateHandler()
        }
    }

    popStateHandler = () => {
        let initQuery = queryString.parse(this.props.location.search)
        if (initQuery.text) {
            this.setState({
                searchQuery: initQuery.text,
                initPage: initQuery.page ? +initQuery.page : 1,
            }, () => {
                this.searchRequest()
            })
        }
    }

    handleHistory = (page, text) => {
        this.props.history.push({
            pathname: `/search/`,
            search: `?${page}${text}`
        });
    }

    onSubmitForm = (e) => {
        e.preventDefault()
        this.handleHistory(`page=1`, `&text=${this.state.searchQuery}`)
    }

    searchRequest = () => {
        this.setState({loading: true})
        axios.get('/api/v1/search', {
                params: {
                    text: this.state.searchQuery,
                    page: this.state.initPage,
                    count: this.state.itemsPerPage,
                }
            }
        )
            .then(response => {
                    this.setState({
                        loading: false,
                        searchResponce: response.data.items,
                        paginationData: response.data.pagination
                    })
                }
            )
            .catch((error) => {
                console.log(error);
            })
    }

    handleSearchField = e => {
        this.setState({
            searchQuery: e.target.value
        })
    }

    render() {
        const {searchQuery, searchResponce, loading, paginationData, initPage} = this.state
        const sectionLabel = (label) => {
            switch (label) {
                case 'news':
                    return <span className='search-page__section-label search-page__section-label_news'>Новости</span>
                case 'events':
                    return <span className='search-page__section-label search-page__section-label_events'>События</span>
                case 'project':
                    return <span
                        className='search-page__section-label search-page__section-label_project'>Проекты</span>
                case 'media':
                    return <span
                        className='search-page__section-label search-page__section-label_project'>Медиафайлы</span>
                default:
                    return
            }
        }


        const navLinkRender = (item) => {
            // console.log(item)
            const linkGenerator = (sectionName) => {
                // console.log(sectionName)
                let link = null
                if(sectionName !== 'events') {
                    link = <NavLink to={`/${sectionName}/detail/${item.item}`}>{item.title}</NavLink>
                }else {
                    link = <NavLink to={`/${sectionName}/event/${item.item}`}>{item.title}</NavLink>
                }
                return (
                    link
                )
            }
            switch (item.object) {
                case 'events':
                    return linkGenerator('events')
                case 'news':
                    return linkGenerator('news')
                case 'project':
                    return linkGenerator('projects')
                case 'media':
                    return linkGenerator('media')
                default:
                    return
            }
        }

        return (
            <section className='search-page section-wrapper'>
                <PageTitleNavBlock
                    data={
                        {
                            backgroundColor: '#005a80',
                            fontColor: '#fff',
                            bgImage: 'none',
                            title: 'ПОИСК ПО САЙТУ',
                            breadCrumbs: [{title: 'Главная', link: '/'}, {title: 'Поиск по сайту', link: '/search'},]
                        }
                    }
                >
                    <div className="mb-4 mt-4" style={{position: 'relative', zIndex: '10'}}>
                        <form>
                            <input
                                className='search-page__input-text mr-3'
                                type="search"
                                value={searchQuery}
                                onChange={this.handleSearchField}
                            />
                            <button
                                className='btn-blue btn-blue_lighter'
                                onClick={this.onSubmitForm}
                                type='submit'>НАЙТИ
                            </button>
                        </form>
                    </div>
                </PageTitleNavBlock>
                <div className="search-page__results mb-5">
                    {
                        !searchResponce.length && !loading &&
                        <p className='search-page__found mb-4'>Ничего не найдено</p>
                    }
                    {
                        loading &&
                        <div className='spinner spinner_abs-middle'></div>
                    }
                    {
                        searchResponce.length > 0 && !loading &&
                        <Fragment>
                            <p className='search-page__found'>
                                {declOfNum(paginationData.total_items, ['Найден ', 'Найдено ', 'Найдено ',])}
                                {paginationData.total_items}
                                {declOfNum(paginationData.total_items, [' результат', ' результата', ' результатов',])}
                            </p>
                            {searchResponce.map((item, i) =>
                                <div key={uuid()} className='search-page__result-item mb-4 pb-4'>
                                    <div className="mb-2">
                                        {navLinkRender(item)}
                                    </div>
                                    <div className="search-page__time-row d-flex align-items-center mb-2">
                                        <img src={clock} alt="time-icon" className='search-page__clock-icon mr-2'/>
                                        <span>{`${moment(item.date).format("D MMMM YYYY")} года`}</span>
                                        {sectionLabel(item.object)}
                                    </div>
                                    <div className="search-page__item-text">
                                        <Truncate lines={3}>
                                            <p
                                                className=' mb-0'
                                                dangerouslySetInnerHTML={createMarkup(item.fullsearchtext)}
                                            >
                                            </p>
                                        </Truncate>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    }
                    {
                        paginationData.total_pages > 1 && !loading &&
                        <PaginationComponent
                            total={paginationData.total_items}
                            limit={this.state.itemsPerPage}
                            page={initPage}
                            link={`/search`}
                            query={searchQuery}
                        />
                    }
                </div>

            </section>
        )
    }
}

export default Search
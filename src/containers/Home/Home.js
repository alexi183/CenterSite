import React, {Component, Fragment} from 'react'
import {inject, observer} from "mobx-react";
import './Home.scss'
import Header from './../../containers/Header/Header'
import Events from "../../containers/Events/Events"
import MediaAnnounce from "../../components/MediaAnnounce/MediaAnnounce";
import Projects from "../../components/Projects/Projects"
import Partners from "../../components/Partners/Partners";
import EducateEvents from "../../components/EducateEvents/EducateEvents";
import Footer from './../../containers/Footer/Footer'
import NewsSlider from "../../components/NewsSlider/NewsSlider";
import PageContent from "../../components/PageContent/PageContent";

import DocumentTitle from "react-document-title";

import LazyLoad from 'react-lazyload';

@inject('naviStore')
@observer

class Home extends Component {

    componentDidMount() {
        this.props.naviStore.index.length && this.props.naviStore.indexSlug()
    }

    render() {

        const {index, url} = this.props.naviStore;

        this.indexUrl = () => {
            if (index.indexOf(url) === -1)
                return true
        }

        return (
            <DocumentTitle title="ФГАОУ ДПО ЦРГОП и ИТ">
            <Fragment>
                <header className={`header ${(this.indexUrl() ? 'header_hidden' : '')}`}>
                    <Header index={index} indexFunc={this.indexUrl} />
                </header>
                <main>
                    {
                        (this.indexUrl()) ?
                            <Fragment>
                                <LazyLoad height={560} offset={[-200, 0]}>
                                    <NewsSlider/>
                                </LazyLoad>
                                <LazyLoad height={950}  offset={[-200, 0]}>
                                    <Events/>
                                </LazyLoad>
                                <LazyLoad height={575}  offset={[-200, 0]}>
                                <MediaAnnounce/>
                                </LazyLoad>
                                <LazyLoad height={680}  offset={[-100, 0]}>
                                <Projects/>
                                </LazyLoad>
                                <LazyLoad height={485}  offset={[-100, 0]}>
                                <EducateEvents />
                                </LazyLoad>
                                <LazyLoad height={250}  offset={[-100, 0]}>
                                <Partners/>
                                </LazyLoad>
                            </Fragment>
                            :
                            <PageContent url={url} />
                    }
                </main>
                <footer>
                    <Footer />
                </footer>
            </Fragment>
            </DocumentTitle>
        )
    }
}
export default Home



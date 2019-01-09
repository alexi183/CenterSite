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

// import LazyLoad from 'react-lazyload';

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
            <Fragment>
                <header className={`header ${(this.indexUrl() ? 'header_hidden' : '')}`}>
                    <Header index={index} indexFunc={this.indexUrl} />
                </header>
                <main>
                    {
                        (this.indexUrl()) ?
                            <Fragment>
                                <NewsSlider/>
                                <Events/>
                                <MediaAnnounce/>
                                <Projects/>
                                <EducateEvents />
                                <Partners/>
                            </Fragment>
                            :
                            <PageContent url={url} />
                    }
                </main>
                <footer>
                    <Footer />
                </footer>
            </Fragment>
        )
    }
}
export default Home



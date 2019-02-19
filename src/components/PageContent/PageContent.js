import React, {Component, Fragment} from 'react'
import {inject, observer} from "mobx-react";
import { withRouter } from "react-router";
import createMarkup from '../../helpers/dangerouslySetHTML';
import './PageContent.scss';
import DocumentTitle from "react-document-title";

import PageHeader from '../PageHeader/PageHeader';

@inject('naviStore')
@observer

class PageContent extends Component {

    componentDidMount() {
        this.props.naviStore.getContent(this.props.history.location.pathname.split('content/')[1])
    }

    componentWillReceiveProps() {
        this.props.naviStore.getContent(this.props.history.location.pathname.split('content/')[1])
    }

    render() {
        const {pageData, content} = this.props.naviStore;

        if(pageData === null) {
            return null
        }
        
        const pageHeader = {
            breadCrumbs: true,
            title: pageData && pageData.title,
            background: "#005a80",
            headerModifierClass: 'dark-theme',
        }

        return (
            <Fragment>
                <DocumentTitle title={pageData && pageData.title}>
                    <div className="section-wrapper">
                        <PageHeader {...pageHeader} />
                        <div className="content-page">
                            <div className="content-page__static-page" dangerouslySetInnerHTML={createMarkup(content)} />
                        </div>
                    </div>
                </DocumentTitle>
            </Fragment>
        )
    }
}

export default withRouter(PageContent)



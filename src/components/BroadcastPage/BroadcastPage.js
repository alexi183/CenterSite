import React, { Component } from 'react';
import './BroadcastPage.scss';
import {inject, observer} from "mobx-react"
// import axios from 'axios';
import DocumentTitle from "react-document-title";

import PageHeader from "../PageHeader/PageHeader";
import createMarkup from "../../helpers/dangerouslySetHTML";
import Spinner from '../Spinner/Spinner'

@inject('headerStore')
@observer
class BroadcastPage extends Component {
    render() {
        const {activeBroadcast} = this.props.headerStore

        if(activeBroadcast === null) {
            return <Spinner />
        }

        const pageHeader = {
            breadCrumbs: true,
            title: activeBroadcast.title,
            background: "rgb(0, 90, 128)",
            headerModifierClass: "dark-theme"
        };

        return (
            <DocumentTitle title="Трансляции">
                <section className="section-wrapper">
                    <PageHeader {...pageHeader} />
                    <div className="broadcast-page">
                        <div dangerouslySetInnerHTML={createMarkup(activeBroadcast.content)} />
                    </div>
                </section>
            </DocumentTitle>
        )
    }
}

export default BroadcastPage;
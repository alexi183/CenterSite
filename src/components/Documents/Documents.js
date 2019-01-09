import React, {Component} from 'react'
import './Documents.scss'
import PageTitleNavBlock from "../PageTitleNavBlock/PageTitleNavBlock";
import axios from "axios";
import DocumentTitle from "react-document-title";

import renderDocs from '../../helpers/renderDocs'

export default class Documents extends Component {

    state = {
        docs: {}
    }


    componentDidMount() {
        this.getDocs()
    }

    getDocs = () => {
        this.setState({loading: true})
        axios.get('/api/v1/documents/')
            .then(response => {
                    console.log(
                        'response.data ', response.data
                    );
                    this.setState({
                        docs: response.data
                    })
                }
            )
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const {docs} = this.state

        return (
            <DocumentTitle title="Документы">
            <section className='documents section-wrapper'>
                <PageTitleNavBlock
                    data={{
                        backgroundColor: '#005a80',
                        fontColor: '#fff',
                        bgImage: 'blue',
                        title: 'Документы',
                        breadCrumbs: [{title: 'Главная', link: '/'}, {title: 'Документы', link: '/content/dokumenty'},]
                    }}
                >
                    <div className='mb-5'></div>
                </PageTitleNavBlock>

                <div className="documents__content section-wrapper section-wrapper_sm">
                    {
                        Object.keys(docs).length > 0 &&
                        renderDocs(docs, 1)
                    }
                </div>
            </section>
            </DocumentTitle>
        )
    }
}
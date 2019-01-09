import React, {Component} from "react";
import "./HistoryHelp.scss";
import PageHeader from "../PageHeader/PageHeader";
import {withRouter} from "react-router";
import historyPageImg from "../../img/historyPageImg.png";
import {inject, observer} from "mobx-react";
import createMarkup from "../../helpers/dangerouslySetHTML";
import DocumentTitle from "react-document-title";

@inject('contentPagesStore')
@observer

class HistoryHelp extends Component {

    componentDidMount() {
        this.props.contentPagesStore.contentHistoryHelp(this.props.contentPagesStore.historyHelp)
    }

    render() {
        const {pageHeader} = this.props
        const {historyHelp, filterContentCategory} = this.props.contentPagesStore

        let filter = historyHelp.filter(item => item.category === filterContentCategory).sort((a, b) => parseInt(a.year) - parseInt(b.year))

        const content = filter.map((item, i) =>
            <div className="content-page-row history-row d-flex justify-content-between align-items-center" key={i}>
                <div className="history-row__img"
                     style={{background: `url(${historyPageImg})`}}>

                    {
                        (item.year.length > 4) ?
                            <span className="history-row__year" style={{
                                fontSize: "25px",
                                lineHeight: "0.8"
                            }}>

                                <div>{item.year.split('-')[0]}</div>
                                <span>-</span>
                                <div>{item.year.split('-')[1]}</div>

                                </span>
                            :
                            <span className="history-row__year">
                                {item.year}</span>
                    }

                </div>
                <div className="history-row__text">
                    <div dangerouslySetInnerHTML={createMarkup(item.text)} />
                </div>
            </div>
        )

        return (
            <DocumentTitle title="Историческая справка">
                <section className="section-wrapper">

                    <PageHeader {...pageHeader} />

                    <div className="content-page">
                        <div className="history-page">
                            {
                                (historyHelp) && content
                            }
                        </div>
                    </div>
                </section>
            </DocumentTitle>
        );
    }
}

export default withRouter(HistoryHelp)

HistoryHelp.defaultProps = {
    pageHeader: {
        breadCrumbs: true,
        title: 'Историческая справка',
        headerModifierClass: 'dark-theme',
        background: '#005a80',
        description: false,
        linkBlock: true,
        links: [
            {
                id: 3,
                category: 3,
                link: '',
                name: '1927 – 1946'
            },
            {
                id: 2,
                category: 2,
                link: '',
                name: '1950 - 1999'
            },
            {
                id: 1,
                category: 1,
                link: '',
                name: '2000 - 2018'
            },


        ]
    }
}

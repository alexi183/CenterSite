import "./AdministrationCompanyPage.scss";
import React, {Component} from "react";
import PageHeader from "../PageHeader/PageHeader";
import {inject, observer} from "mobx-react";
import rukovodno from "../../img/rukovod-no.png";
import director from "../../img/rukovod1.png";
import DocumentTitle from "react-document-title";

@inject('contentPagesStore')
@observer

class AdministrationCompanyPage extends Component {

    componentDidMount() {
        this.props.contentPagesStore.contentAdminCompany()
    }

    render() {
        const {pageHeader} = this.props
        const {adminCompany} = this.props.contentPagesStore

        return (
            <DocumentTitle title="Руководство">
                <section className="section-wrapper">

                    <PageHeader {...pageHeader} />

                    <div className="content-page">
                        <div className="administration-page">
                            <div className="director d-flex">
                                <div className="administration-block">
                                    <div className="administration-block__img">
                                        <img src={director} alt="" />
                                    </div>
                                </div>
                                <div className="administration-block__info">
                                    <div className="administration-block__info-name">
                                        Фертман <br/> Виктор Александрович
                                    </div>
                                    <div className="administration-block__info-text">
                                        И.о.директора
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-start flex-wrap">
                                {
                                    adminCompany.map((item,i) =>
                                        <div className="administration-block" key={i}>
                                            <div className="administration-block__img">
                                                <img src={`${item.img ? item.img : rukovodno}`} alt="" />
                                            </div>
                                            <div className="administration-block__info">
                                                <div className="administration-block__info-name">
                                                    <div>{item.name.split(" ")[0]}</div>
                                                    <div>{item.name.split(" ")[1]} {item.name.split(" ")[2]}</div>

                                                </div>
                                                <div className="administration-block__info-text">
                                                    {item.text}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </DocumentTitle>
        );
    }
}
export default AdministrationCompanyPage

AdministrationCompanyPage.defaultProps = {
    pageHeader: {
        breadCrumbs: true,
        title: 'Руководство',
        headerModifierClass: 'dark-theme',
        background: '#005a80',
        description: false,
        linkBlock: false
    }
}

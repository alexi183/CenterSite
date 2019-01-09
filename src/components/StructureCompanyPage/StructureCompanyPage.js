import React, {Component} from "react";
import "./StructureCompanyPage.scss";
// import PageHeader from "../PageHeader/PageHeader";
import PageTitleNavBlock from "../PageTitleNavBlock/PageTitleNavBlock";
import {Route, Switch} from 'react-router-dom';
import {withRouter } from "react-router";
import AdministrationCompanyPage from "./Administrative/Administrative"
import AdministrativeUnit from "./AdministrativeUnit/AdministrativeUnit"
import InstituteEducation from "./InstituteEducation/InstituteEducation"
import InstituteIT from "./InstituteIT/InstituteIT"
import UchebDepartment from "./UchebDepartment/UchebDepartment"
import ServiceDepartment from "./ServiceDepartment/ServiceDepartment"
// import structure from "../../img/structure2.png"

class StructureCompanyPage extends Component {

    // componentDidMount() {
    //     this.props.history.push('/content/struktura-i-organy-upravleniia/rukovodstvo');
    // }

    render() {
        const {data, contentPages, pageHeader} = this.props

        let activePath = this.props.history.location.pathname.split('/')[4];

        return (
            <section className="section-wrapper">

                {/* <PageHeader {...pageHeader} />*/}

                <PageTitleNavBlock data={data} activePath={activePath} />

                <div className="content-page plr0">
                    <div className="structure-page">
                        <Switch>
                            {
                                contentPages.map((item, i) => <Route
                                        path={item.link}
                                        component={item.content}
                                        key={i}
                                    />
                                )}
                        </Switch>
                        {/*<img src={structure} alt=""/>*/}
                    </div>
                </div>
            </section>
        );
    }
}
export default withRouter(StructureCompanyPage)

StructureCompanyPage.defaultProps = {
    pageHeader: {
        breadCrumbs: true,
        title: "Структура и органы управления",
        headerModifierClass: "dark-theme",
        background: "#005a80",
        description: false,
        descriptionGoal: "",
        descriptionRealisation: "",
        descriptionSite: "",
        headerProjectImg: "",
        linkBlock: false,
        links: []
    },

    data: {
        backgroundColor: '#005a80',
        fontColor: '#fff',
        bgImage: 'blue',
        title: 'Структура и органы управления',
        breadCrumbs: [
            {
                title: 'Главная',
                link: '/'
            },
            {
                title: 'Структура и органы управления',
                link: '/content/struktura-i-organy-upravleniia'
            },
        ],
        linksRow: [
            {
                title: 'Руководство',
                link: '/content/struktura-i-organy-upravleniia/rukovodstvo'
            },
            {
                title: 'Административные подразделения',
                link: '/content/struktura-i-organy-upravleniia/administrativnye-podrazdeleniia'
            },
            {
                title: 'Институт информационных технологий',
                link: '/content/struktura-i-organy-upravleniia/institut-informatsionnykh-tekhnologii'
            },
            {
                title: 'Институт общего образования',
                link: '/content/struktura-i-organy-upravleniia/institut-obshchego-obrazovaniia'
            },
            {
                title: 'Обслуживающие подразделения',
                link: '/content/struktura-i-organy-upravleniia/service-department'
            },
            {
                title: 'Учебно-вспомогательные подразделения',
                link: '/content/struktura-i-organy-upravleniia/ucheb-department'
            }
        ]
    },

    contentPages: [
        {
            id:1,
            content: AdministrationCompanyPage,
            link: '/content/struktura-i-organy-upravleniia/rukovodstvo'
        },
        {
            id:2,
            content: AdministrativeUnit,
            link: '/content/struktura-i-organy-upravleniia/administrativnye-podrazdeleniia'
        },
        {
            id:3,
            content: InstituteEducation,
            link: '/content/struktura-i-organy-upravleniia/institut-obshchego-obrazovaniia'
        },
        {
            id:4,
            content: InstituteIT,
            link: '/content/struktura-i-organy-upravleniia/institut-informatsionnykh-tekhnologii'
        },
        {
            id:5,
            content: UchebDepartment,
            link: '/content/struktura-i-organy-upravleniia/ucheb-department'
        },
        {
            id:6,
            content: ServiceDepartment,
            link: '/content/struktura-i-organy-upravleniia/service-department'
        }
    ]
}

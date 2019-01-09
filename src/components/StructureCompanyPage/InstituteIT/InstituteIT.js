import React, {Component, Fragment} from "react";
import "./InstituteIT.scss";
import {Route, Switch} from 'react-router-dom';
import {withRouter } from "react-router";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import rukovodno from "../../../img/rukovod-no.png";
import rukovod6 from "../../../img/rukovod6.png";
import InstituteDepartments from "../InstituteDepartments/InstituteDepartments"

@inject('contentPagesStore')
@observer

class InstituteIT extends Component {

    componentDidMount() {
        this.props.contentPagesStore.contentInstituteIT()
    }

    render() {
        const {instituteIT, instituteItActivity, instituteItActivity2} = this.props.contentPagesStore

        let path = this.props.history.location.pathname.split('/')[4];

        return (
            <Fragment>
                {
                    (path === undefined) &&
                    <Fragment>
                        <h2 className="content-page-header">Институт информационных технологий</h2>
                        <div className="d-flex justify-content-start flex-wrap">
                            {
                                instituteIT.map((item,i) =>
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

                            <div className="structure-page__directions-block">
                                <div className="structure-page__head mb-5">
                                    <div className="mb-2">Основные направления деятельности</div>
                                    <span>Институт создан для осуществления комплексной поддеpжки развития и использования новых информационных технологий и телекоммуникаций в сфере обpазования и науки России</span>
                                </div>

                                <div className="structure-page__directions-list d-flex justify-content-between">
                                    <div className="structure-page__activity-col">
                                        {
                                            instituteItActivity.map((item,i) =>
                                                <div className="structure-page__activity-row d-flex align-items-center" key={i}>
                                                    <div className="structure-page__activity-img">
                                                        <img src={item.img} alt=""/>
                                                    </div>
                                                    <Link to={item.link} className="structure-page__activity-link">
                                                        {item.name}
                                                    </Link>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="structure-page__activity-col">
                                        {
                                            instituteItActivity2.slice(0,4).map((item,i) =>
                                                <div className="structure-page__activity-row d-flex align-items-center " key={i}>
                                                    <span className="structure-page__activity-link left-border-blue">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="structure-page__filial" style={{width:"100%"}}>
                                <h3 className="mt-4 mb-3">Филиал г. Санкт-Петербург</h3>
                                <div className="structure-page__filial-person">
                                    <div className="structure-page__filial-person-img" style={{width:"268px"}}>
                                        <img src={rukovod6} alt=""/>
                                    </div>
                                    <div className="structure-page__filial-person-info mt-3">
                                        <div className="structure-page__filial-person-name">
                                            Евсеев <br/> Антон Владимирович
                                        </div>
                                        <div className="structure-page__filial-person-status mt-2">
                                            Директор филиала
                                        </div>

                                    </div>
                                </div>

                                <div className="structure-page__filial-directions-list justify-content-between flex-wrap d-flex mt-5" style={{ maxWidth: "1000px" }}>
                                    {
                                        instituteItActivity2.slice(4,7).map((item,i) =>
                                            <div className="d-flex align-items-center structure-page__activity-row left-border-blue" key={i} style={{ maxWidth: "300px"}}>
                                                <span className="structure-page__activity-link">
                                                    {item.name}
                                                </span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </Fragment>
                }

                {
                    instituteItActivity.map((item,i) =>
                        <Fragment key={i}>
                            <Switch>
                                <Route path={item.link} component={InstituteDepartments} />
                            </Switch>
                        </Fragment>
                    )
                }
            </Fragment>
        );
    }
}
export default withRouter(InstituteIT)

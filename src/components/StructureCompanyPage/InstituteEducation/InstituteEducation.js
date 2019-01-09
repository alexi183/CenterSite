import React, {Component, Fragment} from "react";
import "./InstituteEducation.scss";
import {Route, Switch} from 'react-router-dom';
import {withRouter } from "react-router";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import InstituteDepartments from "../InstituteDepartments/InstituteDepartments"
import rukovodno from "../../../img/rukovod-no.png";

@inject('contentPagesStore')
@observer

class InstituteEducation extends Component {

    componentDidMount() {
        this.props.contentPagesStore.contentInstituteEducation()
    }

    render() {
        const {instituteEdu, instituteEduActivity, instituteEduActivity2} = this.props.contentPagesStore

        let path = this.props.history.location.pathname.split('/')[4];

        return (
            <Fragment>
                {
                    (path === undefined) &&
                    <Fragment>
                        <h2 className="content-page-header">Институт общего образования</h2>
                        <div className="d-flex justify-content-start flex-wrap">
                            {
                                instituteEdu.map((item,i) =>
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
                                            instituteEduActivity.map((item,i) =>
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
                                            instituteEduActivity2.map((item,i) =>
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

                        </div>
                    </Fragment>
                }

                {
                    instituteEduActivity.map((item,i) =>
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
export default withRouter(InstituteEducation)


import React, {Component, Fragment} from "react";
import "./ServiceDepartment.scss";
import {Route, Switch} from 'react-router-dom';
import {withRouter } from "react-router";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
/*import rukovodno from "../../../img/rukovod-no.png";
import rukovod5 from "../../../img/rukovod5.png";*/
import InstituteDepartments from "../InstituteDepartments/InstituteDepartments"

@inject('contentPagesStore')
@observer

class ServiceDepartment extends Component {

    componentDidMount() {
        this.props.contentPagesStore.contentServiceDepartment()
    }

    render() {
        const {serviceDepartmentActivity} = this.props.contentPagesStore

        let path = this.props.history.location.pathname.split('/')[4];

        return (
            <Fragment>
                {
                    (path === undefined) &&
                    <Fragment>
                        <h2 className="content-page-header">Обслуживающие подразделения</h2>
                        <div className="d-flex justify-content-start flex-wrap">
                            {/*{
                                serviceDepartment.map((item,i) =>
                                    <div className="administration-block" key={i}>
                                        {
                                            (item.img) &&
                                            <div className="administration-block__img">
                                                <img src={`${item.img ? item.img : rukovodno}`} alt="" />
                                            </div>
                                        }

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
*/}
                            <div className="structure-page__directions-block">
                                {/*<div className="structure-page__head mb-5">
                                    <div className="mb-2">Основные направления деятельности</div>
                                    <span>Институт создан для осуществления комплексной поддеpжки развития и использования новых информационных технологий и телекоммуникаций в сфере обpазования и науки России</span>
                                </div>*/}

                                <div className="structure-page__directions-list d-flex justify-content-between">
                                    <div className="structure-page__activity-col">
                                        {
                                            serviceDepartmentActivity.map((item,i) =>
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
                                </div>
                            </div>
                        </div>
                    </Fragment>
                }

                {
                    serviceDepartmentActivity.map((item,i) =>
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
export default withRouter(ServiceDepartment)

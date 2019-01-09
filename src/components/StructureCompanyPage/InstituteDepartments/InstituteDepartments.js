import React, {Component, Fragment} from "react";
import "./InstituteDepartments.scss";
import { withRouter } from "react-router";
import {inject, observer} from "mobx-react";
import rukovodno from "../../../img/rukovod-no.png";

@inject('contentPagesStore')
@observer

class InstituteDepartments extends Component {


    render() {
        const {instituteItActivity, instituteEduActivity, uchebDepartmentActivity, serviceDepartmentActivity} = this.props.contentPagesStore

        let path = this.props.history.location.pathname;

        let pathDepartment = this.props.history.location.pathname.split('/')[3];

        let pathDepartment2 = this.props.history.location.pathname.split('/')[4];

        this.pathDepartment2 = () => {
            if (pathDepartment2 === 'center-uprav') {
                return 'w33'
            } else {
                return ''
            }
        }

        this.storeFunc = (url) => {
            switch (url) {
                case 'ucheb-department':
                    return uchebDepartmentActivity
                case 'service-department':
                    return serviceDepartmentActivity
                case 'institut-obshchego-obrazovaniia':
                    return instituteEduActivity
                case 'institut-informatsionnykh-tekhnologii':
                    return instituteItActivity
                default:
                    return
            }
        }

        let filter = this.storeFunc(pathDepartment).filter((item) => item.link === path)

        return (
            <div className="structure-page__filial">
                {
                    filter.map((item,i) =>
                        <Fragment key={i}>
                            <div className="d-flex align-items-center mb-5">
                                <div className="mr-3">
                                    <img src={item.img} alt=""/>
                                </div>
                                <h2 className="content-page-header mb-0">{item.name}</h2>
                            </div>

                            <div className="structure-page__filial-person" key={i}>
                                <div className="structure-page__filial-person-img">
                                    {
                                        (item.imgPerson) ?
                                            <img src={item.imgPerson} alt=""/> :
                                            <img src={rukovodno} alt=""/>
                                    }
                                </div>
                                <div className="structure-page__filial-person-info mt-3">
                                    <div className="structure-page__filial-person-name">
                                        <div>{item.person.split(" ")[0]}</div>
                                        <div>{item.person.split(" ")[1]} {item.person.split(" ")[2]}</div>
                                    </div>
                                    <div className="structure-page__filial-person-status mt-2">
                                        {
                                            (item.status) &&
                                            <Fragment>
                                                {item.status}
                                            </Fragment>
                                        }

                                    </div>

                                    <div className="structure-page__filial-activity mt-4">
                                        {
                                            (item.activity) &&
                                            <Fragment>
                                                <div className="mb-1">Направления деятельности</div>
                                                <span>{item.activity}</span>
                                            </Fragment>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
                }
                <div className="structure-page__filial-directions-list d-flex flex-wrap mt-5">
                    {
                        filter.map((item) => item.departments.map((item2,i) =>
                                <div className={`d-flex align-items-center structure-page__activity-row left-border-blue ${this.pathDepartment2() }`} key={i} style={{ maxWidth: "300px"}}>
                                    <span className="structure-page__activity-link">
                                        {item2.name}
                                    </span>
                                </div>
                            )
                        )
                    }

                </div>
            </div>
        );
    }
}

export default withRouter(InstituteDepartments)

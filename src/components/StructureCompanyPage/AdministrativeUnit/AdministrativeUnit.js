import React, {Component, Fragment} from "react";
import "./AdministrativeUnit.scss";
import {inject, observer} from "mobx-react";

@inject('contentPagesStore')
@observer

class AdministrativeUnit extends Component {

    componentDidMount() {
        this.props.contentPagesStore.contentAdminDepartments()
    }

    render() {
        const {adminDepartments} = this.props.contentPagesStore

        return (
            <Fragment>
                <h2 className="content-page-header mb-5">Административные подразделения</h2>

                <div className="administrative-unit-page d-flex justify-content-start flex-wrap">
                    {
                        adminDepartments.map((item,i) =>
                            <div className="structure-page__activity-row d-flex align-items-center" key={i}>
                                <span className="structure-page__activity-link left-border-blue">
                                    {item.name}</span>
                            </div>
                        )
                    }
                </div>
            </Fragment>
        );
    }
}
export default AdministrativeUnit

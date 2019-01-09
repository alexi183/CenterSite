import React, {Component, Fragment} from "react";
import "./Administrative.scss";
import {inject, observer} from "mobx-react";
import director from "../../../img/rukovod1.png";
import rukovodno from "../../../img/rukovod-no.png";

@inject('contentPagesStore')
@observer

class Administrative extends Component {

    componentDidMount() {
        this.props.contentPagesStore.contentAdminCompany()
    }

    render() {
        const {adminCompany} = this.props.contentPagesStore

        return (
            <Fragment>

                <h2 className="content-page-header">Руководство</h2>

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
            </Fragment>
        );
    }
}
export default Administrative

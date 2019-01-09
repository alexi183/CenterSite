import React, {Component} from 'react'
// import {NavLink} from "react-router-dom";

export default class EmployeeCard extends Component{
    render() {

        const {
            thumb_urls,
            surname,
            name,
            patronymic,
            position,
            office,
            work_phone,
            mobile_phone,
            email,
            department,
            deparnmets_list,
            handleDepartmentLink
        } = this.props

        return (
            <div className="phonebook__item">
                <i
                    className='phonebook__photo'
                    style={{backgroundImage: `url('${thumb_urls}')`}}
                ></i>
                <div className="phonebook__details-wrapper">
                    <div className="phonebook__name-block">
                        <p className='phonebook__name'>
                            {surname && surname}
                        </p>
                        <p className='phonebook__name'>
                            {name && name} {patronymic && patronymic}
                        </p>
                        <p className='phonebook__position'>
                            {position && position.name}
                        </p>
                    </div>
                    <div className='phonebook__details-section'>
                        <span className='phonebook__details-section-title'>
                            Адрес
                        </span>
                        <p className='phonebook__details-text'>
                            {office && office.address}
                        </p>
                    </div>
                    <div className='phonebook__details-section'>
                        <span className='phonebook__details-section-title'>
                            Телефон
                        </span>
                        <p className='phonebook__details-text'>
                            <a href={`tel:${office && office.phone}`}>{office && office.phone + ' '}</a>
                            {
                                work_phone &&
                                <span className='phonebook__details-text'>
                                    Доб.: {work_phone}
                                </span>
                            }
                        </p>
                        {/* {
                            work_phone &&
                            <p className='phonebook__details-text'>
                                Доб.: {work_phone}
                            </p>
                        } */}
                        {
                            mobile_phone &&
                            <p className='phonebook__details-text'>
                                <a href={`tel:${mobile_phone}`}>{mobile_phone}</a> (моб.)
                            </p>
                        }
                    </div>
                    <div className='phonebook__details-section'>
                        <span className='phonebook__details-section-title'>
                            e-mail
                        </span>
                        {
                            email &&
                            <p className='phonebook__details-text'>
                                <a href={`mailto:${email}`}>{email}</a>
                            </p>
                        }

                    </div>
                    {
                        department &&
                        <span
                            className='phonebook__details-section-title phonebook__details-section-title_link'
                            // to={`/content/telefonnyi-spravochnik/?department=${department.id}`}>
                            onClick={()=>handleDepartmentLink(department.id)}
                        >
                            {deparnmets_list.length > 0 && deparnmets_list.filter(el=> {return +el.value === +department.id})[0].label}
                        </span>
                    }
                </div>
            </div>
        )
    }
}
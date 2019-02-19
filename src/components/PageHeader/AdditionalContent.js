import {NavLink} from "react-router-dom"
import React from "react"

const AdditionalContent = (location) => {
    const currentPath = location.pathname.split('/content/')[1]
    return (
        <div>
            {
                (currentPath === 'finansovo-khoziaistvennaia-deiatelnost' ||
                    currentPath === 'finansovo-khoziaistvennaia-deiatelnost-2') &&
                <div className="page-header__links">
                    <ul className="page-header__link-list d-flex">
                        <li className='page-header__link '>
                            <NavLink activeClassName='page-header__link_active'
                                     to={`/content/finansovo-khoziaistvennaia-deiatelnost`}>Актуальная
                                информация</NavLink>
                        </li>
                        {/* <li className='page-header__link '>
                            <NavLink activeClassName='page-header__link_active'
                                     to={`/content/finansovo-khoziaistvennaia-deiatelnost-2`}>Архив</NavLink>
                        </li> */}

                    </ul>
                </div>
            }
        </div>
    )
}

export default AdditionalContent
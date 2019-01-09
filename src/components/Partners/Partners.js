import React, {Component} from 'react'
import {inject, observer} from "mobx-react"
import Swiper from 'react-id-swiper'
import './Partners.scss'

import Spinner from '../Spinner/Spinner'

const dateSliderParams = {
    slidesPerView: 4,
    shortSwipes: true,
    spaceBetween: 30,
    autoplay: {
        delay: 3000,
    }
}

@inject('partnersStore')
@observer

class Partners extends Component {
    componentWillMount() {
        this.props.partnersStore.getPartners()
    }

    render() {
        const {
            partnersStore: {
                partnersList,
            }
        } = this.props

        if(partnersList === null) {
            return <div style={{height: '146px'}}><Spinner /></div>
        }

        return (
            <section className='partners'>
                <div className="section-wrapper">
                    <div className="row mb-4 align-items-center">
                        <div className="col">
                            <h2 className='title-section'>
                                Информационно-образовательные ресурсы
                            </h2>
                        </div>
                        <div className="col text-right flex-grow-0">

                        </div>
                    </div>


                    <div className="partners-slider">
                        {
                            partnersList.items && <Swiper {...dateSliderParams} ref={node => {
                                if (node) this.swiper = node.swiper
                            }}>
                                {
                                    partnersList && partnersList.items.map((el, i) =>
                                        <div key={i} >
                                            <a target='_blank' rel="noopener noreferrer" href={el.url} className='text-center partners__item'>
                                                <img src={el.thumb_urls.previewPicture
                                                    ? el.thumb_urls.previewPicture.original
                                                    : ""} alt=""/>
                                            </a>
                                        </div>
                                    )
                                }
                            </Swiper>

                        }
                    </div>
                </div>
            </section>
        )
    }
}
export default Partners
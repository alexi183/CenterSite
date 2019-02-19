import './Directions.scss'
import React, {Component} from 'react'
import PageTitleNavBlock from "../../PageTitleNavBlock/PageTitleNavBlock"
import {inject} from 'mobx-react'
import Select from 'react-select'
import DocumentTitle from "react-document-title";
import {GeoObject, Map, Placemark, YMaps} from 'react-yandex-maps'
import addresses from './addresses'


@inject('contactsStore')
class Directions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapIndex: 0,
        };
        this.onAddressChange = this.onAddressChange.bind(this);
    }

    onAddressChange = e => {
        this.setState({
            mapIndex: e.value
        })
    }

    render() {
        const {
            mapIndex
        } = this.state

        return (
            <DocumentTitle title="Как проехать">
            <section className='section-wrapper directions'>
                <PageTitleNavBlock data={this.props.contactsStore.contactsNav}/>
                <div className="content-page">
                    <div className="section-wrapper section-wrapper_sm">
                        <div className="directions__select-wrapper">
                            <Select
                                className='react-select-container'
                                classNamePrefix="react-select"
                                options={addresses}
                                defaultValue={addresses[mapIndex]}
                                onChange={this.onAddressChange}
                            />
                        </div>
                        <p className='mb-0'><b>Как добраться:</b></p>
                        <p>{addresses[mapIndex].get_to}</p>
                        <div className="directions__map-container">
                            <div className="spinner"></div>
                            <YMaps>
                                <Map
                                    state={{
                                        center: addresses[mapIndex].map_center,
                                        zoom: addresses[mapIndex].zoom,
                                        controls: ['zoomControl', 'fullscreenControl'],
                                    }}
                                    width='100%'
                                    height={500}
                                    modules={['control.ZoomControl', 'control.FullscreenControl']}
                                >
                                    <Placemark
                                        geometry={addresses[mapIndex].mark_coord}
                                        options={{
                                            preset: 'islands#nightDotIcon',
                                        }}
                                    />
                                    <GeoObject
                                        geometry={{
                                            type: 'LineString',
                                            coordinates: addresses[mapIndex].walk_route,
                                        }}
                                        properties={{}}
                                        options={{
                                            strokeColor: '#30bf70',
                                            strokeWidth: 4,
                                            strokeOpacity: 0.9,
                                        }}
                                    />
                                    <GeoObject
                                        geometry={{
                                            type: 'LineString',
                                            coordinates: addresses[mapIndex].car_route,
                                        }}
                                        properties={{}}
                                        options={{
                                            strokeColor: '#eb5155',
                                            strokeWidth: 4,
                                            strokeOpacity: 0.9,
                                        }}
                                    />
                                </Map>
                            </YMaps>
                        </div>
                        <div className='directions__legend'>
                            <div><span className='directions__car-route'></span>На автомобиле</div>
                            <div><span className='directions__walk-route'></span>Пешком от станции метро</div>
                        </div>
                    </div>
                </div>
            </section>
            </DocumentTitle>
        )
    }
}

export default Directions
import React, {Component} from 'react'
import './HeaderCircle.scss'

class HeaderCircle extends Component {

    slideActive = () => {

        switch (this.props.slideIndex+1) {
            case 1:
                return ('header-circle_sea');
            case 2:
                return ('header-circle_green1');
            case 3:
                return ('header-circle_blue');
            case 4:
                return ('header-circle_green2');
            case 5:
                return ('header-circle_green1same');
            default:
                break
        }
    };

    render() {
        const {index} = this.props;

        return (

            <div className={`${this.slideActive()} header-circle main-circle`}>
                {
                    index.map((item, i) =>
                        <div className="header-circle__item" key={i}>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default HeaderCircle

HeaderCircle.defaultProps = {
    index: [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        },
        {
            id: 4
        }
    ]
};
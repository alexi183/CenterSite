import React, {Component} from 'react'
import { withRouter } from "react-router";
import './fonts.scss'
import './variables.scss'
import './Layout.scss'
import './bootstrap-reboot.scss'
import './bootstrap-custom.scss'
import './react-select.scss'
import {inject, observer} from "mobx-react";

@inject('naviStore')
@observer
class Layout extends Component {

    render() {

        return (
            <div className='layout'>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(Layout)
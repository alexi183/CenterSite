import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import createMarkup from "../../../helpers/dangerouslySetHTML";


class InformatizationComponentContent extends Component {
    state = {
        menuItemContent: null,
        loading: true
    };
    componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id);
        axios.get(`/api/v1/pages/${id}`).then(response => {
            console.log(response);
            this.setState({
                menuItemContent: response.data,
                loading: false
            });
        })
            .catch(error => {
                console.log(error);
                window.location.replace("/404");
            });;
    }

    componentDidUpdate(prevProps) {
        const { id } = this.props.match.params;
        console.log(id);
        if (this.props.location !== prevProps.location) {
            axios.get(`/api/v1/pages/${id}`).then(response => {
                console.log(response);
                this.setState({
                    menuItemContent: response.data,
                    loading: false
                });
            });
        }
    }

    render() {
        if (this.state.menuItemContent === null) {
            return null;
        }

        return (
            <div className="informatization-page__content">
                <div
                    dangerouslySetInnerHTML={createMarkup(
                        this.state.menuItemContent.content
                    )}
                />
            </div>
        );
    }
}

export default withRouter(InformatizationComponentContent);

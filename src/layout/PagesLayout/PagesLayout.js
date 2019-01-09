import React, {Component, Fragment} from 'react'
import Footer from "../../containers/Footer/Footer"
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import { withRouter } from "react-router";

class PagesLayout extends Component {

    render() {

        // let path = this.props.history.location.pathname;

        return (
            <Fragment>
                {/*{*/}
                {/*(path !== '/content/struktura-i-organy-upravleniia/rukovodstvo') &&*/}
                <header>
                    <HeaderTop/>
                </header>
                {/*}*/}

                <main>
                    {this.props.children}
                </main>

                {/*{*/}
                {/*(path !== '/content/struktura-i-organy-upravleniia/rukovodstvo') &&*/}
                <footer>
                    <Footer/>
                </footer>
                {/*    }*/}

            </Fragment>
        )
    }
}

export default withRouter(PagesLayout)
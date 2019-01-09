import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {Provider} from "mobx-react";
import createBrowserHistory from "history/createBrowserHistory";
import {ThroughProvider} from "react-through";
import uuid from "uuid";
import moment from "moment";
import "moment/locale/ru";

import * as serviceWorker from "./serviceWorker";
import ScrollToTop from "./layout/ScrollToTop/ScrollToTop";
import Layout from "./layout/Layout/Layout";

import Home from "./containers/Home/Home";

import contentPagesStore from "./stores/contentPagesStore";
import headerStore from "./stores/headerStore";
import eventsStore from "./stores/eventsStore";
import naviStore from "./stores/naviStore";
import newsStore from "./stores/newsStore";
import mediaStore from './stores/mediaStore';
import partnersStore from "./stores/partnersStore";
import projectsStore from "./stores/projectsStore"
import SelectHeaderStore from "./stores/SelectHeaderStore";
import contactsStore from "./stores/contactsStore";
import eventCalendarStore from './stores/eventCalendarStore'
import presentationStore from './stores/presentationStore';
import educateEventsStore from './stores/educateEventsStore'

import PagesLayout from "./layout/PagesLayout/PagesLayout";
import NewsPage from "./components/NewsPage/NewsPage";
import EventsPage from "./components/EventsPage/EventsPage";
import MediaPage from "./components/MediaPage/MediaPage";
import PageContent from "./components/PageContent/PageContent";
import ProjectsPage from "./components/ProjectsPage/ProjectsPage";
import Feedback from "./components/Contacts/Feedback/Feedback";
import NoMatch from "./components/NoMatch/NoMatch";
import HistoryHelp from "./components/HistoryHelp/HistoryHelp";
import AdministrationCompanyPage from  "./components/AdministrationCompanyPage/AdministrationCompanyPage";
import Directions from "./components/Contacts/Directions/Directions";
import Information from "./components/Contacts/Information/Information";
import PhoneBook from "./components/Contacts/PhoneBook/PhoneBook";
import Search from "./components/Search/Search";
import EducationHeraldComponent from './components/magazineComponent/EducationHeraldComponent/EducationHeraldComponent';
import InformatizationComponent from './components/magazineComponent/InformatizationComponent/InformatizationComponent';
import Documents from "./components/Documents/Documents";
import EventsCalendarPage from './components/EventsCalendar/EventsCalendarPage'
import PresentationPage from './components/PresentationPage/PresentationPage'
import DevelopPage from "./components/DevelopPage/DevelopPage";
import StructureCompanyPage from "./components/StructureCompanyPage/StructureCompanyPage";

const root = document.getElementById("root");

const history = createBrowserHistory();

const stores = {
    contentPagesStore,
    headerStore,
    eventsStore,
    naviStore,
    newsStore,
    mediaStore,
    partnersStore,
    projectsStore,
    SelectHeaderStore,
    contactsStore,
    eventCalendarStore,
    presentationStore,
    educateEventsStore
};

    window.onload = function() {
        if (stores.eventsStore.cookie.value === undefined) {
        stores.eventsStore.setSessionCookie(moment().unix() +  uuid())
        console.log('new one', stores.eventsStore.cookie)
        }
    }

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <ThroughProvider>
                <ScrollToTop>
                    <Switch>
                        <Route path="/404" component={NoMatch}/>
                        <Layout>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <PagesLayout>
                                    <Switch>
                                        <Route path="/news" component={NewsPage}/>
                                        <Route path="/events" component={EventsPage}/>
                                        <Route path="/media" component={MediaPage}/>
                                        <Route path="/projects" component={ProjectsPage}/>
                                        <Route path="/search" component={Search}/>
                                        <Route path="/presentations" component={PresentationPage} />
                                        <Route path="/content/forma-obratnoi-sviazi" component={Feedback}/>
                                        <Route path="/content/istoricheskaia-spravka" component={HistoryHelp}/>
                                        <Route path="/content/struktura-i-organy-upravleniia" component={StructureCompanyPage} /> {/* DevelopPage*/}
                                        <Route path="/content/rukovodstvo" component={AdministrationCompanyPage}/>
                                        <Route path="/content/kak-proekhat" component={Directions}/>
                                        <Route path="/content/rekvizity" component={Information}/>
                                        <Route path="/content/telefonnyi-spravochnik" component={PhoneBook}/>
                                        <Route path="/content/informatizatsiia-obrazovaniia-i-nauki" component={InformatizationComponent} />
                                        <Route path="/content/vestnik-obrazovaniia" component={EducationHeraldComponent} />
                                        <Route path="/content/dokumenty" component={Documents}/>
                                        <Route path="/event-calendar" component={EventsCalendarPage} />
                                        {/* <Route path="/content/full-event-in-calendar" component={FullEventInCalendar} /> */}
                                        <Route path="/content/:page" component={PageContent}/>
                                        <Route path="/page-develop" component={DevelopPage} />
                                        <Redirect to="/404"/>
                                    </Switch>
                                </PagesLayout>
                            </Switch>
                        </Layout>
                    </Switch>
                </ScrollToTop>
            </ThroughProvider>
        </Router>
    </Provider>,
    root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

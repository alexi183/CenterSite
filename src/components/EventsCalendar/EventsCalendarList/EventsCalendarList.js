import React, { Component } from "react";
import "./EventsCalendarList.scss";
import axios from "axios";
// import moment from "moment";
// import "moment/locale/ru";
import { Link, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import EventsCalendarCard from "../EventsCalendarCard/EventsCalendarCard";
import PDFslider from "../../PDFslider/PDFslider";
import CollapseBlockType2 from "../../CollapseBlockType2/CollapseBlockType2";
import pdf_icon from "../../../img/fileIcons/pdf.png";

@inject("eventCalendarStore",
    "educateEventsStore")
@observer
class EventsCalendarList extends Component {
    state = {
        docs: {},
        showModal: false,
        pdfLink: null,
    };

    getDocs = () => {
        this.setState({ loading: true });
        axios
            .get("/api/v1/edu-events-main-documents/")
            .then(response => {
                console.log("response.data ", response.data);
                this.setState({
                    docs: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleModalOpenClick = el => {
        console.log(el)
        this.setState({
          showModal: true,
          pdfLink: `${el[0].download_url}`,
        });
        // console.log(el.download_url)
        document.body.style.overflow = "hidden";
      };

      handleCloseModal = () => {
        this.setState({ showModal: false });
        document.body.style.overflow = "auto";
      };

    componentDidMount() {
        this.getDocs()
        document.addEventListener('keyup', (event) => {
            if ( event.keyCode === 27 ) {
                this.handleCloseModal()
            }
        });
    }

    renderDocs = (data, level) => {
        if (level < 2) {
          return (
            <div
              className={`documents__wrapper ${
                level === 1 ? "documents__wrapper_first-level" : ""
              }`}
              style={{ paddingLeft: `${level > 1 ? 17 * level : ""}px` }}
            >
              {data.child.length > 0 &&
                data.child.map((el, i) => {
                  return (
                    <div key={el.id} className={`documents__row row`}>
                        <div className="col-1">
                        {/* {extentionChecker(el.file)} */}
                          <img
                            src={pdf_icon}
                            alt="pdf_icon"
                            className="documents__pdf-icon"
                          />
                        </div>
                      <div className="col-11">
                        {el.file !== undefined ? (
                          <div
                            // target="_blank"
                            //   rel="noopener noreferrer"
                            //   href={`/uploads/${el.file.dir}/${el.file.filename}`}
                            className="documents__doc-link"
                            onClick={() => this.handleModalOpenClick(el.uploaded_files)}
                          >
                            {el.title}
                          </div>
                        ) : (
                          <div
                            //   target="_blank"
                            //   rel="noopener noreferrer"
                            //   href={`${el.uploaded_files.map(
                            //     item => item.download_url
                            //   )}`}
                            className="documents__doc-link"
                            onClick={() => {
                              this.handleGalleryClick(el.uploaded_files);
                            }}
                          >
                            {el.title}
                          </div>
                        )}
                        {/* <a
                                href={`/uploads/${el.file.dir}/${el.file.filename}`}
                                className="documents__doc-link"
                              >
                                {el.title}
                              </a> */}
                      </div>
                    </div>
                  );
                })}
              {data.children &&
                Object.keys(data.children).length > 0 &&
                Object.keys(data.children).map((el, i) => {
                  return (
                    <div key={i} className="documents__inner-rows">
                      {this.renderDocs(data.children[el], level + 1)}
                    </div>
                  );
                })}
            </div>
          );
        }
        return (
          <div
            className={`documents__wrapper ${
              level === 1 ? "documents__wrapper_first-level" : ""
            }`}
            style={{ paddingLeft: `${level > 1 ? 17 * level : ""}px` }}
          >
            <CollapseBlockType2 title={data.name} noChilds={data.child}>
              {data.child &&
                data.child.map((el, i) => {
                  return (
                    <div key={el.id} className={`documents__row row`}>
                        <div className="col-1">
                        {/* {extentionChecker(el.file)} */}
                          <img
                            src={pdf_icon}
                            alt="pdf_icon"
                            className="documents__pdf-icon"
                          />
                        </div>
                      <div className="col-11">
                        {/* {el.uploaded_files.download_url.split(".").pop() === "pdf" ? ( */}
                          <div
                            //   href={`/uploads/${el.file.dir}/${el.file.filename}`}
                            //   target="_blank"
                            //   rel="noopener noreferrer"
                            className="documents__doc-link"
                            onClick={() => this.handleModalOpenClick(el.uploaded_files)}
                          >
                            {el.title}
                          </div>
                        {/* ) : (
                          <div
                            //   target="_blank"
                            //   rel="noopener noreferrer"
                            //   href={`${el.uploaded_files.map(
                            //     item => item.download_url
                            //   )}`}
                            className="documents__doc-link"
                            onClick={() => {
                              this.handleGalleryClick(el.file);
                            }}
                          >
                            {el.title}
                          </div>
                        )} */}
                      </div>
                    </div>
                  );
                })}
              {data.children &&
                Object.keys(data.children).length > 0 &&
                Object.keys(data.children).map((el, i) => {
                  return (
                    <div key={i} className="documents__inner-rows">
                      {this.renderDocs(data.children[el], level + 1)}
                    </div>
                  );
                })}
            </CollapseBlockType2>
          </div>
        );
      };

    render() {
        const { docs } = this.state;
        const {
            eventCalendarStore: { eventsCalendarList },
            // educateEventsStore: { parsedMonth }
        } = this.props;

        if(docs === null) {
            return null
        }

        console.log(this.state.pdfLink)

    return (
      <React.Fragment>
          {/* <PageHeader {...pageHeader} /> */}
        <div className="events-calendar documents__content section-wrapper" style={{paddingLeft: '0',marginTop: '28px'}}>
          {Object.keys(docs).length > 0 && this.renderDocs(docs, 2)}
        </div>
        {/* <span className="events-calendar-titles">
          Государственные праздники
        </span> */}
        <ul className="news-page__list">
          {eventsCalendarList &&
            eventsCalendarList.map(item => (
              //   console.log(item)
              <div key={item.id} className="events-card__block-sm-grid">
                <Link to={`/event-calendar/${item.id}`} className="news-page__list__item__a">
                  <EventsCalendarCard
                    date_start={item.date_start}
                    date_end={item.date_end}
                    title={item.title}
                    // image={item.thumb_urls.previewPicture.original}
                    image={item.thumb_urls.previewPicture
                      ? item.thumb_urls.previewPicture.original
                      : ""}
                  />
                </Link>
              </div>
            ))}
        </ul>
        {this.state.showModal && (
            <PDFslider
              onClose={this.handleCloseModal}
              showModal={this.state.showModal}
              pdf={this.state.pdfLink}
            />
          )}
      </React.Fragment>
    );
  }
}

export default withRouter(EventsCalendarList);

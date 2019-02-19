import React, { Component } from "react";
import "./Documents.scss";
import PageTitleNavBlock from "../PageTitleNavBlock/PageTitleNavBlock";
import axios from "axios";
import DocumentTitle from "react-document-title";
import CollapseBlockType2 from "../CollapseBlockType2/CollapseBlockType2";
// import pdf_icon from "../../img/PDF-icon.png";

import download_btn from "../../img/download-button.svg";

import PDFslider from "../PDFslider/PDFslider";
import Lightbox from "react-image-lightbox";

import extentionChecker from '../../helpers/extentionChecker'

// import renderDocs from '../../helpers/renderDocs'

export default class Documents extends Component {
  state = {
    docs: {},
    showModal: false,
    pdfLink: null,
    // numPages: null,
    // pageNumber: 1
    photoIndex: 0,
    isOpen: false
  };

  componentDidMount() {
    this.getDocs();
    document.addEventListener('keyup', (event) => {
        if ( event.keyCode === 27 ) {
            this.handleCloseModal()
        }
    });
  }

  getDocs = () => {
    this.setState({ loading: true });
    axios
      .get("/api/v1/documents/")
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

  handleGalleryClick = el => {
    this.setState({
      pdfLink: `/uploads/${el.dir}/${el.filename}`,
      isOpen: true
    });
  };

  handleModalOpenClick = el => {
    this.setState({
      showModal: true,
      pdfLink: `/uploads/${el.dir}/${el.filename}`
    });
    document.body.style.overflow = "hidden";
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    document.body.style.overflow = "auto";
  };
  

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
                    {extentionChecker(el.file)}
                      {/* <img
                        src={pdf_icon}
                        alt="pdf_icon"
                        className="documents__pdf-icon"
                      /> */}
                    </div>
                  {/* <div className="col-1">
                          <img
                            src={pdf_icon}
                            alt="pdf_icon"
                            className="documents__pdf-icon"
                          />
                        </div> */}
                  <div className="col-11">
                    {el.file !== undefined ? (
                      <div
                        // target="_blank"
                        //   rel="noopener noreferrer"
                        //   href={`/uploads/${el.file.dir}/${el.file.filename}`}
                        className="documents__doc-link"
                        onClick={() => this.handleModalOpenClick(el.file)}
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
                          this.handleGalleryClick(el.file);
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
                    {extentionChecker(el.file)}
                      {/* <img
                        src={pdf_icon}
                        alt="pdf_icon"
                        className="documents__pdf-icon"
                      /> */}
                    </div>
                  <div className="col-11">
                    {el.file.filename.split(".").pop() === "pdf" ? (
                      <div
                        //   href={`/uploads/${el.file.dir}/${el.file.filename}`}
                        //   target="_blank"
                        //   rel="noopener noreferrer"
                        className="documents__doc-link"
                        onClick={() => this.handleModalOpenClick(el.file)}
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
                          this.handleGalleryClick(el.file);
                        }}
                      >
                        {el.title}
                      </div>
                    )}
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
    const { photoIndex, isOpen } = this.state;

    return (
      <DocumentTitle title="Документы">
        <section className="documents section-wrapper">
          <PageTitleNavBlock
            data={{
              backgroundColor: "#005a80",
              fontColor: "#fff",
              bgImage: "blue",
              title: "Документы",
              breadCrumbs: [
                { title: "Главная", link: "/" },
                { title: "Документы", link: "/content/dokumenty" }
              ]
            }}
          >
            <div className="mb-5" />
          </PageTitleNavBlock>

          <div className="documents__content section-wrapper section-wrapper_sm">
            {Object.keys(docs).length > 0 && this.renderDocs(docs, 1)}
          </div>
          {this.state.showModal && (
            <PDFslider
              onClose={this.handleCloseModal}
              showModal={this.state.showModal}
              pdf={this.state.pdfLink}
            />
          )}
          {isOpen && (
            <React.Fragment>
              <Lightbox
                mainSrc={this.state.pdfLink}
                onCloseRequest={() => this.setState({ isOpen: false })}
              />
              <a
                href={this.state.pdfLink}
                className="lightbox-pdfslider__download"
                download
              >
                <img src={download_btn} alt="" />
              </a>
            </React.Fragment>
          )}
        </section>
      </DocumentTitle>
    );
  }
}

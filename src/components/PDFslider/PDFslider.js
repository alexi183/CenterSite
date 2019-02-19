import React, { Component } from "react";
import "./PDFslider.scss";
import { Document, Page } from "react-pdf/dist/entry.webpack";
// import { Document, Page } from 'react-pdf/dist/entry.webpack';
import "react-pdf/dist/Page/AnnotationLayer.css";
import pdf from "../../img/test.pdf";
import left_arrow from "../../img/left-arrow.svg";
import right_arrow from "../../img/right-arrow.svg";
import download_btn from "../../img/download-button.svg";

// import { pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
//   pdfjs.version
// }/pdf.worker.js`;

class PDFslider extends Component {
  state = {
    // showModal: this.props.showModal,
    numPages: null,
    pagesRendered: null,
    pageNumber: 1
  };

  //   handleShowMessageClick = () => this.setState({ showModal: true });
  //   handleCloseModal = () => this.setState({ showModal: false });

  onDialogClick(event) {
    event.stopPropagation();
  }

  // renderLoader = () => {
  //   return (
  //   <Document>loading</Document>
  //   )
  // }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ 
      numPages,
      pagesRendered: 0,
     });
  };

  onRenderSuccess = () =>
    this.setState({
      pagesRendered: 1,
    });

  onFileChangeNext = event => {
    this.setState({
      pageNumber: this.state.pageNumber + 1
    });
    this.onDialogClick(event);
  };

  onFileChangePrev = event => {
    this.setState({
      pageNumber: this.state.pageNumber - 1
    });
    this.onDialogClick(event);
  };

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div className="section-wrapper">
        {/* <div onClick={this.handleShowMessageClick} className="register">
          Gallery
        </div> */}
        {/* {this.props.showModal ? ( */}
        <div
          style={{
            position: "fixed",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.75)",
            overflow: "auto",
            zIndex: "999",
            animation: "fadein 0.433s"
          }}
          onClick={this.props.onClose}
        >
          {/* <div className="pdf-slider"> */}
            {/* <Document
              options={{
                cMapUrl: "cmaps/",
                cMapPacked: true
              }}
              file={this.props.pdf}
              loading=""
              // renderMode="svg"
              onLoadSuccess={this.onDocumentLoadSuccess}
              onClick={this.onDialogClick}
            >
              <Page pageNumber={pageNumber} onRenderSuccess={this.onRenderSuccess} />
            </Document> */}
            {/* <div className="tool-bar" onClick={this.onDialogClick}>
              <div className="pdf-slider__page-count" style={{ color: "#fff" }}>
                Страница {pageNumber} из {numPages}
              </div>
              <div className="pdf-slider__tool-container">
                <a
                  href={this.props.pdf}
                  className="pdf-slider__download"
                  download
                >
                  <img src={download_btn} alt="" />
                </a>
                <div
                  className="pdf-slider__close"
                  onClick={this.props.onClose}
                />
              </div>
            </div> */}
          {/* </div> */}
          <iframe src={this.props.pdf} title="PortletIFrameWidget" className="iframe" />
          {/* {pageNumber > 1 ? (
            <button onClick={this.onFileChangePrev} className="btn-prev">
              <img src={left_arrow} className="pdf-slider__img" alt="" />
            </button>
          ) : (
            ""
          )}
          {pageNumber !== numPages ? (
            <button
              className="btn-next"
              onClick={this.onFileChangeNext}
              disabled={pageNumber === numPages}
            >
              <img src={right_arrow} className="pdf-slider__img" alt="" />
            </button>
          ) : (
            ""
          )} */}
        </div>
      </div>
    );
  }
}
export default PDFslider;

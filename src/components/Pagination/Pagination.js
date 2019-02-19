import React, { Component } from "react";
import "./Pagination.scss";

import { Link, withRouter } from "react-router-dom";
import queryString from "query-string";

import Pagination from "react-paginating";
import { ArrowType2 } from "../Elements/Icons/Icons";

class PaginationComponent extends Component {
  render() {

    let locationUrl = queryString.parse(this.props.location.search)
    let urlDate = locationUrl['date'] !== undefined ? "&date=" + locationUrl['date'].trim() : ""
    let urlCategory = locationUrl['category'] !== undefined ? "&category=" + locationUrl['category'].trim() : ""
    let urlType = locationUrl['type'] !== undefined ? "&type=" + locationUrl['type'].trim() : ""

    return (
      <div className="Pagination">
        <Pagination
          total={this.props.total}
          limit={this.props.limit}
          currentPage={this.props.page}
        >
          {({ pages, currentPage, hasNextPage, hasPreviousPage }) => (
            <div>
              {/* <button
                            onClick={() => this.props.offsetHandler(1)}
                        >
                            first
                        </button> */}
              {hasPreviousPage && (
                <Link
                  to={`${this.props.link}/?page=${currentPage - 1}${
                    this.props.query ? "&text=" + this.props.query : ""
                  }${urlCategory}${urlType}${urlDate}`}
                  className="Pagination__page-btn"
                  onClick={() => this.props.pageHandler(currentPage - 1)}
                >
                  <span className="Pagination__arrow__left">
                    {ArrowType2(`#000`)}
                  </span>
                  назад
                </Link>
              )}
              {pages.map(page => {
                let activePage = null;
                if (currentPage === page) {
                  activePage = {
                    textDecoration: "underline",
                    pointerEvents: "none"
                  };
                }
                return (
                  <Link
                    to={`${this.props.link}/?page=${page}${
                      this.props.query ? "&text=" + this.props.query : ""
                    }${urlCategory}${urlType}${urlDate}`}
                    className="Pagination__page-btn"
                    key={page}
                    style={activePage}
                    // onClick={() => this.props.pageHandler(page)}
                  >
                    {"0" + page}
                  </Link>
                );
              })}
              {hasNextPage && (
                <Link
                  to={`${this.props.link}/?page=${currentPage + 1}${
                    this.props.query ? "&text=" + this.props.query : ""
                  }${urlCategory}${urlType}${urlDate}`}
                  className="Pagination__page-btn"
                  // onClick={() => this.props.pageHandler(currentPage + 1)}
                >
                  вперед{" "}
                  <span className="Pagination__arrow">
                    {ArrowType2(`#000`)}
                  </span>
                </Link>
              )}
            </div>
          )}
        </Pagination>
      </div>
    );
  }
}

export default withRouter(PaginationComponent);

import React, { Component } from "react";
import "./MediaPageList.scss";

import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import MediaCard from "../MediaCard/MediaCard";
import PaginationComponent from "../../Pagination/Pagination";
// import queryString from "query-string";

@inject("mediaStore")
@observer
class MediaPageList extends Component {
  state = {
    link: "/media"
  };

  render() {
    const {
      mediaStore: { mediaList, total, page, limit }
    } = this.props;

    // let location = queryString.parse(this.props.location.search)

    return (
      <React.Fragment>
        <div className="media-page__blocks-sm-row">
          {mediaList &&
            mediaList.map(el => (
              <MediaCard key={el.id} id={el.id} name={el.name} type={el.type} image={(el.thumb_urls) ? el.thumb_urls.image : ''}/>
            ))}
        </div>
        {
              total > 1 ?
              <PaginationComponent
              link={this.state.link}
              total={total}
              page={page}
              limit={limit}
            />
            : null
            }
      </React.Fragment>
    );
  }
}

export default withRouter(MediaPageList);

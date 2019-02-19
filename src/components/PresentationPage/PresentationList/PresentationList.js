import React, { Component } from "react";
import "./PresentationList.scss";

import PaginationComponent from "../../Pagination/Pagination";
import { inject, observer } from "mobx-react";

import PDF_icon from "../../../img/PDF-icon.png";

@inject("presentationStore")
@observer
class PresentationList extends Component {
  state = {
    link: "/presentations"
  };

  render() {
    const {
      presentationStore: { presentationsList, total, page, limit }
    } = this.props;
    return (
      <React.Fragment>
        <div className="presentation-page__list">
          {presentationsList.length !== 0
            ? presentationsList &&
              presentationsList.map(author => (
                <React.Fragment>
                  <span className="presentation-page__list__title">
                  {/* {console.log(author.presentations)} */}
                    {author.name}
                  </span>
                  <span className="presentation-page__list__title__position">
                    {author.position}
                  </span>
                  <div className="presentation-page__list__container">
                    {
                      author.presentations.map(item =>
                        ListItem(
                          item.id,
                          item.name,
                          item.uploaded_files.map(item => item.download_url)
                        )
                      )
                 }
                  </div>
                </React.Fragment>
              ))
            : <div>Презентации отсутствуют</div>}

          {/* {
              (this.props.presentationStore.searchResponce.length === 0) ? <div>ничего нет</div> : ""
          } */}
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

const ListItem = (id, name, link) => {
  return (
    <a key={id} href={link} className="list-item">
      <div className="list-item__icon">
        <img src={PDF_icon} alt="" />
      </div>
      <span className="list-item__title">{name}</span>
    </a>
  );
};

export default PresentationList;

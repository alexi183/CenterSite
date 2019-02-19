import React from "react";
import CollapseBlockType2 from "../components/CollapseBlockType2/CollapseBlockType2";
import pdf_icon from "../img/fileIcons/pdf.png";

export default function renderDocs(data, level) {
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
                  <img
                    src={pdf_icon}
                    alt="pdf_icon"
                    className="documents__pdf-icon"
                  />
                </div>
                <div className="col-11">
                  {el.file !== undefined ? (
                    <a
                    target="_blank"
                      rel="noopener noreferrer"
                      href={`/uploads/${el.file.dir}/${el.file.filename}`}
                      className="documents__doc-link"
                    >
                      {el.title}
                    </a>
                  ) : (
                    <a
                    target="_blank"
                      rel="noopener noreferrer"
                      href={`${el.uploaded_files.map(
                        item => item.download_url
                      )}`}
                      className="documents__doc-link"
                    >
                      {el.title}
                    </a>
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
                {renderDocs(data.children[el], level + 1)}
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
                  <img
                    src={pdf_icon}
                    alt="pdf_icon"
                    className="documents__pdf-icon"
                  />
                </div>
                <div className="col-11">
                  {el.file !== undefined ? (
                    <a
                      href={`/uploads/${el.file.dir}/${el.file.filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="documents__doc-link"
                    >
                      {el.title}
                    </a>
                  ) : (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${el.uploaded_files.map(
                        item => item.download_url
                      )}`}
                      className="documents__doc-link"
                    >
                      {el.title}
                    </a>
                  )}
                  {/* <a
                    download
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
                {renderDocs(data.children[el], level + 1)}
              </div>
            );
          })}
      </CollapseBlockType2>
    </div>
  );
}

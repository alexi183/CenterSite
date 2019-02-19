import "./AdministrationCompanyPage.scss";
import React, { Component } from "react";
import PageHeader from "../PageHeader/PageHeader";
import { inject, observer } from "mobx-react";
import rukovodno from "../../img/rukovod-no.png";
import director from "../../img/rukovod1.png";
import DocumentTitle from "react-document-title";

@inject("contentPagesStore")
@observer
class AdministrationCompanyPage extends Component {
  componentDidMount() {
    this.props.contentPagesStore.contentAdminCompany();
  }

  render() {
    const { pageHeader } = this.props;
    const { adminCompany } = this.props.contentPagesStore;

    return (
      <DocumentTitle title="Руководство">
        <section className="section-wrapper">
          <PageHeader {...pageHeader} />

          <div className="content-page">
            <div className="administration-page">
              <div className="director d-flex">
                <div className="administration-block">
                  <div className="administration-block__img">
                    <img src={director} alt="" />
                  </div>
                </div>
                <div className="administration-block__info">
                  <div className="administration-block__info-name">
                    Фертман <br /> Виктор Александрович
                  </div>
                  <div className="administration-block__info-text">
                    Руководитель
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-start flex-wrap">
                {adminCompany.map((item, i) => (
                  <div className="administration-block" key={i}>
                    <div className="administration-block__img">
                      <img src={`${item.img ? item.img : rukovodno}`} alt="" />
                    </div>
                    <div className="administration-block__info">
                      <div className="administration-block__info-name">
                        <div>{item.name.split(" ")[0]}</div>
                        <div>
                          {item.name.split(" ")[1]} {item.name.split(" ")[2]}
                        </div>
                      </div>
                      <div className="administration-block__info-text">
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="administration-block__documents">
                <h2>ФГАОУ ДПО &laquo;АПК и ППРО&raquo;</h2>
                <p className="administration-block__text">
                      Сведения о доходах, об имуществе и обязательствах
                      имущественного характера руководителя и членов его семьи
                </p>
                <p>
                  <img alt="" src={"/ckeditor_files/Icons/pdf_icon.png"} />
                  &nbsp; &nbsp;{" "}
                  <a
                    href="http://www.apkpro.ru/doc/Svedeniia o dohodakh kandidata na dolzhnoct rukovoditelia za 2017.pdf"
                    target="_blank"
                  >
                    <span style={{color:"#000000"}}>В.А. Фертман (2017 год)</span>
                  </a>
                </p>
                <div className="administration-block__line" />
                <h2>ФГАУ ГНИИ ИТТ &laquo;Информика&raquo;</h2>
                <p className="administration-block__text">
                      Сведения о доходах, об имуществе и обязательствах
                      имущественного характера руководителя института, а также о
                      доходах, об имуществе и обязательствах имущественного
                      характера его супруги (супруга), несовершеннолетних детей
                      за период с 1 января 2017 г. По 31 декабря 2017 г.
                </p>
                <p>
                  <strong>
                    <img
                      alt=""
                      src={`/ckeditor_files/Icons/pdf_icon.png`}
                    //   style="height:30px; width:27px"
                    />
                    &nbsp; &nbsp;&nbsp;
                  </strong>
                  <a href="/ckeditor_files/%D0%A4%D0%A5%D0%94/svedeniya%20_%D0%98%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B8%D0%BA%D0%B0.pdf">
                    <span style={{color:"#000000"}}>Д.Ю. Боков (2017 год)</span>
                  </a>
                </p>

                <p>&nbsp;</p>
              </div>
            </div>
          </div>
        </section>
      </DocumentTitle>
    );
  }
}
export default AdministrationCompanyPage;

AdministrationCompanyPage.defaultProps = {
  pageHeader: {
    breadCrumbs: true,
    title: "Руководство",
    headerModifierClass: "dark-theme",
    background: "#005a80",
    description: false,
    linkBlock: false
  }
};

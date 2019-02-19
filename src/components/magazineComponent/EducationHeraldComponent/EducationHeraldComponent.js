import React, { Component } from "react";
import "./EducationHeraldComponent.scss";
import DocumentTitle from "react-document-title";

import PageHeader from "../../PageHeader/PageHeader";

import Img from "../../../img/k1.png";

class EducationHeraldComponent extends Component {
  render() {
    // const { pageHeader } = this.props;
    const pageHeader = {
      breadCrumbs: true,
      title: "Вестник образования",
      background: "#005a80",
      headerModifierClass: "darl-theme"
    };

    return (
      <DocumentTitle title="Вестник образования">
        <section className="section-wrapper">
          <PageHeader {...pageHeader} />
          <div className="herald-page">
            <div className="herald-page__content">
              <div className="herald-page__content__about">
                <div className="herald-page__content__flex">
                  <div className="herald-page__content__flex__title">
                    О журнале
                  </div>
                  Журнал «Вестник образования» имеет давнюю и интересную
                  историю. Он был создан в 1922 году Указом Наркома Луначарского
                  и долгое время выходил под названием «Сборник приказов и
                  инструкций Наркомата, Министерства просвещения РСФСР,
                  Министерства образования России». В редакции «Вестника
                  образования» и поныне хранится архив журнала с далёких 30-х и
                  по настоящее время. Исключение составляют, пожалуй, только
                  военные и первые послевоенные годы, когда журнал по понятным
                  причинам не издавался. В 1991 году журнал получил свое
                  нынешнее название. В настоящее время «Вестник образования»
                  является единственным официальным изданием Министерства
                  образования и науки Российской Федерации в сфере публикации
                  нормативно-правовой документации. За материалы, опубликованные
                  в других изданиях, Минобрнауки России ответственности не
                  несёт.
                </div>
                <div
                  className="herald-page__content__flex__image"
                  style={{
                    background: `url(${Img}) center / contain no-repeat`
                  }}
                />
              </div>
              <div className="herald-page__content__text">
                Главные задачи журнала всегда остаются неизменными: публикация
                нормативных и инструктивных актов, относящихся к сфере
                образования, регулярное информирование педагогической
                общественности о важнейших событиях в российской образовательной
                политике, о содержании и ходе модернизации образования. Основные
                материалы публикуются с комментариями ведущих специалистов
                министерства, представителей Комитета по образованию и науке
                Государственной Думы, Общероссийского профсоюза работников
                образования и науки, других профильных ведомств.
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "400",
                    lineHeight: "24px",
                    marginTop: "39px"
                  }}
                >
                  Рубрики журнала:
                  <div className="herald-page__content__ul">
                    <ul style={{ marginLeft: "-17px" }}>
                      <li>Законодательство Российской Федерации</li>
                      <li>Новости</li>
                      <li>Новые технологии в образовании</li>
                      {/*  <li>Номера</li>*/}
                      <li>Нормативные документы</li>
                      <li>Образовательная политика</li>
                    </ul>
                    <ul>
                      <li>Разговор с учителем</li>
                      <li>Слово главного редактора</li>
                      {/* <li>Юридическая консультация</li>*/}
                      <li>Учебное книгоиздание</li>
                      <li>Педагогическое образование</li>
                      <li>Олимпиады школьников</li>
                    </ul>
                  </div>
                </div>
                {/* <div style={{ marginBottom: "9px" }}>
                <span style={{ fontWeight: "700" }}>
                  Главный редактор журнала
                </span>{" "}
                – действующая должность Петрова А.Е.
              </div>*/}
                <div style={{marginBottom: "9px"}}>
                  <span style={{fontWeight: "700"}}>Учредитель издания:</span>{" "}
                  Министерство просвещения Российской Федерации.
                </div>
                <div style={{marginBottom: "9px"}}>
                  <span style={{fontWeight: "700"}}>Редактор:</span> Дмитрий
                  Владимирович Куракин
                </div>
                <div style={{marginBottom: "77px"}}>
                  По вопросам публикации обращаться по эл.адресу:
                  vestnik@apkpro.ru
                  <br /> Тел.: 8 (495) 969-26-17, доб. 1273 Наталия Валерьевна
                  Минасян
                </div>
              </div>
            </div>
            <div className="side-menu">
              <div
                className="side-menu__item"
                style={{ backgroundColor: "#029dd2", color: "#fff" }}
              >
                О журнале
              </div>
              <a href="http://www.vestnikedu.ru/ " className="side-menu__item">
                Архив выпусков
              </a>
            </div>
          </div>
        </section>
      </DocumentTitle>
    );
  }
}

export default EducationHeraldComponent;

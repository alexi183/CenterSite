import React, { Component } from "react";
import { withRouter } from 'react-router-dom'

import Img from "../../../img/k2.png";

class InformatizationComponentContent extends Component {
  render() {
    return (
      <div className="informatization-page__content">
        <div className="informatization-page__content__about">
          <div className="informatization-page__content__flex">
            <div className="informatization-page__content__flex__title">
              О журнале
            </div>
            Научно-методический журнал «Информатизация образования и науки» издается с 2009 года, ежеквартально.
            <br />
            Актуальность издания данного журнала обусловлена необходимостью
            консолидации ученых и специалистов России в связи с интенсивным
            ростом масштабов работ по внедрению информационных технологий,
            средств телекоммуникаций, автоматизации и управления
            технологическими процессами в сфере образования и науки.
          </div>
          <div
            className="informatization-page__content__flex__image"
            style={{
              background: `url(${Img}) center / cover no-repeat`
            }}
          />
        </div>
        <div className="informatization-page__content__text">
          <div
            style={{
              fontSize: "24px",
              fontWeight: "400",
              lineHeight: "24px",
              marginTop: "39px"
            }}
          >
            Рубрики журнала:
            <div className="informatization-page__content__ul">
              <ul style={{ marginLeft: "-17px" }}>
                <li>
                  Государственная политика в области информатизации в
                  образовании и науке
                </li>
                <li>Телекоммуникации</li>
                <li>Управление в социальных и экономических системах</li>
                <li>Информационные технологии</li>
              </ul>
              <ul>
                <li>
                  Автоматизация и управление технологическими процессами и
                  производствами
                </li>
                <li>Системы защиты информации</li>
                <li>Системный анализ, управление и обработка информации</li>
              </ul>
            </div>
          </div>
          <div style={{ marginBottom: "21px" }}>
            Журнал включен в Перечень ведущих рецензируемых научных журналов и
            изданий, в которых должны быть опубликованы основные научные
            результаты диссертаций на соискание ученых степеней доктора и
            кандидата наук.
          </div>
          <div style={{ marginBottom: "21px" }}>
            Журнал зарегистрирован в Федеральной службе по надзору в сфере
            связи, информационных технологий и массовых коммуникаций
            (Роскомнадзор)
            <br /> (Регистрационный номер и дата принятия решения о регистрации СМИ: серия ПИ № ФС 77-73920 от 12.10.2018 г.)
          </div>
          <div style={{ marginBottom: "21px" }}>
            Журнал включен в систему Российского индекса научного цитирования.
          </div>
          <div
            style={{
              marginBottom: "21px",
              textDecoration: "underline",
              cursor: "pointer"
            }}
          >
            Положение по соблюдению редакционной этики
          </div>
          <div style={{ marginBottom: "77px" }}>
            Главный редактор: Дмитрий Владимирович Куракин <br />
            Тел.: +7(495) 969-26-17, доб. 1112, эл. почта: kurakin@informika.ru
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(InformatizationComponentContent);

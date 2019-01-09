import React from "react";
import { withRouter, NavLink } from "react-router-dom";

const RightSideMenu = ({ menuItems }) => {
  return (
    <div className="side-menu">
      {menuItems.map(item => {
        return (
          <NavLink
            key={item.title}
            to={`/content/informatizatsiia-obrazovaniia-i-nauki/${item.slug}`}
            className="side-menu__item"
            activeStyle={{
              backgroundColor: "#029dd2",
              color: "#fff"
            }}
          >
            {item.title}
          </NavLink>
        );
      })}
      <a
        className="side-menu__item"
        href="http://informika.ru/pechatnye-izdaniya/zhurnal-informatizaciya-obrazovaniya-i-nauki/arhiv-vypuskov/"
      >
        Архив
      </a>
      {/* <div
        className="side-menu__item"
        style={{ backgroundColor: "#029dd2", color: "#fff" }}
      >
        О журнале
      </div>
      <div className="side-menu__item">
        Требования к оформлению статьи в журнале
      </div>
      <div className="side-menu__item">Лицензионный договор</div>
      <div className="side-menu__item">Подписка</div>
      <div className="side-menu__item">Об издательстве</div>
      <div className="side-menu__item">О главном редакторе</div>
      <div className="side-menu__item">Состав редакционного совета</div>
      <div className="side-menu__item">Контактная информация</div>
      <div className="side-menu__item">Описание тематики журнала</div>
      <div className="side-menu__item">
        Правила направления, рецензирования и опубликования научных статей
      </div> */}
    </div>
  );
};

export default withRouter(RightSideMenu);

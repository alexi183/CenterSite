import React, { Component } from "react";
import "./SubMenu.scss";
import { inject, observer } from "mobx-react";

@inject("naviStore")
@observer
class SubMenu extends Component {
    render() {
        const { menu, getUrl } = this.props.naviStore;

        return (
            <div className="footer-menu">
                {menu.map((item, i) => (
                    <div className="footer-menu__item" key={i}>
                        <span className="footer-menu__item-head">{item.title}</span>
                        {item.childs.length !== 0 && (
                            <ul className="footer-menu__list">
                                {item.childs.map((item2, i) => (
                                    <li key={i}>
                                        {item2.slug !== "proekty" ? (
                                            <a
                                                href={`/content/${item2.slug}`}
                                                onClick={() => getUrl(item2.slug)}
                                            >
                                                {item2.title}
                                            </a>
                                        ) : (
                                            <a
                                                href={`/projects/?page=1&type=0`}
                                                onClick={() => getUrl(item2.slug)}
                                            >
                                                {item2.title}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        );
    }
}

export default SubMenu;

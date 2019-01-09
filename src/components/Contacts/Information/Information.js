import React, {Component} from 'react'
import './Information.scss'
import {inject} from "mobx-react"
import DocumentTitle from "react-document-title";
import PageTitleNavBlock from "../../PageTitleNavBlock/PageTitleNavBlock"

@inject('contactsStore')
class PagesLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            documentsTypeSelected: 0
        };
        this.changeDocumensType = this.changeDocumensType.bind(this);
    }

    changeDocumensType = e => {
        this.setState({
            documentsTypeSelected: e.value
        })
    }

    render() {
        /*  const options = [
              {value: 0, label: 'Все документы'},
              {value: 1, label: 'Не все документы'},
              {value: 2, label: 'Немного документов'}
          ]

          const {documentsTypeSelected} = this.state*/

        return (
            <DocumentTitle title="Реквизиты">
            <section className='information section-wrapper'>
                <PageTitleNavBlock data={this.props.contactsStore.contactsNav}/>
                <div className="information__content section-wrapper section-wrapper_sm">

                    <p className='mb-0'>Полное наименование: <i className='mb-4 information__text'>Федеральное государственное
                        автономное образовательное учреждение дополнительного профессионального образования «Центр реализации
                        государственной образовательной политики и информационных технологий»</i></p>



                    <p className='mb-0'>Краткое наименование: <i className='information__text'>ФГАОУ ДПО ЦРГОП и ИТ</i></p>


                    <p className='mb-0'>Ведомственная подчиненность: <i className='information__text'>Министерство просвещения Российской Федерации</i></p>


                    <p className='mb-0'>Юридический адрес: <i className='information__text'>Россия, 125212, г. Москва, Головинское шоссе, д. 8, корп.
                        2а</i>
                    </p>

                    <p className='mb-0'>Почтовый адрес: <i className='information__text'>Россия, 125212, г. Москва, Головинское шоссе, д. 8, корп. 2а</i></p>
                    <p className='mb-4 information__text'><a href="mailto:info@eit.edu.ru">info@eit.edu.ru</a></p>


                    <p className='mb-0'>Руководство:</p>
                    <p className='mb-0 information__text'>И.о. директора</p>
                    <p className='mb-0 information__text'>Фертман Виктор Александрович<br/>+ 7 (495) 995-10-54
                        (доб.2105)</p>

                    <p className='mb-0 information__text'>Первый заместитель</p>
                    <p className='mb-4 information__text'>Боков Денис Юрьевич<br/>+ 7 (495) 969-26-17 (доб.1111)</p>

                    <p className='mb-0 information__text'>Заместитель директора по экономике и финансам</p>
                    <p className='mb-4 information__text'>Ермилов Антон Геннадьевич<br/>+ 7 (495) 995-10-54 (доб.2221)
                    </p>

                    <p className='mb-0 information__text'>Заместитель директора по образовательной деятельности</p>
                    <p className='mb-4 information__text'>Шестакова Оксана Александровна<br/>+ 7 (495) 995-10-54
                        (доб.2218)</p>

                    <p className='mb-0 information__text'>Главный бухгалтер</p>
                    <p className='mb-4 information__text'>Бабина Татьяна Юрьевна
                        <br/>
                        тел. + 7 (495) 995-10-54 (доб.2144)
                        <br/>
                        <a href="mailto:babina@apkpro.ru">babina@apkpro.ru</a>
                    </p>

                    <p className='mb-0'>Банковские реквизиты:</p>
                    <p className='mb-0 information__text'>ОГРН 1027739004501 дата присвоения 12.05.1998</p>

                    <p className='mb-0 information__text'>ИНН 7718084063</p>

                    <p className='mb-0 information__text'>КПП 774301001</p>

                    <p className='mb-0 information__text'>р/с 40503810138044000888 в ПАО «Сбербанк» г. Москва</p>

                    <p className='mb-0 information__text'>БИК 044525225</p>

                    <p className='mb-0 information__text'>Кор. сч. 30101810400000000225</p>


                    {/*<p className='mb-2'>Документы</p>
                    <div className="mb-4">
                        <Select
                            className='react-select-container'
                            classNamePrefix="react-select"
                            options={options}
                            defaultValue={options[documentsTypeSelected]}
                            onChange={this.changeDocumensType}
                        />
                    </div>

                    {
                        documentsTypeSelected === 0 &&
                        <CollapseBlock title='Устав'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit impedit libero nulla
                            reprehenderit ullam veritatis voluptatem! Debitis exercitationem illo minima quis veritatis? At
                            incidunt iure laudantium nobis nulla officiis, porro!
                        </CollapseBlock>
                    }

                    {
                        documentsTypeSelected === 1 &&
                        <Fragment>
                            <CollapseBlock title='Лицензия и аккредитация'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit impedit libero nulla
                                reprehenderit ullam veritatis voluptatem! Debitis exercitationem illo minima quis veritatis? At
                                incidunt iure laudantium nobis nulla officiis, porro!
                            </CollapseBlock>
                            <CollapseBlock title='Документы, выдаваемые по окончании обучения'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit impedit libero nulla
                                reprehenderit ullam veritatis voluptatem! Debitis exercitationem illo minima quis veritatis? At
                                incidunt iure laudantium nobis nulla officiis, porro!
                            </CollapseBlock>
                        </Fragment>
                    }

                    {
                        documentsTypeSelected === 2 &&
                        <Fragment>
                            <CollapseBlock title='Устав'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit impedit libero nulla
                                reprehenderit ullam veritatis voluptatem! Debitis exercitationem illo minima quis veritatis? At
                                incidunt iure laudantium nobis nulla officiis, porro!
                            </CollapseBlock>
                            <CollapseBlock title='Лицензия и аккредитация'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit impedit libero nulla
                                reprehenderit ullam veritatis voluptatem! Debitis exercitationem illo minima quis veritatis? At
                                incidunt iure laudantium nobis nulla officiis, porro!
                            </CollapseBlock>
                            <CollapseBlock title='Документы, выдаваемые по окончании обучения'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit impedit libero nulla
                                reprehenderit ullam veritatis voluptatem! Debitis exercitationem illo minima quis veritatis? At
                                incidunt iure laudantium nobis nulla officiis, porro!
                            </CollapseBlock>
                        </Fragment>
                    }
*/}

                </div>
            </section>
            </DocumentTitle>
        )
    }
}

export default PagesLayout
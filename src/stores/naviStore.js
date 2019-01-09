import {observable, action} from 'mobx'
import axios from 'axios'

export class naviStore {
    @observable fullScreenMenuIsOpen = false
    @observable navi = [
        {
            itemName: 'О центре',
            link: '#',
            innerLinks: [
                {
                    text: 'Основные сведения',
                    link: '#'
                },
                {
                    text: 'Руководство',
                    link: '#'
                },
                {
                    text: 'Структура и органы управления',
                    link: '#'
                },
                {
                    text: 'Историческая справка',
                    link: '#'
                },
                {
                    text: 'Документы',
                    link: '#'
                },
                /*{
                    text: 'Вакансии',
                    link: '#'
                },*/
            ]
        },
        {
            itemName: 'Деятельность',
            link: '#',
            innerLinks: [
                {
                    text: 'Государственное задание',
                    link: '#'
                },
                {
                    text: 'Курсы, переподготовка',
                    link: '#'
                },
                {
                    text: 'Научно-исследовательская работа',
                    link: '#'
                },
                {
                    text: 'Учебно-методическая работа',
                    link: '#'
                },
                {
                    text: 'Проектная деятельность',
                    link: '#'
                },
                {
                    text: 'Финансово-хозяйственная деятельность',
                    link: '#'
                },
            ]
        },
        {
            itemName: 'Журналы',
            link: '#',
            innerLinks: [
                {
                    text: 'Информатизация образования и науки',
                    link: '#'
                },
                {
                    text: 'Вестник образования',
                    link: '#'
                }
            ]
        },
        {
            itemName: 'Контакты',
            link: '#',
            innerLinks: [
                {
                    text: 'Официальные реквизиты',
                    link: '#'
                },
                {
                    text: 'Как проехать',
                    link: '#'
                },
                {
                    text: 'Телефонный справочник',
                    link: '#'
                },
                {
                    text: 'Форма обратной связи',
                    link: '#'
                }
            ]
        }
    ]
    @observable menu = []
    @observable pageData = null
    @observable pageContent = {}
    @observable content = ''
    @observable index = []
    @observable url = ''
    @observable loading = true

    @action fullScreenMenuToggle = () => {
        this.fullScreenMenuIsOpen = !this.fullScreenMenuIsOpen

    }

    getMenu = () => {
        axios.get('/api/v1/menu')
            .then(response => {
                    this.menu = response.data
                    this.loading = false
                }
            )
            .catch((error) => {
                console.log(error);
            })
    }

    getContent = (slug) => {
        axios.get(`/api/v1/pages/${slug}`)
            .then(response => {
                this.pageData = response.data
                this.pageContent = response.data.content;

                if (this.pageContent !== '') {
                    this.content = this.pageContent
                } else {
                    this.content = 'Нет контента'
                }
            })
            .catch((error) => {
                console.log(error);
                 window.location.replace("/404")
            })
    }

    indexSlug = () => {
        axios.get('/api/v1/menu')
            .then(response => {
                    this.menu = response.data

                    let arr1 = this.menu.map((item) => item.slug);
                    let arr2 = this.menu.map((item2) => item2.childs.map((item3) => item3.slug));
                    this.index = [].concat(...arr2, arr1);
                }
            )
            .catch((error) => {
                    console.log(error);
                }
            )
    }

    @action getUrl = (link) => {
        this.url = link
       /* console.log(link)*/
    }

}

export default new naviStore()
import {action, observable} from "mobx";
import axios from "axios";


export class contactsStore {
    @observable contactsNav = {
        backgroundColor: '#005a80',
        fontColor: '#fff',
        bgImage: 'blue',
        title: 'контакты',
        breadCrumbs: [
            {
                title: 'Главная',
                link: '/'
            },
            {
                title: 'Контакты',
                link: '/content/kontakty'
            },
        ],
        linksRow: [
            {
                title: 'Форма обратной связи',
                link: '/content/forma-obratnoi-sviazi'
            },
            {
                title: 'Телефонный справочник',
                link: '/content/telefonnyi-spravochnik'
            },
            {
                title: 'Как проехать',
                link: '/content/kak-proekhat'
            },
            {
                title: 'Реквизиты',
                link: '/content/rekvizity'
            },
        ]
    }

    @observable departmentsForSelect = []
    @observable staffForSelect = []

    @observable staff = []
    @observable employee = ''
    @observable department = 1
    @observable loading = false
    @observable mounting = false

    @action switchLoading = () =>
        this.loading = !this.loading

    @action getDepartments = () => {
        axios.get(`/api/v1/departments/`)
            .then(response => {
                let data = [];
                this.makeDepartmentsSelect(1, response.data[0], data)
                this.departmentsForSelect = data
            })
            .catch((error) => {
                console.log(error);
            })
    }

    makeDepartmentsSelect = (level, item, data) => {
        data.push({
            label: item.name,
            level: level,
            value: item.id,
            // isDisabled: item.id === 1
        });
        if (item.childs.length > 0) {
            for (let i = 0; i < item.childs.length; i++) {
                this.makeDepartmentsSelect(level + 1, item.childs[i], data);
            }
        }
    }

    @action selectEmployee = () => {
        // this.switchLoading()
        axios.get(`/api/v1/employees/`, {
            params: {
                employee: this.employee,
                department: this.department
            }

        })
            .then(response => {
                // console.log(response)
                this.staffForSelect = response.data.map(item => {
                    return ({
                        label: item.surname + ' ' + item.name+ ((item.work_phone) ?' (Доб. '+ item.work_phone+ ')' : ''),
                        value: item.surname + ' ' + item.name,
                        department: item.department.id
                    })
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    @action getStuff = () => {
        this.switchLoading()
        axios.get(`/api/v1/employees/`, {
            params: {
                employee: this.employee,
                department: this.department
            }

        })
            .then(response => {
                // console.log(response)
                this.staff = response.data
                this.switchLoading()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    @action setEmploee = (data) => {
        this.employee = data
    }

    @action setDepartment = (depts) => {
        this.department = depts
    }
}

export default new contactsStore();

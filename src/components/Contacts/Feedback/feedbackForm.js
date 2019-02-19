export default {
    mainForm: [
        {
            name: 'lastName',
            type: 'text',
            label: 'Фамилия',
            required: true
        },
        {
            name: 'firstName',
            type: 'text',
            label: 'Имя',
            required: true
        },
        {
            name: 'patronymic',
            type: 'text',
            label: 'Отчество',
            required: false
        },
        {
            name: 'message',
            type: 'textarea',
            label: 'Обращение',
            required: true
        },
        {
            name: 'phone',
            type: 'phone_masked',
            label: 'Номер телефона',
            placeholder: '+7(     )___ - __ - __ '
        },
        {
            name: 'email',
            type: 'email',
            label: 'Электронная почта',
            required: true
        },
        {
            name: 'organization',
            type: 'text',
            label: 'Организация',
        },
       /* {
            name: 'included_file',
            type: 'file',
            label: 'Прикрепить файл',
        },*/
    ],
}
import "./Feedback.scss";
import React, {Component} from "react";
import feedbackForm from "./feedbackForm";
import {Formik} from "formik";
import FormItemsRender from "./FormItemsRender";
import PageTitleNavBlock from "../../PageTitleNavBlock/PageTitleNavBlock";
import {inject} from "mobx-react";
import {FileIcon} from "../../Elements/Icons/Icons";
import DocumentTitle from "react-document-title";
import axios from "axios"
import {Redirect} from "react-router-dom";

@inject('contactsStore')
class Feedback extends Component {
    constructor(props) {
        super(props);
        this.formik = React.createRef();
    }

    state = {
        formSent: false,
        filesUploading: '',
        fileNames: [],
        file: undefined
    };

    render() {
        let iv = {}

        feedbackForm.mainForm.forEach(el => (iv[el.name] = ""));

        const handleFileUpload = e => {
            let files = Object.keys(e.target.files).map(el => e.target.files[el].name)
            this.setState({
                filesUploading: e.target.value,
                fileNames: files,
                file: e.target.files[0]
            })
        }

        const clearFiles = () => {
            this.setState({fileNames: [], filesUploading: ''})
            this.formik.current.state.values.file_input = ''
        }

        if (this.state.formSent === true) {
            return <Redirect to="/"/>
        }

        return (
            <DocumentTitle title="Форма обратной связи">
                <section className="section-wrapper feedback">
                    <PageTitleNavBlock data={this.props.contactsStore.contactsNav}/>
                    <div className="mb-4 feedback__inner-wrapper">
                        <Formik
                            ref={this.formik}
                            initialValues={{
                                file_input: this.state.filesUploading,
                                ...iv
                            }}
                            validate={values => {
                                let errors = {};
                                let requiredError = "Необходимо заполнить";

                                feedbackForm.mainForm.forEach(el => {
                                    if (values[el.name] === "" && el.required) {
                                        errors[el.name] = requiredError;
                                    }
                                });
                                return errors;
                            }}

                            onSubmit={(values, {setSubmitting}) => {

                                console.log(
                                    'values ', values
                                );

                                const formData = new FormData();
                                formData.append('lastName', values.lastName)
                                formData.append('firstName', values.firstName)
                                formData.append('patronymic', values.patronymic)
                                formData.append('phone', values.phone)
                                formData.append('email', values.email)
                                formData.append('organization', values.organization)
                                formData.append('message', values.message)
                                formData.append('file', this.state.file)

                                axios({
                                    method: 'post',
                                    url: '/api/v1/feedback/',
                                    data: formData,
                                    config: {headers: {'Content-Type': 'multipart/form-data'}}
                                })
                                    .then((response) => {
                                        this.setState({formSent: true});
                                    })
                                    .catch((response) => {
                                        console.log(response);
                                    });
                            }}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting
                              }) => {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <FormItemsRender
                                            feedbackForm={feedbackForm.mainForm}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            handleSubmit={handleSubmit}
                                            isSubmitting={isSubmitting}
                                            handleFileUpload={handleFileUpload}
                                        />

                                        <div className="mb-3 row ">
                                            <div className="col-3 pt-2 text-right">
                                                Прикрепить файл
                                            </div>
                                            <div className="col-9">
                                                <div className="row mb-3">
                                                    <div className="col-2">
                                                        <input
                                                            type="file"
                                                            accept=".jpg, .png, .doc, .docx, .pdf, .psd"
                                                            name='file'
                                                            // multiple={true}
                                                            onChange={e => {
                                                                handleChange(e)
                                                                handleFileUpload(e)
                                                            }}
                                                            onBlur={handleBlur}
                                                            value={this.state.filesUploading}
                                                            id='file_input'
                                                            className={`feedback__form-filgot e ${
                                                                errors['file_input'] && touched['file_input']
                                                                    ? 'error' : ''
                                                                }`}
                                                        />
                                                        <label className='btn-blue btn-blue_lighter mb-0'
                                                               htmlFor='file_input'>Обзор</label>

                                                    </div>
                                                    <div className="col-7">
                                                        {
                                                            this.state.fileNames.length > 0 &&
                                                            this.state.fileNames.map((el, i) => {
                                                                    return (
                                                                        <span className='feedback__file-item' key={i}>
                                                                    {FileIcon('#4a4a4a')}
                                                                            <span
                                                                                className='feedback__file-name d-inline-block mr-4'
                                                                                key={i}>{el}</span>
                                                                </span>
                                                                    )
                                                                }
                                                            )
                                                        }
                                                    </div>
                                                    <div className="col-3 text-right">
                                                    <span className='btn-blue btn-blue_transparent'
                                                          onClick={clearFiles}>Сбросить</span>

                                                    </div>
                                                </div>
                                                <div className="">
                                                    Форматы: jpg, png, doc, docx, pdf*,
                                                    Максимальный размер 5 Мб
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center my-5">
                                            <button
                                                type="submit"
                                                className="btn-blue  feedback__submit-btn"
                                                disabled={isSubmitting}
                                            >
                                                Отправить
                                            </button>
                                        </div>
                                    </form>
                                );
                            }}
                        </Formik>
                    </div>
                </section>
            </DocumentTitle>
        );
    }
}

export default Feedback
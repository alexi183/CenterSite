import React, {Component, Fragment} from 'react'
import MaskedInput from 'react-text-mask'

export default class FormItemsRender extends Component {
    render() {
        const {
            feedbackForm,
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
        } = this.props
        return (
            <Fragment>
                {feedbackForm &&
                feedbackForm.map(el => {
                    return (
                        <div key={el.name} className="mb-3 row">

                            <div className="col-3 text-right">
                                {
                                    el.label &&
                                    <label htmlFor={el.name}
                                           className='feedback__form-label'>
                                        {el.label}
                                        {
                                            el.required &&
                                            <span className='feedback__required-star'>*</span>
                                        }
                                    </label>
                                }
                            </div>
                            <div className="col-9">
                                {
                                    errors[el.name] && touched[el.name] &&
                                    <span className='feedback__error'>{errors[el.name]}</span>
                                }
                                {(() => {
                                    switch (el.type) {
                                        case 'textarea': {
                                            return (
                                                <textarea
                                                    name={el.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values[el.name]}
                                                    id={el.name}
                                                    className={`feedback__form-textarea ${
                                                        errors[el.name] && touched[el.name]
                                                            ? 'error' : ''
                                                        }`}
                                                />
                                            )

                                        }
                                        case ('phone_masked'): {
                                            return (
                                                <MaskedInput
                                                    mask={['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                                    name={el.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values[el.name]}
                                                    id={el.name}
                                                    keepCharPositions={true}
                                                    placeholder={el.placeholder}
                                                    className={`feedback__form-text ${
                                                        errors[el.name] && touched[el.name]
                                                            ? 'error' : ''
                                                        }`}
                                                />
                                            )
                                        }
                                        case ('postcode_masked'): {
                                            return (
                                                <MaskedInput
                                                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                                    name={el.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    keepCharPositions={true}
                                                    value={values[el.name]}
                                                    id={el.name}
                                                    placeholder={el.placeholder}
                                                    className={`feedback__form-text ${
                                                        errors[el.name] && touched[el.name]
                                                            ? 'error' : ''
                                                        }`}
                                                />
                                            )
                                        }
                                        case ('text'): {
                                            return (
                                                <input
                                                    type="text"
                                                    name={el.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values[el.name]}
                                                    id={el.name}
                                                    placeholder={el.placeholder}
                                                    className={`feedback__form-text ${
                                                        errors[el.name] && touched[el.name]
                                                            ? 'error' : ''
                                                        }`}
                                                />
                                            )
                                        }
                                        case ('email'): {
                                            return (
                                                <input
                                                    type="email"
                                                    name={el.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values[el.name]}
                                                    id={el.name}
                                                    placeholder={el.placeholder}
                                                    className={`feedback__form-text ${
                                                        errors[el.name] && touched[el.name]
                                                            ? 'error' : ''
                                                        }`}
                                                />
                                            )
                                        }
                                        default:
                                            return
                                    }
                                })()}
                            </div>
                        </div>
                    )
                })
                }
            </Fragment>
        )
    }
}
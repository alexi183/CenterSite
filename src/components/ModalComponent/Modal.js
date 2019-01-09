import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
// import SocialBtn from '../Elements/BtnBlue/BtnBlue';

class Modal extends Component {
    state = {
        formSent: false
    }

    el = document.createElement('div')
    componentDidMount() {
        document.getElementById('modal-root').appendChild(this.el)
        document.getElementById('root').className='fixed'
    }
    componentWillUnmount() {
        document.getElementById('modal-root').removeChild(this.el)
        document.getElementById('root').className=''
    }

    onDialogClick(event) {
        event.stopPropagation();
    }

    render() {
        return ReactDOM.createPortal(
            <div
                style={{
                    position: 'fixed',
                    top: '0',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    overflow: 'auto',
                    zIndex: '999'
                }}
                onClick={this.props.onClose}
            >
                <div onClick={this.onDialogClick}
                     style={{
                         padding: 35,
                         background: '#fff',
                         borderRadius: '2px',
                         display: 'inline-block',
                         minHeight: '300px',
                         margin: '1rem',
                         position: 'relative',
                         minWidth: '527px',
                         boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                         justifySelf: 'center',
                         textAlign: 'center'
                     }}
                >
                    <h3
                        style={{
                            fontWeight: '400',
                            marginTop: '57px',
                            marginBottom: '30px'
                        }}
                    >РЕГИСТРАЦИЯ</h3>
                    <div className="form-popup__close" onClick={this.props.onClose}></div>
                    <form className="registration-form">
                        <div className="registration-form__div">
                            <label className="registration-form__label">ФИО</label>
                            <input className="registration-form__input" type='text' />
                        </div>
                        <div className="registration-form__div">
                            <label className="registration-form__label">Телефон</label>
                            <input className="registration-form__input" type='number' />
                        </div>
                        <div className="registration-form__div">
                            <label className="registration-form__label">E-mail</label>
                            <input className="registration-form__input" type='email' />
                        </div>
                        <div className="registration-form__div">
                            <label className="registration-form__label">Организация</label>
                            <input className="registration-form__input" type='text' />
                        </div>
                        <div className="registration-form__div">
                            <label className="registration-form__label">Комментарии</label>
                            <textarea className="registration-form__textarea" rows="4" />
                        </div>
                    </form>
                    {/* {SocialBtn('', 'Зарегестрироваться', '#ec5155')} */}
                    <div className='btn-blue' onClick={this.props.onClose}>
                        <div className='btn-blue__content'>
                            Зарегестрироваться
                        </div>
                    </div>
                </div>
            </div>
            ,document.getElementById('modal-root'),
        )
    }
}

export default Modal;
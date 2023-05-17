import React from 'react'

function PopupWithForm(props) {
  return (
    <>
      <section className={`popup ${props.name}` + (props.isOpen && ' popup_opened')}>
        <form onSubmit={props.handleSubmit} className={`popup__form ${props.formSelector}`} name={props.name}>
          <button className="popup__button-close" type="button" title="закрытие попапа" onClick={props.onClose}></button>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__button" title="кнопка сохранения профиля">{props.titleButton}</button>
        </form>
      </section>
    </> 
  )
}

export default PopupWithForm;
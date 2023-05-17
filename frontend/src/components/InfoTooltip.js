import React from 'react'

function InfoTooltip(props) {
  return (
    <>
      <section className={`popup ` + (props.isOpen && ' popup_opened')}>
        <div className={`popup__form`}>
          <button className="popup__button-close" type="button" title="закрытие попапа" onClick={props.onClose}></button>
          <img className='popup__authorization-image' src={props.successful.image} />
          <h2 className="popup__authorization-title">{props.successful.message}</h2>
          <section className="form">
          </section>
        </div>
      </section>
    </>
  )
}

export default InfoTooltip
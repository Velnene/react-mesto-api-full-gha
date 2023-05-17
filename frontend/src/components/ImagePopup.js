function ImagePopup({ isOpenImagePopup, onClose, card }) {
  return (
    <section className={"popup popup_open-image" + (isOpenImagePopup && ' popup_opened')}>
      <div className="popup__image-container">
        <button className="popup__button-close popup__image-button-close" type="button" title="закрытие карточки" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__subtitle">{card.name}</p>
      </div>
    </section>
  )
}

export default ImagePopup;
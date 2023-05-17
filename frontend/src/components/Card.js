import { Context } from '../context/CurrentUserContext.js';
import React from 'react';
function Card(props) {

  const card = React.useContext(Context)
  const isOwn = card._id === props.card.owner._id;
  const isLike = props.card.likes.some(like => like._id === card._id)

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleCardClick() {
    props.onCardPopupOpen(props.card)
  }

  function handleDeleteClick() {
    props.onDeleteCard(props.card._id)
  }

  return (
    <div id="element-template">
      <article className="element">
        {isOwn && <button onClick={handleDeleteClick} className="element__remove" type="button" title="кнопка удаления карточки"></button>}
        <img className="element__image" alt={props.card.name} src={props.card.link} onClick={handleCardClick} />
        <div className="element__footer">
          <p className="element__name">{props.card.name}</p>
          <button className={`element__like ${isLike && 'element__like_active'} `} onClick={handleLikeClick} type="button"></button>
          <p className="element__like-count">{props.card.likes.length}</p>
          </div>
      </article>
    </div>
  )
}
export default Card;
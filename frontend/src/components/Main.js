import React from 'react'
import Card from './Card';
import { Context } from '../context/CurrentUserContext.js';

function Main(props) {
  const context = React.useContext(Context)
  return (
    <main>
      <section className="profile">
        <div className="profile__content">
          <button className="profile__avatar-button" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={context?.avatar} alt="аватарка" />
          </button>
          <div className="profile__profile-info">
            <h1 className="profile__name">{context?.name}</h1>
            <button className="profile__edit-button" type="button" title="Редактировать профиль" onClick={props.onEditProfile}></button>
            <p className="profile__profession">{context?.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" title="добавление карточки" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {Object.values(props.cards).map((card) => (
          <Card card={card}
            key={card._id}
            owner={card.owner}
            onCardPopupOpen={props.onCardPopupOpen}
            onCardLike={props.onCardLike}
            onDeleteCard={props.onDeleteCard}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
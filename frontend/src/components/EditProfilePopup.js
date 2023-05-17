import React from 'react'
import { Context } from '../context/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(Context);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }
  
  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name='popup_info'
      isOpen={props.isOpen}
      onClose={props.onClose}
      title='Редактировать профиль'
      titleButton='Сохранить'
      handleSubmit={handleSubmit}
      children={(<>
        <section className="form">
          <input value={name} onChange={handleChangeName} className="popup__input popup__input-name" name="name" type="text" minLength="2" maxLength="40"
            placeholder="Имя" required />
          <span className="popup__input-error"></span>
        </section>
        <section className="form">
          <input value={description} onChange={handleChangeDescription} className="popup__input popup__input-profession" name="profession" type="text" minLength="2"
            maxLength="200" placeholder="Профессия" required />
          <span className="popup__input-error"></span>
        </section>
      </>
      )}
    />
  )
}

export default EditProfilePopup;
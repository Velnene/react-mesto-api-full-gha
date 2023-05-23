import React from 'react'
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  },[props.isOpen])

  return(
  <PopupWithForm
    name='popup_change-avatar'
    isOpen={props.isOpen}
    onClose={props.onClose}
    title="Обновить аватар"
      titleButton='Сохранить'
      handleSubmit={handleSubmit}
    children={(<>
      <section className="form">
        <input ref={avatarRef} className="popup__input popup__input-avatar" name="avatar" type="text" minLength="2" placeholder="аватар"
          required />
        <span className="popup__input-error"></span>
      </section>
    </>
    )}
    />
  )
}

export default EditAvatarPopup
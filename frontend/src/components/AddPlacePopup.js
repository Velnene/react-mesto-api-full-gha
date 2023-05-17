import React from 'react'
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {

  const [site, setSite] = React.useState('');
  const [place, setPlace] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddNewCard({
      http: site,
      place: place
    })
    props.onClose();
  }

  React.useEffect(() => {
    setPlace('');
    setSite('')
  }, [props.isOpen])


  function handleSite(e) {
    setSite(e.target.value);
  }

  function handlePlace(e) {
    setPlace(e.target.value);
  }

  return (
    <PopupWithForm
      name='popup_card'
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
      title='Новое место'
      titleButton='Создать'
      children={(<>
        <section className="form">
          <input value={place} onChange={handlePlace} className="popup__input popup__input-name" name="name" type="text" minLength="2" maxLength="30"
            placeholder="Название" required />
          <span className="popup__input-error"></span>
        </section>
        <section className="form">
          <input value={site} onChange={handleSite} className="popup__input popup__input-profession" name="link" type="url" placeholder="Ссылка на картинку"
            required />
          <span className="popup__input-error"></span>
        </section>
      </>
      )}
    />)
}

export default AddPlacePopup;
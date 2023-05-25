import Header from './Header.js'
import Footer from './Footer';
import Main from './Main';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js'
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import React, { useState, useEffect } from 'react'
import ImagePopup from './ImagePopup';
import api from '../utils/api.js'
import { Context } from '../context/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'
import Successful from '../images/successful.svg'
import Mistake from '../images/mistake.svg'

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditImagePopupOpen, setEditImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setUserInfo] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [popupAuthorization, setPopupAuthorization] = useState(false);
  const [successful, setSuccessful] = useState({ image: "", message: '' });
  const [email, setEmail] = useState('');

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api.getSign(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data?.email);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((res) => {
          setUserInfo(res);
        }).catch((err) => {
          alert(err);
        });
      api.initialCards()
        .then((res) => {
          console.log(cards)
          console.log(res)
          setCards(res)
        }).catch((err) => {
          alert(err);
        });
    }
  }, [loggedIn])

  function handleAddPlaceSubmit({ http, place }) {
    api.setNewCard({ http: http, place: place }).then((res) => {
      setCards([res, ...cards]);
    }).catch((err) => {
      alert(err);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => {
        alert(err);
      });
    }
    else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => {
        alert(err);
      });
    }
  }

  function handleCardClick(card) {
    setEditImagePopupOpen(true)
    setSelectedCard(card)
  }

  function handleEditAvatar() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditPlacePopupOpen() {
    setAddPlacePopupOpen(true);
  }

  function handleEditProfilePopupOpen() {
    setEditProfilePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setEditImagePopupOpen(false);
    setPopupAuthorization(false);
  }


  function handleUpdateAvatar(avatar) {
    api.changeUserAvatar(avatar).then((res) => {
      setUserInfo(res);
      closeAllPopups()
    }).catch((err) => {
      alert(err);
    });
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name: name, profession: about }).then((res) => {
      setUserInfo(res);
      closeAllPopups();
    }).catch((err) => {
      alert(err);
    });
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then((res) => {
      setCards((items) => items.filter((card) => card._id !== cardId))
      closeAllPopups();
    }).catch((err) => {
      alert(err);
    });
  }

  function handleRegister(password, email) {
    if (!password || !email) {
      return;
    }
    api.signUp(password, email)
      .then((res) => {
        navigate('/signin');
        setPopupAuthorization(true)
        setSuccessful({ image: Successful, message: 'Вы успешно зарегистрировались!' })
      })
      .catch((res) => {
        setPopupAuthorization(true)
        setSuccessful({
          image: Mistake, message: 'Что-то пошло не так! Попробуйте ещё раз.'
        })
      })
  }

  function handleLogin(password, email) {
    if (!password || !email) {
      return;
    }
    api.signIn(password, email)
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        navigate('/');
        setLoggedIn(true);
        setEmail(email);
      })
      .catch((err) => {
        setPopupAuthorization(true)
        setSuccessful({
          image: Mistake, message: 'Что-то пошло не так! Попробуйте ещё раз.'
        })
      });
  }

  function closeAuth() {
    localStorage.removeItem('jwt')
    setEmail('');
    setLoggedIn(false)
  }

  return (
    <Context.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route path='/' element={
              <>
                <Header
                  email={email}
                  onClick={closeAuth}
                  title='Выйти'
                  route='/signup' />
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={handleEditAvatar}
                  onAddPlace={handleEditPlacePopupOpen}
                  onEditProfile={handleEditProfilePopupOpen}
                  onCardPopupOpen={handleCardClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                  onDeleteCard={handleCardDelete}
                />
                <Footer />
              </>} />
            <Route path='/signin' element={
              <>
                <Header
                  title='Регистрация'
                  route='/signup'
                />
                <Login
                  onLogin={handleLogin}
                />
              </>
            } />

            <Route path='/signup' element={
              <>
                <Header
                  title='Войти'
                  route='/signin' />
                <Register
                  onRegister={handleRegister}
                />
              </>
            } />
            <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />
          </Routes>

          <InfoTooltip
            isOpen={popupAuthorization}
            onClose={closeAllPopups}
            successful={successful}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddNewCard={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups} />

          <PopupWithForm
            name="popup_card-delete"
            formSelector='popup__form_card-delete'
            title='Вы уверены?'
            titleButton='Да'
            onClose={closeAllPopups}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpenImagePopup={isEditImagePopupOpen}
          />

        </div>
      </div>
    </Context.Provider>
  );
}

export default App;



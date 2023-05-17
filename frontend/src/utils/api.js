export class Api {
  constructor() {
    this._cardUrl = 'https://mesto.nomoreparties.co/v1/cohort-59/cards/';
    this._userUrl = 'https://nomoreparties.co/v1/cohort-59/users/me/';
    this._token = '4d30e00f-4868-4e38-a672-84cd476f7f32';
  }

  getUserInfo() {
    return fetch(this._userUrl, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  setUserInfo({ name, profession }) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: profession
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  changeUserAvatar(data) {
    return fetch(this._userUrl + "avatar/", {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  initialCards() {
    return fetch(this._cardUrl, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  deleteCard(idCard) {
    return fetch(this._cardUrl + idCard, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  setNewCard({ http, place }) {
    return fetch(this._cardUrl, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: place,
        link: http
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  addLike(cardId) {
    return fetch(this._cardUrl + cardId + '/likes', {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }



  deleteLike(cardId) {
    return fetch(this._cardUrl + cardId + '/likes', {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  signUp(password, email) {
    return fetch("https://auth.nomoreparties.co/signup", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, email })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  signIn(password, email) {
    return fetch("https://auth.nomoreparties.co/signin", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, email })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  getSign(jwt) {
    return fetch("https://auth.nomoreparties.co/users/me", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }
}


const api = new Api();

export default api;
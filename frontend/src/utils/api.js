export class Api {
  constructor() {
    this._cardUrl = 'https://api.web-15.viktor5211.nomoredomains.monster/cards/';
    this._userUrl = 'https://api.web-15.viktor5211.nomoredomains.monster/users/me/';
    this._url = 'https://api.web-15.viktor5211.nomoredomains.monster/';
  }

  getUserInfo(jwt) {
    return fetch(this._userUrl, {
      headers: {
        authorization: `Bearer ${jwt}`
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

  setUserInfo({ name, profession }, jwt) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
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

  changeUserAvatar(data, jwt) {
    return fetch(this._userUrl + "avatar/", {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
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

  initialCards(jwt) {
    return fetch(this._cardUrl, {
      headers: {
        authorization: `Bearer ${jwt}`
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

  deleteCard(idCard, jwt) {
    return fetch(this._cardUrl + idCard, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${jwt}`,
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

  setNewCard({ http, place }, jwt) {
    return fetch(this._cardUrl, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${jwt}`,
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

  addLike(cardId, jwt) {
    return fetch(this._cardUrl + cardId + '/likes', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${jwt}`,
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



  deleteLike(cardId, jwt) {
    return fetch(this._cardUrl + cardId + '/likes', {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${jwt}`,
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
    return fetch(this._url + "signup", {
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
    return fetch(this._url + "signin", {
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
    return fetch(this._userUrl, {
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
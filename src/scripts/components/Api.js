export default class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._myUrl = this._baseUrl + "/users/me";
    this._cardsUrl = this._baseUrl + "/cards";
  }

  _checkResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addNewCard(name, link) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(id) {
    return fetch(this._cardsUrl + "/" + id, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }
  
  getUser() {
    return fetch(this._myUrl, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  updateUser(name, about) {
    return fetch(this._myUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  addLike(id) {
    return fetch(this._cardsUrl + "/" + id + "/likes", {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  removeLike(id) {
    return fetch(this._cardsUrl + "/" + id + "/likes", {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  updateAvatar(avatar){
    return fetch(this._myUrl+'/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}
